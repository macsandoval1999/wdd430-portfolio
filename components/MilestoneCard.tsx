// This component can be reused for multiple milestones by passing different prop values.

// The MilestoneCardProps interface defines the expected props for the component, providing type safety and documentation.
interface MilestoneCardProps {
    title: string;
    courseName?: string;
    certificationName?: string;
    description: string;
    keyWords: string[];
    projectLink?: string;
    milestoneType?: "course" | "certification";
    completionDate: string;
    milestoneNumber: number;
}

// The component uses destructuring to access props directly in the function parameters.
export default function MilestoneCard({
    title,
    courseName,
    certificationName,
    milestoneType,
    description,
    keyWords,
    projectLink,
    completionDate,
    milestoneNumber,
}: MilestoneCardProps) {
    const isCertification = milestoneType === "certification";

    return (
        // Certifications span the full grid row (md:col-span-2) and get a gold, celebratory style; other milestones keep the standard card.
        <article
            className={
                isCertification
                    ? "md:col-span-2 p-6 border-2 border-amber-500 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 rounded-lg shadow-lg relative"
                    : "p-4 border-l-4 border-blue-600 bg-gray-50 rounded relative"
            }
        >
            <span className="absolute top-2 right-2 text-sm font-bold text-white bg-blue-700 rounded-full px-3 py-1">
                #{milestoneNumber}
            </span>
            {isCertification && (
                <p className="text-amber-900 font-bold uppercase tracking-wide text-sm">
                    <span aria-hidden="true">🎉 🏆 🎓 </span>
                    Certification Earned
                </p>
            )}
            <p className="mt-2 text-sm text-gray-700">
                <strong>Completion Date:</strong> {completionDate}
            </p>
            <h3
                className={
                    isCertification
                        ? "text-3xl text-gray-900 font-extrabold mb-2"
                        : "text-xl text-gray-900 font-bold mb-2"
                }
            >
                {title}
            </h3>
            {courseName && milestoneType === "course" && <p className="text-gray-700 mb-1"><strong>Course Name:</strong> {courseName}</p>}
            {certificationName && milestoneType === "certification" && <p className="text-gray-700 mb-1"><strong>Certification Name:</strong> {certificationName}</p>}
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
