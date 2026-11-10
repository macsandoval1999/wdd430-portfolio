import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectListLoader from "@/src/components/projects/ProjectListLoader";
import SectionLoading from "@/src/components/behaviors/SectionLoading";

export default function Home() {
    return (
        <main className="mx-auto min-h-[calc(100vh-10rem)] w-[calc(100%-2rem)] max-w-6xl py-[clamp(2.5rem,6vw,5rem)]">
            <section className="grid grid-cols-1 items-center gap-[clamp(2rem,6vw,5rem)] border-2 border-border bg-[linear-gradient(135deg,var(--surface-raised),var(--surface))] p-[clamp(1.5rem,5vw,4rem)] text-center shadow-[8px_8px_0_#090609] min-[641px]:grid-cols-[minmax(0,1fr)_minmax(12rem,18rem)] min-[641px]:text-left">
                <div>
                    <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                        Full-Stack Developer
                    </p>
                    <h1 className="m-0 text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.08] text-foreground">
                        Marco Sandoval
                    </h1>
                    <p className="mt-5 max-w-[42rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                        Student at Brigham Young University-Idaho, pursuing a
                        degree in Software Engineering.
                    </p>
                    <p className="mt-4 max-w-[42rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                        Experienced in Frontend and Backend development,
                        Object-Oriented Programming, MVC structures, RESTful
                        APIs, Databases, and Version Control.
                    </p>
                    <p className="mt-4 max-w-[42rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                        Currently learning Next.js, React, and TypeScript.
                    </p>

                    <Link
                        href="/about"
                        className="mt-6 inline-block border-2 border-accent bg-accent px-4 py-[0.65rem] font-mono font-bold text-[#fff7f2] no-underline shadow-[4px_4px_0_#090609] transition duration-150 hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] hover:shadow-[6px_6px_0_#090609] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        Explore my journey
                    </Link>
                </div>
                <Image
                    src="/images/avatar.gif"
                    alt="Pixel art sprite of a dark red humanoid figure with glowing red eyes"
                    width={32}
                    height={32}
                    unoptimized
                    className="mx-auto block w-full max-w-72 border-4 border-accent bg-[#090609] [image-rendering:pixelated] shadow-[8px_8px_0_#090609] max-[640px]:row-start-1 max-[640px]:w-[min(65%,14rem)]"
                />
            </section>
            <section className="mt-[clamp(3rem,7vw,5rem)]">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                            Selected work
                        </p>
                        <h2 className="m-0 text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                            Recent projects
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        className="font-mono text-sm text-accent-bright underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        View all projects
                    </Link>
                </div>
                <Suspense fallback={<SectionLoading label="Loading projects..." />}>
                    <ProjectListLoader limit={2} />
                </Suspense>
            </section>

            <section
                className="mt-[clamp(3rem,7vw,5rem)] grid grid-cols-1 gap-5 min-[700px]:grid-cols-2"
                aria-label="Explore more"
            >
                <article className="flex flex-col items-start border-2 border-border bg-surface p-[clamp(1.5rem,4vw,2.5rem)] shadow-[4px_4px_0_#090609]">
                    <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                        Beyond the code
                    </p>
                    <h2 className="m-0 text-[clamp(1.5rem,4vw,2rem)] leading-[1.2] text-foreground">
                        Get to know me
                    </h2>
                    <p className="mb-6 mt-4 text-muted">
                        Learn about my background, the courses I’ve completed,
                        and the milestones shaping my path in software
                        engineering.
                    </p>
                    <Link
                        href="/about"
                        className="mt-auto border-2 border-accent bg-accent px-4 py-[0.65rem] font-mono font-bold text-[#fff7f2] no-underline shadow-[4px_4px_0_#090609] transition duration-150 hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        Learn more about me
                    </Link>
                </article>
                <article className="flex flex-col items-start border-2 border-border bg-surface p-[clamp(1.5rem,4vw,2.5rem)] shadow-[4px_4px_0_#090609]">
                    <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                        Selected work
                    </p>
                    <h2 className="m-0 text-[clamp(1.5rem,4vw,2rem)] leading-[1.2] text-foreground">
                        Explore my projects
                    </h2>
                    <p className="mb-6 mt-4 text-muted">
                        Browse the projects I’ve built for school and follow
                        along as I add new work and open-source contributions.
                    </p>
                    <Link
                        href="/projects"
                        className="mt-auto border-2 border-accent bg-accent px-4 py-[0.65rem] font-mono font-bold text-[#fff7f2] no-underline shadow-[4px_4px_0_#090609] transition duration-150 hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        View project overview
                    </Link>
                </article>
            </section>
        </main>
    );
}
