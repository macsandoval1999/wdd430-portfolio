import { NextRequest, NextResponse } from "next/server";
import {
    getAllProjects,
    getFilteredProjects,
    getProjectsPageCount,
    insertProject,
} from "@/src/lib/projects/projects-models";
import {
    PositiveIntegerSchema,
    ProjectFilterSchema,
    ProjectFormSchema,
    ProjectOrderSchema,
    ProjectSortSchema,
} from "@/src/lib/projects/projects-schemas";
import {
    isProjectType,
    parseProjectFilter,
    parseProjectOrder,
    parseProjectPage,
    parseProjectSearchQuery,
    parseProjectSort,
} from "@/src/lib/projects/projects-validation";

// GET /api/projects returns all projects, or paginated results when page is supplied.
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (searchParams.has("page")) {
        const page = searchParams.get("page");
        const sort = searchParams.get("sort");
        const order = searchParams.get("order");
        if (
            !PositiveIntegerSchema.safeParse(page).success ||
            (type !== null && !ProjectFilterSchema.safeParse(type).success) ||
            (sort !== null && !ProjectSortSchema.safeParse(sort).success) ||
            (order !== null && !ProjectOrderSchema.safeParse(order).success)
        ) {
            return NextResponse.json({ error: "Invalid project filters or page." }, { status: 400 });
        }
    } else if (type !== null && !isProjectType(type)) {
        return NextResponse.json(
            { error: "Invalid type. Use 'opensource' or 'school'." },
            { status: 400 }
        );
    }

    try {
        if (searchParams.has("page")) {
            const query = parseProjectSearchQuery(searchParams.get("query"));
            const projectType = parseProjectFilter(type);
            const page = parseProjectPage(searchParams.get("page"));
            const sort = parseProjectSort(searchParams.get("sort"));
            const order = parseProjectOrder(searchParams.get("order"));
            const totalPages = await getProjectsPageCount(query, projectType);
            const currentPage = Math.min(page, totalPages);
            const projects = await getFilteredProjects(query, currentPage, {
                type: projectType,
                sort,
                order,
            });
            return NextResponse.json({ projects, totalPages, currentPage });
        }

        const projects = await getAllProjects(isProjectType(type) ? type : null);
        return NextResponse.json(projects);
    } catch (error) {
        console.error("GET /api/projects failed:", error);
        return NextResponse.json(
            { error: "Failed to load projects" },
            { status: 500 }
        );
    }
}

// POST /api/projects validates the project and inserts it into the database.
export async function POST(request: NextRequest) {
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
        await insertProject(parsed.data);
        return new NextResponse(null, { status: 201 });
    } catch (error) {
        console.error("POST /api/projects failed:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
