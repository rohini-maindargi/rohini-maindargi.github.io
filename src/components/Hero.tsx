import { ArrowRight, FileText, MapPin } from "lucide-react";
import { glance, profile } from "../data";
import { Button, GitHubIcon, LinkedInIcon, wrap } from "./ui";

export function Hero() {
  return (
    <section id="top" className="border-b border-line bg-gradient-to-b from-subtle to-bg pt-28 pb-20 sm:pt-36 sm:pb-24">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]`}>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-ok-soft px-3 py-1 text-sm font-medium text-ok ring-1 ring-ok/20">
              <span className="pulse-dot relative size-2 rounded-full bg-ok" />
              {profile.availability}
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
            {profile.role}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            I build secure, automated and highly available infrastructure on AWS, from Terraform and CI/CD pipelines to
            Kubernetes and GitOps.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-4" /> {profile.location}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
            <Button variant="primary" href="#projects">
              View my work <ArrowRight className="size-4" />
            </Button>
            <Button href={profile.resume} target="_blank" rel="noopener">
              <FileText className="size-4" /> Resume
            </Button>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-lg text-muted sm:size-10 transition-colors hover:bg-subtle hover:text-accent"
            >
              <LinkedInIcon className="size-5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className="grid size-9 place-items-center rounded-lg text-muted sm:size-10 transition-colors hover:bg-subtle hover:text-accent"
            >
              <GitHubIcon className="size-5" />
            </a>
          </div>
        </div>

        <aside
          aria-label="At a glance"
          className="rounded-2xl border border-line bg-surface p-6 shadow-[0_8px_40px_-12px_rgb(15_23_41/0.15)] dark:shadow-none"
        >
          <p className="text-sm font-semibold text-muted">At a glance</p>
          <dl className="mt-4 divide-y divide-line">
            {glance.map((g) => (
              <div key={g.label} className="py-3.5 first:pt-0 last:pb-0">
                <dt className="text-xs font-medium tracking-wide text-muted uppercase">{g.label}</dt>
                <dd className="mt-1 font-semibold">{g.value}</dd>
                <dd className="text-sm text-muted">{g.note}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
