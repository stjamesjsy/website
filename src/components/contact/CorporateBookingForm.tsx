import { BASKET_MEALS, CONTACT_FORM_URL } from "@/lib/constants";
import { formatPrettyDate, randomNumbers } from "@/lib/utils";
import { Alert, Box, Flex, Heading, Stack, StackSeparator, Text } from "@chakra-ui/react";
import { SubmitEvent, useState } from "react";
import { LuCircleCheck } from "react-icons/lu";
import { Button } from "../ui/base/Button";
import { Field } from "../ui/base/Field";
import { Input } from "../ui/base/Input";
import { Textarea } from "../ui/base/Textarea";
import { CustomDatePicker } from "./CustomDatePicker";

enum FormState {
    Submitting,
    Submitted,
    Failed
}

type BasketItem = typeof BASKET_MEALS[number];

const defaultForm = {
    numberOfPeople: 1,
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: ""
}

export function CorporateBookingForm() {
    const [form, setForm] = useState(defaultForm);
    const [state, setState] = useState<FormState | null>(null);
    const [error, setError] = useState(null);

    const [basketItems, setBasketItems] = useState<Record<string, string>>(
        Object.fromEntries(BASKET_MEALS.map(item => [item.name, ""])) as Record<string, string>
    );

    async function submitForm(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (state === FormState.Submitting) {
            return;
        }

        setState(FormState.Submitting);

        const selectedBasketItems = Object.entries(basketItems)
            .filter(([, qty]) => Number(qty) > 0)
            .map(([item, qty]) => `${item}: ${qty}`)
            .join("\n") || "None selected";

        try {
            const response = await fetch(CONTACT_FORM_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _subject: `New Corporate Disco Bingo Booking (${randomNumbers()})`,
                    type: "stjames",

                    "Company Name": form.companyName,
                    "Name": form.contactName,
                    "email": form.email,
                    "Number of People": form.numberOfPeople,
                    "Phone Number": form.phone,
                    "Basket Meals": selectedBasketItems,
                    "Message": form.message
                })
            })

            const data = await response.json();

            if (data?.success !== false) {
                console.log("Booking form submitted successfuly", data);
                setState(FormState.Submitted);
            } else {
                console.error("Error submitting booking form", data);
                setState(FormState.Failed);

                if (data?.error) {
                    setError(data.error);
                }
            }
        } catch (e) {
            console.error(e);

            setState(FormState.Failed);
            setError(e.message || "An unknown error has occurred");
        }
    }

    function updateForm(field: keyof typeof defaultForm, value: any) {
        setForm({ ...form, [field]: value });
        setError(null);
    }

    function updateBasketItem(item: BasketItem, value: string) {
        setBasketItems(prev => ({ ...prev, [item.name]: value }));
    }

    return (
        <form onSubmit={submitForm}>
            {(state !== FormState.Submitted) && (
                <Heading as="h4" fontSize="1.5rem" marginBottom={10}>
                    You are booking a table for Disco Bingo
                </Heading>
            )}

            <Stack gap={4}>
                {state === FormState.Failed && (
                    <Alert.Root
                        status="error"
                        title="Failed to submit"
                        padding={4}
                        bgColor="red.700"
                        color="red.100"
                    >
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title fontSize="md">Failed to submit</Alert.Title>
                            <Alert.Description>{error}</Alert.Description>
                        </Alert.Content>
                    </Alert.Root>
                )}

                {state === FormState.Submitted && (
                    <SubmittedView form={form} basketItems={basketItems} />
                )}

                {(state !== FormState.Submitted) && (
                    <>
                        <Field label="Company Name">
                            <Input
                                value={form.companyName}
                                onChange={(e) => updateForm("companyName", e.target.value)}
                            />
                        </Field>

                        <Field label="Name">
                            <Input
                                value={form.contactName}
                                onChange={(e) => updateForm("contactName", e.target.value)}
                            />
                        </Field>

                        <Field label="Email">
                            <Input
                                value={form.email}
                                onChange={(e) => updateForm("email", e.target.value)}
                                type="email"
                            />
                        </Field>

                        <Field label="Phone number">
                            <Input
                                value={form.phone}
                                onChange={(e) => updateForm("phone", e.target.value)}
                            />
                        </Field>

                        <Field label="Number of people">
                            <Input
                                value={form.numberOfPeople}
                                onChange={(e) => updateForm("numberOfPeople", Number(e.target.value))}
                                type="number"
                                min={1}
                            />
                        </Field>

                        <Field marginTop={2}>
                            <Text>Basket meals</Text>

                            <Box fontSize="13px" color="gray.400" marginBottom={4}>
                                Just to give the kitchen an idea for larger tables.
                                All payment and final orders are taken on the day.
                                <div style={{ paddingTop: "2px" }} />
                                Enter the amounts of each meal you want for your group.
                            </Box>

                            <Stack gap={1} width="100%" marginBottom={2} color="gray.300">
                                {BASKET_MEALS.map(item => (
                                    <Flex key={item.name} gap={2} justifyContent="space-between" width="100%">
                                        <Text>{item.name} (£{Number(item.price).toFixed(2)})</Text>
                                        <Input
                                            value={basketItems[item.name]}
                                            onChange={(e) => updateBasketItem(item, e.target.value)}
                                            type="number"
                                            min={0}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            placeholder="0"
                                            width={20}
                                            height={6}
                                        />
                                    </Flex>
                                ))}
                            </Stack>
                        </Field>

                        <Field label="Message">
                            <Textarea
                                value={form.message}
                                onChange={(e) => updateForm("message", e.target.value)}
                                rows={6}
                            />
                        </Field>

                        <Button
                            type="submit"
                            disabled={state === FormState.Submitting}
                            marginLeft="auto"
                            width={{ base: "100%", sm: "fit-content" }}
                        >
                            Send Message
                        </Button>
                    </>
                )}
            </Stack>
        </form>
    )
}

function SubmittedView({ form, basketItems }) {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={12}
            gap={6}
            textAlign="center"
        >
            <LuCircleCheck size={100} color="var(--stjames-yellow)" />

            <Text>
                Your booking request has been sent. We will contact you to confirm the booking or if we require further information.
            </Text>

            <Stack gap={1} width="100%" separator={<StackSeparator borderColor="gray.600" />}>
                <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="bold">Date</Text>
                    <Text>{formatPrettyDate(form.date)}</Text>
                </Flex>
                <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="bold">Number of People</Text>
                    <Text>{form.numberOfPeople}</Text>
                </Flex>
                <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="bold">Name</Text>
                    <Text>{form.name}</Text>
                </Flex>
                <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="bold">Email</Text>
                    <Text>{form.email}</Text>
                </Flex>
                <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="bold">Phone Number</Text>
                    <Text>{form.phone}</Text>
                </Flex>
                <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="bold" textAlign="left">Basket Meals</Text>
                    {Object.entries(basketItems).some(([, qty]) => Number(qty) > 0)
                        ? (
                            <ul style={{ paddingLeft: "20px", textAlign: "right" }}>
                                {Object.entries(basketItems)
                                    .filter(([, qty]) => Number(qty) > 0)
                                    .map(([item, qty]: any) => (
                                        <li key={item}>{item} × {qty}</li>
                                    ))}
                            </ul>
                        )
                        : "None selected"}
                </Flex>
                <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="bold">Additional Details</Text>
                    <Text>{form.notes}</Text>
                </Flex>
            </Stack>
        </Flex>
    )
}