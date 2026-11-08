"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export default function ScrollToTop() {
    const pathname = usePathname();
    const previousPathname = useRef(pathname);

    useLayoutEffect(() => {
        if (previousPathname.current !== pathname) {
            previousPathname.current = pathname;
            if (!window.location.hash) {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }
        }
    }, [pathname]);

    return null;
}
