import { KaraokeHero } from "@/components/karaoke/KaraokeHero";
import { Page } from "@/components/Page";
import { Image, ImageGallery } from "@/components/ui/ImageGallery";
import { Container } from "@/components/ui/layout/Container";
import { Box, Stack } from "@chakra-ui/react";

const galleryImages: Image[] = [

];

export default function Karaoke() {
    return (
        <Page title="Karaoke">
            <KaraokeHero />

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
                    <Box id="gallery">
                        {/* <ImageGallery items={galleryImages} /> */}
                    </Box>
                </Container>
            </Stack>
        </Page>
    )
}