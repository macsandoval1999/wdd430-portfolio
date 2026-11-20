/* NOTE:
    Next.js renders this page when a project route calls notFound().
    For example, the edit page calls notFound() for an invalid ID or a missing project.
    The projects error.tsx handles unexpected errors instead of missing projects.
*/

/****** IMPORTS ******/
// Link lets the user return to the projects overview.
import Link from "next/link";

/***** The ProjectNotFound component *****/
// Show a friendly message and a way back when the requested project cannot be found.
export default function ProjectNotFound() {
    return (
        <section className="max-w-3xl border-2 border-border bg-surface p-[clamp(1.5rem,4vw,2.5rem)] shadow-[4px_4px_0_#090609]">
            <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                Not found
            </p>
            <h1 className="m-0 text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                Project not found
            </h1>
            <p className="mb-0 mt-4 text-muted">
                The project you are looking for does not exist or is no longer
                available.
            </p>
            <Link
                href="/projects"
                className="mt-6 inline-block border-2 border-accent bg-accent px-4 py-3 font-mono text-sm font-bold text-[#fff7f2] shadow-[4px_4px_0_#090609] hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
            >
                Back to projects
            </Link>
        </section>
    );
}
