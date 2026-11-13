import { redirect } from "next/navigation";
import ProjectList from "./ProjectList";
import ProjectPagination from "./ProjectPagination";
import {
    getFilteredProjects,
    getPaginatedProjects,
} from "@/src/lib/projects/projects-db";
import {
    parseProjectFilter,
    parseProjectOrder,
    parseProjectPage,
    parseProjectSearchQuery,
    parseProjectSort,
} from "@/src/lib/projects/projects-validation";
import type {
    ProjectType,
} from "@/src/types/projects-types";

interface ProjectResultsLoaderProps {
    pathname: string;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
    fixedType?: ProjectType;
    emptyState?: {
        title: string;
        description: string;
    };
}

export default async function ProjectResultsLoader({
    pathname,
    searchParams,
    fixedType,
    emptyState,
}: ProjectResultsLoaderProps) {
    const params = await searchParams;
    const query = parseProjectSearchQuery(params.query);
    const page = parseProjectPage(params.page);
    let projectType = parseProjectFilter(params.type);
    if (fixedType !== undefined) {
        projectType = fixedType;
    }
    const sort = parseProjectSort(params.sort);
    const order = parseProjectOrder(params.order);
    const totalPages = await getPaginatedProjects(query, projectType);
    const currentPage = Math.min(page, totalPages);

    if (page !== currentPage) {
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (projectType !== "all") params.set("type", projectType);
        if (sort !== "recently_updated") params.set("sort", sort);
        let defaultOrder = "desc";
        if (sort === "title") {
            defaultOrder = "asc";
        }
        if (order !== defaultOrder) {
            params.set("order", order);
        }
        params.set("page", String(currentPage));
        redirect(`${pathname}?${params.toString()}`);
    }

    const projects = await getFilteredProjects(query, currentPage, {
        type: projectType,
        sort,
        order,
    });

    let resultEmptyState = emptyState;
    if (query) {
        resultEmptyState = {
            title: "No matching projects",
            description:
                "Try a different search term or adjust the project filters.",
        };
    } else if (resultEmptyState === undefined) {
        resultEmptyState = {
            title: "No projects to show yet",
            description:
                "There are no projects to display here just yet. Check back later for updates.",
        };
    }

    return (
        <>
            <ProjectList
                projects={projects}
                emptyState={resultEmptyState}
            />
            <ProjectPagination
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    );
}
