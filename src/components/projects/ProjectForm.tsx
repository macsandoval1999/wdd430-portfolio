/* NOTE:
    This reusableclient component renders the project form and keeps its field values in sync with user input.
    The server action handles submission and returns validation errors, which this component displays above the form.
    An optional project supplies the initial values for editing; without one, the form starts with empty fields and the school project type.
    This component is used for both creating and editing projects, with the optional project prop determining the initial field values.
    In the create flow, the form starts with empty fields and the school project type.
    In the edit flow, the form is prefilled with the selected project's values by initializing the form state from the project prop.
*/

// This component uses client-side state to keep the form fields in sync with user input.
"use client";

/****** IMPORTS ******/
// useActionState manages form submission state, and useState keeps field values in sync with user input.
import { useActionState, useState } from "react";
// Link is used to navigate back to the projects list.
import Link from "next/link";
// Project and ProjectFormState provide the project data and form state types so the form props and submission state are type-safe.
import type { Project, ProjectFormState, ProjectFormInput } from "@/src/lib/projects/projects-types";

/****** INTERFACES *******/
// ProjectFormProps defines the server action and optional project data required by the form.
interface ProjectFormProps {
    action: (
        state: ProjectFormState,
        formData: FormData
    ) => Promise<ProjectFormState>;
    project?: Project;
}

/****** CONSTANTS ******/
// Shared class names keep the form fields and labels styled consistently.
const fieldClassName =
    "mt-2 w-full border-2 border-border bg-surface px-4 py-3 text-foreground focus:border-accent-bright focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-bright";
const labelClassName = "block font-mono text-sm font-bold text-foreground";
const fieldLabels: Record<string, string> = {
    title: "Title",
    description: "Description",
    type: "Project type",
    technologies: "Technologies",
    website: "Website URL",
    repository: "Repository URL",
    course: "Course",
    lastUpdated: "Last updated",
};

