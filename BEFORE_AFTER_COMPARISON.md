# Before & After: WDD430 Portfolio Refactoring

## 1. Type Organization

### BEFORE ❌
```typescript
// src/lib/projects-db.ts
export type ProjectType = "opensource" | "school";

export interface Project {
    id: number;
    title: string;
    // ... properties
}

export const schoolProjects: Project[] = [...]
```

### AFTER ✅
```typescript
// src/types/projects-types.ts
// Create a type to represent the different types of projects
export type ProjectType = "opensource" | "school";

export interface Project {
    id: number;
    title: string;
    // ... properties
}
```

```typescript
// src/lib/projects-db.ts
import type { Project, ProjectType } from "../types/projects-types";

export const schoolProjects: Project[] = [...]
```

---

## 2. API Implementation

### BEFORE ❌
```typescript
// src/app/api/projects/route.ts
import { getProjects } from "@/src/lib/projects-db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const type = request.nextUrl.searchParams.get("type");

    if (type !== null && type !== "opensource" && type !== "school") {
        return NextResponse.json(
            { error: "Invalid project type. Use 'opensource' or 'school'." },
            { status: 400 }
        );
    }

    return NextResponse.json(getProjects(type));
}
```

### AFTER ✅
```typescript
// src/app/api/projects/route.ts
import { getProjects } from "@/src/lib/projects-db";
import type { ProjectType } from "@/src/types/projects-types";

// /api/projects
export async function GET(request: Request) {
    const type = new URL(request.url).searchParams.get("type");
    const validType = (type === "opensource" || type === "school" ? type : null) as ProjectType | null;
    return Response.json(getProjects(validType));
}
```

---

## 3. Navigation Component

### BEFORE ❌
```typescript
// src/components/layout/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav aria-label="Main navigation">
            <ul className="m-0 flex list-none gap-2 p-0">
                {links.map(({ href, label }) => {
                    const isActive = pathname === href || 
                        (href === "/projects" && pathname.startsWith("/projects/"));
                    return (
                        <li key={href}>
                            <Link href={href} aria-current={isActive ? "page" : undefined}
                                className={`...inline-flex... ${
                                    isActive ? "border-accent..." : "border-transparent..."
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
```

### AFTER ✅
```typescript
// src/components/layout/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
];

// Styles for navigation links
// It is easier to read when separated from the component logic and easier to maintain
const linkStyles = "inline-flex border-2 px-3 py-2 font-mono text-[0.9rem] no-underline transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-bright";
const activeLinkStyles = "border-accent bg-accent text-[#fff7f2]";
const inactiveLinkStyles = "border-transparent text-muted hover:border-border hover:text-accent-bright";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <MobileMenu>
            <ul className="m-0 flex list-none gap-2 flex-col lg:flex-row p-0">
                {links.map(({ href, label }) => {
                    const isActive = pathname === href || 
                        (href === "/projects" && pathname.startsWith("/projects/"));
                    return (
                        <li key={href}>
                            <Link href={href} aria-current={isActive ? "page" : undefined}
                                className={`${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}
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
```

**Key improvements:**
- ✅ Wrapped in `MobileMenu` component
- ✅ Extracted styles to constants
- ✅ Added detailed comments
- ✅ Responsive `flex-col lg:flex-row` layout
- ✅ Clean, maintainable code

---

## 4. MobileMenu Component (NEW)

### ADDED ✅
```typescript
// src/components/layout/MobileMenu.tsx (NEW FILE)
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Styles for the mobile menu container
const menuStyles = "absolute top-[calc(100%-0.25rem)] right-5 w-[min(18rem,calc(100%-2.5rem))] rounded-2xl border border-border bg-surface p-2 shadow-2xl shadow-black/30 transition-[opacity,translate,visibility] duration-300 ease-out motion-reduce:transition-none sm:right-8 lg:visible lg:static ...";
const openMenuStyles = "visible translate-y-0 opacity-100";
const closedMenuStyles = "invisible pointer-events-none -translate-y-2 opacity-0 lg:pointer-events-auto";

export default function MobileMenu({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navRef = useRef<HTMLElement>(null);

    // Event listener setup for handling clicks, key presses, focus changes, scrolling, and breakpoint changes
    useEffect(() => {
        if (!isOpen) return;
        // ... comprehensive event handling
    }, [isOpen]);

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                aria-expanded={isOpen}
                aria-controls="primary-navigation"
                // ... hamburger menu button
            >
                {/* Animated hamburger icon */}
            </button>
            <nav ref={navRef} id="primary-navigation" className={`${menuStyles} ${isOpen ? openMenuStyles : closedMenuStyles}`}>
                {children}
            </nav>
        </>
    );
}
```

**Features:**
- ✅ Responsive hamburger menu (mobile only, hidden on desktop)
- ✅ Animated hamburger icon with smooth transitions
- ✅ Click outside to close
- ✅ Escape key to close
- ✅ Focus management
- ✅ Scroll to close
- ✅ Breakpoint detection
- ✅ Full accessibility (aria labels, focus management)
- ✅ Comprehensive event handling

---

## 5. Component Type Imports

### BEFORE ❌
```typescript
// src/components/projects/ProjectList.tsx
import type { Project } from "./ProjectCard";

// src/components/projects/ProjectCard.tsx
export interface Project {
    lastUpdated: string;
    title: string;
    // ... properties
}
```

### AFTER ✅
```typescript
// src/components/projects/ProjectList.tsx
import type { Project } from "@/src/types/projects-types";

// src/components/projects/ProjectCard.tsx
import type { Project } from "@/src/types/projects-types";
```

---

## Summary of Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Type Location** | Scattered across files | Centralized in `src/types/` |
| **API Code** | Complex with NextResponse | Clean and simple Response.json() |
| **Navigation** | Flat structure, no mobile menu | Mobile menu with hamburger icon |
| **Code Organization** | Inline styles | Extracted to constants |
| **Documentation** | Minimal comments | Comprehensive comments |
| **Maintainability** | Harder to track types | Single source of truth |
| **Mobile Experience** | Basic | Full responsive mobile menu |
| **Code Consistency** | Varied | Matches sacrament-meetings |

---

## Mobile Menu Features

### Desktop View (≥ 64rem)
- Navigation links displayed inline
- Hamburger button hidden
- No dropdown menu

### Mobile View (< 64rem)
- Hamburger menu button visible
- Navigation links in dropdown
- Smooth animations
- Click outside to close
- Escape key support
- Scroll to close
- Focus management
