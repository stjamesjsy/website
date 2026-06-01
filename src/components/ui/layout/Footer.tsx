import { CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/constants";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";
import { SocialLink } from "../SocialLink";
import { Container } from "./Container";

const links = [
    { text: "Home", href: "/" },
    { text: "Disco Bingo", href: "/disco-bingo" },
    { text: "Venue Hire", href: "/venue-hire" },
    { text: "FAQs", href: "/faqs" },
    { text: "Contact", href: "/#contact" },
    { text: "Privacy Policy", href: "/privacy" }
];

const socialLinks = [
    { name: "Facebook", icon: FaFacebook, href: FACEBOOK_URL },
    { name: "Instagram", icon: FaInstagram, href: INSTAGRAM_URL },
    { name: "General Enquiries Email", icon: FaEnvelope, href: `mailto:${CONTACT_EMAIL}` }
];

export function Footer() {
    return (
        <Box
            bgColor="black"
            borderTop="1px solid #282c3c"
            paddingY={10}
        >
            <Container>
                <Flex
                    columnGap="30px"
                    rowGap="10px"
                    flexWrap="wrap"
                    justifyContent="center"
                    marginBottom="20px"
                >
                    {links.map(link => (
                        <Link key={link.href} textTransform="uppercase" href={link.href}>
                            {link.text}
                        </Link>
                    ))}
                </Flex>

                <Flex
                    gap="10px"
                    justifyContent="center"
                    marginBottom="20px"
                >
                    {socialLinks.map(link => (
                        <SocialLink key={link.name} href={link.href} icon={<link.icon />} aria-label={link.name} />
                    ))}
                </Flex>

                <Text
                    color="#c7c3c2"
                    fontWeight={400}
                    textAlign="center"
                >
                    Copyright &copy; {new Date().getFullYear()} St James. All rights reserved.
                </Text>
            </Container>
        </Box>
    )
}