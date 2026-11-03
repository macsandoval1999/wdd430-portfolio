// The ProjectList component renders a list of ProjectCard components, passing project data as props.
import ProjectCard from "./ProjectCard";
import type { Project } from "./ProjectCard";

// The ProjectListProps interface defines the expected structure of the projects array.
interface ProjectListProps {
    projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    const sortedProjects = [...projects].sort((a, b) => {
        const toTimestamp = (date: string) => {
            const [month, day, year] = date.split("/").map(Number);
            return Date.UTC(year, month - 1, day);
        };

        return toTimestamp(b.lastUpdated) - toTimestamp(a.lastUpdated);
    });

    return (
        <section
            className="grid grid-cols-1 gap-4 min-[641px]:grid-cols-2"
            aria-label="Recent projects"
        >
            {/* The component uses the JavaScript map() method to iterate over the projects array and render a ProjectCard for each project. */}
            {sortedProjects.map((project) => (
                // A unique key is provided for each rendered component using the index of the map iteration. In a real application, you would want to use a more stable identifier (like a project ID) if available.
                // The spread operator ({...project}) is used to pass all project properties as props to the ProjectCard.
                <ProjectCard key={project.title} {...project} />
            ))}
        </section>
    );
}
