import { CORPORATE_BROCHURE_URL } from "@/lib/constants";
import { Box, Heading, HStack, Image, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { LuArrowRight, LuStar } from "react-icons/lu";
import { Button } from "../ui/base/Button";

export function VenueHireHero() {
    return (
        <SimpleGrid gap={8} columns={{ base: 1, md: 2 }}>
            <Stack gap={6}>
                <Heading as="h1" fontWeight={800} fontSize={{ base: "3.3rem", md: "3rem" }} marginBottom={4}>
                    Venue Hire
                </Heading>

                <Text>
                    Looking for a great venue in the heart of St Helier? St James is a versatile space that’s perfect for all kinds of events - from birthday parties and work socials to live music and DJ nights.
                </Text>

                <Text>
                    Located at 5 Rue de Funchal, St Helier, we’re just a short walk away from the town centre.
                </Text>

                <Stack gap={4}>
                    <HStack gap={3}>
                        <Box>
                            <LuStar color="var(--stjames-yellow)" fill="var(--stjames-yellow)" size={40} />
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Prime Location</Text>
                            <Text>
                                Central St Helier, near Minden Place car park
                            </Text>
                        </Box>
                    </HStack>
                    <HStack gap={3}>
                        <Box>
                            <LuStar color="var(--stjames-yellow)" fill="var(--stjames-yellow)" size={40} />
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Licensed Hours</Text>
                            <Text>
                                11:00 AM – 02:00 AM, 7 days a week (however we usually open from 07:30 PM)
                            </Text>
                        </Box>
                    </HStack>
                </Stack>

                <Link href={CORPORATE_BROCHURE_URL} target="_blank">
                    <Button display="flex">
                        Check out the Brochure <LuArrowRight />
                    </Button>
                </Link>
            </Stack>

            <Box>
                <Image src="/images/venue-hire/front.png" />
            </Box>
        </SimpleGrid>
    )
}