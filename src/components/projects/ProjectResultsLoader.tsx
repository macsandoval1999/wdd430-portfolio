/* NOTE:
    This async Server Component prepares the paginated project results for the project listing pages.
    It validates search parameters, fetches the matching projects and page count, and passes them to ProjectList and ProjectPagination.
    If the requested page is beyond the available pages, it redirects to the last page while preserving the active search and filters.
    ProjectSearch and ProjectResults do not call each other. ProjectSearch updates the URL when the user searches or changes a filter.
    Next.js then supplies the updated searchParams to the page, which passes them to ProjectResults to fetch and display the matching projects.
*/



/****** IMPORTS ******/
// redirect navigates to a valid page when the requested page is out of range.
import { redirect } from "next/navigation";
// ProjectList displays the projects, and ProjectPagination provides the page navigation.
import ProjectList from "./ProjectList";
import ProjectPagination from "./ProjectPagination";
// fetchProjectsApi requests the filtered projects and page count from the API.
import { fetchProjectsApi } from "@/src/lib/projects/projects-api";
// These helpers validate the URL parameters and provide defaults when needed.
import {
    parseProjectFilter,
    parseProjectOrder,
    parseProjectPage,
    parseProjectSearchQuery,
    parseProjectSort,
} from "@/src/lib/projects/projects-validation";
// ProjectType defines the valid fixed project types.
import type { Project, ProjectType } from "@/src/lib/projects/projects-types";



/****** INTERFACE ******/
// The results component receives the route, search parameters, optional fixed type, and optional empty state.
interface ProjectResultsLoaderProps {
    pathname: string;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
    fixedType?: ProjectType;
    emptyState?: {
        title: string;
        description: string;
    };
}



/***** The ProjectResultsLoader component *****/
// Load the current page of projects and render the list and pagination controls.
export default async function ProjectResultsLoader({
    pathname,
    searchParams,
    fixedType,
    emptyState,
}: ProjectResultsLoaderProps) {
    // Parse the URL values before using them in the project queries.
    const params = await searchParams;
    const query = parseProjectSearchQuery(params.query);
    const page = parseProjectPage(params.page);
    let projectType = parseProjectFilter(params.type);
    // A type-specific page takes precedence over a type supplied in the URL.
    if (fixedType !== undefined) {
        projectType = fixedType;
    }
    const sort = parseProjectSort(params.sort);
    const order = parseProjectOrder(params.order);
    // The API returns the matching projects and page count, correcting an out-of-range page.
    const apiParams = new URLSearchParams({
        query,
        page: String(page),
        type: projectType,
        sort,
        order,
    });
    const response = await fetchProjectsApi(`/api/projects?${apiParams}`);
    if (!response.ok) {
        throw new Error(`Failed to load project results (${response.status}).`);
    }
    const { projects, totalPages, currentPage }: {
        projects: Project[];
        totalPages: number;
        currentPage: number;
    } = await response.json();

    // Redirect to the last available page, retaining the non-default search and browse parameters.
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

    // Show a search-specific message when a query has no results; otherwise use the supplied or default message.
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

    // ProjectList renders the results or empty state, and ProjectPagination renders the page controls.
    return (
        <>
            <ProjectList projects={projects} emptyState={resultEmptyState} />
            <ProjectPagination
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    );
}
