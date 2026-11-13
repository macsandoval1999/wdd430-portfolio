import { Suspense } from "react";
import type { Metadata } from "next";
import ProjectResultsLoader from "@/src/components/projects/ProjectResultsLoader";
import ProjectSearchLoader from "@/src/components/projects/ProjectSearchLoader";
import SectionLoading from "@/src/components/behaviors/SectionLoading";

export const metadata: Metadata = {
    title: "School Projects",
    description:
        "Projects Marco Sandoval has built as part of his software development coursework.",
};

export default async function SchoolProjectsPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    return (
        <>
            <header className="mb-8">
                <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                    Coursework
                </p>
                <h1 className="m-0 text-[clamp(2.25rem,6vw,4rem)] leading-[1.1] text-foreground">
                    School projects
                </h1>
                <p className="mb-0 mt-5 max-w-[44rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                    These projects were created as part of my coursework and
                    gave me hands-on practice with frontend development, backend
                    systems, APIs, and databases.
                </p>
            </header>
            <Suspense
                fallback={
                    <div
                        aria-hidden="true"
                        className="mb-6 h-[5.5rem] border-2 border-border bg-surface motion-safe:animate-pulse"
                    />
                }
            >
                <ProjectSearchLoader
                    searchParams={searchParams}
                    fixedType="school"
                />
            </Suspense>
            <Suspense
                fallback={
                    <SectionLoading
                        label="Loading projects..."
                        variant="projects"
                    />
                }
            >
                <ProjectResultsLoader
                    pathname="/projects/school"
                    searchParams={searchParams}
                    fixedType="school"
                />
            </Suspense>
        </>
    );
}
