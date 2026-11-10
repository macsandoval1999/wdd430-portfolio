import { NextRequest, NextResponse } from "next/server";
import { getAllProjects } from "@/src/lib/projects/projects-db";
import { isProjectType } from "@/src/lib/projects/projects-validation";

// /api/projects
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type !== null && !isProjectType(type)) {
        return NextResponse.json(
            { error: "Invalid type. Use 'opensource' or 'school'." },
            { status: 400 }
        );
    }

    try {
        const projects = await getAllProjects(type);
        return NextResponse.json(projects);
    } catch (error) {
        console.error("GET /api/projects failed:", error);
        return NextResponse.json(
            { error: "Failed to load projects" },
            { status: 500 }
        );
    }
}
