import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectForm from "@/src/components/projects/ProjectForm";
import SectionLoading from "@/src/components/behaviors/SectionLoading";
import { updateProject } from "@/src/lib/projects/projects-actions";
import { getProjectById } from "@/src/lib/projects/projects-models";
import { parseProjectId } from "@/src/lib/projects/projects-validation";

export const metadata: Metadata = { title: "Edit Project" };

async function EditProjectForm({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    const projectId = parseProjectId(id);
    if (projectId === null || projectId > 2147483647) {
        notFound();
    }
    const project = await getProjectById(projectId);
    if (!project) {
        notFound();
    }

    const action = updateProject.bind(null, id);
    return <ProjectForm action={action} project={project} />;
}

export default function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <>
            <header className="mb-8">
                <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                    Portfolio management
                </p>
                <h1 className="m-0 text-[clamp(2.25rem,6vw,4rem)] leading-[1.1] text-foreground">
                    Edit project
                </h1>
            </header>
            <Suspense
                fallback={
                    <SectionLoading
                        label="Loading project..."
                        variant="projects"
                    />
                }
            >
                <EditProjectForm params={params} />
            </Suspense>
        </>
    );
}
