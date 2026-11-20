/* NOTE:
    This client component renders previous and next links for project pagination, preserving the current search parameters while updating the page number. THis component is literally just the pagination controls for the project list. 
    It is in charge of the logic for generating pagination URLs and disabling navigation at the first and last pages.
    It is also responsible for displaying the current page and total page count and navigation for the paginated project list.
    After a list of projects is rendered, this component can be added below it to let users navigate between pages.
    Since each project listing page reuses the ProjectResults compoenent to display the filtered project list, this component added into ProjectResults  so its always  part of the project results and provides consistent pagination controls across those pages.
*/



// This component uses client-side navigation to update the page number while preserving the current search parameters.
"use client";



/****** IMPORTS ******/
// link allows client-side navigation between project pages.
import Link from "next/link";
// usePathname and useSearchParams provide the current route and query parameters for pagination URLs.
import { usePathname, useSearchParams } from "next/navigation";
// ReactNode types the previous and next actions, which can be links or disabled spans.
import type { ReactNode } from "react";



/****** INTERFACES *******/
// ProjectPaginationProps defines the current page and total page count for pagination.
// We define the interface so the component receives the current page and total page count as props.
interface ProjectPaginationProps {
    currentPage: number;
    totalPages: number;
}



/***** The ProjectPagination component *****/
// The component renders previous and next links, disabling navigation at the first and last pages.
// It takes the current page and total page count as props and preserves the current search parameters when generating pagination URLs.
export default function ProjectPagination({currentPage, totalPages}: ProjectPaginationProps) {
    // get the pathname so we can later build pagination URLs for the current route.
    const pathname = usePathname();
    // get the current search parameters so we can preserve them in pagination URLs.
    const searchParams = useSearchParams();

    // Define a helper function to create a pagination URL by copying the current search parameters and updating the page number.
    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        return `${pathname}?${params.toString()}`;
    }
 
    // Define the shared class names for enabled and disabled pagination controls.
    const linkClassName =
        "inline-flex min-h-11 items-center border-2 border-accent bg-accent px-4 py-2 font-mono text-sm font-bold text-[#fff7f2] no-underline shadow-[4px_4px_0_#090609] transition duration-150 hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright";
    const disabledClassName =
        "inline-flex min-h-11 items-center border-2 border-border bg-surface px-4 py-2 font-mono text-sm text-muted";

    // Define the previous action as disabled by default
    let previousAction: ReactNode = (
        <span aria-disabled="true" className={disabledClassName}>
            Previous
        </span>
    );

    // If the current page is greater than 1, enable the previous link.
    if (currentPage > 1) {
        previousAction = (
            <Link
                href={createPageURL(currentPage - 1)}
                rel="prev"
                className={linkClassName}
            >
                Previous
            </Link>
        );
    }

    // Define the next action as disabled by default.
    let nextAction: ReactNode = (
        <span aria-disabled="true" className={disabledClassName}>
            Next
        </span>
    );

    // If the current page is less than the total page count, enable the next link.
    if (currentPage < totalPages) {
        nextAction = (
            <Link
                href={createPageURL(currentPage + 1)}
                rel="next"
                className={linkClassName}
            >
                Next
            </Link>
        );
    }

    // Render the pagination controls and current page status.
    // Below is the pagination navigation with previous and next controls and the current page status.
    return (
        <nav
            aria-label="Project pagination"
            className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-border pt-5"
        >
            {previousAction}
            <p className="m-0 font-mono text-sm text-muted" aria-live="polite">
                Page {currentPage} of {totalPages}
            </p>
            {nextAction}
        </nav>
    );
}
