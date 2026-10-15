import { Activity, ArrowUpRight, Boxes, Cloud, Code2, Download, GraduationCap, Mail, Phone, Shield, Terminal, Users, Workflow } from "lucide-react";
import { certifications, education, experience, profile, projects, skills } from "../data";
import { Diagram } from "./Diagrams";
import { Button, Card, GitHubIcon, LinkedInIcon, Reveal, SectionHeader, Tag } from "./ui";

const wrap = "mx-auto max-w-6xl px-4 sm:px-6";

export function About() {
  return (
    <section id="about" className="py-24">
      <div className={wrap}>
        <SectionHeader index="01" eyebrow="about" title={<>Infrastructure that is <span className="grad-text">boring in the best way</span>.</>} />
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I'm a <span className="font-medium text-fg">Cloud Engineer at Genpact</span> with 3+ years of experience building,
              automating and operating cloud infrastructure on AWS.
            </p>
            <p>
              I care about environments that are <span className="font-medium text-fg">secure by default, repeatable and easy to recover</span>:
              infrastructure defined as code, deployments driven from Git, and monitoring good enough that problems are caught before users notice.
            </p>
            <p>I work in Agile teams, document what I build, and enjoy working with security and networking teams to get the design right.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="p-6">
              <GraduationCap className="size-5 text-teal" />
              <p className="mt-4 font-medium">{education.degree}</p>
              <p className="mt-1 text-sm text-muted">{education.school}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Tag>{education.period}</Tag>
                <Tag>{education.note}</Tag>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className={wrap}>
        <SectionHeader index="02" eyebrow="experience" title="Where I've worked" />
        <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-10">
          {experience.map((job, i) => (
            <li key={job.company} className="relative">
              <span className="grad-bg absolute top-8 -left-[31px] size-3 rounded-full ring-4 ring-bg sm:-left-[47px]" aria-hidden="true" />
              <Reveal delay={i * 0.05}>
                <Card className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{job.role}</h3>
                      <p className="mt-1 text-teal">
                        {job.company} <span className="text-muted">· {job.place}</span>
                      </p>
                    </div>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{job.period}</span>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 text-muted">
                        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-violet" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className={wrap}>
        <SectionHeader
          index="03"
          eyebrow="projects"
          title="Selected projects"
          intro="Three systems I designed end to end, from the problem to how they work."
        />
        <div className="space-y-8">
          {projects.map((p, i) => (
            <Reveal key={p.id}>
              <Card className="overflow-hidden p-6 sm:p-10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{p.title}</h3>
                </div>
                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.25fr]">
                  <div className="space-y-6">
                    <div>
                      <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Problem</p>
                      <p className="mt-2 text-fg">{p.problem}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Approach</p>
                      <ul className="mt-2 space-y-2">
                        {p.approach.map((a) => (
                          <li key={a} className="flex gap-3 text-muted">
                            <span className="mt-2.5 size-1 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-ok/25 bg-ok/5 p-4">
                      <p className="font-mono text-[11px] tracking-widest text-ok uppercase">Result</p>
                      <p className="mt-1.5">{p.result}</p>
                    </div>
                  </div>
                  <div className="min-w-0 space-y-4">
                    <Diagram id={p.id} />
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const icons = { cloud: Cloud, code: Code2, workflow: Workflow, boxes: Boxes, activity: Activity, shield: Shield, terminal: Terminal, users: Users };

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className={wrap}>
        <SectionHeader index="04" eyebrow="skills" title="Tools I work with" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.05} className={"wide" in s && s.wide ? "lg:col-span-2" : ""}>
                <Card className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface-2">
                      <Icon className="size-4 text-teal" />
                    </span>
                    <h3 className="font-medium">{s.title}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.items.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-24">
          <SectionHeader index="05" eyebrow="certifications" title="Certifications" />
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((c, i) => {
              const inner = (
                <Card className="flex h-full items-center gap-4 p-5">
                  <span className="grad-bg grid size-12 shrink-0 place-items-center rounded-xl font-mono text-xs font-semibold text-[#07090f]">
                    {c.code}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium">{c.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{c.detail}</p>
                  </div>
                  {c.url && (
                    <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-sm text-teal">
                      Verify <ArrowUpRight className="size-4" />
                    </span>
                  )}
                </Card>
              );
              return (
                <Reveal key={c.code} delay={(i % 2) * 0.05}>
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener" className="block h-full">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className={wrap}>
        <Reveal>
          <div className="grad-border relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-16">
            <div className="aurora pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
            <p className="font-mono text-xs tracking-wider text-teal">06 / contact</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Let's build something <span className="grad-text">reliable</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
              I'm open to Cloud, DevOps and SRE roles. Reach me by email, phone or LinkedIn.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button variant="primary" href={`mailto:${profile.email}`}>
                <Mail className="size-4" /> {profile.email}
              </Button>
              <Button href={profile.phoneHref}>
                <Phone className="size-4" /> {profile.phone}
              </Button>
              <Button href={profile.resume} download>
                <Download className="size-4" /> Resume
              </Button>
              <Button href={profile.linkedin} target="_blank" rel="noopener">
                <LinkedInIcon /> LinkedIn
              </Button>
              <Button href={profile.github} target="_blank" rel="noopener">
                <GitHubIcon /> GitHub
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className={`${wrap} flex flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row`}>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="font-mono text-xs">Built with React, Tailwind &amp; Motion · deployed by GitHub Actions</p>
      </div>
    </footer>
  );
}
