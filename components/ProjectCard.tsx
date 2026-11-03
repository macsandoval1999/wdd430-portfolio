export interface Project {
    lastUpdated: string;
    title: string;
    description: string;
    technologies: string[];
    repository?: string;
    website?: string;
    course?: string;
}

// The component uses destructuring to access props directly in the function parameters.
export default function ProjectCard({
    lastUpdated,
    title,
    description,
    technologies,
    repository,
    website,
    course,
}: Project) {
    return (
        <article className="flex h-full min-w-0 flex-col border-2 border-l-[5px] border-border border-l-accent bg-surface p-[1.4rem] shadow-[4px_4px_0_#090609] transition duration-200 ease-out hover:-translate-y-1 hover:border-accent-bright hover:shadow-[6px_6px_0_#090609] motion-reduce:transition-none [&_strong]:text-foreground">
            <h3 className="mb-[0.65rem] mt-0 text-[1.35rem] leading-[1.3] text-foreground">
                {title}
            </h3>
            <p className="my-[0.6rem] text-muted">{description}</p>
            <p className="my-[0.6rem] font-mono text-[0.85rem] text-muted">
                <strong>Technologies:</strong> {technologies.join(", ")}
            </p>
            {course && (
                <p className="my-[0.6rem]">
                    <strong>Course:</strong> {course}
                </p>
            )}
            {/* Conditional rendering is used to only show the project link if a URL is provided. */}
            {repository && (
                <p className="my-[0.6rem]">
                    {/* Use an HTML <a> element for external URLs (like GitHub). Use Next.js Link for internal routes within your app. */}
                    <a
                        href={repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-bright [text-decoration-thickness:1px] underline-offset-[0.2em] transition-colors duration-150 hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        View Repository
                    </a>
                </p>
            )}
            {website && (
                <p className="my-[0.6rem]">
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-bright [text-decoration-thickness:1px] underline-offset-[0.2em] transition-colors duration-150 hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        View Website
                    </a>
                </p>
            )}
            <p className="mt-auto w-full pt-4 text-right font-mono text-[0.8rem] text-muted">
                <strong>Last Updated:</strong> {lastUpdated}
            </p>
        </article>
    );
}
