import React from "react";
import { Link } from "react-router-dom";

import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  CloudSun,
  Rss,
  Home,
  Search,
  Star,
  Sunrise,
} from "lucide-react";

const socialLinks = [
  { href: "https://github.com/satyammauryakit", label: "GitHub", icon: <Github /> },
  { href: "https://twitter.com/your-profile", label: "Twitter", icon: <Rss /> }, // Using Rss for Twitter as per user's icon choice (was 🌤️)
  { href: "https://linkedin.com/in/thesatyammaurya", label: "LinkedIn", icon: <Linkedin /> },
  { href: "mailto:sroj6393@gmail.com", label: "Email", icon: <Mail /> },
];

const quickLinks = [
  { href: "#home", label: "Home", icon: <Home className="h-4 w-4" /> },
  { href: "#search", label: "Search Weather", icon: <Search className="h-4 w-4" /> },
  { href: "#favorites", label: "My Cities", icon: <Star className="h-4 w-4" /> },
  { href: "#forecast", label: "Forecast", icon: <Sunrise className="h-4 w-4" /> },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Description */}
        <div className="space-y-4">
          <Link to={"/"} className="flex items-center space-x-3">
            <CloudSun className="h-10 w-10 text-blue-500" />
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Weather</span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Your go-to app for real-time weather updates. Simple, accurate, and always reliable.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Explore</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm flex items-center gap-2 hover:text-blue-500 transition-colors duration-200"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h4>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              >
                <span className="text-lg">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Credits & Info */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Info</h4>
          <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
            <p>Powered by OpenWeatherMap</p>
            <p>Weather Tip: Check forecasts daily!</p>
            <p className="flex items-center gap-2">
              <Sunrise className="h-4 w-4 text-orange-400" /> 
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-gray-500">
          <p>© {currentYear} WeatherHub. All rights reserved.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-gray-500">
            <a href="#privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-blue-500 transition-colors">Terms of Service</a>
            <span>•</span>
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              API Credits
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
