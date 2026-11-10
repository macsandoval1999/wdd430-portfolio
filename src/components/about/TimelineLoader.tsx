import Timeline from "./Timeline";
import { getAllMilestones } from "@/src/lib/about/milestones-db";

// Async Server Component: fetches milestones from the database, so wrap it in <Suspense> where it is used.
export default async function TimelineLoader() {
    const milestones = await getAllMilestones();
    return <Timeline milestones={milestones} />;
}
