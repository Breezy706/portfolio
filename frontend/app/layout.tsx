import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yahaya Ramadhani Nasoro — Data Scientist & AI Engineer",
  description: "Portfolio of Yahaya Ramadhani Nasoro — Data Science, AI, ML, NLP, RAG and BI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
