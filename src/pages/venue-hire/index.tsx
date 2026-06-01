import { ContactDetailsCard } from "@/components/contact/ContactDetailsCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { Page } from "@/components/Page";
import { Container } from "@/components/ui/layout/Container";
import { FunctionRoomSection } from "@/components/venue-hire/FunctionRoomSection";
import { VenueHireHero } from "@/components/venue-hire/VenueHireHero";
import { Box, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react";

export default function VenueHire() {
    return (
        <Page title="Venue Hire">
            <Container
                paddingTop={40}
                paddingBottom={20}
            >
                <VenueHireHero />
            </Container>

            <Stack gap={10}>
                <Box bgColor="gray.900">
                    <Container paddingY={16}>
                        <Box id="the-function-room">
                            <FunctionRoomSection />
                        </Box>
                    </Container>
                </Box>

                <Container paddingY={6}>
                    <Box id="contact">
                        <Text
                            color="var(--stjames-yellow)"
                            marginBottom={4}
                            textTransform="uppercase"
                            fontSize="14px"
                            fontWeight="bold"
                            letterSpacing={1.5}
                        >
                            Want to make it official?
                        </Text>

                        <Heading fontWeight={800} fontSize={{ base: "2rem", md: "3rem" }} marginBottom={16}>
                            Get in Touch
                        </Heading>

                        <Grid gap={10} gridTemplateColumns={{ base: "1fr", md: "1fr 450px" }}>
                            <GridItem>
                                <ContactForm />
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