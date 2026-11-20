import { io } from "next/cache";

// Server-side fetch needs an absolute URL. Use the deployment URL or the local server.
export async function fetchProjectsApi(path: string, init?: RequestInit): Promise<Response> {
    await io();
    const origin =
        process.env.PROJECT_API_ORIGIN ??
        (process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : `http://localhost:${process.env.PORT || "3000"}`);

    return fetch(new URL(path, origin), {
        ...init,
        cache: "no-store",
        redirect: "error",
    });
}



/***** EXAMPLE USAGE IF WE WERE TO IMPLEMENT API ROUTES INSTEAD *****/

/*
Shouldn't the app use the API routes? What the hell's the point of having API routes if we aren't going to use them?

You’re right to question it. The project UI currently doesn’t use the project API routes. Right now there are two paths to the same database functions:

    1. The pages and Server Actions call projects-models.ts directly.
    2. The API routes also call those functions, but expose the results as JSON for HTTP clients.
        For example, the edit page calls getProjectById directly rather than fetching /api/projects/[id].

Calling the database directly from a Server Component is valid in Next.js and avoids an extra HTTP request. But if the API routes exist only for this app and the lesson expects the app to use them, keeping them unused is confusing. The current routes only support GET, so using them for everything would also require mutation endpoints and pagination/filter support.

If the assignment requires API routes, aligning the app with that approach makes sense. Otherwise, they’re useful only if you intend to expose project data to other HTTP clients; we can’t tell from the code whether any external client uses them.

Since this is a portfolio and no one else is using it, should i just stick with the vercel postgress package? I have another project for a real app, i might use api routes there just so i could have two ways of doing it.

Yes. For this portfolio, I’d use @vercel/postgres directly from Server Components and Server Actions, unless the assignment requires API routes. It’s simpler and avoids an extra HTTP request. Your other project could demonstrate API routes where they’re useful.

if i use api routes, do i still need vercel postgres?

Yes, if those API routes need to read or write your PostgreSQL database. The API route handles the HTTP request; @vercel/postgres runs the database query.

You could replace @vercel/postgres with another PostgreSQL client or ORM, but the API route itself doesn’t replace the database client.

*/