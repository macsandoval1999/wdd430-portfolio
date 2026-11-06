import type { Project } from "./ProjectCard";

export const schoolProjects: Project[] = [
    {
        lastUpdated: "10/26/2026",
        title: "Trips Booking Website",
        description:
            "A full-stack Node.js and Express application for managing trips and bookings, with a focus on backend development, database management, and frontend-backend integration.",
        technologies: [
            "Node.js",
            "Express",
            "JavaScript",
            "CSS",
            "MongoDB",
            "Mongoose",
            "REST APIs",
        ],
        repository:
            "https://github.com/macsandoval1999/cse341-team-project-my-copy",
        website: "https://cse341-team-project-back-up.onrender.com",
        course: "CSE 341",
    },
    {
        lastUpdated: "12/11/2025",
        title: "Car Dealership Website",
        description:
            "A static dealership website built to practice presenting business information with a clean, responsive web experience.",
        technologies: ["HTML", "CSS", "JavaScript"],
        repository: "https://github.com/macsandoval1999/wdd231/tree/main/final",
        website: "https://macsandoval1999.github.io/wdd231/final/index.html",
        course: "WDD 231",
    },
    {
        lastUpdated: "11/30/2025",
        title: "City Chamber Website",
        description:
            "A community-focused chamber website with local information and a small integration with a third-party weather API.",
        technologies: ["HTML", "CSS", "JavaScript", "Third-party API"],
        repository:
            "https://github.com/macsandoval1999/wdd231/tree/main/chamber",
        website: "https://macsandoval1999.github.io/wdd231/chamber/index.html",
        course: "WDD 231",
    },
    {
        lastUpdated: "02/14/2026",
        title: "Interactive Solar System Website",
        description:
            "An interactive solar system experience for exploring planets and their orbits, with data from third-party APIs.",
        technologies: ["HTML", "CSS", "JavaScript", "Third-party APIs"],
        repository: "https://github.com/macsandoval1999/solarsys-expedition",
        website:
            "https://macsandoval1999.github.io/solarsys-expedition/index.html",
        course: "WDD 330",
    },
];

export const openSourceProjects: Project[] = [];

export const allProjects = [...schoolProjects, ...openSourceProjects];
