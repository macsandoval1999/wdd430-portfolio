// The Timeline component renders a list of MilestoneCard components, passing milestone data as props.
import MilestoneCard from "./MilestoneCard";

// The Milestone interface defines the shape of a single milestone object, including optional project link property.
export interface Milestone {
    title: string;
    courseName?: string;
    certificationName?: string;
    milestoneType?: "course" | "certification";
    description: string;
    keyWords: string[];
    projectLink?: string;
    completionDate: string;
}

// The MilestoneListProps interface defines the expected structure of the milestones array.
interface MilestoneListProps {
    milestones: Milestone[];
}

// Tailwind CSS classes are applied to create a responsive grid layout for the milestone cards.
export default function Timeline({ milestones }: MilestoneListProps) {
    // Copy before sorting so the prop array isn't mutated; newest completionDate first.
    const sortedMilestones = [...milestones].sort(
        (a, b) =>
            new Date(b.completionDate).getTime() -
            new Date(a.completionDate).getTime()
    );

    return (
        <section className="grid gap-4 md:grid-cols-2">
            {/* The component uses the JavaScript map() method to iterate over the milestones array and render a MilestoneCard for each milestone. */}
            {sortedMilestones.map((milestone, index) => (
                // The number is derived from the sorted position (oldest = 1), so adding an earlier milestone renumbers the rest automatically.
                <MilestoneCard
                    key={milestone.title}
                    {...milestone}
                    milestoneNumber={sortedMilestones.length - index}
                />
            ))}
        </section>
    );
}
