"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SubNavLinkItem {
    href: string;
    label: string;
}

interface SubNavLinksProps {
    links: SubNavLinkItem[];
    label: string;
}

export default function SubNavLinks({ links, label }: SubNavLinksProps) {
    const pathname = usePathname();
    const activeHref = links
        .filter(
            ({ href }) =>
                pathname === href ||
                (href !== "/" && pathname.startsWith(`${href}/`))
        )
        .sort((a, b) => b.href.length - a.href.length)[0]?.href;

    return (
        <nav
            aria-label={label}
            className="mb-8 border-b-2 border-border font-mono text-sm"
        >
            <ul className="m-0 flex flex-wrap gap-x-6 gap-y-2 p-0">
                {links.map(({ href, label: linkLabel }) => {
                    const isActive = href === activeHref;

                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                aria-current={
                                    pathname === href ? "page" : undefined
                                }
                                className={`inline-block border-b-2 py-3 transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-bright ${
                                    isActive
                                        ? "border-accent-bright text-accent-bright"
                                        : "border-transparent text-muted hover:text-foreground"
                                }`}
                            >
                                {linkLabel}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
