// import Link from 'next/link' brings in Next.js navigation so route changes happen without full page reloads.
import Link from "next/link";


// export default function Header() defines a reusable component that can be imported.
export default function Header() {
    return (
        // The returned JSX uses semantic HTML elements: header for page header structure, nav for navigation, and a list (ul/li) for menu links.
        <header className="bg-blue-600 text-white py-4 shadow-md">
            <div id="header-title" className="text-2xl font-bold">
                Marco Sandoval
            </div>
            {/* className applies Tailwind CSS utility classes for color,
            spacing, alignment, and sizing. */}
            <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
                <ul className="flex gap-6">
                    {/* <Link href="/"> and <Link href="/about"> map to App Router pages at app/page.tsx and app/about/page.tsx. */}
                    <li>
                        {/* Use Next.js Link for internal routes in your app, and use an HTML <a> element for external URLs. */}
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
