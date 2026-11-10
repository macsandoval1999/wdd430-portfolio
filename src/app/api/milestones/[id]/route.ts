import { NextRequest, NextResponse } from "next/server";
import { getMilestoneById } from "@/src/lib/about/milestones-db";
import { parseId } from "@/src/lib/about/about-validation";

// /api/milestones/[id]
// In this version of Next.js, params is a Promise and must be awaited.
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = parseId((await params).id);

    if (id === null) {
        return NextResponse.json(
            { error: "Invalid milestone ID" },
            { status: 400 }
        );
    }

    try {
        const milestone = await getMilestoneById(id);
        if (!milestone) {
            return NextResponse.json(
                { error: "Milestone not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(milestone);
    } catch (error) {
        console.error("GET /api/milestones/[id] failed:", error);
        return NextResponse.json(
            { error: "Failed to load milestone" },
            { status: 500 }
        );
    }
}
