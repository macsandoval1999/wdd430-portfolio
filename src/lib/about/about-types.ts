// Types used by the credentials and milestones on the About page.
export type CredentialType = "certificate" | "degree";
export type MilestoneType = "course" | "certification" | "degree";

// The primary key for these interfaces is the numeric 'id'. 'milestoneId' is a separate
// slug used as the HTML anchor (e.g. #web-and-computer-programming-certification) that credentials link to.
// Nullable database columns come back as null when empty.
export interface Credential {
    id: number;
    name: string;
    type: CredentialType;
    completed: boolean;
    completedDate: string | null;
    expectedDate: string | null;
    milestoneId: string | null;
}

export interface Milestone {
    id: number;
    title: string;
    milestoneId: string | null;
    courseName: string | null;
    certificationName: string | null;
    description: string;
    keyWords: string[];
    projectLink: string | null;
    milestoneType: MilestoneType;
    completionDate: string;
}


/*
Types are used to define the structure of objects. Types can specify the shape of an object, including the types of its properties and whether they are optional or required. Types are imported into data handling files to ensure that the data conforms to the expected structure. They are also imported into components to provide type safety and autocompletion when accessing object properties.
*/