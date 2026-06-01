import { Grid, GridItem, Heading, Image, List, SimpleGrid, Text } from "@chakra-ui/react";
import { LuCircleCheck } from "react-icons/lu";

const items = [
    "Each player gets bingo cards and dabbers",
    "Play a book of 5 rounds with different themes (80s, School Disco, Pop Hits, etc.)",
    "Songs are played over the speakers and shown on screen",
    "Dab the song if it’s on your card",
    "The first person to fill their card calls bingo – card verified and split if multiple winners",
    "Prize money increases each round",
    "In the final round, you can purchase additional bingo books to increase the prize fund further"
]

export function HowItWorksSection() {
    return (
        <>
            <Grid gap={8} gridTemplateColumns={{ base: "1fr", lg: "1fr 500px" }}>
                <GridItem>
                    <Heading
                        as="h2"
                        fontWeight={900}
                        fontSize={{ base: "2.8rem", md: "3rem" }}
                        marginBottom={10}
                    >
                        How It Works
                    </Heading>

                    <List.Root variant="plain" gap={2}>
                        {items.map((item, i) => (
                            <List.Item key={item}>
                                <List.Indicator asChild color="var(--stjames-yellow)" marginRight={2}>
                                    <Text fontWeight="bold" fontSize="2xl" lineHeight={1}>
                                        {i + 1}
                                    </Text>
                                </List.Indicator>

                                {item}
                            </List.Item>
                        ))}
                    </List.Root>
                </GridItem>

                <GridItem>
                    <Image src="/images/disco-bingo/disco-bingo-hero.png" />
                </GridItem>
            </Grid>
        </>
    )
}