import { Box, Text, Link as ChakraLink } from '@chakra-ui/react'
import { Footprints, Home } from 'lucide-react'
import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router';

const Navigation: React.FC = () => {
    const location = useLocation();

    const links = [
        { to: "/", label: "Dashboard", icon: Home },
        { to: "/shoes", label: "My Shoes", icon: Footprints },
    ];

    return (
        <Box
            as='header'
        >
            <Box
                as='nav'
                background="white"
                borderBottomWidth="1px"
                borderBottomStyle="solid"
            >
                <Box
                    maxWidth="7xl"
                    mx="auto"
                    px={{ base: 4, sm: 6, lg: 8 }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        height="4rem"
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                        >
                            <Box
                                as={Footprints}
                                color="blue.600"
                                boxSize="2rem"
                            />
                            <Text
                                as='span'
                                fontSize="xl"
                            >
                                SoleMiles
                            </Text>
                        </Box>
                        <Box
                            display="flex"
                            gap={4}
                        >
                            {links.map((link) => {
                                const Icon = link.icon
                                const isActive = location.pathname === link.to;

                                return (
                                    <ChakraLink
                                        as={RouterLink}
                                        {...({ to: link.to })}
                                        key={link.to}
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                        px={3}
                                        py={2}
                                        borderRadius="md"
                                        color={isActive ? "blue.700" : "gray.600"}
                                        background={isActive ? "blue.100" : undefined}
                                        _hover={{ background: !isActive ? "gray.100" : undefined }}
                                        textDecoration="none"
                                        transition="background-color 0.2s ease-in-out"
                                    >
                                        <Box
                                            as={Icon}
                                            boxSize="1rem"
                                        />
                                        {link.label}
                                    </ChakraLink>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Navigation