// First we import the Project and ProjectType types to ensure our projects array adheres to the correct structure.
import type { Project, ProjectType } from "../../types/projects-types";

import { sql } from "@vercel/postgres";

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
    return rows[0] ?? null;
}
