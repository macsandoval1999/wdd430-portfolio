import SubNavLinks from "@/src/components/layout/SubNavLinks";

const projectSections = [
    { href: "/projects", label: "Overview" },
    { href: "/projects/school", label: "School Projects" },
    { href: "/projects/opensource", label: "Open Source" },
];

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto min-h-[calc(100vh-10rem)] w-[calc(100%-2rem)] max-w-6xl py-[clamp(2.5rem,6vw,5rem)]">
            <SubNavLinks links={projectSections} label="Project categories" />
            {children}
        </main>
    );
}