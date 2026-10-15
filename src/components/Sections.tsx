import { Activity, ArrowUpRight, Boxes, Cloud, Code2, FileText, GraduationCap, Mail, Phone, Shield, Terminal, Users, Workflow } from "lucide-react";
import { certifications, education, experience, profile, projects, skills } from "../data";
import { Diagram } from "./Diagrams";
import { Button, Card, GitHubIcon, LinkedInIcon, Reveal, SectionHeader, Tag, wrap } from "./ui";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className={wrap}>
        <SectionHeader eyebrow="About" title="Reliable, secure, automated." />
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I'm a <span className="font-semibold text-fg">Cloud Engineer at Genpact</span> with 3+ years of experience building,
              automating and operating cloud infrastructure on AWS.
            </p>
            <p>
              I care about environments that are <span className="font-semibold text-fg">secure by default, repeatable and easy to recover</span>:
              infrastructure defined as code, deployments driven from Git, and monitoring good enough that problems are caught before users notice.
            </p>
            <p>I work in Agile teams, document what I build, and enjoy working with security and networking teams to get the design right.</p>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="p-6">
              <span className="grid size-10 place-items-center rounded-lg bg-accent-soft">
                <GraduationCap className="size-5 text-accent" />
              </span>
              <p className="mt-4 text-xs font-medium tracking-wide text-muted uppercase">Education</p>
              <p className="mt-1 font-semibold">{education.degree}</p>
              <p className="mt-1 text-sm text-muted">{education.school}</p>
              <p className="mt-1 text-sm text-muted">
                {education.period} · {education.note}
              </p>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="bg-subtle py-20 sm:py-24">
      <div className={wrap}>
        <SectionHeader eyebrow="Experience" title="Where I've worked" />
        <div className="space-y-5">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05}>
              <Card className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{job.role}</h3>
                    <p className="mt-0.5 font-medium text-accent">
                      {job.company} <span className="font-normal text-muted">· {job.place}</span>
                    </p>
                  </div>
                  <p className="text-sm font-medium text-muted">{job.period}</p>
                </div>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-muted marker:text-line-strong">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className={wrap}>
        <SectionHeader eyebrow="Projects" title="Selected work" intro="Three systems I designed end to end: the problem, how I solved it, and the result." />
        <div className="space-y-6">
          {projects.map((p) => (
            <Reveal key={p.id}>
              <Card className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold tracking-tight">{p.title}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="mt-6">
                  <Diagram id={p.id} />
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-muted uppercase">Problem</p>
                    <p className="mt-2 leading-relaxed">{p.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-muted uppercase">Approach</p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-muted marker:text-line-strong">
                      {p.approach.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-ok-soft p-4 ring-1 ring-ok/15">
                    <p className="text-xs font-semibold tracking-wide text-ok uppercase">Result</p>
                    <p className="mt-2 leading-relaxed">{p.result}</p>
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
    <section id="skills" className="bg-subtle py-20 sm:py-24">
      <div className={wrap}>
        <SectionHeader eyebrow="Skills" title="Tools I work with" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 4) * 0.04} className={"wide" in s && s.wide ? "sm:col-span-2" : ""}>
                <Card className="h-full p-5">
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 text-accent" />
                    <h3 className="font-semibold">{s.title}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.items.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20">
          <SectionHeader eyebrow="Certifications" title="Certifications" />
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((c, i) => {
              const inner = (
                <Card className={`flex h-full items-center gap-4 p-5 ${c.url ? "hover:border-accent" : ""}`}>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-xs font-bold text-accent">{c.code}</span>
                  <div className="min-w-0">
                    <p className="font-semibold">{c.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{c.detail}</p>
                  </div>
                  {c.url && (
                    <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent">
                      Verify <ArrowUpRight className="size-4" />
                    </span>
                  )}
                </Card>
              );
              return (
                <Reveal key={c.code} delay={(i % 2) * 0.04}>
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
    <section id="contact" className="py-20 sm:py-28">
      <div className={wrap}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-accent">Contact</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Let's work together</h2>
          <p className="mt-4 text-lg text-muted">I'm open to Cloud, DevOps and SRE roles. Reach me by email, phone or LinkedIn.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="primary" href={`mailto:${profile.email}`}>
              <Mail className="size-4" /> {profile.email}
            </Button>
            <Button href={profile.phoneHref}>
              <Phone className="size-4" /> {profile.phone}
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Button href={profile.resume} target="_blank" rel="noopener">
              <FileText className="size-4" /> Resume
            </Button>
            <Button href={profile.linkedin} target="_blank" rel="noopener">
              <LinkedInIcon /> LinkedIn
            </Button>
            <Button href={profile.github} target="_blank" rel="noopener">
              <GitHubIcon /> GitHub
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className={`${wrap} flex flex-col items-center justify-between gap-2 text-sm text-muted sm:flex-row`}>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React &amp; Tailwind · deployed with GitHub Actions</p>
      </div>
    </footer>
  );
}
