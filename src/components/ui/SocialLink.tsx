import { Link, LinkProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
    href: string;
    icon: ReactNode;
}

export function SocialLink({ href, icon, ...props }: Props & LinkProps) {
    return (
        <Link 
            href={href} 
            target="_blank"
            bgColor="rgba(255, 255, 255, 0.2)"
            width="40px"
            height="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="20px"
            borderRadius="50%"
            transition="background-color 100ms ease-in-out"
            textDecoration="none"
            _hover={{
                bgColor: "var(--stjames-yellow)",
                color: "black"
            }}
            {...props}
        >
            {icon}
        </Link>
    )
}