import Navigation from '@/components/navigation'
import SkeletonGrid from '@/components/skeleton-grid'
import { GRID_COLUMNS } from '@/constants/gridColumns'
import { useShoes } from '@/hooks/useShoes'
import type { Shoe } from '@/types/shoe'
import { Box, Button, Card, Grid, GridItem, Text } from '@chakra-ui/react'
import { Calendar, PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

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
                                {shoe.purchaseDate}
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