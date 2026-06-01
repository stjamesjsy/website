import { Container } from "@/components/ui/layout/Container";
import { Accordion, Span, Link, Heading, List } from "@chakra-ui/react";

const items = [
    {
        value: "ageRest",
        title: "Is there an age restriction?",
        content: <>18+ (Unless stated otherwise). ID may be required.</>
    },
    {
        value: "whereLoc",
        title: "Where are you located?",
        content: (
            <>
                We are located at 5 Rue de Funchal, St Helier, JE2 4TT, near Minden Place carpark.
            </>
        )
    },
    {
        value: "dressCode",
        title: "What is the dress code?",
        content: (
            <>
                The dress code is smart casual.
                <ul style={{ marginLeft: 30, marginTop: 10 }}>
                    <li>No joggers or informal shorts (Thursday - Sunday only)</li>
                    <li>No hats</li>
                    <li>No football shirts</li>
                    <li>No dirty work clothes</li>
                </ul>
            </>
        )
    },
    {
        value: "parking",
        title: "Is there parking nearby?",
        content: (
            <>Yes, Minden Place multi storey carpark is less than a 1 minute walk around the corner.</>
        )
    },
    {
        value: "openHours",
        title: "What are your opening hours?",
        content: (
            <>
                Our normal opening hours are 19:30 – 02:00, every day!
                <br /><br />
                On Friday, we open at 17:00 for Disco Bingo (booking required)
            </>
        )
    },
    {
        value: "promoter",
        title: "I'm a promoter and I'd like to book an event",
        content: (
            <>
                Great! We offer our upstairs room for events. Please check out our{" "}
                <Link href="/venue-hire" color="yellow.400">
                    Venue Hire
                </Link>{" "}
                page and get in touch.
            </>
        )
    },
    {
        value: "eventBookHours",
        title: "Do you accept event bookings outside of normal hours?",
        content: (
            <>
                Please{" "}
                <Link href="/#contact" color="yellow.400">
                    contact us
                </Link>
                , depending on the event this may be possible.
            </>
        )
    },
    {
        value: "cloakroom",
        title: "Do you have a cloakroom?",
        content: <>Unfortunately we do not</>
    },
    {
        value: "freeWifi",
        title: "Do you have free Wi-Fi?",
        content: (
            <>Yes! The details can be found at the bar, ask the bar staff if you need help!</>
        )
    },
    {
        value: "entertainment",
        title: "What entertainment do you offer?",
        content: (
            <List.Root paddingLeft={8}>
                <List.Item>Karaoke every Thursday, Saturday & Sunday</List.Item>
                <List.Item>Disco Bingo every Friday & Sunday</List.Item>
                <List.Item>Live DJ every Friday</List.Item>
            </List.Root>
        )
    },
    {
        value: "vapeInside",
        title: "Can I vape inside?",
        content: <>Yes! No smoking, though.</>
    },
    {
        value: "lostProperty",
        title: "I've left something in St James, how can I get it back?",
        content: (
            <>
                You can come in any day from 7:30 PM or{" "}
                <Link href="/#contact" color="yellow.400">
                    contact us
                </Link>
                .
            </>
        )
    },
    {
        value: "ids",
        title: "What forms of ID do you accept?",
        content: (
            <>
                We accept the following:
                <List.Root paddingLeft={8}>
                    <List.Item>Full Jersey Driving license</List.Item>
                    <List.Item>Passport</List.Item>
                </List.Root>
                We do not accept provisional licenses or out of date forms of ID. We also do not accept photocopies, digital images or screenshots.
            </>
        )
    }
];

export default function FAQs() {
    return (
        <Container
            paddingTop={40}
            paddingBottom={10}
        >
            <Heading 
                fontWeight={900} 
                fontSize={{ base: "2rem", md: "3rem" }}
                marginBottom={12}
            >
                Frequently Asked Questions
            </Heading>

            <Accordion.Root
                collapsible
                defaultValue={["ageRest"]}
            >
                {items.map((item) => (
                    <Accordion.Item
                        key={item.value}
                        value={item.value}
                        bgColor="gray.900"
                        borderRadius="lg"
                        overflow="hidden"
                        border="none"
                        marginBottom={2}
                    >
                        <Accordion.ItemTrigger
                            paddingX="25px"
                            paddingY="16px"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            cursor="pointer"
                            _hover={{ opacity: 0.9 }}
                        >
                            <Span fontSize="18px" fontWeight="600">
                                {item.title}
                            </Span>

                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>

                        <Accordion.ItemContent>
                            <Accordion.ItemBody
                                paddingX="25px"
                                paddingY="16px"
                                fontSize="15px"
                                color="white"
                                bgColor="gray.800"
                            >
                                {item.content}
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </Container>
    );
}