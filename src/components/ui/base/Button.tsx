import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface Props {
    variant?: "outline";
}

export function Button({ variant, children, ...props }: PropsWithChildren<Props & ButtonProps>) {
    if (variant === "outline") {
        return (
            <ChakraButton
                display="block"
                bg="none"
                border="1px solid var(--stjames-yellow)"
                borderRadius="20px"
                fontSize="14px"
                paddingX={8}
                height={11}
                width="fit-content"
                fontWeight="bold"
                color="var(--stjames-yellow)"
                textTransform="uppercase"
                transition="transform 200ms ease-in-out"
                _hover={{
                    transform: "scale(1.1)",
                    color: "var(--stjames-yellow)",
                    cursor: "pointer"
                }}
                {...props}
            >
                {children}
            </ChakraButton>
        );
    }
    return (
        <ChakraButton
            display="block"
            bg="none"
            border="1px solid var(--stjames-yellow)"
            borderRadius="20px"
            fontSize="14px"
            paddingX={8}
            height={11}
            width="fit-content"
            fontWeight="bold"
            bgColor="var(--stjames-yellow)"
            color="black"
            textTransform="uppercase"
            transition="transform 200ms ease-in-out"
            _hover={{
                transform: "scale(1.1)",
                color: "black",
                cursor: "pointer"
            }}
            {...props}
        >
            {children}
        </ChakraButton>
    );
}