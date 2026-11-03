import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b-2 border-accent bg-surface shadow-[0_4px_0_#090609]">
            <div className="mx-auto flex min-h-20 w-[calc(100%-2rem)] max-w-6xl items-center justify-between gap-6 max-[640px]:min-h-[4.5rem] max-[640px]:flex-wrap max-[640px]:justify-center max-[640px]:gap-x-6 max-[640px]:gap-y-1 max-[640px]:py-3">
                <Link
                    href="/"
                    className="text-[1.35rem] font-bold tracking-[0.025em] text-foreground no-underline transition-colors duration-150 hover:text-accent-bright focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
                >
                    Marco Sandoval
                </Link>
                <nav aria-label="Main navigation">
                    <ul className="m-0 flex list-none gap-6 p-0">
                        <li>
                            <Link
                                href="/"
                                className="relative inline-block font-mono text-[0.9rem] text-muted no-underline transition-colors duration-150 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent-bright after:transition-transform after:duration-300 hover:text-accent-bright hover:after:scale-x-100 focus-visible:text-accent-bright focus-visible:after:scale-x-100 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright motion-reduce:after:transition-none"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="relative inline-block font-mono text-[0.9rem] text-muted no-underline transition-colors duration-150 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent-bright after:transition-transform after:duration-300 hover:text-accent-bright hover:after:scale-x-100 focus-visible:text-accent-bright focus-visible:after:scale-x-100 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent-bright motion-reduce:after:transition-none"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
