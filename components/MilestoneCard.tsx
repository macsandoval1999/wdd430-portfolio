// This component can be reused for multiple milestones by passing different prop values.

// The MilestoneCardProps interface defines the expected props for the component, providing type safety and documentation.
interface MilestoneCardProps {
    title: string;
    courseName?: string;
    description: string;
    keyWords: string[];
    projectLink?: string;
    completionDate: string;
    milestoneNumber: number;
}

// The component uses destructuring to access props directly in the function parameters.
export default function MilestoneCard({
    title,
    courseName,
    description,
    keyWords,
    projectLink,
    completionDate,
    milestoneNumber,
}: MilestoneCardProps) {
    return (
        // Tailwind CSS classes are applied for styling, including padding, borders, background color, and typography.
        <article className="p-4 border-l-4 border-blue-600 bg-gray-50 rounded relative">
            <span className="absolute top-2 right-2 text-sm font-bold text-white bg-blue-600 rounded-full px-3 py-1">
                #{milestoneNumber}
            </span>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Completion Date:</strong> {completionDate}
            </p>
            <h3 className="text-xl text-gray-900 font-bold mb-2">{title}</h3>
            {courseName && <p className="text-gray-700 mb-1"><strong>Course Name:</strong> {courseName}</p>}
            <p className="text-gray-700 mb-3">{description}</p>
            <p className="text-sm text-gray-600">
                <strong>Key Words:</strong> {keyWords.join(", ")}
            </p>
            {projectLink && (
                <p className="text-sm text-gray-600">
                    <strong>Project Link:</strong> <a href={projectLink} className="text-blue-600 underline">{projectLink}</a>
                </p>
            )}
        </article>
    );
}
