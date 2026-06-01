export function randomNumbers(length = 6) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); // 0-9
    }
    return result;
}

export function formatPrettyDate(iso: string) {
    const date = new Date(iso);

    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString("en-GB", { month: "long" });

    const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
            day % 10 === 2 && day !== 12 ? "nd" :
                day % 10 === 3 && day !== 13 ? "rd" :
                    "th";

    return `${day}${suffix} ${month} ${year}`;
}