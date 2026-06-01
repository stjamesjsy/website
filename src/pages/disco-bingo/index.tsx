import { BookingForm } from "@/components/contact/BookingForm";
import { ContactDetailsCard } from "@/components/contact/ContactDetailsCard";
import { DiscoBingoHero } from "@/components/disco-bingo/DiscoBingoHero";
import { HowItWorksSection } from "@/components/disco-bingo/HowItWorksSection";
import { Page } from "@/components/Page";
import { Container } from "@/components/ui/layout/Container";
import { FOOD_MENU_URL, WINE_MENU_URL } from "@/lib/constants";
import { Box, Flex, Grid, GridItem, Heading, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

export default function DiscoBingo() {
    return (
        <Page title="Disco Bingo">
            <DiscoBingoHero />

            <Box
                width="100%"
                bgColor="var(--stjames-yellow)"
                height="10px"
            />

            <Stack gap={10}>
                <Container
                    paddingTop={20}
                    paddingBottom={10}
                >
                    <Box id="how-it-works">
                        <HowItWorksSection />
                    </Box>
                </Container>

                <Container
                    paddingTop={16}
                    paddingBottom={16}
                    bgColor="gray.900"
                >
                    <Box>
                        <SimpleGrid gap={16} columns={{ base: 1, md: 2 }}>
                            <Stack gap={6}>
                                <Heading fontWeight={800} fontSize="3xl">
                                    Schedule & Meals
                                </Heading>

                                <Box>
                                    <Text>
                                        <strong>Friday:</strong> 7pm - 11pm
                                    </Text>
                                    <Text>
                                        <strong>Sunday:</strong> 5pm - 9pm
                                    </Text>
                                </Box>

                                <Text>
                                    Basket meals available. Meals sold on-site and do not require pre-booking.
                                </Text>

                                <Flex gap={6}>
                                    <Link className="link" href={FOOD_MENU_URL}>
                                        Food Menu <LuExternalLink />
                                    </Link>
                                    <Link className="link" href={WINE_MENU_URL}>
                                        Wine Menu <LuExternalLink />
                                    </Link>
                                </Flex>
                            </Stack>

                            <Stack gap={6}>
                                <Heading fontWeight={800} fontSize="3xl">
                                    Corporate Disco Bingo
                                </Heading>

                                <Text>
                                    Looking to host a corporate night? Disco Bingo can be booked for private corporate events.
                                </Text>

                                <Text>
                                    Please <Link className="link" href="/#contact">Contact us</Link> via an official company email address with any queries.
                                </Text>
                            </Stack>
                        </SimpleGrid>
                    </Box>
                </Container>

                <Container
                    paddingTop={16}
                    paddingBottom={10}
                >
                    <Box id="book">
                        <Grid gap={10} gridTemplateColumns={{ base: "1fr", md: "1fr 450px" }}>
                            <GridItem>
                                <BookingForm />
                            </GridItem>

                            <GridItem>
                                <ContactDetailsCard />
                            </GridItem>
                        </Grid>
                    </Box>
                </Container>
            </Stack>
        </Page>
    )
}