import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);

function loadTypeScript(path, dependencies = {}) {
    const source = readFileSync(new URL(path, import.meta.url), "utf8");
    const code = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText;
    const loaded = { exports: {} };
    const resolve = (name) => dependencies[name] ?? require(name);
    new Function("require", "module", "exports", code)(resolve, loaded, loaded.exports);
    return loaded.exports;
}

const schemas = loadTypeScript("../src/lib/projects/projects-schemas.ts");
const validation = loadTypeScript("../src/lib/projects/projects-validation.ts", {
    "./projects-schemas": schemas,
});
let lastQuery;
let savedProject;
const models = {
    getAllProjects: async (type) => [{ type }],
    getProjectsPageCount: async () => 2,
    getFilteredProjects: async (...args) => {
        lastQuery = args;
        return [{ id: 1 }];
    },
    insertProject: async (project) => { savedProject = project; },
    getProjectById: async () => null,
    updateProjectById: async (id, project) => {
        savedProject = project;
        return id === 1;
    },
    deleteProjectById: async (id) => id === 1,
};
const controller = loadTypeScript("../src/lib/projects/controllers/projects-controller.ts", {
    "../models/projects-models": models,
    "../projects-schemas": schemas,
    "../projects-validation": validation,
});
const dependencies = { "@/src/lib/projects/controllers/projects-controller": controller };
const collection = loadTypeScript("../src/app/api/projects/route.ts", dependencies);
const item = loadTypeScript("../src/app/api/projects/[id]/route.ts", dependencies);
const project = {
    title: "Test project",
    description: "A test description",
    type: "school",
    technologies: "TypeScript",
    website: "",
    repository: "",
    course: "",
    lastUpdated: "02/29/2024",
};
const context = (id) => ({ params: Promise.resolve({ id }) });
const request = (path, method = "GET", body) =>
    new Request(`http://localhost${path}`, {
        method,
        ...(body === undefined ? {} : {
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
        }),
    });

test("collection GET preserves the existing response and paginates filtered results", async () => {
    const all = await collection.GET(request("/api/projects?type=school"));
    assert.deepEqual(await all.json(), [{ type: "school" }]);

    const page = await collection.GET(request(
        "/api/projects?page=9&query=react&type=school&sort=title&order=asc"
    ));
    assert.deepEqual(await page.json(), { projects: [{ id: 1 }], totalPages: 2, currentPage: 2 });
    assert.deepEqual(lastQuery, ["react", 2, { type: "school", sort: "title", order: "asc" }]);
    assert.equal((await collection.GET(request("/api/projects?page=1&type=invalid"))).status, 400);
    assert.equal((await collection.GET(request("/api/projects?page=0"))).status, 400);
});

test("POST validates input and saves valid dates", async () => {
    const invalid = await collection.POST(request("/api/projects", "POST", {
        ...project, lastUpdated: "02/29/2023",
    }));
    assert.equal(invalid.status, 400);
    assert.ok((await invalid.json()).errors.length > 0);

    const created = await collection.POST(request("/api/projects", "POST", project));
    assert.equal(created.status, 201);
    assert.equal(savedProject.lastUpdated, "02/29/2024");
    const malformed = new Request("http://localhost/api/projects", {
        method: "POST", headers: { "content-type": "application/json" }, body: "{",
    });
    assert.equal((await collection.POST(malformed)).status, 400);
    const formRequest = new Request("http://localhost/api/projects", {
        method: "POST", headers: { "content-type": "text/plain" }, body: JSON.stringify(project),
    });
    assert.equal((await collection.POST(formRequest)).status, 415);
});

test("PUT and DELETE handle success, missing projects, and invalid IDs", async () => {
    assert.equal((await item.PUT(request("/api/projects/1", "PUT", project), context("1"))).status, 204);
    assert.deepEqual(savedProject, project);
    assert.equal((await item.PUT(request("/api/projects/2", "PUT", project), context("2"))).status, 404);
    assert.equal((await item.DELETE(request("/api/projects/1", "DELETE"), context("1"))).status, 204);
    assert.equal((await item.DELETE(request("/api/projects/2", "DELETE"), context("2"))).status, 404);
    assert.equal((await item.DELETE(request("/api/projects/0", "DELETE"), context("0"))).status, 400);
    assert.equal((await item.GET(request("/api/projects/2147483648"), context("2147483648"))).status, 400);
});

test("server actions send form data to the API and preserve missing-project errors", async () => {
    let responseStatus = 204;
    let lastRequest;
    const refreshed = [];
    const actions = loadTypeScript("../src/lib/projects/projects-actions.ts", {
        "next/cache": { revalidatePath: (path) => refreshed.push(path) },
        "next/navigation": { redirect: (path) => { throw new Error(`redirect:${path}`); } },
        "./projects-api": {
            fetchProjectsApi: async (path, init) => {
                lastRequest = { path, ...init };
                return new Response(null, { status: responseStatus });
            },
        },
        "./projects-schemas": schemas,
        "./projects-validation": validation,
    });
    const formData = new FormData();
    for (const [key, value] of Object.entries(project)) formData.set(key, value);

    await assert.rejects(actions.createProject({ errors: [] }, formData), /redirect:\/projects\/all/);
    assert.equal(lastRequest.method, "POST");
    assert.deepEqual(JSON.parse(lastRequest.body), project);
    assert.deepEqual(refreshed, ["/projects", "/"]);

    responseStatus = 404;
    assert.deepEqual(await actions.updateProject("1", { errors: [] }, formData), {
        errors: ["This project no longer exists."],
    });
    assert.equal(lastRequest.method, "PUT");
    await assert.rejects(actions.deleteProject("1"), /no longer exists/);
    assert.equal(lastRequest.method, "DELETE");
    assert.equal(lastRequest.path, "/api/projects/1");
});
