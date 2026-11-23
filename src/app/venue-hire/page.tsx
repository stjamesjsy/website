import { VenueHirePage } from "@/components/stjames/venue-hire";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venue Hire",
  description: "Hire the Function Room at St James - up to 90 guests with a stage, private bar, DJ booth and full sound & lighting. Perfect for birthdays, work socials, bands and DJ events."
}

export default function VenueHire() {
  return <VenueHirePage />
}
