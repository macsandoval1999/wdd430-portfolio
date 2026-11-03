import type { Metadata } from "next";
import Timeline from "@/components/Timeline";
import type { Milestone } from "@/components/MilestoneCard";
import CredentialList from "@/components/credentialList";
import type { Credential } from "@/components/credentialCard";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Marco Sandoval's background and the milestones along the way.",
};

const milestones: Milestone[] = [
    {
        title: "Completed CSE 341",
        courseName: "Web Services",
        description:
            "Web Services course covering server-side development with Node.js and Express.",
        keyWords: ["Node.js", "Express", "APIs", "git", "Postman", "REST", "MongoDB", "Mongoose"],
        milestoneType: "course",
        completionDate: "10-16-2026",
    },
    {
        title: "Completed WDD 330",
        courseName: "Front-End Development II",
        description:
            "Front-end development course focusing on modern web technologies.",
        keyWords: ["HTML", "CSS", "JavaScript", "APIs", "git", "Node.js"],
        milestoneType: "course",
        completionDate: "02-18-2026",
    },
    {
        title: "Completed WDD 231",
        courseName: "Front-End Development I",
        description:
            "Front-end development course focusing on modern web technologies.",
        keyWords: ["HTML", "CSS", "JavaScript", "APIs", "git"],
        milestoneType: "course",
        completionDate: "12-10-2025",
    },
    {
        title: "Completed CSE 340",
        courseName: "Web Backend Development",
        description:
            "Web backend development course focusing on server-side technologies.",
        keyWords: ["Node.js", "Express", "APIs", "git", "EJS", "pgAdmin", "PostgreSQL"],
        milestoneType: "course",
        completionDate: "04-14-2026",
    },
    {
        title: "Completed CSE 210",
        courseName: "Programming With Classes",
        description:
            "Programming with classes course focusing on object-oriented programming concepts.",
        keyWords: ["C#", "git", ".NET"],
        milestoneType: "course",
        completionDate: "08-12-2025",
    },
    {
        title: "Completed WDD 131",
        courseName: "Dynamic Web Fundamentals",
        description:
            "Dynamic web fundamentals course focusing on building interactive web applications.",
        keyWords: ["HTML", "CSS", "JavaScript", "git"],
        milestoneType: "course",
        completionDate: "10-15-2025",
    },
    {
        title: "Completed WDD 130",
        courseName: "Web Fundamentals",
        description:
            "Introduction to web development course covering the basics of HTML, and CSS.",
        keyWords: ["HTML", "CSS", "git"],
        milestoneType: "course",
        completionDate: "04-16-2025",
    },
    {
        title: "Completed CSE 111",
        courseName: "Programming with Functions",
        description:
            "Introduction to programming course covering basic programming concepts and problem-solving techniques.",
        keyWords: ["Python 3"],
        milestoneType: "course",
        completionDate: "02-19-2025",
    },
    {
        title: "Completed CSE 110",
        courseName: "Programming Building Blocks",
        description:
            "Introduction to programming course covering fundamental programming concepts and building blocks.",
        keyWords: ["Python 3"],
        milestoneType: "course",
        completionDate: "12-10-2024",
    },
    {
        title: "Completed ITM 111",
        courseName: "Introduction to Databases",
        description:
            "Introduction to databases course covering basic database concepts and SQL.",
        keyWords: ["SQL", "mySQL"],
        milestoneType: "course",
        completionDate: "08-12-2024",
    },
    {
        title: "Received Web and Computer Programming Certification",
        milestoneId: "web-and-computer-programming-certification",
        certificationName: "Web and Computer Programming Certification",
        description:
            "Received certification for completing the Web and Computer Programming program.",
        keyWords: ["Frontend Web Development", "Programming", "Object-Oriented Programming"],
        milestoneType: "certification",
        completionDate: "12-13-2025"
    }
];

const credentials: Credential[] = [
    {
        name: "Web and Computer Programming Certification",
        type: "certificate",
        completed: true,
        completedDate: "12/13/2025",
        milestoneId: "web-and-computer-programming-certification",
    },
    {
        name: "Associate degree in Software Development (in progress)",
        type: "degree",
        completed: false,
        expectedDate: "12/2026"
    },
    {
        name: "Bachelor's degree in Software Engineering (in progress)",
        type: "degree",
        completed: false,
        expectedDate: "12/2027"
    },
    {
        name: "Web Development Certification",
        type: "certificate",
        completed: false,
        expectedDate: "12/2026"
    },
    {
        name: "Software Development Certification",
        type: "certificate",
        completed: false,
        expectedDate: "12/2027"
    }
];

export default function About() {
    return (
        <main className="mx-auto min-h-[calc(100vh-10rem)] w-[calc(100%-2rem)] max-w-6xl py-[clamp(2.5rem,6vw,5rem)]">
            <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                A little background
            </p>
            <h1 className="m-0 text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.08] text-foreground">
                About Me
            </h1>
            <p className="mt-5 max-w-[42rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                I am Marco Sandoval, a full-stack developer passionate about
                creating interactive and dynamic web applications.
            </p>
            <p className="mt-4 max-w-[42rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                My biggest problem is that I want to learn everything about
                everything. I want to create beautiful art that makes you feel.
                I want to create games, experiences, and stories that captivate.
                I want to make real life Tron!
            </p>
            <p className="mt-4 max-w-[42rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                Though I may have an insatiable curiosity, I will master all the
                things time allows me to do... one step at a time.
            </p>
            <section className="mt-[clamp(3rem,7vw,5rem)]">
                <div className="mb-6">
                    <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                        Credentials
                    </p>
                    <h2 className="m-0 text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                        Awards and education
                    </h2>
                </div>
                <CredentialList credentials={credentials} />
            </section>
            <section className="mt-[clamp(3rem,7vw,5rem)]">
                <div className="mb-6">
                    <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                        The milestones
                    </p>
                    <h2 className="m-0 text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                        My learning timeline
                    </h2>
                </div>
                <Timeline milestones={milestones} />
            </section>
        </main>
    );
}
