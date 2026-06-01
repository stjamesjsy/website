import { Textarea as ChakraTextarea, TextareaProps } from "@chakra-ui/react";

export function Textarea({ ...props }: TextareaProps) {
    return (
        <ChakraTextarea
            borderColor="gray.500"
            paddingX={2}
            paddingY={2}
            {...props}
        />
    )
}