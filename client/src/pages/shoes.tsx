import Navigation from '@/components/navigation'
import { useShoes } from '@/hooks/useShoes'
import type { Shoe } from '@/types/shoe'
import { Box, Button, Card, Grid, GridItem, Skeleton, SkeletonText, Stack, Text } from '@chakra-ui/react'
import { Calendar, PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const GRID_COLUMNS = {
    base: '1fr',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
}

const ShoesLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <Box minHeight="100vh" background="gray.50">
        <Navigation />
        <Box as="main" maxWidth="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
            {children}
        </Box>
    </Box>
)

type HeaderProps = {
    isError: boolean | undefined;
}

const Header: React.FC<HeaderProps> = ({ isError }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={8}>
        <Text fontSize="3xl">My Shoes</Text>
        {
            !isError && (
                <Button
                    as={Link}
                    {...{ to: '/shoes/new' }}
                >
                    <Box as={PlusIcon} mr={2} boxSize="1rem" />
                    Add Shoe
                </Button>
            )
        }
    </Box>
)

const SkeletonGrid = () => (
    <Grid templateColumns={GRID_COLUMNS} gap={6}>
        {[1, 2, 3].map((i) => (
            <GridItem key={i}>
                <Card.Root>
                    <Card.Header>
                        <Skeleton height="20px" width="70%" mb={2} />
                        <SkeletonText noOfLines={1} />
                    </Card.Header>
                    <Card.Body>
                        <Stack gap={2}>
                            <Skeleton height="16px" width="50%" />
                            <Skeleton height="16px" width="60%" />
                        </Stack>
                    </Card.Body>
                </Card.Root>
            </GridItem>
        ))}
    </Grid>
)

const EmptyState = () => (
    <Card.Root>
        <Card.Body py={12}>
            <Box textAlign="center" color="gray.500">
                <Box mb={4}>No shoes added yet.</Box>
                <Button as={Link} {...{ to: '/shoes/new' }}>
                    <Box as={PlusIcon} mr={2} boxSize="1rem" />
                    Add Your First Shoe
                </Button>
            </Box>
        </Card.Body>
    </Card.Root>
)

type ShoesGridProps = {
    shoes: Shoe[];
}

const ShoesGrid: React.FC<ShoesGridProps> = ({ shoes }) => (
    <Grid templateColumns={GRID_COLUMNS} gap={6}>
        {shoes.map((shoe) => (
            <GridItem key={shoe.shoeId}>
                <Link to={`/shoes/${shoe.shoeId}`}>
                    <Card.Root
                        cursor="pointer"
                        transition="box-shadow 0.2s ease-in-out"
                        _hover={{ boxShadow: 'lg' }}
                    >
                        <Card.Header>
                            <Card.Title>{shoe.name}</Card.Title>
                            <Box fontSize="sm" color="gray.600">
                                {shoe.brand} {shoe.model}
                            </Box>
                        </Card.Header>

                        <Card.Body>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                fontSize="sm"
                                color="gray.600"
                            >
                                <Box as={Calendar} boxSize="1rem" />
                                Purchased on{' '}
                                {new Date(shoe.purchaseDate).toLocaleDateString()}
                            </Box>
                        </Card.Body>
                    </Card.Root>
                </Link>
            </GridItem>
        ))}
    </Grid>
)

const Shoes: React.FC = () => {
    const { shoes, isLoading, isError } = useShoes()

    if (isError) (
        <ShoesLayout>
            <Text>Error loading shoes.</Text>
        </ShoesLayout>
    )

    return (
        <ShoesLayout>
            <Header isError={isError} />
            {isError && (
                <Text>Error loading shoes.</Text>
            )}
            {isLoading && <SkeletonGrid />}
            {!isLoading && shoes?.length === 0 && <EmptyState />}
            {!isLoading && shoes && shoes.length > 0 && <ShoesGrid shoes={shoes} />}
        </ShoesLayout>
    )
}

export default Shoes