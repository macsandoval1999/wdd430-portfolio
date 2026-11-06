import type { Metadata } from "next";
import ProjectList from "@/src/components/projects/ProjectList";

export const metadata: Metadata = {
    title: "Open Source Projects",
    description:
        "Open-source projects and community contributions by Marco Sandoval.",
};

export default function OpenSourceProjectsPage() {
    return (
        <>
            <header className="mb-8">
                <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                    Community work
                </p>
                <h1 className="m-0 text-[clamp(2.25rem,6vw,4rem)] leading-[1.1] text-foreground">
                    Open source
                </h1>
                <p className="mb-0 mt-5 max-w-[44rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                    This space is for projects and contributions made in
                    collaboration with the open-source community.
                </p>
            </header>
            <ProjectList
                projects={[]}
                emptyState={{
                    title: "My open-source portfolio is just getting started",
                    description:
                        "I don’t have public open-source projects to share yet. Check back later for updates as I begin contributing to community projects.",
                }}
            />
        </>
    );
}