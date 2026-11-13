"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

interface ProjectPaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function ProjectPagination({
    currentPage,
    totalPages,
}: ProjectPaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        return `${pathname}?${params.toString()}`;
    }

    const linkClassName =
        "inline-flex min-h-11 items-center border-2 border-accent bg-accent px-4 py-2 font-mono text-sm font-bold text-[#fff7f2] no-underline shadow-[4px_4px_0_#090609] transition duration-150 hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright";
    const disabledClassName =
        "inline-flex min-h-11 items-center border-2 border-border bg-surface px-4 py-2 font-mono text-sm text-muted";

    let previousAction: ReactNode = (
        <span aria-disabled="true" className={disabledClassName}>
            Previous
        </span>
    );
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

    let nextAction: ReactNode = (
        <span aria-disabled="true" className={disabledClassName}>
            Next
        </span>
    );
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
