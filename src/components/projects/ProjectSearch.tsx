/* NOTE:
    This client component provides project search and browse filters.
    Search updates are debounced, while filter and sort changes reset pagination and preserve the current search term.
    URL search parameters are updated without scrolling, and changing the sort resets the order to descending except for title, which defaults to ascending.
    ProjectSearchLoader supplies the validated values from the URL, and this component updates the URL when the user changes them.
    In the project pages, ProjectResults reads those URL parameters to fetch and display matching projects; the two components do not call each other directly. The URL is the link between them and neither actually calls the other.
    This component contains all the search and browse filter controls for projects while the loader handles fetching and displaying the matching projects. Its added to the Projects Search Loader component thats actually used on the project pages.
 */


// This component uses client-side hooks and event handlers to update the search parameters.
"use client";

/****** IMPORTS ******/
// React hooks let us cancel pending searches and read the current search input.
import { useEffect, useRef } from "react";
// These navigation hooks provide the current path, search parameters, and client-side navigation.
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// Debouncing waits until the user pauses typing before updating the URL.
import { useDebouncedCallback } from "use-debounce";
// These types describe the valid project filter, sort, and order values.
import type {
    ProjectFilter,
    ProjectOrder,
    ProjectSort,
} from "@/src/lib/projects/projects-types";

/****** INTERFACE ******/
// The props contain the current search and browse values and control whether the browse filters are shown.
interface ProjectSearchProps {
    query: string;
    projectType: ProjectFilter;
    sort: ProjectSort;
    order: ProjectOrder;
    showBrowseFilters?: boolean;
}

// Shared styling for the search input and browse selects.
const fieldClassName =
    "w-full border-2 border-border bg-surface px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent-bright focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-bright";

/***** The ProjectSearch component *****/
// Renders the search field and optional browse filters, using the URL to keep the current selections.
export default function ProjectSearch({
    query,
    projectType,
    sort,
    order,
    showBrowseFilters = false,
}: ProjectSearchProps) {
    // Read the current route and parameters so changes can preserve unrelated URL values.
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    // The ref lets filter changes read text that has not yet been applied by the debounced search.
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Wait 300ms after typing before updating the query and returning to the first page.
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const trimmedTerm = term.trim();
        if (trimmedTerm) {
            params.set("query", trimmedTerm);
        } else {
            params.delete("query");
        }
        params.set("page", "1");
        replaceUrl(params);
    }, 300);

    // Cancel a pending search when URL parameters change or the component is cleaned up.
    useEffect(() => {
        handleSearch.cancel();
    }, [handleSearch, searchParams]);

    // Replace the current URL without scrolling the page or adding a browser history entry.
    function replaceUrl(params: URLSearchParams) {
        const queryString = params.toString();
        let destination = pathname;
        if (queryString) destination = `${pathname}?${queryString}`;
        router.replace(destination, {
            scroll: false,
        });
    }

    // Preserve the text currently in the search field when changing a filter or order.
    // Cancel any pending search so it cannot overwrite the new selection.
    function handleFilterChange(name: string, value: string) {
        const params = new URLSearchParams(searchParams.toString());
        handleSearch.cancel();
        let currentSearch = query;
        if (searchInputRef.current) {
            currentSearch = searchInputRef.current.value.trim();
        }
        if (currentSearch) {
            params.set("query", currentSearch);
        } else {
            params.delete("query");
        }
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        params.set("page", "1");
        replaceUrl(params);
    }

    // Changing the sort also chooses its default order and returns to the first page.
    function handleSortChange(value: ProjectSort) {
        const params = new URLSearchParams(searchParams.toString());
        handleSearch.cancel();
        let currentSearch = query;
        if (searchInputRef.current) {
            currentSearch = searchInputRef.current.value.trim();
        }
        if (currentSearch) {
            params.set("query", currentSearch);
        } else {
            params.delete("query");
        }
        params.set("sort", value);
        let nextOrder = "desc";
        if (value === "title") nextOrder = "asc";
        params.set("order", nextOrder);
        params.set("page", "1");
        replaceUrl(params);
    }

    // Convert the select value to one of the supported sort options.
    function handleSortInputChange(value: string) {
        if (value === "title") {
            handleSortChange("title");
            return;
        }
        handleSortChange("recently_updated");
    }

    // Use labels that match whether the projects are sorted by date or title.
    let orderDescendingLabel = "Newest first";
    let orderAscendingLabel = "Oldest first";
    if (sort === "title") {
        orderDescendingLabel = "Z to A";
        orderAscendingLabel = "A to Z";
    }

    return (
        <div className="mb-6 border-2 border-border bg-[linear-gradient(135deg,var(--surface-raised),var(--surface))] p-4 shadow-[4px_4px_0_#090609]">
            <label
                htmlFor="project-search"
                className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent-bright"
            >
                Search projects
            </label>
            <input
                ref={searchInputRef}
                id="project-search"
                type="search"
                defaultValue={query}
                maxLength={100}
                placeholder="Title, description, technology, or course"
                onChange={(event) => handleSearch(event.target.value)}
                className={fieldClassName}
            />
            {/* Only show the type, sort, and order controls on pages that enable browse filters. */}
            {showBrowseFilters && (
                <div className="mt-4 grid grid-cols-1 gap-4 min-[641px]:grid-cols-3">
                    <label className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
                        Project type
                        <select
                            value={projectType}
                            onChange={(event) =>
                                handleFilterChange("type", event.target.value)
                            }
                            className={`${fieldClassName} mt-2`}
                        >
                            <option value="all">All types</option>
                            <option value="school">School projects</option>
                            <option value="opensource">Open source</option>
                        </select>
                    </label>
                    <label className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
                        Sort by
                        <select
                            value={sort}
                            onChange={(event) =>
                                handleSortInputChange(event.target.value)
                            }
                            className={`${fieldClassName} mt-2`}
                        >
                            <option value="recently_updated">
                                Recently updated
                            </option>
                            <option value="title">Title</option>
                        </select>
                    </label>
                    <label className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
                        Order
                        <select
                            value={order}
                            onChange={(event) =>
                                handleFilterChange("order", event.target.value)
                            }
                            className={`${fieldClassName} mt-2`}
                        >
                            <option value="desc">{orderDescendingLabel}</option>
                            <option value="asc">{orderAscendingLabel}</option>
                        </select>
                    </label>
                </div>
            )}
        </div>
    );
}