/***** The ProjectForm Component ******/
// The form initializes its fields from the optional project and displays validation errors returned by the server action. It takes an action prop for form submission and an optional project prop for editing existing projects.
export default function ProjectForm({ action, project }: ProjectFormProps) {
    // state holds the server action's validation errors and the pending submission status.
    // formAction is a React function supplied by useActionState and passed to the form's action prop to handle submissions. It updates state with the result of the action.
    // pending will be true while the form submission is in progress.
    const [state, formAction, pending] = useActionState(action, { errors: [] });

    // values holds the current form field values, initialized from the project when editing.
    // setValues will be the function used to update the form field values.
    // we set the initial field values from the project when editing, or use empty strings for a new project if no project is provided.
    const [values, setValues] = useState({
        title: project?.title ?? "",
        description: project?.description ?? "",
        type: project?.type ?? "school",
        technologies: project?.technologies.join(", ") ?? "",
        website: project?.website ?? "",
        repository: project?.repository ?? "",
        course: project?.course ?? "",
        lastUpdated: project?.last_updated ?? "",
    });

    // We then define a helper function to update a field's value in the form state.
    // name identifies the field to update, and value is the new field value.
    // this function preserves the other field values while updating the specified field.
    function updateField(name: string, value: string) {
        setValues((current) => ({ ...current, [name]: value }));
    }

    // Link each invalid field to its own messages in the error summary.
    function getFieldErrorProps(field: keyof ProjectFormInput) {
        const errors = state.fieldErrors?.[field];
        if (!errors || errors.length === 0) {
            return {};
        }

        return {
            "aria-invalid": true,
            "aria-describedby": errors.map((_, index) => `${field}-error-${index}`).join(" "),
        };
    }

    const fieldErrors = Object.entries(state.fieldErrors ?? {});
    const hasErrors = state.errors.length > 0 ||
        fieldErrors.some(([, errors]) => errors && errors.length > 0);

    // We then define the submit button label
    let submitLabel = "Save project";
    // If the form is submitting, update the label to indicate that saving is in progress.
    if (pending) {
        submitLabel = "Saving...";
    }

    // We then render the form with the current values whether empty or pre-filled from the project, and any validation errors.
    return (
        // The form submits through formAction and displays validation errors when present.
        <form
            action={formAction}
            className="max-w-3xl space-y-5 border-2 border-border bg-surface p-[clamp(1.5rem,4vw,2.5rem)] shadow-[4px_4px_0_#090609]"
        >
            {/* Keep the live region mounted so screen readers announce new errors politely. */}
            <div aria-live="polite" aria-atomic="true">
                {hasErrors && (
                    <div className="border-2 border-accent bg-surface-raised p-4 text-foreground">
                        <p className="mt-0 font-bold">
                            Please check your submission:
                        </p>
                        <ul className="mb-0">
                            {state.errors.map((error, index) => (
                                <li key={`${index}-${error}`}>{error}</li>
                            ))}
                            {fieldErrors.flatMap(([field, errors]) =>
                                (errors ?? []).map((error, index) => (
                                    <li id={`${field}-error-${index}`} key={`${field}-${index}`}>
                                        {fieldLabels[field] ?? field}: {error}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <label className={labelClassName} htmlFor="title">
                Title
                <input
                    id="title"
                    name="title"
                    {...getFieldErrorProps("title")}
                    required
                    minLength={2}
                    maxLength={255}
                    value={values.title}
                    onChange={(event) =>
                        updateField("title", event.target.value)
                    }
                    className={fieldClassName}
                />
            </label>
            <label className={labelClassName} htmlFor="description">
                Description
                <textarea
                    id="description"
                    name="description"
                    {...getFieldErrorProps("description")}
                    required
                    minLength={10}
                    maxLength={10000}
                    rows={5}
                    value={values.description}
                    onChange={(event) =>
                        updateField("description", event.target.value)
                    }
                    className={fieldClassName}
                />
            </label>
            <label className={labelClassName} htmlFor="type">
                Project type
                <select
                    id="type"
                    name="type"
                    {...getFieldErrorProps("type")}
                    value={values.type}
                    onChange={(event) =>
                        updateField("type", event.target.value)
                    }
                    className={fieldClassName}
                >
                    <option value="school">School</option>
                    <option value="opensource">Open source</option>
                </select>
            </label>
            <label className={labelClassName} htmlFor="technologies">
                Technologies (comma-separated)
                <input
                    id="technologies"
                    name="technologies"
                    {...getFieldErrorProps("technologies")}
                    required
                    minLength={2}
                    maxLength={2000}
                    value={values.technologies}
                    onChange={(event) =>
                        updateField("technologies", event.target.value)
                    }
                    className={fieldClassName}
                />
            </label>
            <label className={labelClassName} htmlFor="website">
                Website URL (optional)
                <input
                    id="website"
                    name="website"
                    {...getFieldErrorProps("website")}
                    type="url"
                    maxLength={500}
                    value={values.website}
                    onChange={(event) =>
                        updateField("website", event.target.value)
                    }
                    className={fieldClassName}
                />
            </label>
            <label className={labelClassName} htmlFor="repository">
                Repository URL (optional)
                <input
                    id="repository"
                    name="repository"
                    {...getFieldErrorProps("repository")}
                    type="url"
                    maxLength={500}
                    value={values.repository}
                    onChange={(event) =>
                        updateField("repository", event.target.value)
                    }
                    className={fieldClassName}
                />
            </label>
            <label className={labelClassName} htmlFor="course">
                Course (optional)
                <input
                    id="course"
                    name="course"
                    {...getFieldErrorProps("course")}
                    maxLength={255}
                    value={values.course}
                    onChange={(event) =>
                        updateField("course", event.target.value)
                    }
                    className={fieldClassName}
                />
            </label>
            <label className={labelClassName} htmlFor="lastUpdated">
                Last updated (MM/DD/YYYY)
                <input
                    id="lastUpdated"
                    name="lastUpdated"
                    {...getFieldErrorProps("lastUpdated")}
                    required
                    maxLength={10}
                    pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}"
                    placeholder="MM/DD/YYYY"
                    value={values.lastUpdated}
                    onChange={(event) =>
                        updateField("lastUpdated", event.target.value)
                    }
                    className={fieldClassName}
                />
            </label>
            <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                    type="submit"
                    disabled={pending}
                    className="border-2 border-accent bg-accent px-4 py-3 font-mono font-bold text-[#fff7f2] shadow-[4px_4px_0_#090609] hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright disabled:cursor-wait disabled:opacity-60"
                >
                    {submitLabel}
                </button>
                <Link
                    href="/projects/all"
                    className="font-mono text-sm text-accent-bright underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
