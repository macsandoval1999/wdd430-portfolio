/* NOTE:
    This file contains server actions for creating, updating, and deleting projects.
    It validates form data and project IDs, calls the backend project functions, and refreshes the project list after changes.
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
// Import backend functions for project operations.
import {
    deleteProjectById,
    insertProject,
    updateProjectById,
} from "./projects-models";
// Import project form schema so that we can validate and parse form data.
import { ProjectFormSchema } from "./projects-schemas";
// import parseProjectId so that we can validate and parse project IDs.
import { parseProjectId } from "./projects-validation";
// Import project form state type for type safety.
import type { ProjectFormState } from "@/src/lib/projects/projects-types";



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
// It reads and validates the form data, inserts the project into the backend, and refreshes the frontend state.
export async function createProject(
    _previousState: ProjectFormState,
    formData: FormData
): Promise<ProjectFormState> {
    const parsed = readProjectForm(formData);
    if (!parsed.success) {
        return { errors: parsed.error.issues.map((issue) => issue.message) };
    }

    try {
        await insertProject(parsed.data);
    } catch (error) {
        console.error("Failed to create project:", error);
        return { errors: ["Unable to save the project. Please try again."] };
    }

    refreshProjects();
    redirect("/projects/all");
}

// updateProject handles the updating of an existing project.
// It reads and validates the form data, updates the project in the backend, and refreshes the frontend state.
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

    let updated = false;
    try {
        updated = await updateProjectById(projectId, parsed.data);
    } catch (error) {
        console.error("Failed to update project:", error);
        return { errors: ["Unable to update the project. Please try again."] };
    }
    if (!updated) {
        return { errors: ["This project no longer exists."] };
    }

    refreshProjects();
    redirect("/projects/all");
}

// deleteProject handles the deletion of an existing project.
// It validates the project ID, deletes the project from the backend, and refreshes the frontend state.
export async function deleteProject(id: string): Promise<void> {
    const projectId = parseProjectId(id);
    if (projectId === null || projectId > 2147483647) {
        throw new Error("Invalid project ID.");
    }

    const deleted = await deleteProjectById(projectId);
    if (!deleted) {
        throw new Error("This project no longer exists.");
    }

    refreshProjects();
}
