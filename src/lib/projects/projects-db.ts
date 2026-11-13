// First we import the Project and ProjectType types to ensure our projects array adheres to the correct structure.
import type {
    Project,
    ProjectFilter,
    ProjectOrder,
    ProjectSort,
    ProjectType,
} from "../../types/projects-types";

import { sql } from "@vercel/postgres";



export const PROJECTS_PER_PAGE = 6;

interface ProjectSearchOptions {
    type?: ProjectFilter;
    sort?: ProjectSort;
    order?: ProjectOrder;
}

function createSearchPattern(query: string): string {
    const escapedQuery = query.replace(/[!%_]/g, "!$&");
    return `%${escapedQuery}%`;
}

function buildProjectFilter(query: string, type: ProjectFilter) {
    const searchPattern = createSearchPattern(query);
    return { searchPattern, type };
}



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
    const { searchPattern, type: projectType } = buildProjectFilter(query, type);
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



export async function getPaginatedProjects(
    query: string,
    type: ProjectFilter = "all"
): Promise<number> {
    const { searchPattern, type: projectType } = buildProjectFilter(query, type);
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
