/**
 * Backend functions for handling project data.
 * This includes fetching, filtering, and paginating projects from the database. The functions here interact with the database using SQL queries
 */

/****** IMPORTS ******/
// We import Project-related types so that TypeScript can enforce type safety for project data.
import type {
    Project,
    ProjectFilter,
    ProjectFormInput,
    ProjectOrder,
    ProjectSort,
    ProjectType,
} from "../projects-types";
// We import the SQL client from Vercel Postgres to interact with the database.
import { sql } from "@vercel/postgres";

/****** INTERFACES ******/
// Interface for search options when querying projects. Includes optional type, sort, and order fields. We define the interface to structure the search options consistently.
interface ProjectSearchOptions {
    type?: ProjectFilter;
    sort?: ProjectSort;
    order?: ProjectOrder;
}

/****** CONSTANTS ******/
// Number of projects to display per page in paginated queries. This helps control the amount of data fetched and displayed at once.
export const PROJECTS_PER_PAGE = 6;

/****** HELPER FUNCTIONS ******/
// Create a search pattern for SQL ILIKE queries, escaping special characters.
function createSearchPattern(query: string): string {
    const escapedQuery = query.replace(/[!%_]/g, "!$&");
    return `%${escapedQuery}%`;
}
// Build the project filter object containing the search pattern and type.
function buildProjectFilter(query: string, type: ProjectFilter) {
    const searchPattern = createSearchPattern(query);
    return { searchPattern, type };
}

/****** DATABASE FUNCTIONS ******/
// Function to get filtered projects based on search query, pagination, and search options. Returns an array of Project objects.
export async function getFilteredProjects(
    query: string,
    currentPage: number,
    {
        type = "all",
        sort = "recently_updated",
        order = "desc",
    }: ProjectSearchOptions = {}
): Promise<Project[]> {
    const offset = (currentPage - 1) * PROJECTS_PER_PAGE;
    const { searchPattern, type: projectType } = buildProjectFilter(
        query,
        type
    );
    const { rows } = await sql<Project>`
        SELECT id, title, description, type, technologies, website, repository, course,
            to_char(last_updated, 'MM/DD/YYYY') AS last_updated
        FROM projects
        WHERE (${projectType} = 'all' OR type = ${projectType})
            AND (
                ${query} = ''
                OR title ILIKE ${searchPattern} ESCAPE '!'
                OR description ILIKE ${searchPattern} ESCAPE '!'
                OR array_to_string(technologies, ' ') ILIKE ${searchPattern} ESCAPE '!'
                OR COALESCE(course, '') ILIKE ${searchPattern} ESCAPE '!'
            )
        ORDER BY
            CASE WHEN ${sort} = 'title' AND ${order} = 'asc' THEN lower(title) END ASC,
            CASE WHEN ${sort} = 'title' AND ${order} = 'desc' THEN lower(title) END DESC,
            CASE WHEN ${sort} = 'recently_updated' AND ${order} = 'asc' THEN last_updated END ASC,
            CASE WHEN ${sort} = 'recently_updated' AND ${order} = 'desc' THEN last_updated END DESC,
            id ASC
        LIMIT ${PROJECTS_PER_PAGE} OFFSET ${offset}`;
    return rows;
}

// Function to get the total number of pages for paginated project queries based on search query and type. Returns the total number of pages.
export async function getProjectsPageCount(
    query: string,
    type: ProjectFilter = "all"
): Promise<number> {
    const { searchPattern, type: projectType } = buildProjectFilter(
        query,
        type
    );
    const { rows } = await sql<{ count: string }>`
        SELECT COUNT(*) AS count
        FROM projects
        WHERE (${projectType} = 'all' OR type = ${projectType})
            AND (
                ${query} = ''
                OR title ILIKE ${searchPattern} ESCAPE '!'
                OR description ILIKE ${searchPattern} ESCAPE '!'
                OR array_to_string(technologies, ' ') ILIKE ${searchPattern} ESCAPE '!'
                OR COALESCE(course, '') ILIKE ${searchPattern} ESCAPE '!'
            )`;
    let projectCount = 0;
    if (rows.length > 0) {
        projectCount = Number(rows[0].count);
    }
    let totalPages = Math.ceil(projectCount / PROJECTS_PER_PAGE);
    if (totalPages < 1) {
        totalPages = 1;
    }

    return totalPages;
}

// last_updated is formatted in SQL (MM/DD/YYYY) so callers receive a plain string instead of a Date object.
// GET ALL: get all projects, most recently updated first.
// GET ALL by type: get all projects filtered by type if provided.
export async function getAllProjects(
    type?: ProjectType | null
): Promise<Project[]> {
    if (!type) {
        const { rows } = await sql<Project>`
            SELECT id, title, description, type, technologies, website, repository, course,
                to_char(last_updated, 'MM/DD/YYYY') AS last_updated
            FROM projects
            ORDER BY projects.last_updated DESC, id`;
        return rows;
    }
    const { rows } = await sql<Project>`
        SELECT id, title, description, type, technologies, website, repository, course,
            to_char(last_updated, 'MM/DD/YYYY') AS last_updated
        FROM projects WHERE type = ${type}
        ORDER BY projects.last_updated DESC, id`;
    return rows;
}

// GET by ID: get one project by its ID
export async function getProjectById(id: number): Promise<Project | null> {
    const { rows } = await sql<Project>`
        SELECT id, title, description, type, technologies, website, repository, course,
            to_char(last_updated, 'MM/DD/YYYY') AS last_updated
        FROM projects WHERE id = ${id}`;
    let project: Project | null = null;
    if (rows.length > 0) {
        project = rows[0];
    }

    return project;
}

// Function to insert a new project into the database. Accepts a ProjectFormInput object and returns void.
// It processes the technologies field as a comma-separated string and converts it into a JSON array for storage.
export async function insertProject(project: ProjectFormInput): Promise<void> {
    const technologies = project.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    const technologiesJson = JSON.stringify(technologies);
    await sql`
        INSERT INTO projects (title, description, type, technologies, website, repository, course, last_updated)
        VALUES (
            ${project.title}, ${project.description}, ${project.type},
            ARRAY(SELECT jsonb_array_elements_text(${technologiesJson}::jsonb)),
            NULLIF(${project.website}, ''), NULLIF(${project.repository}, ''),
            NULLIF(${project.course}, ''), to_date(${project.lastUpdated}, 'MM/DD/YYYY')
        )`;
}

// Function to update an existing project by its ID. Accepts the project ID and a ProjectFormInput object.
// Returns a boolean indicating whether the update was successful. Processes the technologies field similarly to insertion.
export async function updateProjectById(
    id: number,
    project: ProjectFormInput
): Promise<boolean> {
    const technologies = project.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    const technologiesJson = JSON.stringify(technologies);
    const result = await sql`
        UPDATE projects SET
            title = ${project.title}, description = ${project.description},
            type = ${project.type},
            technologies = ARRAY(SELECT jsonb_array_elements_text(${technologiesJson}::jsonb)),
            website = NULLIF(${project.website}, ''),
            repository = NULLIF(${project.repository}, ''),
            course = NULLIF(${project.course}, ''),
            last_updated = to_date(${project.lastUpdated}, 'MM/DD/YYYY')
        WHERE id = ${id}`;
    return result.rowCount === 1;
}

// Function to delete a project by its ID. Returns a boolean indicating whether the deletion was successful.
export async function deleteProjectById(id: number): Promise<boolean> {
    const result = await sql`DELETE FROM projects WHERE id = ${id}`;
    return result.rowCount === 1;
}
