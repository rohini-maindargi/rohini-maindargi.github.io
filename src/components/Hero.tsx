import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Download, LoaderCircle, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, stats, tools } from "../data";
import { Button, GitHubIcon, LinkedInIcon } from "./ui";

const steps = [
  ["git push", "main · feat: multi-region failover"],
  ["build & test", "jenkins · maven"],
  ["image pushed", "registry · app:1.4.2"],
  ["argocd sync", "manifests → cluster"],
  ["healthy", "kubernetes · 3/3 pods ready"],
];

// Illustrative deploy card that plays the GitOps flow from the projects section
function DeployCard() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(reduce ? steps.length : 0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((a) => (a >= steps.length + 2 ? 0 : a + 1)), 900);
    return () => clearInterval(t);
  }, [reduce]);

  const done = active >= steps.length;
  return (
    <div className="relative">
      <div className="grad-bg absolute -inset-px rounded-2xl opacity-40 blur-xl" aria-hidden="true" />
      <div className="relative rounded-2xl border border-line-strong bg-surface/90 p-5 shadow-2xl backdrop-blur" aria-hidden="true">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2">pipeline · production</span>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[10px] transition-colors ${
              done ? "bg-ok/15 text-ok" : "bg-violet/15 text-violet"
            }`}
          >
            {done ? "deployed" : "running"}
          </span>
        </div>
        <ol className="space-y-2.5">
          {steps.map(([title, sub], i) => {
            const state = i < active ? "done" : i === active ? "run" : "wait";
            return (
              <li
                key={title}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-300 ${
                  state === "run" ? "border-violet/50 bg-violet/5" : "border-line bg-surface-2/50"
                } ${state === "wait" ? "opacity-45" : ""}`}
              >
                <span className="grid size-5 place-items-center">
                  {state === "done" ? (
                    <Check className="size-4 text-ok" />
                  ) : state === "run" ? (
                    <LoaderCircle className="size-4 animate-spin text-violet" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-muted" />
                  )}
                </span>
                <span className="text-sm font-medium">{title}</span>
                <span className="ml-auto truncate font-mono text-[11px] text-muted">{sub}</span>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-2">
          <motion.div className="grad-bg h-full" animate={{ width: `${(Math.min(active, steps.length) / steps.length) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>
    </div>
  );
}

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const anim = (i: number) => (reduce ? {} : { variants: rise, initial: "hidden", animate: "show", custom: i });

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="aurora pointer-events-none absolute -top-40 left-1/2 -z-10 h-[640px] w-[1100px] -translate-x-1/2" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div {...anim(0)} className="mb-7 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-ok/30 bg-ok/10 px-3 py-1 text-xs font-medium text-ok">
              <span className="pulse-dot relative size-2 rounded-full bg-ok" />
              {profile.availability}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted">
              <MapPin className="size-3" /> {profile.location}
            </span>
          </motion.div>

          <motion.h1 {...anim(1)} className="text-5xl font-semibold tracking-tighter sm:text-7xl">
            {profile.name}
          </motion.h1>
          <motion.p {...anim(2)} className="mt-3 text-2xl font-medium tracking-tight sm:text-4xl">
            <span className="grad-text">{profile.role}</span>
          </motion.p>
          <motion.p {...anim(3)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I build secure, automated and highly available infrastructure on AWS, from Terraform and CI/CD pipelines to
            Kubernetes and GitOps.
          </motion.p>

          <motion.div {...anim(4)} className="mt-9 flex flex-wrap gap-3">
            <Button variant="primary" href="#projects">
              View my work <ArrowRight className="size-4" />
            </Button>
            <Button href={profile.resume} download>
              <Download className="size-4" /> Resume
            </Button>
            <Button href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="px-3.5">
              <LinkedInIcon />
            </Button>
            <Button href={profile.github} target="_blank" rel="noopener" aria-label="GitHub" className="px-3.5">
              <GitHubIcon />
            </Button>
          </motion.div>

          <motion.dl {...anim(5)} className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight">{s.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:block"
          >
            <DeployCard />
          </motion.div>
      </div>

      <div className="marquee mt-20 overflow-hidden border-y border-line py-5" aria-label="Tools I use">
        <div className="marquee-track flex w-max gap-10 font-mono text-sm text-muted">
          {[...tools, ...tools].map((t, i) => (
            <span key={i} className="flex items-center gap-10" aria-hidden={i >= tools.length}>
              {t} <span className="text-teal/60">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
