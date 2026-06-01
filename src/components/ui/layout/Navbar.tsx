import {
    Box,
    Collapsible,
    Flex,
    IconButton,
    Image,
    Link,
    Stack,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { LuMenu } from "react-icons/lu";

interface NavbarItem {
    text: string;
    href: string;
}

const items: NavbarItem[] = [
    { text: "Home", href: "/" },
    { text: "Disco Bingo", href: "/disco-bingo" },
    { text: "Venue Hire", href: "/venue-hire" },
    { text: "FAQs", href: "/faqs" },
    { text: "Contact", href: "/#contact" }
];

export function Navbar() {
    const pathname = usePathname();

    const isMobile = useBreakpointValue({ base: true, md: false });
    const [shown, setShown] = useState(false);

    useEffect(() => {
        setShown(false);
    }, [pathname]);

    return (
        <Box
            position="absolute"
            color="white"
            width="100%"
            zIndex={10}
        >
            <Container paddingY={6}>
                <Flex justifyContent="space-between" align="center">
                    <Link href="/">
                        <Image src="/images/logo.png" width="160px" aria-label="St James Logo" />
                    </Link>

                    <Flex gap={4} display={{ base: "none", md: "flex" }}>
                        {items.map(item => {
                            const active = pathname === item.href;

                            return (
                                <Link key={item.href} href={item.href}>
                                    <Box
                                        color="white"
                                        textDecoration="none"
                                        fontSize="18px"
                                        paddingY="8px"
                                        paddingX="16px"
                                        borderRadius="20px"
                                        _hover={{
                                            bgColor: "rgba(255, 255, 255, 0.1)"
                                        }}
                                        fontWeight={active ? "bold" : "normal"}
                                    >
                                        <Text>{item.text}</Text>
                                    </Box>
                                </Link>
                            );
                        })}
                    </Flex>

                    <IconButton
                        display={{ base: "flex", md: "none" }}
                        variant="plain"
                        onClick={() => setShown(!shown)}
                        aria-label="Menu"
                    >
                        <LuMenu color="white" />
                    </IconButton>
                </Flex>
            </Container>

            {isMobile && (
                <Collapsible.Root open={shown} onOpenChange={(e) => setShown(e.open)}>
                    <Collapsible.Content boxShadow="0px 20px 40px -20px rgba(0, 0, 0, 0.2)">
                        <Box
                            borderTop="1px solid"
                            borderColor="gray.200"
                            bgColor="rgba(0, 0, 0, 0.7)"
                            color="black"
                            backdropFilter="blur(10px)"
                        >
                            <Container paddingY={4}>
                                <Stack gap={1}>
                                    {items.map(item => {
                                        const active = pathname === item.href;

                                        return (
                                            <Link key={item.href} href={item.href}>
                                                <Box
                                                    paddingX={2}
                                                    paddingY={3}
                                                    borderRadius="md"
                                                    _hover={{ bgColor: "gray.100" }}
                                                    fontWeight={active ? "bold" : "normal"}
                                                >
                                                    {item.text}
                                                </Box>
                                            </Link>
                                        );
                                    })}
                                </Stack>
                            </Container>
                        </Box>
                    </Collapsible.Content>
                </Collapsible.Root>
            )}
        </Box>
    );
}