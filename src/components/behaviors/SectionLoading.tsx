// SectionLoading component: displays a loading skeleton for different sections (projects, credentials, milestones)



// 1. First we define the props for the SectionLoading component, including the label and variant. 
/* We need a label for accessibility purposes so that screen readers can announce the loading state of the section.
    We also need a variant to determine which type of section is being loaded. */
interface SectionLoadingProps {
    label: string;
    variant: "projects" | "credentials" | "milestones";
}



// 2. There's many different ways to create a loading skeleton, but here we use a simple pulsing background effect. We will apply this effect to the skeleton elements in the actual SkeletonCard component.
const skeleton = "motion-safe:animate-pulse bg-border";



// 3. Next we define the SkeletonCard component, which renders the actual skeleton elements based on the variant.
function SkeletonCard({ variant }: { variant: SectionLoadingProps["variant"] }) {
    // First we check if the variant is "milestones" and render the corresponding skeleton. The skeleton in this case has a slightly different layout to match the milestones section. Its just a bunch of divs with the pulsing background effect applied.
    if (variant === "milestones") {
        return (
            <div className="border-2 border-border bg-surface p-6 shadow-[4px_4px_0_#090609]">
                <div className={`mb-4 h-4 w-24 ${skeleton}`} />
                <div className={`mb-3 h-7 w-3/4 ${skeleton}`} />
                <div className={`h-4 w-full ${skeleton}`} />
                <div className={`mt-2 h-4 w-5/6 ${skeleton}`} />
            </div>
        );
    }
    // For all other variants, we render a generic skeleton layout. This layout is used for both "projects" and "credentials" sections.
    return (
        <div className="border-2 border-border bg-surface p-6 shadow-[4px_4px_0_#090609]">
            <div className={`mb-4 h-4 w-28 ${skeleton}`} />
            <div className={`mb-3 h-7 w-3/4 ${skeleton}`} />
            <div className={`h-4 w-full ${skeleton}`} />
            <div className={`mt-2 h-4 w-5/6 ${skeleton}`} />
            {/* Additional skeleton elements specific to the variant can be added here. In this case, we add an extra element for the "projects" variant just to show you again that you can customize the skeleton based on the section type. */}
            {variant === "projects" && (
                <div className={`mt-5 h-4 w-2/5 ${skeleton}`} />
            )}
        </div>
    );
}



// 4. Finally, we define the SectionLoading component, which uses the SkeletonCard component to render the loading skeletons for the specified section variant. This is the component that will be used in the actual sections of the page to indicate loading state. It bundles everything together and provides the necessary accessibility attributes.
export default function SectionLoading({ label, variant }: SectionLoadingProps) {
    return (
        <div role="status" aria-label={label} aria-live="polite">
            <span className="sr-only">{label}</span>
            <div className="grid grid-cols-1 gap-4 min-[641px]:grid-cols-2">
                {Array.from({ length: 2 }, (_, index) => (
                    <SkeletonCard key={index} variant={variant} />
                ))}
            </div>
        </div>
    );
}
