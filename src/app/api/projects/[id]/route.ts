import { getProjectById } from "@/src/lib/projects-db";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id))) {
        return Response.json({ error: "Invalid project ID" }, { status: 400 });
    }
    const project = getProjectById(Number(id));

    if (!project) {
        return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json(project);
}
