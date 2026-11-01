// The component calculates the current year dynamically using JavaScript's Date object, ensuring the copyright year is always up to date.
// The footer is designed to be simple and reusable across different pages of the application.

export default async function Footer() {
    // "use cache" prerenders the year (cacheComponents is enabled), avoiding the blocking new Date() error.
    "use cache";

    return (
        <footer className="bg-gray-800 text-white py-4 mt-12">
            <div className="container mx-auto text-center">
                <p>
                    Copyright &copy; {new Date().getFullYear()} | Marco Sandoval | All rights reserved
                </p>
            </div>
        </footer>
    );
}
