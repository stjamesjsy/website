import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Button } from "../ui/base/Button";
import { BouncingScrollIcon } from "../ui/BouncingScrollIcon";
import { Container } from "../ui/layout/Container";

export function HomeHero() {
    return (
        <Box
            position="relative"
            minHeight={{ base: "80vh", md: "100vh" }}
            paddingTop={{ base: "240px", md: "210px" }}
            paddingBottom={{ base: "80px", sm: "120px", md: undefined }}
            overflow="hidden"
            bg="linear-gradient(rgba(26, 31, 37, 0.4) 0%, rgba(26, 31, 37, 0.1) 40%, rgba(26, 31, 37, 0.85) 100%)"
        >
            <Box
                position="absolute"
                inset={0}
                zIndex={0}
                bgImage="url(/images/hero.png)"
                bgSize="cover"
                bgPos="center"
                bgRepeat="no-repeat"
            />

            <Box position="relative" zIndex={1}>
                <Container>
                    <Flex direction="column" alignItems="center">
                        <Box maxWidth="600px" textAlign="center">
                            <Heading
                                as="h1"
                                textTransform="uppercase"
                                fontWeight={900}
                                fontSize={{ base: "4.5rem", md: "8rem" }}
                                lineHeight={{ base: "5px", md: "85px" }}
                                marginBottom="50px"
                            >
                                St James
                            </Heading>

                            <Text
                                fontSize="22px"
                                fontWeight={100}
                                textTransform="uppercase"
                                letterSpacing={4}
                                marginBottom="30px"
                            >
                                Karaoke · Disco Bingo · Nightclub
                            </Text>

                            <Text
                                fontSize="16px"
                                color="#a7a6a6"
                                marginBottom="40px"
                            >
                                Your night starts here - Disco Bingo, Karaoke, Live DJs, and good vibes!
                            </Text>

                            <Flex justifyContent="center" gap="15px">
                                <Link href="/#disco-bingo">
                                    <Button>What's on</Button>
                                </Link>
                                <Link href="/#contact">
                                    <Button variant="outline">Book a table</Button>
                                </Link>
                            </Flex>
                        </Box>
                    </Flex>
                </Container>
            </Box>

            <BouncingScrollIcon />
        </Box>
    )
}