import { Heading, List, Text } from "@chakra-ui/react";
import { LuStar } from "react-icons/lu";

const items = [
    "Maximum 90 Guests",
    "Fully Air Conditioned Throughout",
    "Stage",
    "Private Bar",
    "Sound & Lighting System",
    "Customizable Space",
    "Free Wi-Fi Available",
    "DJ Booth",
    "Buffet available upon request"
];

export function FunctionRoomSection() {
    return (
        <>
            <Text
                color="var(--stjames-yellow)"
                marginBottom={4}
                textTransform="uppercase"
                fontSize="14px"
                fontWeight="bold"
                letterSpacing={1.5}
            >
                Upstairs at St James
            </Text>

            <Heading fontWeight={800} fontSize={{ base: "2rem", md: "3rem" }} marginBottom={6}>
                The Function Room
            </Heading>

            <Text marginBottom={6}>
                Our premier hire space – ideal for private events any day of the week (Except Friday & Sunday). Perfect for Bands, DJ Events, Birthdays & more!
            </Text>

            <List.Root variant="plain" gap={0}>
                {items.map((item, i) => (
                    <List.Item key={item}>
                        <List.Indicator asChild color="var(--stjames-yellow)" marginRight={2}>
                            <LuStar color="var(--stjames-yellow)" fill="var(--stjames-yellow)" size={14} />
                        </List.Indicator>

                        {item}
                    </List.Item>
                ))}
            </List.Root>
        </>
    )
}