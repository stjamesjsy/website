import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Button } from "../ui/base/Button";
import { Container } from "../ui/layout/Container";

export function KaraokeHero() {
    return (
        <Box
            position="relative"
            paddingTop="150px"
            paddingBottom="60px"
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
                    <Heading
                        as="h1"
                        fontWeight={700}
                        fontSize={{ base: "4.5rem", md: "5rem" }}
                        lineHeight={{ base: "5px", md: "85px" }}
                        marginBottom="30px"
                    >
                        Karaoke
                    </Heading>

                    <Text
                        fontSize="18px"
                        color="white"
                        marginBottom="40px"
                        maxWidth="730px"
                    >
                        St James is the home of late night karaoke - every Thursday, Saturday & Sunday from 11pm until 2am.
                    </Text>
                </Container>
            </Box>
        </Box>
    )
}