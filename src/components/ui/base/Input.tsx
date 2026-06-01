import { Input as ChakraInput, InputProps } from "@chakra-ui/react";

export function Input({ ...props }: InputProps) {
    return (
        <ChakraInput
            borderColor="gray.500"
            paddingX={2}
            {...props}
        />
    )
}