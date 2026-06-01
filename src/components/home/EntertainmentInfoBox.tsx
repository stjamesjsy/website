import { Box, Flex, Heading, Image, Link, SimpleGrid, Stack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Button } from "../ui/base/Button";

interface Props {
    title: string;
    image: string;
    buttons?: {
        label: string;
        href: string;
        inverted?: boolean;
    }[];
}

export function EntertainmentInfoBox(props: PropsWithChildren<Props>) {
    return (
        <Flex
            flexDirection="column"
            bgColor="gray.800"
            borderRadius="2xl"
            overflow="hidden"
        >
            <Box>
                <Image src={props.image} aria-label={props.title} />
            </Box>
            <Box
                paddingY={6}
                paddingX={6}
                width="100%"
                fontSize="sm"
                display="flex"
                flexDirection="column"
                flex={1}
            >
                <Heading as="h3" fontSize="2rem" fontWeight={700} marginBottom={4}>
                    {props.title}
                </Heading>

                <Stack gap={4} height="100%">
                    {props.children}

                    {props.buttons && (
                        <Stack gap={2} marginTop="auto">
                            {props.buttons.map(btn => (
                                <Link key={btn.href} href={btn.href} width="100%">
                                    <Button
                                        variant={btn.inverted ? "outline" : undefined}
                                        width="100%"
                                    >
                                        {btn.label}
                                    </Button>
                                </Link>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Box>
        </Flex>
    )
}