/* NOTE:
    This component uses client-side JavaScript to show a confirmation prompt before deleting a project.
    The component is eseentially a mini form that has a button. 
    On submission, the user is asked to confirm the deletion. If they cancel, the form submission is prevented; otherwise, the deleteProject action runs.
    This component is added into the projectCard component so each project has a delete button.
 */

// use client so that this component can use hooks like useState and useEffect
"use client";

/***** IMPORTS *****/
// Import the deleteProject function from the projects controllers module so we can add that functionality to the delete button
import { deleteProject } from "@/src/lib/projects/projects-actions";

/***** The DeleteProjectButton component *****/
// Takes in the project id and title as props and renders a delete button with a confirmation prompt before deletion. { id: number, title: string } is the expected shape of the props object.
export default function DeleteProjectButton({
    id,
    title,
}: {
    id: number;
    title: string;
}) {
    // Bind the deleteProject function to the project id so it can be used as the form action
    const action = deleteProject.bind(null, String(id));

    // Render the form with the delete button and handle the confirmation prompt on submit
    // The form will call the action function when submitted, but only if the user confirms the deletion.
    // Below is the JSX for the form and delete button.
    return (
        <form
            action={action}
            onSubmit={(event) => {
                // Show a confirmation prompt before allowing the form submission to proceed.
                // If the user does not confirm...
                if (
                    !window.confirm(`Delete "${title}"? This cannot be undone.`)
                ) {
                    // Prevent the form submission.
                    event.preventDefault();
                }
            }}
        >
            <button
                type="submit"
                aria-label={`Delete ${title}`}
                className="font-mono text-sm text-accent-bright underline underline-offset-4 hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
            >
                Delete
            </button>
        </form>
    );
}
