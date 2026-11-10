// The ProjectList component renders a list of ProjectCard components, passing project data as props.
import ProjectCard from "./ProjectCard";
import type { Project } from "@/src/types/projects-types";

// The ProjectListProps interface defines the expected structure of the projects array.
interface ProjectListProps {
    projects: Project[];
    limit?: number;
    emptyState?: {
        title: string;
        description: string;
    };
}

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
    const displayedProjects =
        limit === undefined ? projects : projects.slice(0, limit);

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
