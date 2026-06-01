import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function Container({ children, ...props }: PropsWithChildren<BoxProps>) {
    return (
        <Box
            position="relative"
            marginX="auto"
            width="100%"
            maxWidth="calc(100% - 16px)"
            paddingX={{ base: "10px", lg: "90px", xl: "150px" }}
            {...props}
        >
            {children}
        </Box>
    )
}