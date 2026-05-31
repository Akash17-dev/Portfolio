import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akash Aakula | AI/ML Engineer",
  description:
    "Premium personal portfolio for Akash Aakula, AI/ML engineer, data scientist, full stack developer, and Linux DevOps enthusiast.",
  keywords: [
    "Akash Aakula",
    "AI Engineer",
    "Machine Learning",
    "Data Science",
    "Full Stack Developer",
    "DevOps",
    "Portfolio",
  ],
  openGraph: {
    title: "Akash Aakula | AI/ML Engineer",
    description:
      "Startup-grade portfolio with AI, data science, full stack, Linux, and DevOps projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
