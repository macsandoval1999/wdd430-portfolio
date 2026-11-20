import type { Metadata } from "next";
import ProjectForm from "@/src/components/projects/ProjectForm";
import { createProject } from "@/src/lib/projects/projects-actions";

export const metadata: Metadata = { title: "Create Project" };

export default function CreateProjectPage() {
    return (
        <>
            <header className="mb-8">
                <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                    Portfolio management
                </p>
                <h1 className="m-0 text-[clamp(2.25rem,6vw,4rem)] leading-[1.1] text-foreground">
                    Create project
                </h1>
            </header>
            <ProjectForm action={createProject} />
        </>
    );
}
