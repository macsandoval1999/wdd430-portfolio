import { NextRequest, NextResponse } from "next/server";
import { getProjectById } from "@/src/lib/projects/projects-db";
import { parseProjectId } from "@/src/lib/projects/projects-validation";

// /api/projects/[id]
// In this version of Next.js, params is a Promise and must be awaited.
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = parseProjectId((await params).id);

    if (id === null) {
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
