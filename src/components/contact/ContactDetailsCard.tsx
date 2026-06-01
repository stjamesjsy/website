import { BOOKINGS_EMAIL, CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/constants";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";
import { SocialLink } from "../ui/SocialLink";
import { LuMapPin } from "react-icons/lu";

const socialLinks = [
    { name: "Facebook", icon: FaFacebook, href: FACEBOOK_URL },
    { name: "Instagram", icon: FaInstagram, href: INSTAGRAM_URL },
    { name: "General Enquiries Email", icon: FaEnvelope, href: `mailto:${CONTACT_EMAIL}` }
];

export function ContactDetailsCard() {
    return (
        <Box
            bgColor="gray.900"
            padding={6}
            borderRadius="2xl"
        >
            <Stack gap={8}>
                <Flex gap={4} alignItems="center">
                    <Box>
                        <LuMapPin color="var(--stjames-yellow)" size="38" />
                    </Box>
                    <Box>
                        <Heading as="h4">Address</Heading>
                        <Text>5 Rue de Funchal, St Helier, JE2 4TT</Text>
                    </Box>
                </Flex>

                <Flex gap={4} alignItems="center">
                    <Box>
                        <LuMapPin color="var(--stjames-yellow)" size="38" />
                    </Box>

                    <Stack gap={{ base: 2, md: 0 }}>
                        <Heading as="h4">Email</Heading>

                        <Flex columnGap={2} alignItems="center" flexWrap="wrap">
                            <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>
                            <Text color="gray.400" fontSize="sm">(general enquries)</Text>
                        </Flex>

                        <Flex columnGap={2} alignItems="center" flexWrap="wrap">
                            <Link href={`mailto:${BOOKINGS_EMAIL}`}>{BOOKINGS_EMAIL}</Link>
                            <Text color="gray.400" fontSize="sm">(bingo bookings)</Text>
                        </Flex>
                    </Stack>
                </Flex>

                <Flex gap="10px">
                    {socialLinks.map(link => (
                        <SocialLink key={link.name} href={link.href} icon={<link.icon />} aria-label={link.name} />
                    ))}
                </Flex>
            </Stack>
        </Box>
    )
}