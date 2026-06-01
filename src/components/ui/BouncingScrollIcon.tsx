import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { LuChevronDown } from "react-icons/lu";

const bounce = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
`;

export function BouncingScrollIcon() {
    return (
        <Box
            position="absolute"
            bottom="20px"
            left={{ base: "43%", md: "47.6%" }}
            right="50%"
            transform="translateX(-50%)"
            padding="10px 20px"
            fontSize="20px"
            color="white"
            animation={`${bounce} 1s infinite ease-in-out`}
        >
            <LuChevronDown />
        </Box>
    );
}