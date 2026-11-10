interface SectionLoadingProps {
    label: string;
}

// Fallback shown by <Suspense> while a section's data is loading from the database.
export default function SectionLoading({ label }: SectionLoadingProps) {
    return (
        <div
            className="border-2 border-border bg-surface p-[clamp(1.5rem,4vw,2.5rem)] font-mono text-muted shadow-[4px_4px_0_#090609]"
            role="status"
            aria-live="polite"
        >
            {label}
        </div>
    );
}
