import { Suspense } from "react";
import type { Metadata } from "next";
import ProjectResultsLoader from "@/src/components/projects/ProjectResultsLoader";
import ProjectSearchLoader from "@/src/components/projects/ProjectSearchLoader";
import SectionLoading from "@/src/components/behaviors/SectionLoading";

export const metadata: Metadata = {
    title: "All Projects",
    description:
        "Search, filter, and browse all school and open-source projects by Marco Sandoval.",
};

export default async function AllProjectsPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    return (
        <>
            <header className="mb-8">
                <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                    Browse the portfolio
                </p>
                <h1 className="m-0 text-[clamp(2.25rem,6vw,4rem)] leading-[1.1] text-foreground">
                    All projects
                </h1>
                <p className="mb-0 mt-5 max-w-[44rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                    Search and explore school projects and open-source work.
                    Use the filters to find projects by type or sort them to
                    your preference.
                </p>
            </header>
            <Suspense
                fallback={
                    <div
                        aria-hidden="true"
                        className="mb-6 h-36 border-2 border-border bg-surface motion-safe:animate-pulse"
                    />
                }
            >
                <ProjectSearchLoader
                    searchParams={searchParams}
                    showBrowseFilters
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
                    pathname="/projects/all"
                    searchParams={searchParams}
                />
            </Suspense>
        </>
    );
}
