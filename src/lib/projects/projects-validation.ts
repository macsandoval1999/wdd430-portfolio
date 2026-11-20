/****** IMPORTS ******/
// We import Project-related types so we can use them for type checking and validation within this file.
import type {
    ProjectFilter,
    ProjectOrder,
    ProjectSort,
    ProjectType,
} from "./projects-types";
// We import validation schemas for project-related data to ensure input values conform to expected formats.
import {
    PositiveIntegerSchema,
    ProjectFilterSchema,
    ProjectOrderSchema,
    ProjectSearchQuerySchema,
    ProjectSortSchema,
    ProjectTypeSchema,
} from "./projects-schemas";

/****** CONSTANTS ******/
// Maximum allowed page number for project pagination.
const MAX_PAGE_NUMBER = 1_000_000;

/****** VALIDATION FUNCTIONS ******/
// Check whether an unknown value is a valid project type.
export function isProjectType(value: unknown): value is ProjectType {
    const parsed = ProjectTypeSchema.safeParse(value);
    if (!parsed.success) {
        return false;
    }

    return true;
}

// Clean the search query, or use an empty query for invalid input.
export function parseProjectSearchQuery(value: unknown): string {
    const parsed = ProjectSearchQuerySchema.safeParse(value);
    if (!parsed.success) {
        return "";
    }

    const cleanedValue = parsed.data;

    return cleanedValue;
}

// Default invalid page numbers to 1 and cap valid page numbers.
export function parseProjectPage(value: unknown): number {
    const parsed = PositiveIntegerSchema.safeParse(value);
    if (!parsed.success) {
        return 1;
    }

    const clampedPageNumber = Math.min(parsed.data, MAX_PAGE_NUMBER);

    return clampedPageNumber;
}

// Default invalid filters to all projects.
export function parseProjectFilter(value: unknown): ProjectFilter {
    const parsed = ProjectFilterSchema.safeParse(value);
    if (!parsed.success) {
        return "all";
    }

    return parsed.data;
}

// Default invalid sort options to recently updated.
export function parseProjectSort(value: unknown): ProjectSort {
    const parsed = ProjectSortSchema.safeParse(value);
    if (!parsed.success) {
        return "recently_updated";
    }

    return parsed.data;
}

// Default invalid order options to descending.
export function parseProjectOrder(value: unknown): ProjectOrder {
    const parsed = ProjectOrderSchema.safeParse(value);
    if (!parsed.success) {
        return "desc";
    }

    return parsed.data;
}

// Return null for an invalid project ID.
export function parseProjectId(value: string): number | null {
    const parsed = PositiveIntegerSchema.safeParse(value);
    if (!parsed.success) {
        return null;
    }

    return parsed.data;
}
