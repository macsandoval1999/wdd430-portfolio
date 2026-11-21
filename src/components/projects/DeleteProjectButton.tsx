/* NOTE:
    This component shows a confirmation dialog before deleting a project.
    The dialog can be closed with Cancel, the X button, Escape, or a click outside the box.
    Only the confirmation button submits the form and runs the deleteProject action.
    The native modal dialog keeps keyboard focus inside it and returns focus when it closes.
    ProjectCard uses this component to give each project its own delete button.
 */

// This component needs client-side JavaScript to open and close the dialog.
"use client";

/***** IMPORTS *****/
// useRef gives us access to the dialog and its cancel button.
import { useRef } from "react";
// deleteProject is the server action that removes the selected project.
import { deleteProject } from "@/src/lib/projects/projects-actions";

/***** The DeleteProjectButton component *****/
// Takes the project ID and title so the dialog can confirm which project will be deleted.
export default function DeleteProjectButton({
    id,
    title,
}: {
    id: number;
    title: string;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);
    // Bind the project ID to the server action used by the confirmation form.
    const action = deleteProject.bind(null, String(id));

    // showModal makes the rest of the page inert until the dialog closes.
    function openDialog() {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
        if (cancelButtonRef.current) {
            cancelButtonRef.current.focus();
        }
    }

    function closeDialog() {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={openDialog}
                aria-label={`Delete ${title}`}
                className="font-mono text-sm text-accent-bright underline underline-offset-4 hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
            >
                Delete
            </button>
            <dialog
                ref={dialogRef}
                aria-labelledby={`delete-title-${id}`}
                aria-describedby={`delete-description-${id}`}
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        event.preventDefault();
                        event.stopPropagation();
                        closeDialog();
                    }
                }}
                onClick={(event) => {
                    // A backdrop click targets the dialog, but must also fall outside its box.
                    if (event.target === event.currentTarget) {
                        const bounds = event.currentTarget.getBoundingClientRect();
                        if (
                            event.clientX < bounds.left ||
                            event.clientX > bounds.right ||
                            event.clientY < bounds.top ||
                            event.clientY > bounds.bottom
                        ) {
                            closeDialog();
                        }
                    }
                }}
                className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto border-2 border-accent bg-surface p-0 text-foreground shadow-[6px_6px_0_#090609] backdrop:bg-black/75"
            >
                <div className="p-[clamp(1.5rem,4vw,2rem)]">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="mb-2 mt-0 font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-bright">
                                Confirm deletion
                            </p>
                            <h2 id={`delete-title-${id}`} className="m-0 text-2xl leading-tight">
                                Delete project?
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={closeDialog}
                            aria-label="Close delete confirmation"
                            className="flex h-11 w-11 shrink-0 items-center justify-center border border-border font-mono text-2xl text-foreground hover:border-accent-bright hover:text-accent-bright focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <p id={`delete-description-${id}`} className="mb-0 mt-4 text-muted">
                        Delete &quot;{title}&quot;? This cannot be undone.
                    </p>
                    <form action={action} className="mt-6 flex flex-wrap items-center gap-5">
                        <button
                            ref={cancelButtonRef}
                            type="button"
                            onClick={closeDialog}
                            className="border-2 border-border px-4 py-3 font-mono text-sm font-bold text-foreground hover:border-accent-bright focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="border-2 border-accent bg-accent px-4 py-3 font-mono text-sm font-bold text-[#fff7f2] shadow-[4px_4px_0_#090609] hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                        >
                            Delete project
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
}
