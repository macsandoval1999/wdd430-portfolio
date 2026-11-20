/* NOTE:
    This component displays a single project card with project details and edit/delete actions.
    We can use this component in a component that displays a list of projects, such as ProjectList by mapping over the projects and rendering a ProjectCard for each one.
*/

/**** IMPORTS *****/
// link allows us to navigate between pages in a Next.js application without a full page reload
import Link from "next/link";
// DeleteProjectButton is a component we made that renders a delete button with a confirmation prompt before deletion. It is used here to allow users to delete a project directly from the project card.
import DeleteProjectButton from "./DeleteProjectButton";
// Project type so we can type the props of the ProjectCard component correctly.
import type { Project } from "@/src/lib/projects/projects-types";

/***** The ProjectCard component *****/
// Takes in a Project object as props and renders a card with project details, including title, description, technologies, course, repository link, website link, last updated date, and edit/delete actions.
export default function ProjectCard({
    id,
    last_updated,
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
            {/* Conditional rendering is used to only show the course if it is provided. */}
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
            {/* Conditional rendering is used to only show the website link if a URL is provided. */}
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
                <strong>Last Updated:</strong> {last_updated}
            </p>
            <div className="mt-4 flex items-center gap-5 border-t border-border pt-4">
                <Link
                    href={`/projects/${id}/edit`}
                    aria-label={`Edit ${title}`}
                    className="font-mono text-sm text-accent-bright underline underline-offset-4 hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                >
                    Edit
                </Link>
                {/* Render the delete button while passing the project id and title as props. */}
                <DeleteProjectButton id={id} title={title} />
            </div>
        </article>
    );
}
