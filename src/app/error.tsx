/* NOTE:
    Next.js renders this boundary for unexpected errors in pages without a more specific error.tsx.
    Errors in the root layout are handled by global-error.tsx instead.
    This must be a Client Component so the user can retry.
*/

"use client";

import Link from "next/link";
import { useEffect } from "react";

/***** The AppError component *****/
// Next.js supplies the thrown value and a retry function for the failed content.
export default function AppError({
    error,
    retry,
}: {
    error: unknown;
    retry: () => void;
}) {
    useEffect(() => {
        console.error("An unexpected application error occurred:", error);
    }, [error]);

    return (
        <div className="mx-auto min-h-[calc(100vh-10rem)] w-[calc(100%-2rem)] max-w-6xl py-[clamp(2.5rem,6vw,5rem)]">
            <section
                role="alert"
                className="max-w-3xl border-2 border-border bg-surface p-[clamp(1.5rem,4vw,2.5rem)] shadow-[4px_4px_0_#090609]"
            >
                <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                    Something went wrong
                </p>
                <h1 className="m-0 text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                    We couldn&apos;t complete your request
                </h1>
                <p className="mb-0 mt-4 text-muted">
                    An unexpected error occurred. Please try again or return to
                    the home page.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                    <button
                        type="button"
                        onClick={() => retry()}
                        className="border-2 border-accent bg-accent px-4 py-3 font-mono text-sm font-bold text-[#fff7f2] shadow-[4px_4px_0_#090609] hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="font-mono text-sm text-accent-bright underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        Back to home
                    </Link>
                </div>
            </section>
        </div>
    );
}
