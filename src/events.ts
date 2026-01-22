export interface Event {
    id: string;
    title: string;
    time: string;
    summary: string;
    day: string;
    month: string;
    description: string;
    date: string;
    category: string;
    imageUrl: string;
    headerImageUrl?: string;
}

export function formatDateParts(dateString: string) {
    const dateObj = new Date(dateString);
    const options = { month: "short" as const };
    const month = dateObj.toLocaleString('en-US', options);
    const day = dateObj.getDate();
    const formattedDate = `${month} ${day < 10 ? '0' + day : day}, ${dateObj.getFullYear()}`;
    return { month, day, formattedDate };
}

export default [
    {
        "id": "03abbd78-ffdb-4b1c-972d-8350095cb5a9",
        "title": "gerg",
        "time": "esrgser",
        "summary": "esrg",
        "date": "2025-09-12",
        "description": "sergsreg",
        "category": "DJ",
        "imageUrl": "https://i.imgur.com/HsgUsPu.png",
        "headerImageUrl": "https://i.imgur.com/0etGhQt.png"
    }
] as Event[]