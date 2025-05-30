import { ThemeProvider } from "../components/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <ThemeProvider>
      <div className="min-h-screen flex">
        {/* Left Navigation */}
        <nav className="w-48 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col gap-4 p-6 min-h-screen">
          <div className="font-bold text-lg mb-6">Menu</div>
          <Link
            href="/"
            className={`py-2 px-3 rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 ${router.pathname === "/" ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`py-2 px-3 rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 ${router.pathname === "/about" ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""}`}
          >
            About
          </Link>
          <Link
            href="/server"
            className={`py-2 px-3 rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 ${router.pathname === "/server" ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""}`}
          >
            Server Page
          </Link>
          <Link
            href="/theme"
            className={`py-2 px-3 rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 ${router.pathname === "/theme" ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""}`}
          >
            Theme Context
          </Link>
          <Link
            href="/theme-status"
            className={`py-2 px-3 rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 ${router.pathname === "/theme-status" ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""}`}
          >
            Theme Status
          </Link>
        </nav>
        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </ThemeProvider>
  );
}
