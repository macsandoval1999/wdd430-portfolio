// The component calculates the current year dynamically using JavaScript's Date object, ensuring the copyright year is always up to date.
// The footer is designed to be simple and reusable across different pages of the application.

export default async function Footer() {
    // "use cache" prerenders the year (cacheComponents is enabled), avoiding the blocking new Date() error.
    "use cache";

    return (
        <footer className="mt-8 border-t-2 border-border bg-surface px-4 py-6 text-center text-muted">
            <p className="m-0">
                Copyright &copy; {new Date().getFullYear()} | Marco Sandoval |
                All rights reserved
            </p>
        </footer>
    );
}
