import type { MilestoneType } from "../../types/about-types";

const MILESTONE_TYPES: readonly MilestoneType[] = [
    "course",
    "certification",
    "degree",
];

export function isMilestoneType(value: unknown): value is MilestoneType {
    if (!MILESTONE_TYPES.includes(value as MilestoneType)) {
        return false;
    }

    return true;
}

// Returns the id as a number only if it is a positive integer (e.g. "12"), otherwise null.
export function parseId(value: string): number | null {
    if (!/^\d+$/.test(value)) {
        return null;
    }
    const id = Number(value);
    if (!Number.isSafeInteger(id) || id <= 0) {
        return null;
    }

    return id;
}
