import { ContactSection } from "@/components/home/ContactSection";
import { HomeHero } from "@/components/home/HomeHero";
import { WhatsOnSection } from "@/components/home/WhatsOnSection";
import { Page } from "@/components/Page";
import { Container } from "@/components/ui/layout/Container";
import { Box, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Home() {

    useEffect(() => {
        if (window.location.hash) {
            const element = document.querySelector(window.location.hash);

            if (element) {
                element.scrollIntoView();
            }
        }
    }, []);

    return (
        <Page title="Home">
            <HomeHero />

            <Box
                width="100%"
                bgColor="var(--stjames-yellow)"
                height="10px"
            />

            <Container
                paddingTop={16}
                paddingBottom={10}
            >
                <Stack gap={28}>
                    <Box id="whats-on">
                        <WhatsOnSection />
                    </Box>

                    <Box id="contact">
                        <ContactSection />
                    </Box>
                </Stack>
            </Container>
        </Page>
    )
}