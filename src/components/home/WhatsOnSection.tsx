import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { EntertainmentInfoBox } from "./EntertainmentInfoBox";

export function WhatsOnSection() {
    return (
        <>
            <Heading
                as="h2"
                fontWeight={900}
                fontSize={{ base: "3rem", md: "3rem" }}
                marginBottom={14}
                textAlign="center"
            >
                WHAT'S ON
            </Heading>

            <SimpleGrid gap={6} columns={{ base: 1, md: 3 }}>
                <EntertainmentInfoBox
                    title="Disco Bingo"
                    image="/images/homepage/DiscoBingo.png"
                    buttons={[
                        { label: "Book a table", href: "/disco-bingo#book" },
                        { label: "More info", href: "/disco-bingo", inverted: true }
                    ]}
                >
                    <Text>The ultimate music bingo experience!</Text>
                    <Text>
                        Grab your bingo cards, dabbers, and get ready for rounds of your favourite hits – from 80s classics to school disco anthems.
                    </Text>
                </EntertainmentInfoBox>

                <EntertainmentInfoBox
                    title="Late Night Karaoke"
                    image="/images/homepage/Karaoke.png"
                    buttons={[
                        // { label: "More info", href: "/karaoke", inverted: true }
                    ]}
                >
                    <Text>St James is the home of Late Night Karaoke!</Text>
                    <Text>
                        Every Thursday, Saturday & Sunday from 11 PM until 2 AM. No booking required.
                    </Text>
                    <Text>No booking required. What will you sing?</Text>
                </EntertainmentInfoBox>

                <EntertainmentInfoBox
                    title="DJ Moony"
                    image="/images/homepage/DJMoony.png"
                >
                    <Text>Join us every Friday from 11 PM with our resident DJ.</Text>
                    <Text>
                        DJ Moony plays the best of many genres including Charts, House, Club Classics, Afrobeats, R&B and DNB!
                    </Text>
                    <Text>Free entry all night.</Text>
                </EntertainmentInfoBox>
            </SimpleGrid>
        </>
    )
}