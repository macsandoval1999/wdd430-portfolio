import Timeline from "@/components/Timeline";

const milestones = [
    {
        title: "Completed CSE 341",
        courseName: "Web Services",
        description:
            "Web Services course covering server-side development with Node.js and Express.",
        keyWords: ["Node.js", "Express", "APIs", "git", "Postman", "REST", "MongoDB", "Mongoose"],
        completionDate: "10-16-2026",
    },
    {
        title: "Completed WDD 330",
        courseName: "Front-End Development II",
        description:
            "Front-end development course focusing on modern web technologies.",
        keyWords: ["HTML", "CSS", "JavaScript", "APIs", "git", "Node.js"],
        completionDate: "02-18-2026",
    },
    {
        title: "Completed WDD 231",
        courseName: "Front-End Development I",
        description:
            "Front-end development course focusing on modern web technologies.",
        keyWords: ["HTML", "CSS", "JavaScript", "APIs", "git"],
        completionDate: "12-10-2025",
    },
    {
        title: "Completed CSE 340",
        courseName: "Web Backend Development",
        description:
            "Web backend development course focusing on server-side technologies.",
        keyWords: ["Node.js", "Express", "APIs", "git", "EJS", "pgAdmin", "PostgreSQL"],
        completionDate: "04-14-2026",
    },
    {
        title: "Completed CSE 210",
        courseName: "Programming With Classes",
        description:
            "Programming with classes course focusing on object-oriented programming concepts.",
        keyWords: ["C#", "git", ".NET"],
        completionDate: "08-12-2025",
    },
    {
        title: "Completed WDD 131",
        courseName: "Dynamic Web Fundamentals",
        description:
            "Dynamic web fundamentals course focusing on building interactive web applications.",
        keyWords: ["HTML", "CSS", "JavaScript", "git"],
        completionDate: "10-15-2025",
    },
    {
        title: "Completed WDD 130",
        courseName: "Web Fundamentals",
        description:
            "Introduction to web development course covering the basics of HTML, and CSS.",
        keyWords: ["HTML", "CSS", "git"],
        completionDate: "04-16-2025",
    },
    {
        title: "Completed CSE 111",
        courseName: "Programming with Functions",
        description:
            "Introduction to programming course covering basic programming concepts and problem-solving techniques.",
        keyWords: ["Python 3"],
        completionDate: "12-10-2024",
    },
    {
        title: "Completed CSE 110",
        courseName: "Programming Building Blocks",
        description:
            "Introduction to programming course covering fundamental programming concepts and building blocks.",
        keyWords: ["Python 3"],
        completionDate: "02-19-2025",
    },
    {
        title: "Completed ITM 111",
        courseName: "Introduction to Databases",
        description:
            "Introduction to databases course covering basic database concepts and SQL.",
        keyWords: ["SQL", "mySQL"],
        completionDate: "08-12-2024",
    }
];

export default function About() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-gray-700">
                This about page shares more information about my background and
                work.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Timeline</h2>
            <div className="grid gap-4 md:grid-cols-1">
                <Timeline milestones={milestones} />
            </div>
        </main>
    );
}


