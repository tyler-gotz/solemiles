import LogRun from '@/components/log-run'
import Navigation from '@/components/navigation'
import SkeletonGrid from '@/components/skeleton-grid'
import { useRunsByShoeId } from '@/hooks/useRunsByShoeId'
import { useShoe } from '@/hooks/useShoe'
import { Box, Button, Card, Grid, GridItem, IconButton, Text } from '@chakra-ui/react'
import { Calendar, Edit, MapPin, Trash2, TrendingUp } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router'

const ShoeDetailLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <Box minHeight="100vh" background="gray.50">
        <Navigation />
        <Box as="main" maxWidth="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
            {children}
        </Box>
    </Box>
)

const ShoeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()

    const { shoe, isLoading, isError } = useShoe(id!)
    const { runs, isLoading: runsLoading, isError: runsError } = useRunsByShoeId(id!)

    const totalMiles = runs?.reduce((total, run) => total + Number(run.distance), 0) || 0
    const outdoorMiles = runs?.filter(run => run.runType === 'outdoor').reduce((total, run) => total + Number(run.distance), 0) || 0
    const treadmillMiles = runs?.filter(run => run.runType === 'treadmill').reduce((total, run) => total + Number(run.distance), 0) || 0

    return (
        <ShoeDetailLayout>
            {
                (isLoading || runsLoading) && <SkeletonGrid />
            }
            {
                (isError || runsError) && (
                    <Text>Error Loading Shoe Details.</Text>
                )
            }
            {
                !isLoading && !runsLoading && shoe && runs && (
                    <>
                        <Box
                            mb={8}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="start"
                                mb={4}
                            >
                                <Box>
                                    <Text
                                        as="h1"
                                        fontSize="3xl"
                                        mb={2}
                                    >
                                        {shoe.name}
                                    </Text>
                                    <Box
                                        as="p"
                                    >
                                        {shoe.brand} - {shoe.model}
                                    </Box>
                                </Box>
                                <Box
                                    display="flex"
                                    gap={2}
                                >
                                    <Button
                                        as={Link}
                                        {...({ to: `/shoes/${id}/edit` })}
                                        variant="outline"
                                    >
                                        <Box as={Edit} boxSize="1rem" mr={2} />
                                        Edit
                                    </Button>
                                    <Button
                                        background="red.500"
                                        color="white"
                                        _hover={{ background: 'red.600' }}
                                    >
                                        <Box as={Trash2} boxSize="1rem" mr={2} />
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                            <Grid
                                gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                                gap={4}
                            >
                                <GridItem>
                                    <Card.Root>
                                        <Card.Header mb={2}>
                                            <Card.Title fontSize="sm">Total Miles</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Text fontSize="2xl">{totalMiles.toFixed(2)}</Text>
                                        </Card.Body>
                                    </Card.Root>
                                </GridItem>
                                <GridItem>
                                    <Card.Root>
                                        <Card.Header mb={2}>
                                            <Card.Title fontSize="sm">Outdoor Miles</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Text fontSize="2xl">{outdoorMiles.toFixed(2)}</Text>
                                        </Card.Body>
                                    </Card.Root>
                                </GridItem>
                                <GridItem>
                                    <Card.Root>
                                        <Card.Header mb={2}>
                                            <Card.Title fontSize="sm">Treadmill Miles</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Text fontSize="2xl">{treadmillMiles.toFixed(2)}</Text>
                                        </Card.Body>
                                    </Card.Root>
                                </GridItem>
                            </Grid>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={4}
                        >
                            <Text
                                as="h2"
                                fontSize="2xl"
                            >
                                Run History
                            </Text>
                            <LogRun
                                shoeId={shoe.shoeId}
                            />
                        </Box>
                        {
                            runs.length === 0 ? (
                                <Card.Root>
                                    <Card.Body
                                        py={12}
                                    >
                                        <Box
                                            textAlign="center"
                                            color="gray.500"
                                        >
                                            <Box as='p'>
                                                No runs logged yet.
                                            </Box>
                                        </Box>
                                    </Card.Body>
                                </Card.Root>
                            ) : (
                                <Box className='space-y-3'>
                                    {
                                        runs.map((run) => (
                                            <Card.Root key={run.runId}>
                                                <Card.Body
                                                    py={4}
                                                >
                                                    <Box
                                                        display="flex"
                                                        justifyContent="space-between"
                                                        alignItems="start"
                                                    >
                                                        <Box
                                                            flex={1}
                                                        >
                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                                gap={4}
                                                                mb={2}
                                                            >
                                                                <Box
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    gap={2}
                                                                >
                                                                    <Box
                                                                        as={Calendar}
                                                                        boxSize="1rem"
                                                                        color="gray.600"
                                                                    />
                                                                    <Box as='span'>{run.date}</Box>
                                                                </Box>
                                                                <Box
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    gap={2}
                                                                >
                                                                    <Box
                                                                        as={TrendingUp}
                                                                        boxSize="1rem"
                                                                        color="gray.600"
                                                                    />
                                                                    <Box as='span'>{run.distance} miles</Box>
                                                                </Box>
                                                                <Box
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    gap={2}
                                                                >
                                                                    <Box
                                                                        as={MapPin}
                                                                        boxSize="1rem"
                                                                        color="gray.600"
                                                                    />
                                                                    <Box
                                                                        as='span'
                                                                        textTransform="capitalize"
                                                                    >
                                                                        {run.runType}
                                                                    </Box>
                                                                </Box>

                                                            </Box>
                                                            {run.notes && (
                                                                <Box
                                                                    fontSize="sm"
                                                                    color="gray.600"
                                                                    mt={2}
                                                                >
                                                                    {run.notes}
                                                                </Box>
                                                            )}
                                                        </Box>
                                                        <IconButton
                                                            variant="ghost"
                                                            size="sm"
                                                        // onClick={() => handleDeleteRun(run.id)}
                                                        >
                                                            <Box
                                                                as={Trash2}
                                                                boxSize="1rem"
                                                                color="red.600"
                                                            />
                                                        </IconButton>
                                                    </Box>
                                                </Card.Body>
                                            </Card.Root>
                                        ))
                                    }
                                </Box>
                            )
                        }
                    </>
                )
            }
        </ShoeDetailLayout>
    )
}

export default ShoeDetail