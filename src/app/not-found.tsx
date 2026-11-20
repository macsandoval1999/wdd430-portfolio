/* NOTE:
    Next.js displays this page when a URL does not match an existing route.
    Project routes have their own not-found page for missing projects.
    This page uses the root layout, so the site header and footer remain visible.
*/

/****** IMPORTS ******/
// Link lets visitors navigate back to an existing page.
import Link from "next/link";

/***** The NotFound component *****/
// Show a helpful message and links when the requested page cannot be found.
export default function NotFound() {
    return (
        <div className="mx-auto min-h-[calc(100vh-10rem)] w-[calc(100%-2rem)] max-w-6xl py-[clamp(2.5rem,6vw,5rem)]">
            <section className="max-w-3xl border-2 border-border bg-surface p-[clamp(1.5rem,4vw,2.5rem)] shadow-[4px_4px_0_#090609]">
                <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                    404 / Not found
                </p>
                <h1 className="m-0 text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                    Page not found
                </h1>
                <p className="mb-0 mt-4 text-muted">
                    The page you are looking for does not exist or may have
                    moved.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                    <Link
                        href="/"
                        className="inline-block border-2 border-accent bg-accent px-4 py-3 font-mono text-sm font-bold text-[#fff7f2] shadow-[4px_4px_0_#090609] hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        Back to home
                    </Link>
                    <Link
                        href="/projects"
                        className="font-mono text-sm text-accent-bright underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        Browse projects
                    </Link>
                </div>
            </section>
        </div>
    );
}
