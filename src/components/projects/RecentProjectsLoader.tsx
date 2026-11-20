/* NOTE:
    This component fetches projects from the database and passes them to ProjectList for display. 
    This essentially does what the ProjectResults component does, but without pagination or search and filtering. 
    It can be used to dislay all, but it is intended to show only a limited number of recent projects.
    Its purpose is to display a limited preview of projects, not a paginated list.
    In the Home and Projects main page, this component is used to display a limited preview of recent projects.
 */


/****** IMPORTS *****/
// ProjectList is a component we made that displays a list of projects.
import ProjectList from "./ProjectList";
// getAllProjects is a function that fetches all projects from the database, optionally filtered by type.
import { getAllProjects } from "@/src/lib/projects/projects-models";
import type { ProjectType } from "@/src/lib/projects/projects-types";

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
    return (
        <ProjectList
            projects={projects}
            limit={limit}
            emptyState={emptyState}
        />
    );
}
