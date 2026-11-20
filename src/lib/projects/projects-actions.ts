/* NOTE:
    This file contains server actions for creating, updating, and deleting projects.
    It validates form data and project IDs, calls the project API, and refreshes the project list after changes.
    The createProject and updateProject actions return validation or operation errors as ProjectFormState objects.
    The deleteProject action throws an error if the project ID is invalid or the project no longer exists.
    Successful create and update operations redirect to the project list.
 */

// use server allows this file to use server actions in Next.js.
"use server";

/****** IMPORTS ******/
// revalidatePath is used to refresh the project list on the frontend after changes.
import { revalidatePath } from "next/cache";
// redirect is used to navigate to a different page after project operations.
import { redirect } from "next/navigation";
// Send project operations to the API routes.
import { fetchProjectsApi } from "./projects-api";
// Import project form schema so that we can validate and parse form data.
import { ProjectFormSchema } from "./projects-schemas";
// import parseProjectId so that we can validate and parse project IDs.
import { parseProjectId } from "./projects-validation";
// Import project form state type for type safety.
import type { ProjectFormState } from "./projects-types";

/****** HELPER FUNCTIONS ******/
// readProjectForm reads and validates project form data using the ProjectFormSchema.
// It returns the parsed data if valid, or the validation errors if invalid.
function readProjectForm(formData: FormData) {
    const raw = {
        title: formData.get("title"),
        description: formData.get("description"),
        type: formData.get("type"),
        technologies: formData.get("technologies"),
        website: formData.get("website"),
        repository: formData.get("repository"),
        course: formData.get("course"),
        lastUpdated: formData.get("lastUpdated"),
    };
    return ProjectFormSchema.safeParse(raw);
}

// refreshProjects triggers a revalidation of the project list on the frontend.
function refreshProjects() {
    revalidatePath("/projects", "layout");
    revalidatePath("/");
}

/****** PROJECT OPERATIONS ******/
// createProject handles the creation of a new project.
// It reads and validates the form data, sends it to the API, and refreshes the frontend state.
export async function createProject(
    _previousState: ProjectFormState,
    formData: FormData
): Promise<ProjectFormState> {
    const parsed = readProjectForm(formData);
    if (!parsed.success) {
        return { errors: parsed.error.issues.map((issue) => issue.message) };
    }

    try {
        const response = await fetchProjectsApi("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
        });
        if (!response.ok) {
            throw new Error(`Project API returned ${response.status}.`);
        }
    } catch (error) {
        console.error("Failed to create project:", error);
        return { errors: ["Unable to save the project. Please try again."] };
    }

    refreshProjects();
    redirect("/projects/all");
}

// updateProject handles the updating of an existing project.
// It reads and validates the form data, sends it to the API, and refreshes the frontend state.
export async function updateProject(
    id: string,
    _previousState: ProjectFormState,
    formData: FormData
): Promise<ProjectFormState> {
    const projectId = parseProjectId(id);
    if (projectId === null || projectId > 2147483647) {
        return { errors: ["Invalid project ID."] };
    }
    const parsed = readProjectForm(formData);
    if (!parsed.success) {
        return { errors: parsed.error.issues.map((issue) => issue.message) };
    }

    try {
        const response = await fetchProjectsApi(`/api/projects/${projectId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
        });
        if (response.status === 404) {
            return { errors: ["This project no longer exists."] };
        }
        if (!response.ok) {
            throw new Error(`Project API returned ${response.status}.`);
        }
    } catch (error) {
        console.error("Failed to update project:", error);
        return { errors: ["Unable to update the project. Please try again."] };
    }
    refreshProjects();
    redirect("/projects/all");
}

// deleteProject handles the deletion of an existing project.
// It validates the project ID, deletes the project through the API, and refreshes the frontend state.
export async function deleteProject(id: string): Promise<void> {
    const projectId = parseProjectId(id);
    if (projectId === null || projectId > 2147483647) {
        throw new Error("Invalid project ID.");
    }

    const response = await fetchProjectsApi(`/api/projects/${projectId}`, {
        method: "DELETE",
    });
    if (response.status === 404) {
        throw new Error("This project no longer exists.");
    }
    if (!response.ok) {
        throw new Error(`Failed to delete project (${response.status}).`);
    }

    refreshProjects();
}
