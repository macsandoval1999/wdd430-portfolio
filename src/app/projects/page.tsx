import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ProjectListLoader from "@/src/components/projects/ProjectListLoader";
import SectionLoading from "@/src/components/behaviors/SectionLoading";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Explore Marco Sandoval's school projects and future open-source work.",
};

export default function ProjectsPage() {
    return (
        <>
            <header className="mb-10 border-2 border-border bg-[linear-gradient(135deg,var(--surface-raised),var(--surface))] p-[clamp(1.5rem,5vw,3rem)] shadow-[8px_8px_0_#090609]">
                <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                    Selected work
                </p>
                <h1 className="m-0 text-[clamp(2.25rem,6vw,4rem)] leading-[1.1] text-foreground">
                    Projects
                </h1>
                <p className="mb-0 mt-5 max-w-[44rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                    A selection of my recent work, including projects built
                    through coursework and future contributions beyond it.
                </p>
            </header>

            <section className="mb-12">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                            Recently updated
                        </p>
                        <h2 className="m-0 text-[clamp(1.7rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                            Recent projects
                        </h2>
                    </div>
                    <Link
                        href="/projects/school"
                        className="font-mono text-sm text-accent-bright underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        Browse school projects
                    </Link>
                </div>
                <Suspense
                    fallback={
                        <SectionLoading
                            label="Loading projects..."
                            variant="projects"
                        />
                    }
                >
                    <ProjectListLoader limit={2} />
                </Suspense>
            </section>

            <section className="border-t-2 border-border pt-10">
                <p className="mb-2 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                    Beyond coursework
                </p>
                <h2 className="mb-4 mt-0 text-[clamp(1.7rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                    Open source
                </h2>
                <div className="mb-5 max-w-[42rem]">
                    <Suspense
                        fallback={
                            <SectionLoading
                                label="Loading projects..."
                                variant="projects"
                            />
                        }
                    >
                        <ProjectListLoader
                            type="opensource"
                            emptyState={{
                                title: "Open-source work is on the horizon",
                                description:
                                    "I don’t have public open-source projects to share yet. This section will feature them as I begin contributing to community projects.",
                            }}
                        />
                    </Suspense>
                </div>
                <Link
                    href="/projects/opensource"
                    className="inline-block border-2 border-accent bg-accent px-4 py-[0.65rem] font-mono font-bold text-[#fff7f2] no-underline shadow-[4px_4px_0_#090609] transition duration-150 hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                >
                    Open-source projects
                </Link>
            </section>
        </>
    );
}
