import Navigation from '@/components/navigation'
import { Box, Card, Grid, GridItem, Text } from '@chakra-ui/react'
import { Activity, Footprints, MapPin, TrendingUp } from 'lucide-react'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const shoesData: Array<{ name: string; miles: number }> = [
    { name: "Shoe A", miles: 120 },
    { name: "Shoe B", miles: 85 },
    { name: "Shoe C", miles: 60 },
];

const totalMiles = shoesData.reduce((total, shoe) => total + shoe.miles, 0);

const pieData = [
    { name: "Outdoor", value: 120, color: "#3b82f6" },
    { name: "Treadmill", value: 8, color: "#10b981" },
];

const Dashboard: React.FC = () => {
    return (
        <Box
            minHeight="100vh"
            background="gray.50"
        >
            <Navigation />
            <Box
                as='main'
                maxWidth="7xl"
                mx="auto"
                px={{ base: 4, sm: 6, lg: 8 }}
                py={8}
            >
                <Text
                    fontSize="3xl"
                    mb={8}
                >
                    Dashboard
                </Text>
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                    gap={4}
                    mb={8}
                >
                    <GridItem>
                        <Card.Root>
                            <Card.Header
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between"
                                pb={2}
                                className='space-y-0'
                            >
                                <Card.Title
                                    fontSize="sm"
                                >
                                    Total Shoes
                                </Card.Title>
                                <Box
                                    as={Footprints}
                                    boxSize="1rem"
                                    color="gray.600"
                                />
                            </Card.Header>
                            <Card.Body>
                                <Text
                                    fontSize="2xl"
                                >
                                    42
                                </Text>
                            </Card.Body>
                        </Card.Root>
                    </GridItem>
                    <GridItem>
                        <Card.Root>
                            <Card.Header
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between"
                                pb={2}
                                className='space-y-0'
                            >
                                <Card.Title
                                    fontSize="sm"
                                >
                                    Total Runs
                                </Card.Title>
                                <Box
                                    as={Activity}
                                    boxSize="1rem"
                                    color="gray.600"
                                />
                            </Card.Header>
                            <Card.Body>
                                <Text
                                    fontSize="2xl"
                                >
                                    128
                                </Text>
                            </Card.Body>
                        </Card.Root>
                    </GridItem>
                    <GridItem>
                        <Card.Root>
                            <Card.Header
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between"
                                pb={2}
                                className='space-y-0'
                            >
                                <Card.Title
                                    fontSize="sm"
                                >
                                    Total Miles
                                </Card.Title>
                                <Box
                                    as={TrendingUp}
                                    boxSize="1rem"
                                    color="gray.600"
                                />
                            </Card.Header>
                            <Card.Body>
                                <Text
                                    fontSize="2xl"
                                >
                                    350
                                </Text>
                            </Card.Body>
                        </Card.Root>
                    </GridItem>
                    <GridItem>
                        <Card.Root>
                            <Card.Header
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between"
                                pb={2}
                                className='space-y-0'
                            >
                                <Card.Title
                                    fontSize="sm"
                                >
                                    Outdoor / Treadmill
                                </Card.Title>
                                <Box
                                    as={MapPin}
                                    boxSize="1rem"
                                    color="gray.600"
                                />
                            </Card.Header>
                            <Card.Body>
                                <Text
                                    fontSize="2xl"
                                >
                                    120 / 8
                                </Text>
                            </Card.Body>
                        </Card.Root>
                    </GridItem>
                </Grid>
                <Grid
                    templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
                    gap={6}
                >
                    <GridItem>
                        <Card.Root>
                            <Card.Header>
                                <Card.Title>
                                    Miles by Shoe
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {
                                    shoesData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={shoesData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="miles" fill="#3b82f6" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <Box
                                            height="300px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            color="gray.500"
                                        >
                                            No data yet. Add shoes and log runs to see stats.
                                        </Box>
                                    )
                                }
                            </Card.Body>
                        </Card.Root>
                    </GridItem>
                    <GridItem>
                        <Card.Root>
                            <Card.Header>
                                <Card.Title>
                                    Outdoor vs Treadmill Miles
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {
                                    totalMiles > 0 ? (
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, value }) => `${name}: ${value} miles`}
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <Box
                                            height="300px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            color="gray.500"
                                        >
                                            No data yet. Add shoes and log runs to see stats.
                                        </Box>
                                    )
                                }
                            </Card.Body>
                        </Card.Root>
                    </GridItem>
                </Grid>
            </Box>
        </Box >
    )
}

export default Dashboard