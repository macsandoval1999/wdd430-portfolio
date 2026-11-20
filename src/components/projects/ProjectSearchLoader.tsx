/* NOTE:
    This async Server Component reads and validates the URL search parameters before passing them to ProjectSearch.
    A fixed project type can override the URL filter on pages that show only one type of project.
    ProjectSearch handles user interaction and URL updates; this component prepares its initial values.
    This loader is used on the project pages to render the search controls with the current URL values.
    Using the ProjectSearch component keeps the search controls separate from the server-side URL parsing and validation.
*/

/****** IMPORTS ******/
// ProjectSearch renders the search input and optional browse filters.
import ProjectSearch from "./ProjectSearch";
// These helpers clean or default the search parameters before they are used.
import {
    parseProjectFilter,
    parseProjectOrder,
    parseProjectSearchQuery,
    parseProjectSort,
} from "@/src/lib/projects/projects-validation";
// ProjectType defines the valid fixed project types.
import type { ProjectType } from "@/src/lib/projects/projects-types";

/****** INTERFACE ******/
// The loader receives the page's search parameters, an optional fixed type, and whether to show browse filters.
interface ProjectSearchLoaderProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
    fixedType?: ProjectType;
    showBrowseFilters?: boolean;
}

/***** The ProjectSearchLoader component *****/
// Wait for the search parameters and prepare the values passed to the client component.
export default async function ProjectSearchLoader({
    searchParams,
    fixedType,
    showBrowseFilters = false,
}: ProjectSearchLoaderProps) {
    const params = await searchParams;
    const query = parseProjectSearchQuery(params.query);
    let projectType = parseProjectFilter(params.type);
    // A type-specific page takes precedence over a type supplied in the URL.
    if (fixedType !== undefined) {
        projectType = fixedType;
    }
    const sort = parseProjectSort(params.sort);
    const order = parseProjectOrder(params.order);

    // The key remounts the search component when these URL values change, keeping its input in sync.
    return (
        <ProjectSearch
            key={`${query}-${projectType}-${sort}-${order}`}
            query={query}
            projectType={projectType}
            sort={sort}
            order={order}
            showBrowseFilters={showBrowseFilters}
        />
    );
}
