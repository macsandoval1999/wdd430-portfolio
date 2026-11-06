import { getProjects } from "@/src/lib/projects-db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const type = request.nextUrl.searchParams.get("type");

    if (type !== null && type !== "opensource" && type !== "school") {
        return NextResponse.json(
            { error: "Invalid project type. Use 'opensource' or 'school'." },
            { status: 400 }
        );
    }

    return NextResponse.json(getProjects(type));
}
