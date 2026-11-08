import { getProjects } from "@/src/lib/projects-db";
import type { ProjectType } from "@/src/types/projects-types";

// /api/projects
export async function GET(request: Request) {
    const type = new URL(request.url).searchParams.get("type");
    const validType = (type === "opensource" || type === "school" ? type : null) as ProjectType | null;
    return Response.json(getProjects(validType));
}
