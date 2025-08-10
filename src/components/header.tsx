import { Link } from "react-router-dom";
import { CitySearch } from "./city-search";
import { ThemeToggle } from "./theme-toggle";
import { CloudSun } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60 py-2 transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo and Name */}
        <Link to={"/"} className="flex items-center space-x-2">
          <CloudSun className="h-8 w-8 text-blue-500" />
          <span className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
            Weather
          </span>
        </Link>

        {/* Search and Theme Toggle */}
        <div className="flex items-center gap-4">
          <CitySearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
