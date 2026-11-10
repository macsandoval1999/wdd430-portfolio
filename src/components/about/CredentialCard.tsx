import CredentialSymbol from "./CredentialSymbol";
import type { Credential } from "@/src/types/about-types";

interface CredentialCardProps {
    credential: Credential;
}

export default function CredentialCard({ credential }: CredentialCardProps) {
    const className = `flex min-h-28 flex-col justify-between gap-3 border-2 p-5 text-foreground shadow-[4px_4px_0_#090609] transition duration-200 ease-out hover:-translate-y-1 hover:border-accent-bright hover:shadow-[6px_6px_0_#090609] motion-reduce:transition-none ${
        credential.completed
            ? "border-accent bg-[linear-gradient(135deg,#35161f,var(--surface))]"
            : "border-border bg-surface"
    }`;
    const content = (
        <>
            <CredentialSymbol type={credential.type} />
            <span className="font-bold">{credential.name}</span>
            <span className="font-mono text-sm text-muted">
                {credential.completed
                    ? `Awarded: ${credential.completedDate}`
                    : `Expected: ${credential.expectedDate ?? "##/####"}`}
            </span>
        </>
    );

    if (credential.milestoneId) {
        return (
            <a
                href={`#${credential.milestoneId}`}
                className={`${className} text-inherit no-underline hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright`}
            >
                {content}
            </a>
        );
    }

    return <article className={className}>{content}</article>;
}