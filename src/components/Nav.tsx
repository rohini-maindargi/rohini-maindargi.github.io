import { FileText, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../data";

const links = [
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }, [dark]);
  return [dark, () => setDark((v) => !v)] as const;
}

export function Nav() {
  const [dark, toggle] = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur-lg" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-bold tracking-tight">
          {profile.name}
        </a>
        <div className="flex items-center gap-1">
          <ul className="hidden items-center md:flex">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener"
            className="ml-2 hidden items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover sm:inline-flex dark:text-[#0b0d12]"
          >
            <FileText className="size-4" /> Resume
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="ml-1 grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-subtle hover:text-fg"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
