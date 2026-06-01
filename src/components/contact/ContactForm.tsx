import { CONTACT_FORM_URL } from "@/lib/constants";
import { randomNumbers } from "@/lib/utils";
import { SubmitEvent, useState } from "react";
import { Field } from "../ui/base/Field";
import { Alert, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Input } from "../ui/base/Input";
import { Textarea } from "../ui/base/Textarea";
import { Button } from "../ui/base/Button";
import { LuChevronLeft, LuCircleCheck } from "react-icons/lu";

interface Props {
    goBack?: () => void;
}

enum FormState {
    Submitting,
    Submitted,
    Failed
}

const defaultForm = {
    name: "",
    email: "",
    subject: "",
    message: ""
}

export function ContactForm(props: Props) {
    const [form, setForm] = useState(defaultForm);
    const [state, setState] = useState<FormState | null>(null);
    const [error, setError] = useState(null);

    async function submitForm(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (state === FormState.Submitting) {
            return;
        }

        setState(FormState.Submitting);

        try {
            const response = await fetch(CONTACT_FORM_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _subject: `New website submission (${randomNumbers()})`,
                    type: "stjames",
                    
                    "Name": form.name,
                    "Email": form.email,
                    "Subject": form.subject,
                    "Message": form.message
                })
            })

            const data = await response.json();

            if (data?.success !== false) {
                console.log("Contact form submitted successfuly", data);
                setState(FormState.Submitted);
            } else {
                console.error("Error submitting contact form", data);
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

    function hasStarted() {
        return form.name !== "" || form.email !== "" || form.subject !== "" || form.message !== "";
    }

    function handleGoBack() {
        let shouldContinue = true;

        if (hasStarted()) {
            shouldContinue = confirm("Are you sure you want to go back? The form will be reset.");
        }
        if (shouldContinue) {
            props.goBack();
        }
    }

    return (
        <form onSubmit={submitForm}>
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
                    <SubmittedView />
                )}

                {(state !== FormState.Submitted) && (
                    <>
                        <Field label="Name">
                            <Input
                                value={form.name}
                                onChange={(e) => updateForm("name", e.target.value)}
                            />
                        </Field>

                        <Field label="Email">
                            <Input
                                value={form.email}
                                onChange={(e) => updateForm("email", e.target.value)}
                                type="email"
                            />
                        </Field>

                        <Field label="Subject">
                            <Input
                                value={form.subject}
                                onChange={(e) => updateForm("subject", e.target.value)}
                            />
                        </Field>

                        <Field label="Message">
                            <Textarea
                                value={form.message}
                                onChange={(e) => updateForm("message", e.target.value)}
                                rows={6}
                            />
                        </Field>

                        <Flex 
                            justifyContent="space-between"
                            flexDirection={{ base: "column", sm: "row" }}
                            gap={4}
                        >
                             {props.goBack && (
                                <Button
                                    variant="outline"
                                    onClick={handleGoBack}
                                    disabled={state === FormState.Submitting}
                                    display="flex"
                                    width={{ base: "100%", sm: "fit-content" }}
                                >
                                    <LuChevronLeft /> Go Back
                                </Button>
                            )}

                            <Button
                                type="submit"
                                disabled={state === FormState.Submitting}
                                marginLeft="auto"
                                width={{ base: "100%", sm: "fit-content" }}
                            >
                                Send Message
                            </Button>
                        </Flex>
                    </>
                )}
            </Stack>
        </form>
    )
}

function SubmittedView() {
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
                Your message was sent successfully. You should expect a response within 24 hours where possible.
            </Text>
        </Flex>
    )
}