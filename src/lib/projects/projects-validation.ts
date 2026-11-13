// First, we import the necessary types for project validation. These types define the structure and allowed values for project filters, sort options, order options, and project types.
import type {
    ProjectFilter,
    ProjectOrder,
    ProjectSort,
    ProjectType,
} from "../../types/projects-types";



// These are runtime constants used for project validation. They define the allowed project types, sort options, order options, and limits for search length and page number.
const PROJECT_TYPES: readonly ProjectType[] = ["opensource", "school"];
const PROJECT_SORTS: readonly ProjectSort[] = ["recently_updated", "title"];
const PROJECT_ORDERS: readonly ProjectOrder[] = ["asc", "desc"];
const MAX_SEARCH_LENGTH = 100;
const MAX_PAGE_NUMBER = 1_000_000;



// Validate if the given value is a valid project type. Returns true if it is, false otherwise.
// Takes an unknown value and checks if it is a valid project type.
// Returns true if the value is a valid project type, false otherwise.
export function isProjectType(value: unknown): value is ProjectType {
    if (!PROJECT_TYPES.includes(value as ProjectType)){
        return false;
    }

    return true;
}



// Parse and clean the project search query.
// Takes an unknown value and returns string.
// Returns a cleaned-up search query string if the input is valid, otherwise returns an empty string.
export function parseProjectSearchQuery(value: unknown): string {
    if (typeof value !== "string") {
        return "";
    }

    const cleanedValue = value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, MAX_SEARCH_LENGTH);

    return cleanedValue;
}



// Parse and validate the project page number.
// Takes an unknown value and returns a number.
// Returns the page number if it is a string and a valid positive integer, otherwise returns 1.
export function parseProjectPage(value: unknown): number {
    if (typeof value !== "string" || !/^\d+$/.test(value)) {
        return 1;
    }

    const pageNumber = Number(value);

    if (!Number.isSafeInteger(pageNumber) || pageNumber <= 0) {
        return 1;
    }
    // clamped means we limit the page number to the maximum allowed value.
    const clampedPageNumber = Math.min(pageNumber, MAX_PAGE_NUMBER);

    return clampedPageNumber;
}



// Parse and validate the project filter.
// Takes an unknown value and returns a ProjectFilter.
// Returns the project filter if it is a string and a valid project type, otherwise returns "all".
export function parseProjectFilter(value: unknown): ProjectFilter {
    if (value === "all") {
        return "all";
    }
    if (typeof value !== "string" || !isProjectType(value)) {
        return "all";
    }

    return value;
}



// Parse and validate the project sort option.
// Takes an unknown value and returns a ProjectSort.
// Returns the project sort option if it is a string and a valid sort option, otherwise returns "recently_updated".
export function parseProjectSort(value: unknown): ProjectSort {
    if (typeof value !== "string" || !PROJECT_SORTS.includes(value as ProjectSort)) {
        return "recently_updated";
    }

    return value as ProjectSort;
}



// Parse and validate the project order option.
// Takes an unknown value and returns a ProjectOrder.
// Returns the project order option if it is a string and a valid order option, otherwise returns "desc".
export function parseProjectOrder(value: unknown): ProjectOrder {
    if (typeof value !== "string" || !PROJECT_ORDERS.includes(value as ProjectOrder)) {
        return "desc";
    }

    return value as ProjectOrder;
}



// Parse and validate the project ID.
// Takes a string value and returns a number or null.
// Returns the project ID as a number if it is a valid positive integer, otherwise returns null.
export function parseProjectId(value: string): number | null {
    if (!/^\d+$/.test(value)) {
        return null;
    }

    const id = Number(value);
    if (!Number.isSafeInteger(id) || id <= 0) {
        return null;
    }

    return id;
}
