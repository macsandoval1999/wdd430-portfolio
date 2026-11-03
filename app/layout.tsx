import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: {
        default: "Marco Sandoval | Portfolio",
        template: "%s | Marco Sandoval",
    },
    description:
        "Portfolio of Marco Sandoval: background, milestones, and projects built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth motion-reduce:scroll-auto">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
