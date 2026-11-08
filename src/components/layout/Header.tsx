"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";

export default function Header() {
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;
        let directionStart = lastY;
        let direction = 0;

        function handleScroll() {
            const maxY = Math.max(
                0,
                document.documentElement.scrollHeight - window.innerHeight
            );
            const currentY = Math.max(0, Math.min(window.scrollY, maxY));
            const nextDirection = Math.sign(currentY - lastY);

            if (nextDirection && nextDirection !== direction) {
                direction = nextDirection;
                directionStart = lastY;
            }

            if (currentY <= 12) {
                setIsHidden(false);
            } else if (Math.abs(currentY - directionStart) >= 8) {
                setIsHidden(direction > 0);
            }
            lastY = currentY;
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            onFocusCapture={() => setIsHidden(false)}
            className={`sticky top-0 z-50 border-b-2 border-accent bg-surface shadow-[0_4px_0_#090609] transition-transform duration-300 ease-out motion-reduce:transition-none ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
        >
            <div className="mx-auto flex min-h-20 w-[calc(100%-2rem)] max-w-6xl items-center justify-between gap-4 max-[640px]:min-h-[4.5rem] max-[640px]:py-3">
                <Link
                    href="/"
                    className="text-[1.35rem] font-bold tracking-[0.025em] text-foreground no-underline transition-colors duration-150 hover:text-accent-bright focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                >
                    Marco Sandoval
                </Link>
                <NavLinks />
            </div>
        </header>
    );
}
