import { getProjectById } from "@/src/lib/projects-db";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const projectId = Number(id);

    if (!/^\d+$/.test(id) || !Number.isSafeInteger(projectId) || projectId < 1) {
        return NextResponse.json(
            { error: "Project id must be a positive integer." },
            { status: 400 }
        );
    }

    const project = getProjectById(projectId);

    if (!project) {
        return NextResponse.json(
            { error: "Project not found." },
            { status: 404 }
        );
    }

    return NextResponse.json(project);
}
