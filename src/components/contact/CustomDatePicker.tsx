import { useState } from "react";
import {
    Box,
    Button,
    Grid,
    GridItem,
    HStack,
    Text,
} from "@chakra-ui/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { formatPrettyDate } from "@/lib/utils";

interface Props {
    value: string;
    onChange: (date: string) => void;
}

const allowedDays = [0, 5] // Disco Bingo: Sunday (0), Friday (5)

export function CustomDatePicker({ value, onChange }: Props) {
    const [current, setCurrent] = useState(new Date());

    const year = current.getFullYear();
    const month = current.getMonth();

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month, i + 1);
        const isPast = date < new Date(today.toDateString());
        const allowed = allowedDays.includes(date.getDay());

        return {
            date,
            allowed: allowed && !isPast
        };
    });

    const format = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    return (
        <Box mb={5}>
            <HStack justify="space-between" mb={3}>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    borderColor="gray.500"
                    _hover={{
                        bgColor: "gray.700"
                    }}
                    onClick={() => setCurrent(new Date(year, month - 1, 1))}
                >
                    <LuArrowLeft color="white" />
                </Button>

                <Text fontWeight="bold">
                    {current.toLocaleString("default", {
                        month: "long",
                    })}{" "}
                    {year}
                </Text>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    borderColor="gray.500"
                    _hover={{
                        bgColor: "gray.700"
                    }}
                    onClick={() => setCurrent(new Date(year, month + 1, 1))}
                >
                    <LuArrowRight color="white" />
                </Button>
            </HStack>

            <Grid templateColumns="repeat(7, 1fr)" gap={2}>
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                    <GridItem key={`${day}-${index}`}>
                        <Text
                            textAlign="center"
                            fontWeight="semibold"
                            opacity={0.6}
                        >
                            {day}
                        </Text>
                    </GridItem>
                ))}

                {Array.from({ length: firstDay }).map((_, i) => (
                    <GridItem key={`empty-${i}`} />
                ))}

                {days.map(({ date, allowed }) => {
                    const formatted = format(date);
                    const selected = value === formatted;

                    return (
                        <Button
                            key={formatted}
                            type="button"
                            h="38px"
                            variant="outline"
                            disabled={!allowed}
                            bg={selected ? "white" : undefined}
                            color={selected ? "black" : "white"}
                            borderColor={selected ? "white" : undefined}
                            opacity={allowed ? 1 : 0.25}
                            cursor={allowed ? "pointer" : "not-allowed"}
                            _hover={
                                allowed
                                    ? {
                                        bgColor: !selected ? "gray.700" : "gray.200"
                                    }
                                    : undefined
                            }
                            onClick={() => onChange(formatted)}
                        >
                            {date.getDate()}
                        </Button>
                    );
                })}
            </Grid>
            
            {value && <Text marginTop={3} fontSize="sm">Selected: {formatPrettyDate(value)}</Text>}
        </Box>
    );
}