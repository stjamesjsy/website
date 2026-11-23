import type { Metadata } from "next";
import { FaqsPage } from "@/components/stjames/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Age policy, dress code, accepted ID, parking, opening hours and more at St James."
}

export default function Faqs() {
  return <FaqsPage />
}
