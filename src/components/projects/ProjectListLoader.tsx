import ProjectList from "./ProjectList";
import { getAllProjects } from "@/src/lib/projects/projects-db";
import type { ProjectType } from "@/src/types/projects-types";

interface ProjectListLoaderProps {
    type?: ProjectType;
    limit?: number;
    emptyState?: {
        title: string;
        description: string;
    };
}

// Async Server Component: fetches projects from the database, so wrap it in <Suspense> where it is used.
export default async function ProjectListLoader({
    type,
    limit,
    emptyState,
}: ProjectListLoaderProps) {
    const projects = await getAllProjects(type);
    return <ProjectList projects={projects} limit={limit} emptyState={emptyState} />;
}
