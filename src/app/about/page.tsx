import { Suspense } from "react";
import type { Metadata } from "next";
import TimelineLoader from "@/src/components/about/TimelineLoader";
import CredentialListLoader from "@/src/components/about/CredentialListLoader";
import SectionLoading from "@/src/components/behaviors/SectionLoading";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Marco Sandoval's background and the milestones along the way.",
};

export default function About() {
    return (
        <main className="mx-auto min-h-[calc(100vh-10rem)] w-[calc(100%-2rem)] max-w-6xl py-[clamp(2.5rem,6vw,5rem)]">
            <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                A little background
            </p>
            <h1 className="m-0 text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.08] text-foreground">
                About Me
            </h1>
            <p className="mt-5 max-w-[42rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                I am Marco Sandoval, a full-stack developer passionate about
                creating interactive and dynamic web applications.
            </p>
            <p className="mt-4 max-w-[42rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                My biggest problem is that I want to learn everything about
                everything. I want to create beautiful art that makes you feel.
                I want to create games, experiences, and stories that captivate.
                I want to make real life Tron!
            </p>
            <p className="mt-4 max-w-[42rem] text-[clamp(1rem,2vw,1.2rem)] text-muted">
                Though I may have an insatiable curiosity, I will master all the
                things time allows me to do... one step at a time.
            </p>
            <section className="mt-[clamp(3rem,7vw,5rem)]">
                <div className="mb-6">
                    <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                        Credentials
                    </p>
                    <h2 className="m-0 text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                        Awards and education
                    </h2>
                </div>
                <Suspense fallback={<SectionLoading label="Loading credentials..." />}>
                    <CredentialListLoader />
                </Suspense>
            </section>
            <section className="mt-[clamp(3rem,7vw,5rem)]">
                <div className="mb-6">
                    <p className="mb-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.15em] text-accent-bright">
                        The milestones
                    </p>
                    <h2 className="m-0 text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] text-foreground">
                        My learning timeline
                    </h2>
                </div>
                <Suspense fallback={<SectionLoading label="Loading milestones..." />}>
                    <TimelineLoader />
                </Suspense>
            </section>
        </main>
    );
}
