/* NOTE:
    Next.js uses this boundary when the root layout itself fails.
    It replaces the root layout, so it must provide its own HTML, body, and styles.
    Other unexpected page errors use the nearest error.tsx instead.
*/

"use client";

import "./globals.css";
import AppError from "./error";

export default function GlobalError({
    error,
    retry,
}: {
    error: unknown;
    retry: () => void;
}) {
    return (
        <html lang="en">
            <body>
                <main>
                    <AppError error={error} retry={retry} />
                </main>
            </body>
        </html>
    );
}
