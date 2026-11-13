import { sql } from "@vercel/postgres";
import type { Milestone, MilestoneType } from "../../types/about-types";



// Columns are snake_case in the database, so they are aliased to the camelCase names used by the Milestone type.
// completion_date is formatted in SQL as 'MM-DD-YYYY' so callers receive a plain string.



// GET ALL: get all milestones, newest first.
// GET ALL by type: get all milestones filtered by type if provided.
export async function getAllMilestones(type?: MilestoneType | null): Promise<Milestone[]> {
    if (!type) {
        const { rows } = await sql<Milestone>`
            SELECT id, title, milestone_id AS "milestoneId", course_name AS "courseName",
                certification_name AS "certificationName", description, key_words AS "keyWords",
                project_link AS "projectLink", milestone_type AS "milestoneType",
                to_char(completion_date, 'MM-DD-YYYY') AS "completionDate"
            FROM milestones ORDER BY milestones.completion_date DESC, id DESC`;
        return rows;
    }
    const { rows } = await sql<Milestone>`
        SELECT id, title, milestone_id AS "milestoneId", course_name AS "courseName",
            certification_name AS "certificationName", description, key_words AS "keyWords",
            project_link AS "projectLink", milestone_type AS "milestoneType",
            to_char(completion_date, 'MM-DD-YYYY') AS "completionDate"
        FROM milestones WHERE milestone_type = ${type}
        ORDER BY milestones.completion_date DESC, id DESC`;
    return rows;
}



// GET by ID: get one milestone by its ID
export async function getMilestoneById(id: number): Promise<Milestone | null> {
    const { rows } = await sql<Milestone>`
        SELECT id, title, milestone_id AS "milestoneId", course_name AS "courseName",
            certification_name AS "certificationName", description, key_words AS "keyWords",
            project_link AS "projectLink", milestone_type AS "milestoneType",
            to_char(completion_date, 'MM-DD-YYYY') AS "completionDate"
        FROM milestones WHERE id = ${id}`;
    let milestone: Milestone | null = null;
    if (rows.length > 0) {
        milestone = rows[0];
    }

    return milestone;
}
