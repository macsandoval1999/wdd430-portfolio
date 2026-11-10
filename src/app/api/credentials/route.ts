import { NextResponse } from "next/server";
import { getAllCredentials } from "@/src/lib/about/credentials-db";

// /api/credentials
export async function GET() {
    try {
        const credentials = await getAllCredentials();
        return NextResponse.json(credentials);
    } catch (error) {
        console.error("GET /api/credentials failed:", error);
        return NextResponse.json({ error: "Failed to load credentials" }, { status: 500 });
    }
}
