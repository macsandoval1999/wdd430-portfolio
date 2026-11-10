import type { ProjectType } from "../../types/projects-types";

const PROJECT_TYPES: readonly ProjectType[] = ["opensource", "school"];

export function isProjectType(value: unknown): value is ProjectType {
    return PROJECT_TYPES.includes(value as ProjectType);
}

// Returns the id as a number only if it is a positive integer (e.g. "12"), otherwise null.
// The function ensures that the project ID is a valid positive integer and within the safe integer range. We use this in scenarios where project IDs are passed as strings, such as from URL parameters. Currently, we are using this in
export function parseProjectId(value: string): number | null {
    if (!/^\d+$/.test(value)) return null;
    const id = Number(value);
    return Number.isSafeInteger(id) && id > 0 ? id : null;
}
