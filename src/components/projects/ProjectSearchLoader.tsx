import ProjectSearch from "./ProjectSearch";
import {
    parseProjectFilter,
    parseProjectOrder,
    parseProjectSearchQuery,
    parseProjectSort,
} from "@/src/lib/projects/projects-validation";
import type { ProjectType } from "@/src/types/projects-types";

interface ProjectSearchLoaderProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
    fixedType?: ProjectType;
    showBrowseFilters?: boolean;
}

export default async function ProjectSearchLoader({
    searchParams,
    fixedType,
    showBrowseFilters = false,
}: ProjectSearchLoaderProps) {
    const params = await searchParams;
    const query = parseProjectSearchQuery(params.query);
    let projectType = parseProjectFilter(params.type);
    if (fixedType !== undefined) {
        projectType = fixedType;
    }
    const sort = parseProjectSort(params.sort);
    const order = parseProjectOrder(params.order);

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
