import { NextRequest, NextResponse } from "next/server";
import {
    deleteProjectById,
    getProjectById,
    updateProjectById,
} from "@/src/lib/projects/projects-models";
import { ProjectFormSchema } from "@/src/lib/projects/projects-schemas";
import { parseProjectId } from "@/src/lib/projects/projects-validation";

// /api/projects/[id]
// In this version of Next.js, params is a Promise and must be awaited.
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = parseProjectId((await params).id);

    if (id === null || id > 2147483647) {
        return NextResponse.json(
            { error: "Invalid project ID" },
            { status: 400 }
        );
    }

    try {
        const project = await getProjectById(id);
        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(project);
    } catch (error) {
        console.error("GET /api/projects/[id] failed:", error);
        return NextResponse.json(
            { error: "Failed to load project" },
            { status: 500 }
        );
    }
}

// PUT /api/projects/[id] validates and updates an existing project.
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = parseProjectId((await params).id);
    if (id === null || id > 2147483647) {
        return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
        return NextResponse.json({ error: "Expected application/json." }, { status: 415 });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
        return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
    }

    const parsed = ProjectFormSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { errors: parsed.error.issues.map((issue) => issue.message) },
            { status: 400 }
        );
    }

    try {
        const updated = await updateProjectById(id, parsed.data);
        if (!updated) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("PUT /api/projects/[id] failed:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

// DELETE /api/projects/[id] removes an existing project.
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = parseProjectId((await params).id);
    if (id === null || id > 2147483647) {
        return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    try {
        const deleted = await deleteProjectById(id);
        if (!deleted) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("DELETE /api/projects/[id] failed:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
