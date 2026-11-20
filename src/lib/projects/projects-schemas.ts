/***** Imports *****/
// z is a schema validation library used to define and validate the structure of project-related data.
import { z } from "zod";
// ProjectOrder, ProjectSort, and ProjectType are TypeScript types we made so we can use them to type the project-related constants and schemas.
import type { ProjectOrder, ProjectSort, ProjectType } from "./projects-types";



/***** Constants *****/
// PROJECT_TYPES will be used to define the valid project types.
// the as const satisfies readonly ProjectType[] ensures that the array is treated as a tuple of literal types and satisfies the ProjectType array type.
const PROJECT_TYPES = [
    "opensource",
    "school",
] as const satisfies readonly ProjectType[];
// PROJECT_SORTS will be used to define the valid project sort options.
const PROJECT_SORTS = [
    "recently_updated",
    "title",
] as const satisfies readonly ProjectSort[];
// PROJECT_ORDERS will be used to define the valid project order options.
const PROJECT_ORDERS = [
    "asc",
    "desc",
] as const satisfies readonly ProjectOrder[];
// MAX_SEARCH_LENGTH defines the maximum length for the project search query.
const MAX_SEARCH_LENGTH = 100;



/***** Schemas *****/
// ProjectTypeSchema defines the valid project types.
export const ProjectTypeSchema = z.enum(PROJECT_TYPES);

// ProjectFilterSchema defines the valid project filter options, including "all" and the project types.
export const ProjectFilterSchema = z.enum(["all", ...PROJECT_TYPES]);

// ProjectSortSchema defines the valid project sort options.
export const ProjectSortSchema = z.enum(PROJECT_SORTS);

// ProjectOrderSchema defines the valid project order options.
export const ProjectOrderSchema = z.enum(PROJECT_ORDERS);

// ProjectSearchQuerySchema defines the schema for the project search query, ensuring it is a string, removing control characters, trimming whitespace, and limiting its length.
export const ProjectSearchQuerySchema = z.string().transform((value) =>
    value
        .replace(/[\u0000-\u001f\u007f]/g, "")
        .trim()
        .slice(0, MAX_SEARCH_LENGTH)
);

// PositiveIntegerSchema defines the schema for a positive integer, ensuring it is a string of digits, transforming it to a number, and validating it is a safe positive integer.
export const PositiveIntegerSchema = z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((value) => Number.isSafeInteger(value) && value > 0);

// optionalUrl defines the schema for an optional URL, ensuring it is a valid HTTP or HTTPS URL if provided.
const optionalUrl = z
    .string()
    .trim()
    .max(500)
    .refine((value) => {
        if (value === "") {
            return true;
        }

        try {
            const url = new URL(value);
            if (url.protocol !== "http:" && url.protocol !== "https:") {
                return false;
            }
            return true;
        } catch {
            return false;
        }
    }, "Enter a valid HTTP or HTTPS URL.");

// ProjectFormSchema defines the schema for the project form.
export const ProjectFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Title must have at least 2 characters.")
        .max(255),
    description: z
        .string()
        .trim()
        .min(10, "Description must have at least 10 characters.")
        .max(10000),
    type: z.enum(PROJECT_TYPES, { error: "Select a valid project type." }),
    technologies: z
        .string()
        .trim()
        .min(2, "Enter at least one technology.")
        .max(2000)
        .refine(
            (value) => value.split(",").some((item) => item.trim().length > 0),
            "Enter at least one technology."
        ),
    website: optionalUrl,
    repository: optionalUrl,
    course: z.string().trim().max(255),
    lastUpdated: z
        .string()
        .trim()
        .regex(
            /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/,
            "Enter a date in MM/DD/YYYY format."
        )
        .refine((value) => {
            const [month, day, year] = value.split("/").map(Number);
            const date = new Date(0);
            date.setUTCFullYear(year, month - 1, day);
            return (
                year > 0 &&
                date.getUTCFullYear() === year &&
                date.getUTCMonth() === month - 1 &&
                date.getUTCDate() === day
            );
        }, "Enter a valid calendar date."),
});

export type ProjectFormInput = z.infer<typeof ProjectFormSchema>;
