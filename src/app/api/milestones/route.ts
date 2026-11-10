import { NextRequest, NextResponse } from "next/server";
import { getAllMilestones } from "@/src/lib/about/milestones-db";
import { isMilestoneType } from "@/src/lib/about/about-validation";

// /api/milestones
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type !== null && !isMilestoneType(type)) {
        return NextResponse.json(
            {
                error: "Invalid type. Use 'course', 'certification', or 'degree'.",
            },
            { status: 400 }
        );
    }

    try {
        const milestones = await getAllMilestones(type);
        return NextResponse.json(milestones);
    } catch (error) {
        console.error("GET /api/milestones failed:", error);
        return NextResponse.json(
            { error: "Failed to load milestones" },
            { status: 500 }
        );
    }
}
