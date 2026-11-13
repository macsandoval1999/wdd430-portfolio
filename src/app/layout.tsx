import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import ScrollToTop from "@/src/components/behaviors/ScrollToTop";

const siteTitle = "Marco Sandoval | Portfolio";
const siteDescription =
    "Portfolio of Marco Sandoval: background, milestones, and projects built with Next.js, TypeScript, and Tailwind CSS.";

let siteUrl = "http://localhost:3000";
if (process.env.VERCEL_URL) {
    siteUrl = `https://${process.env.VERCEL_URL}`;
}
if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    siteUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
}

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteTitle,
        template: "%s | Marco Sandoval",
    },
    description: siteDescription,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: siteTitle,
        title: siteTitle,
        description: siteDescription,
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Marco Sandoval portfolio preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
        images: ["/opengraph-image"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-scroll-behavior="smooth" className="scroll-smooth motion-reduce:scroll-auto">
            <body>
                <Suspense fallback={null}>
                    <ScrollToTop />
                </Suspense>
                <Header />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
