// This component can be reused for multiple projects by passing different prop values.

// The ProjectCardProps interface defines the expected props for the component, providing type safety and documentation.
interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

// The component uses destructuring to access props directly in the function parameters.
export default function ProjectCard({
    title,
    description,
    technologies,
    link,
}: ProjectCardProps) {
    return (
        // Tailwind CSS classes are applied for styling, including padding, borders, background color, and typography.
        <article className="p-4 border-l-4 border-blue-600 bg-gray-50 rounded">
            <h3 className="text-xl text-gray-900 font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-3">{description}</p>
            <p className="text-sm text-gray-600">
                <strong>Technologies:</strong> {technologies.join(", ")}
            </p>
            {/* Conditional rendering is used to only show the project link if a URL is provided. */}
            {link && (
                <p className="mt-2">
                    {/* Use an HTML <a> element for external URLs (like GitHub). Use Next.js Link for internal routes within your app. */}
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        View Project
                    </a>
                </p>
            )}
        </article>
    );
}
