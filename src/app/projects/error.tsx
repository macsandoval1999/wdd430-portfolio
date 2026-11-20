/* NOTE:
    Next.js renders this error boundary when an unexpected error occurs in a project page or its nested components.
    It must be a Client Component so the user can retry or navigate back to the project overview.
    Expected form validation errors are handled by the form instead of this page.
*/

"use client";

/****** IMPORTS ******/
// Link provides navigation back to the projects overview.
import Link from "next/link";
// useEffect logs the error when the boundary receives it.
import { useEffect } from "react";

/***** The ProjectError component *****/
// Next.js supplies the thrown value and a retry function that re-fetches and re-renders the failed content.
export default function ProjectError({
    error,
    retry,
}: {
    error: unknown;
    retry: () => void;
}) {
    useEffect(() => {
        console.error("An unexpected project error occurred:", error);
    }, [error]);

    return (
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
                An unexpected error occurred. Please try again or return to the
                projects overview.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
                {/* retry asks Next.js to re-fetch and re-render the failed content. */}
                <button
                    type="button"
                    onClick={() => retry()}
                    className="border-2 border-accent bg-accent px-4 py-3 font-mono text-sm font-bold text-[#fff7f2] shadow-[4px_4px_0_#090609] hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                >
                    Try again
                </button>
                <Link
                    href="/projects"
                    className="font-mono text-sm text-accent-bright underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                >
                    Back to projects
                </Link>
            </div>
        </section>
    );
}
