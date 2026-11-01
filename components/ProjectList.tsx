// The ProjectList component renders a list of ProjectCard components, passing project data as props.
import ProjectCard from "./ProjectCard";

// The Project interface defines the shape of a single project object, including optional link property.
interface Project {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

// The ProjectListProps interface defines the expected structure of the projects array.
interface ProjectListProps {
    projects: Project[];
}

// Tailwind CSS classes are applied to create a responsive grid layout for the project cards.
export default function ProjectList({ projects }: ProjectListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2">
            {/* The component uses the JavaScript map() method to iterate over the projects array and render a ProjectCard for each project. */}
            {projects.map((project) => (
                // A unique key is provided for each rendered component using the index of the map iteration. In a real application, you would want to use a more stable identifier (like a project ID) if available.
                // The spread operator ({...project}) is used to pass all project properties as props to the ProjectCard.
                <ProjectCard key={project.title} {...project} />
            ))}
        </section>
    );
}
