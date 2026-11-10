import MilestoneCard from "./MilestoneCard";
import type { Milestone } from "@/src/types/about-types";

// The MilestoneListProps interface defines the expected structure of the milestones array.
interface MilestoneListProps {
    milestones: Milestone[];
}

export default function Timeline({ milestones }: MilestoneListProps) {
    // Copy before sorting so the prop array isn't mutated; newest completionDate first.
    const sortedMilestones = [...milestones].sort(
        (a, b) =>
            new Date(b.completionDate).getTime() -
            new Date(a.completionDate).getTime()
    );

    return (
        <section
            className="grid grid-cols-1 gap-4 min-[641px]:grid-cols-2"
            aria-label="Learning milestones"
        >
            {/* The component uses the JavaScript map() method to iterate over the milestones array and render a MilestoneCard for each milestone. */}
            {sortedMilestones.map((milestone, index) => (
                // The number is derived from the sorted position (oldest = 1), so adding an earlier milestone renumbers the rest automatically.
                <MilestoneCard
                    key={milestone.id}
                    {...milestone}
                    milestoneNumber={sortedMilestones.length - index}
                />
            ))}
        </section>
    );
}
