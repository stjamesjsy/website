import type { Metadata } from "next";
import { DiscoBingoPage } from "@/components/stjames/disco-bingo";

export const metadata: Metadata = {
  title: "Disco Bingo",
  description: "The ultimate music bingo experience at St James - five themed rounds of your favourite hits, a growing prize pot and basket meals."
}

export default function DiscoBingo() {
  return <DiscoBingoPage />
}
