import CredentialCard, { type Credential } from "./CredentialCard";

interface CredentialListProps {
    credentials: Credential[];
}

function getDateTimestamp(date: string | undefined): number | undefined {
    if (!date) return undefined;

    const parts = date.split("/").map(Number);
    if (
        (parts.length !== 2 && parts.length !== 3) ||
        parts.some(Number.isNaN)
    ) {
        return undefined;
    }

    const [month, dayOrYear, maybeYear] = parts;
    const day = maybeYear === undefined ? 1 : dayOrYear;
    const year = maybeYear ?? dayOrYear;
    const timestamp = Date.UTC(year, month - 1, day);
    const parsedDate = new Date(timestamp);

    if (
        parsedDate.getUTCFullYear() !== year ||
        parsedDate.getUTCMonth() !== month - 1 ||
        parsedDate.getUTCDate() !== day
    ) {
        return undefined;
    }

    return timestamp;
}

export default function CredentialList({
    credentials,
}: CredentialListProps) {
    const sortedCredentials = [...credentials].sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? -1 : 1;

        const aDate = getDateTimestamp(
            a.completed ? a.completedDate : a.expectedDate
        );
        const bDate = getDateTimestamp(
            b.completed ? b.completedDate : b.expectedDate
        );

        if (aDate === undefined && bDate !== undefined) return 1;
        if (aDate !== undefined && bDate === undefined) return -1;
        if (aDate !== undefined && bDate !== undefined && aDate !== bDate) {
            return a.completed ? bDate - aDate : aDate - bDate;
        }

        if (!a.completed && aDate !== undefined && bDate !== undefined) {
            if (a.type !== b.type) {
                return a.type === "certificate" ? -1 : 1;
            }
        }

        return 0;
    });

    return (
        <ul
            className="m-0 grid list-none grid-cols-1 gap-4 p-0 min-[641px]:grid-cols-2"
            aria-label="Credentials"
        >
            {sortedCredentials.map((credential) => (
                <li key={credential.name}>
                    <CredentialCard credential={credential} />
                </li>
            ))}
        </ul>
    );
}