import { sql } from "@vercel/postgres";
import type { Credential } from "../../types/about-types";



// Columns are snake_case in the database, so they are aliased to the camelCase names used by the Credential type.
// Dates are formatted in SQL so callers receive plain strings: completed 'MM/DD/YYYY', expected 'MM/YYYY'.



// GET ALL: get all credentials
export async function getAllCredentials(): Promise<Credential[]> {
    const { rows } = await sql<Credential>`
        SELECT id, name, type, completed,
            to_char(completed_date, 'MM/DD/YYYY') AS "completedDate",
            to_char(expected_date, 'MM/YYYY') AS "expectedDate",
            milestone_id AS "milestoneId"
        FROM credentials ORDER BY id`;
    return rows;
}



// GET by ID: get one credential by its ID
export async function getCredentialById(id: number): Promise<Credential | null> {
    const { rows } = await sql<Credential>`
        SELECT id, name, type, completed,
            to_char(completed_date, 'MM/DD/YYYY') AS "completedDate",
            to_char(expected_date, 'MM/YYYY') AS "expectedDate",
            milestone_id AS "milestoneId"
        FROM credentials WHERE id = ${id}`;
    let credential: Credential | null = null;
    if (rows.length > 0) {
        credential = rows[0];
    }

    return credential;
}
