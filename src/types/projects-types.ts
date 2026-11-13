// Create a type to represent the different types of projects
// NOTE: A type is used to define a set of possible values for a variable.
export type ProjectType = "opensource" | "school";
export type ProjectSort = "recently_updated" | "title";
export type ProjectOrder = "asc" | "desc";
export type ProjectFilter = ProjectType | "all";

// Create an interface to represent a project
// NOTE: An interface is used to define the shape of an object, specifying the properties and their types.
// The primary key for this interface is the 'id' property, which uniquely identifies each project.
export interface Project {
    id: number;
    title: string;
    description: string;
    type: ProjectType;
    technologies: string[];
    website?: string | null;
    repository?: string | null;
    course?: string | null;
    last_updated: string;
}
