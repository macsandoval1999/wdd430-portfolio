// We use the "use client" directive to indicate that this component should be rendered on the client side. This is necessary because we use the usePathname hook from next/navigation, which is client-side only. It is used to determine the current path for active link styling.
"use client";

// importing link allows us to create navigational links between pages in a Next.js application
import Link from "next/link";
// importing usePathname allows us to determine the current path for active link styling
import { usePathname } from "next/navigation";
// importing MobileMenu allows us to wrap the navigation links in a mobile-friendly menu component
import MobileMenu from "./MobileMenu";

// The best approach for managing navigation links is to define them in a centralized array, making it easy to update and maintain the links throughout the application.
const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
];

// Styles for navigation links
// It is easier to read when separated from the component logic and easier to maintain
const linkStyles =
    "inline-flex border-2 px-3 py-2 font-mono text-[0.9rem] no-underline transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-bright";
const activeLinkStyles = "border-accent bg-accent text-[#fff7f2]";
const inactiveLinkStyles = "border-transparent text-muted hover:border-border hover:text-accent-bright";

export default function NavLinks() {
    // usePathname hook returns the current path, which helps in determining the active link for styling purposes
    const pathname = usePathname();

    return (
        <MobileMenu>
            <ul className="m-0 flex list-none gap-2 flex-col lg:flex-row p-0">
                {/* First, we map over the links array to generate the navigation items dynamically */}
                {links.map(({ href, label }) => {
                    // We then check if the current link is active based on the pathname and the href. If the pathname matches the href, or if it's a subpage like projects, we consider it active.
                    const isActive =
                        pathname === href ||
                        (href === "/projects" &&
                            pathname.startsWith("/projects/"));
                    return (
                        // key prop is used to uniquely identify each list item for efficient rendering by React. key is typically set to a unique value like the href of the link. It helps React efficiently update and re-render only the necessary items when the list changes.
                        <li key={href}>
                            <Link
                                href={href}
                                // aria-current attribute indicates the current page for accessibility purposes
                                aria-current={isActive ? "page" : undefined}
                                // In className, you can start by defining the base styles for the link, and then conditionally apply additional styles based on whether the link is active or not.
                                className={`${linkStyles} ${
                                    isActive ? activeLinkStyles : inactiveLinkStyles
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </MobileMenu>
    );
}
