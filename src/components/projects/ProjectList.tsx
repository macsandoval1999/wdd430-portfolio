/* NOTE:
    This component displays a list of projects using ProjectCard components.
    It can limit the number of projects displayed and shows an empty state message when there are no projects to display.
    We use this component in our ProjectResults component to display the full list of projects after filtering and sorting the projects. Keep in mind, this component does not handle filtering or sorting; it only displays the projects it receives after those operations have been applied in other components.
    In summary, this component is responsible for rendering a list of projects and an empty state, not for filtering or sorting the projects.
*/

/***** Imports *****/
// ProjectCard is a component we made that displays individual project details in a card format.
import ProjectCard from "./ProjectCard";
// Project type so we can type the props of the ProjectList component correctly.
import type { Project } from "@/src/lib/projects/projects-types";

/***** Interface *****/
// The ProjectListProps interface defines the expected structure of the props for the ProjectList component.
// This is used to type the props of the ProjectList component.
// It includes an array of projects, an optional limit on the number of projects to display, and an optional empty state message.
// With this interface, we are essentially saying that the ProjectList component expects an array of projects, and optionally a limit and an empty state message.
interface ProjectListProps {
    projects: Project[];
    limit?: number;
    emptyState?: {
        title: string;
        description: string;
    };
}

/***** The ProjectList component *****/
// Renders a list of ProjectCard components, passing project data as props.
// If a limit is specified, only that number of projects will be displayed.
// If there are no projects to display, it shows an empty state message.
export default function ProjectList({
    projects,
    limit,
    emptyState = {
        title: "New projects are on the way",
        description:
            "There are no projects to share here just yet. Please check back soon for updates.",
    },
}: ProjectListProps) {
    // Projects arrive already sorted by most recently updated from the database.
    let displayedProjects = projects;
    // if a limit is specified, slice the array to only include that number of projects
    if (limit !== undefined) {
        displayedProjects = projects.slice(0, limit);
    }

    // if there are no projects to display after applying the limit, show the empty state
    if (displayedProjects.length === 0) {
        return (
            <section
                className="border-2 border-border bg-surface p-[clamp(1.5rem,4vw,2.5rem)] shadow-[4px_4px_0_#090609]"
                aria-label="Projects"
                role="status"
            >
                <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                    Coming soon
                </p>
                <h2 className="m-0 text-[clamp(1.5rem,4vw,2rem)] leading-[1.2] text-foreground">
                    {emptyState.title}
                </h2>
                <p className="mb-0 mt-4 max-w-[42rem] text-muted">
                    {emptyState.description}
                </p>
            </section>
        );
    }

    // Otherwise, render the list of projects
    return (
        <section
            className="grid grid-cols-1 gap-4 min-[641px]:grid-cols-2"
            aria-label="Projects"
        >
            {displayedProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
            ))}
        </section>
    );
}
