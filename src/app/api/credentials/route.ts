import { NextResponse } from "next/server";
import { io } from "next/cache";
import { getAllCredentials } from "@/src/lib/about/credentials-db";

// /api/credentials
export async function GET() {
    // Wait until request time before querying the database.
    await io();

    try {
        const credentials = await getAllCredentials();
        return NextResponse.json(credentials);
    } catch (error) {
        console.error("GET /api/credentials failed:", error);
        return NextResponse.json({ error: "Failed to load credentials" }, { status: 500 });
    }
}
