import CredentialSymbol from "./CredentialSymbol";

export interface Milestone {
    title: string;
    milestoneId?: string;
    courseName?: string;
    certificationName?: string;
    description: string;
    keyWords: string[];
    projectLink?: string;
    milestoneType?: "course" | "certification"| "degree";
    completionDate: string;
}

interface MilestoneCardProps extends Milestone {
    milestoneNumber: number;
}

// The component uses destructuring to access props directly in the function parameters.
export default function MilestoneCard({
    title,
    milestoneId,
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
        <article
            id={milestoneId}
            className={
                isCertification
                    ? "scroll-mt-6 relative min-w-0 border-2 border-accent border-l-[5px] bg-[linear-gradient(135deg,#35161f,var(--surface))] p-[1.4rem] pt-[3.2rem] shadow-[4px_4px_0_#090609] transition duration-200 ease-out hover:-translate-y-1 hover:border-accent-bright hover:shadow-[6px_6px_0_#090609] motion-reduce:transition-none min-[641px]:col-span-2 [&_strong]:text-foreground"
                    : "scroll-mt-6 relative min-w-0 border-2 border-l-[5px] border-border border-l-accent bg-surface p-[1.4rem] pt-[3.2rem] shadow-[4px_4px_0_#090609] transition duration-200 ease-out hover:-translate-y-1 hover:border-accent-bright hover:shadow-[6px_6px_0_#090609] motion-reduce:transition-none [&_strong]:text-foreground"
            }
        >
            <span className="absolute left-3 top-3">
                <CredentialSymbol
                    type={isCertification ? "certificate" : "course"}
                />
            </span>
            <span className="absolute right-3 top-3 border border-accent bg-[#35161f] px-[0.55rem] py-[0.15rem] font-mono text-[0.8rem] font-bold text-accent-bright">
                #{milestoneNumber}
            </span>
            {isCertification && (
                <p className="!mt-0 font-mono text-[0.8rem] font-bold uppercase tracking-[0.1em] text-accent-bright">
                    Certification Earned
                </p>
            )}
            <p className="my-[0.6rem] font-mono text-[0.85rem] text-muted">
                <strong>Completion Date:</strong> {completionDate}
            </p>
            <h3 className="mb-[0.65rem] mt-0 text-[1.35rem] leading-[1.3] text-foreground">
                {title}
            </h3>
            {courseName && milestoneType === "course" && (
                <p className="my-[0.6rem] text-muted">
                    <strong>Course Name:</strong> {courseName}
                </p>
            )}
            {certificationName && milestoneType === "certification" && (
                <p className="my-[0.6rem] text-muted">
                    <strong>Certification Name:</strong> {certificationName}
                </p>
            )}
            <p className="my-[0.6rem] text-muted">{description}</p>
            <p className="my-[0.6rem] font-mono text-[0.85rem] text-muted">
                <strong>Key Words:</strong> {keyWords.join(", ")}
            </p>
            {projectLink && (
                <p className="my-[0.6rem] text-muted">
                    <strong>Project Link:</strong>{" "}
                    <a
                        href={projectLink}
                        className="text-accent-bright [text-decoration-thickness:1px] underline-offset-[0.2em] transition-colors duration-150 hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                    >
                        {projectLink}
                    </a>
                </p>
            )}
        </article>
    );
}
