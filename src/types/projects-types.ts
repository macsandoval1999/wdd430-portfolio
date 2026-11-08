// Create a type to represent the different types of projects
// NOTE: A type is used to define a set of possible values for a variable.
export type ProjectType = "opensource" | "school";

// Create an interface to represent a project
// NOTE: An interface is used to define the shape of an object, specifying the properties and their types.
// The primary key for this interface is the 'id' property, which uniquely identifies each project.
export interface Project {
    id: number;
    title: string;
    description: string;
    type: ProjectType;
    technologies: string[];
    website?: string;
    repository?: string;
    course?: string;
    lastUpdated: string;
}
