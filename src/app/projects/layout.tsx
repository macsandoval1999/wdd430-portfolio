import SubNavLinks from "@/src/components/layout/SubNavLinks";
import Link from "next/link";
import { Suspense } from "react";

const projectSections = [
    { href: "/projects", label: "Overview" },
    { href: "/projects/all", label: "All Projects" },
    { href: "/projects/school", label: "School Projects" },
    { href: "/projects/opensource", label: "Open Source" },
];

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto min-h-[calc(100vh-10rem)] w-[calc(100%-2rem)] max-w-6xl py-[clamp(2.5rem,6vw,5rem)]">
            <Suspense fallback={<p className="mb-8 font-mono text-sm text-muted">Loading project navigation...</p>}>
                <SubNavLinks links={projectSections} label="Project categories" />
            </Suspense>
            <div className="mb-8">
                <Link href="/projects/create" className="inline-block border-2 border-accent bg-accent px-4 py-2 font-mono text-sm font-bold text-[#fff7f2] no-underline shadow-[4px_4px_0_#090609] hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright">
                    Create project
                </Link>
            </div>
            {children}
        </main>
    );
}