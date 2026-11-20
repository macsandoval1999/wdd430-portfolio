// use client so that this component can use hooks like useState and useEffect
"use client";



/****** IMPORTS ******/
// link allows us to navigate between pages in a Next.js application without a full page reload
import Link from "next/link";
// suspense allows us to display a fallback UI while waiting for a component to load asynchronously
// useEffect allows us to perform side effects in a functional component
// useState allows us to add state to a functional component
import { Suspense, useEffect, useState } from "react";
// NavLinks which is a layout component we made for the navigation links in the header
import NavLinks from "./NavLinks";



/****** The Header component ******/
// Takes in no props and renders the header component with navigation links and scroll-based visibility behavior
export default function Header() {
    // set a state called isHidden to track whether the header should be hidden or visible. setIsHidden is the function that can be used to update this state.
    const [isHidden, setIsHidden] = useState(false);

    // useEffect to handle scroll events and determine whether the header should be hidden or visible based on scroll direction and position
    useEffect(() => {
        // lastY keeps track of the last scroll position
        let lastY = window.scrollY;
        // directionStart keeps track of the scroll position where the current scroll direction started
        let directionStart = lastY;
        // direction keeps track of the current scroll direction (1 for down, -1 for up, 0 for no movement)
        let direction = 0;

        // We define a function to handle scroll events and update the header visibility based on scroll direction and position
        function handleScroll() {
            // maxY represents the maximum scroll position (bottom of the page)
            const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            // currentY represents the current scroll position, clamped between 0 and maxY
            const currentY = Math.max(0, Math.min(window.scrollY, maxY));
            // nextDirection represents the direction of the current scroll (1 for down, -1 for up, 0 for no movement)
            const nextDirection = Math.sign(currentY - lastY);

            // If the scroll direction has changed, update the direction and the directionStart position
            if (nextDirection && nextDirection !== direction) {
                direction = nextDirection;
                directionStart = lastY;
            }

            // If the current scroll position is near the top, always show the header
            if (currentY <= 12) {
                setIsHidden(false);
            } else if (Math.abs(currentY - directionStart) >= 8) {
                // If the user has scrolled a significant distance in the current direction, hide or show the header based on the scroll direction
                setIsHidden(direction > 0);
            }
            // Update the last scroll position for the next scroll event
            lastY = currentY;
        }

        // Attach the scroll event listener to the window object to handle header visibility on scroll
        window.addEventListener("scroll", handleScroll, { passive: true });
        // Return a cleanup function to remove the scroll event listener when the component unmounts
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine the CSS class for the header's position based on its visibility state
    let headerPositionClass = "translate-y-0";
    // if the header is hidden, apply the class to translate it out of view
    if (isHidden) headerPositionClass = "-translate-y-full";

    // The header will be translated out of view when hidden and back into view when visible. This provides a smooth transition effect for the header's visibility on scroll. 
    // Below is the JSX for the header component with the applied transition classes based on its visibility state.
    return (
        <header
            onFocusCapture={() => setIsHidden(false)}
            className={`sticky top-0 z-50 border-b-2 border-accent bg-surface shadow-[0_4px_0_#090609] transition-transform duration-300 ease-out motion-reduce:transition-none ${headerPositionClass}`}
        >
            <div className="mx-auto flex min-h-20 w-[calc(100%-2rem)] max-w-6xl items-center justify-between gap-4 max-[640px]:min-h-[4.5rem] max-[640px]:py-3">
                <Link
                    href="/"
                    className="text-[1.35rem] font-bold tracking-[0.025em] text-foreground no-underline transition-colors duration-150 hover:text-accent-bright focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                >
                    Marco Sandoval
                </Link>
                <Suspense fallback={<span className="font-mono text-sm text-muted">Loading navigation...</span>}>
                    <NavLinks />
                </Suspense>
            </div>
        </header>
    );
}
