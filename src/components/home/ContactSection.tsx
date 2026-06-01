import { Flex, Grid, GridItem, Heading, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuBook, LuContact } from "react-icons/lu";
import { ContactForm } from "../contact/ContactForm";
import { ContactDetailsCard } from "../contact/ContactDetailsCard";
import { BookingForm } from "../contact/BookingForm";

type Option = "general-enquiries" | "book-disco-bingo";

export function ContactSection() {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    return (
        <>
            <Heading
                as="h2"
                fontWeight={900}
                fontSize={{ base: "3rem", md: "3rem" }}
                marginBottom={!selectedOption ? 6 : 10}
                textAlign="center"
            >
                GET IN TOUCH
            </Heading>

            {!selectedOption && (
                <Text
                    marginBottom={8}
                    textAlign="center"
                    color="gray.300"
                >
                    Please select an option below.
                </Text>
            )}

            {!selectedOption && (
                <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
                    <OptionButton
                        text="General Enquiries"
                        summary="Speak to the manager with any general enquries"
                        icon={<LuContact />}
                        onClick={() => setSelectedOption("general-enquiries")}
                    />
                    <OptionButton
                        text="Book a Table"
                        summary="Book a table for Disco Bingo"
                        icon={<LuBook />}
                        onClick={() => setSelectedOption("book-disco-bingo")}
                    />
                </SimpleGrid>
            )}

            {(selectedOption === "general-enquiries") && (
                <Grid gap={8} gridTemplateColumns={{ base: "1fr", lg: "1fr 450px" }}>
                    <GridItem>
                        <ContactForm
                            goBack={() => setSelectedOption(null)}
                        />
                    </GridItem>

                    <GridItem>
                        <ContactDetailsCard />
                    </GridItem>
                </Grid>
            )}

             {(selectedOption === "book-disco-bingo") && (
                <Grid gap={8} gridTemplateColumns={{ base: "1fr", lg: "1fr 450px" }}>
                    <GridItem>
                        <BookingForm
                            goBack={() => setSelectedOption(null)}
                        />
                    </GridItem>

                    <GridItem>
                        <ContactDetailsCard />
                    </GridItem>
                </Grid>
            )}
        </>
    )
}

function OptionButton({ icon, text, summary, onClick }) {
    return (
        <Flex
            border="1px solid"
            borderColor="gray.600"
            borderRadius="2xl"
            paddingX={4}
            paddingY={10}
            flexDirection="column"
            alignItems="center"
            transition="transform 150ms ease-in-out"
            _hover={{
                bgColor: "gray.800",
                cursor: "pointer",
                transform: "scale(1.02)"
            }}
            onClick={onClick}
        >
            <Icon size="2xl" marginBottom={4}>
                {icon}
            </Icon>
            <Text fontSize="2xl" marginBottom={2}>
                {text}
            </Text>
            <Text color="gray.400">
                {summary}
            </Text>
        </Flex>
    )
}