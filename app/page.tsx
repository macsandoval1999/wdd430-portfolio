import Image from "next/image";
import Link from "next/link";
import ProjectList from "@/components/ProjectList";

const projects = [
    {
        lastUpdated: "10/26/2026",
        title: "Trips Booking Website",
        description:
            "A full-stack Node.js Express app for managing trips and bookings. Showcases my skills in backend development and database management. Also showcases my ability to integrate frontend and backend components.",
        technologies: [
            "Node.js",
            "Express",
            "JavaScript",
            "CSS",
            "MongoDB",
            "Mongoose",
            "REST",
            "API",
        ],
        repository:
            "https://github.com/macsandoval1999/cse341-team-project-my-copy",
        website: "https://cse341-team-project-back-up.onrender.com",
        course: "CSE341",
    },
    {
        lastUpdated: "12/11/2025",
        title: "Car Dealership Website",
        description:
            "A static website for a car dealership. Showcases my web development skills in building static websites with HTML, CSS, and JavaScript.",
        technologies: ["HTML", "CSS", "JavaScript"],
        repository: "https://github.com/macsandoval1999/wdd231/tree/main/final",
        website: "https://macsandoval1999.github.io/wdd231/final/index.html",
        course: "WDD231",
    },
    {
        lastUpdated: "11/30/2025",
        title: "City Chamber Website",
        description:
            "A website for the City Chamber, providing information and resources for the community. Showcases my web development skills in building static websites with HTML, CSS, and JavaScript. Tiny use of 3rd party APIs to display weather information.",
        technologies: ["HTML", "CSS", "JavaScript", "3rd Party API"],
        repository:
            "https://github.com/macsandoval1999/wdd231/tree/main/chamber",
        website: "https://macsandoval1999.github.io/wdd231/chamber/index.html",
        course: "WDD231",
    },
    {
        lastUpdated: "02/14/2026",
        title: "Interactive Solar System Website",
        description: "An interactive website that simulates the solar system, allowing users to explore planets and their orbits. Showcases my web development skills in building interactive websites with HTML, CSS, and JavaScript. Also integrates 3rd party APIs for solar system data.",
        technologies: ["HTML", "CSS", "JavaScript", "3rd Party APIs"],
        repository: "https://github.com/macsandoval1999/solarsys-expedition",
        website: "https://macsandoval1999.github.io/solarsys-expedition/index.html",
        course: "WDD330",
    },
];

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
                        Experienced in Frontend and Backend development, Object-Oriented Programming, MVC structures, RESTful APIs, Databases, and Version Control.
                    </p>
                    <p className="mt-4 max-w-[42rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                        Currently learning Next.js and React.
                    </p>

                    <Link
                        href="/about"
                        className="mt-6 inline-block border-2 border-accent bg-accent px-4 py-[0.65rem] font-mono font-bold text-[#fff7f2] no-underline shadow-[4px_4px_0_#090609] transition duration-150 hover:border-accent-bright hover:bg-accent-bright hover:text-[#170b0e] hover:shadow-[6px_6px_0_#090609] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        Explore my journey
                    </Link>
                </div>
                <Image
                    src="/avatar.gif"
                    alt="Pixel art sprite of a dark red humanoid figure with glowing red eyes"
                    width={32}
                    height={32}
                    unoptimized
                    className="mx-auto block w-full max-w-72 border-4 border-accent bg-[#090609] [image-rendering:pixelated] shadow-[8px_8px_0_#090609] max-[640px]:row-start-1 max-[640px]:w-[min(65%,14rem)]"
                />
            </section>
            <section className="mt-[clamp(3rem,7vw,5rem)]">
                <div className="mb-6">
                    <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                        Selected work
                    </p>
                    <h2 className="m-0 text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                        My Portfolio
                    </h2>
                </div>
                <ProjectList projects={projects} />
            </section>
        </main>
    );
}
