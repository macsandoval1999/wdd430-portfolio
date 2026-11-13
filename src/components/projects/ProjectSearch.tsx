"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import type {
    ProjectFilter,
    ProjectOrder,
    ProjectSort,
} from "@/src/types/projects-types";

interface ProjectSearchProps {
    query: string;
    projectType: ProjectFilter;
    sort: ProjectSort;
    order: ProjectOrder;
    showBrowseFilters?: boolean;
}

const fieldClassName =
    "w-full border-2 border-border bg-surface px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent-bright focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-bright";

export default function ProjectSearch({
    query,
    projectType,
    sort,
    order,
    showBrowseFilters = false,
}: ProjectSearchProps) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchInputRef = useRef<HTMLInputElement>(null);

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

    useEffect(() => {
        handleSearch.cancel();
    }, [handleSearch, searchParams]);

    function replaceUrl(params: URLSearchParams) {
        const queryString = params.toString();
        let destination = pathname;
        if (queryString) destination = `${pathname}?${queryString}`;
        router.replace(destination, {
            scroll: false,
        });
    }

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

    function handleSortInputChange(value: string) {
        if (value === "title") {
            handleSortChange("title");
            return;
        }
        handleSortChange("recently_updated");
    }

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
                            <option value="desc">
                                {orderDescendingLabel}
                            </option>
                            <option value="asc">
                                {orderAscendingLabel}
                            </option>
                        </select>
                    </label>
                </div>
            )}
        </div>
    );
}
