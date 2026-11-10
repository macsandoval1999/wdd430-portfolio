import { NextRequest, NextResponse } from "next/server";
import { getCredentialById } from "@/src/lib/about/credentials-db";
import { parseId } from "@/src/lib/about/about-validation";

// /api/credentials/[id]
// In this version of Next.js, params is a Promise and must be awaited.
export async function GET( _request: NextRequest, { params }: { params: Promise<{ id: string }> }
) {
    const id = parseId((await params).id);

    if (id === null) {
        return NextResponse.json(
            { error: "Invalid credential ID" },
            { status: 400 }
        );
    }

    try {
        const credential = await getCredentialById(id);
        if (!credential) {
            return NextResponse.json(
                { error: "Credential not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(credential);
    } catch (error) {
        console.error("GET /api/credentials/[id] failed:", error);
        return NextResponse.json(
            { error: "Failed to load credential" },
            { status: 500 }
        );
    }
}
