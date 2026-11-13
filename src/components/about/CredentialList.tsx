import CredentialCard from "./CredentialCard";
import type { Credential } from "@/src/types/about-types";

interface CredentialListProps {
    credentials: Credential[];
}

function getDateTimestamp(date: string | null): number | undefined {
    if (!date) return undefined;

    const parts = date.split("/").map(Number);
    if (
        (parts.length !== 2 && parts.length !== 3) ||
        parts.some(Number.isNaN)
    ) {
        return undefined;
    }

    const [month, dayOrYear, maybeYear] = parts;
    let day = dayOrYear;
    let year = dayOrYear;
    if (maybeYear === undefined) {
        day = 1;
    } else {
        year = maybeYear;
    }
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

export default function CredentialList({ credentials }: CredentialListProps) {
    const sortedCredentials = [...credentials].sort((a, b) => {
        if (a.completed !== b.completed) {
            if (a.completed) {
                return -1;
            }
            return 1;
        }

        let aDateValue = a.expectedDate;
        if (a.completed) {
            aDateValue = a.completedDate;
        }
        let bDateValue = b.expectedDate;
        if (b.completed) {
            bDateValue = b.completedDate;
        }
        const aDate = getDateTimestamp(aDateValue);
        const bDate = getDateTimestamp(bDateValue);

        if (aDate === undefined && bDate !== undefined) return 1;
        if (aDate !== undefined && bDate === undefined) return -1;
        if (aDate !== undefined && bDate !== undefined && aDate !== bDate) {
            if (a.completed) {
                return bDate - aDate;
            }
            return aDate - bDate;
        }

        if (!a.completed && aDate !== undefined && bDate !== undefined) {
            if (a.type !== b.type) {
                if (a.type === "certificate") {
                    return -1;
                }
                return 1;
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
                <li key={credential.id}>
                    <CredentialCard credential={credential} />
                </li>
            ))}
        </ul>
    );
}