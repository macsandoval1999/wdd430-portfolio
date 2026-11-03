import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteTitle = "Marco Sandoval | Portfolio";
const siteDescription =
    "Portfolio of Marco Sandoval: background, milestones, and projects built with Next.js, TypeScript, and Tailwind CSS.";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

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
                url: "/shared-preview.png",
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
        images: ["/shared-preview.png"],
    },
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
