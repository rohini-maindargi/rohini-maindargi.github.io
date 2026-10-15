import { motion, useScroll, useSpring } from "motion/react";
import { Download, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../data";

const links = [
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

function useTheme() {
  const [light, setLight] = useState(() => document.documentElement.classList.contains("light"));
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    try {
      localStorage.setItem("theme", light ? "light" : "dark");
    } catch {
      /* storage unavailable */
    }
  }, [light]);
  return [light, () => setLight((v) => !v)] as const;
}

export function Nav() {
  const [light, toggle] = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <motion.div style={{ scaleX: progress }} className="grad-bg absolute inset-x-0 bottom-0 h-px origin-left" />
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          rohini<span className="text-teal">.</span>maindargi
        </a>
        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resume}
            download
            className="ml-2 hidden items-center gap-1.5 rounded-lg border border-line-strong px-3 py-1.5 text-sm transition-colors hover:border-violet sm:inline-flex"
          >
            <Download className="size-3.5" /> Resume
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
            className="ml-2 grid size-9 place-items-center rounded-lg border border-line-strong transition-colors hover:border-violet"
          >
            {light ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
