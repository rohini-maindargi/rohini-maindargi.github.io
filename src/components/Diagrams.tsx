import { useReducedMotion } from "motion/react";
import type { Project } from "../data";

type Node = { x: number; y: number; w: number; h: number; title: string; sub: string; accent?: boolean };
type Edge = { d: string; dashed?: boolean; label?: { x: number; y: number; text: string } };
type Group = { x: number; y: number; w: number; h: number; label: string };
type Spec = { viewBox: string; label: string; nodes: Node[]; edges: Edge[]; groups?: Group[] };

const row = (labels: [string, string][], y: number, w: number, gap: number): Node[] =>
  labels.map(([title, sub], i) => ({ x: i * (w + gap), y, w, h: 56, title, sub }));

const gitops = row(
  [["GitHub", "commit"], ["Jenkins", "build · test"], ["Registry", "Docker image"], ["Git", "manifests"], ["ArgoCD", "GitOps sync"], ["Kubernetes", "running app"]],
  32, 92, 18,
);
gitops[5].accent = true;

const iac = row([["Terraform + CFN", "reusable modules"], ["Environments", "dev · staging · prod"], ["Remote state", "single source of truth"], ["AWS", "VPC · EC2 · RDS · IAM"]], 32, 136, 32);
iac[3].accent = true;

const hEdges = (nodes: Node[]): Edge[] =>
  nodes.slice(0, -1).map((n, i) => ({ d: `M${n.x + n.w + 2} ${n.y + n.h / 2} H${nodes[i + 1].x - 4}` }));

const specs: Record<Project["id"], Spec> = {
  gitops: {
    viewBox: "0 0 640 120",
    label: "GitHub commit triggers Jenkins build and test, a Docker image is pushed to a registry, manifests in Git are synced by ArgoCD to Kubernetes.",
    nodes: gitops,
    edges: hEdges(gitops),
  },
  iac: {
    viewBox: "0 0 640 120",
    label: "Reusable Terraform and CloudFormation modules, parameterised environments, remote state, provisioning AWS resources.",
    nodes: iac,
    edges: hEdges(iac),
  },
  multiregion: {
    viewBox: "0 0 640 250",
    label: "Route 53 with health checks routes traffic to two regions, each with a load balancer, auto scaling group and RDS database, with cross-region replication.",
    groups: [
      { x: 0, y: 86, w: 304, h: 160, label: "REGION A · PRIMARY" },
      { x: 336, y: 86, w: 304, h: 160, label: "REGION B · FAILOVER" },
    ],
    nodes: [
      { x: 225, y: 4, w: 190, h: 50, title: "Route 53", sub: "health checks · failover", accent: true },
      { x: 14, y: 124, w: 84, h: 52, title: "ALB", sub: "load balancer" },
      { x: 110, y: 124, w: 84, h: 52, title: "Auto Scaling", sub: "EC2" },
      { x: 206, y: 124, w: 84, h: 52, title: "RDS", sub: "primary" },
      { x: 350, y: 124, w: 84, h: 52, title: "ALB", sub: "load balancer" },
      { x: 446, y: 124, w: 84, h: 52, title: "Auto Scaling", sub: "EC2" },
      { x: 542, y: 124, w: 84, h: 52, title: "RDS", sub: "replica" },
    ],
    edges: [
      { d: "M280 56 C220 90 70 86 56 120" },
      { d: "M360 56 C420 90 378 86 392 120", dashed: true },
      { d: "M100 150 H106" },
      { d: "M196 150 H202" },
      { d: "M436 150 H442" },
      { d: "M532 150 H538" },
      { d: "M248 178 V214 H584 V182", dashed: true, label: { x: 416, y: 208, text: "cross-region replication" } },
    ],
  },
};

export function Diagram({ id }: { id: Project["id"] }) {
  const spec = specs[id];
  const reduce = useReducedMotion();
  const mid = `arrow-${id}`;
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface-2/60 p-4">
      <svg viewBox={spec.viewBox} role="img" aria-label={spec.label} className="h-auto w-full min-w-[540px]">
        <defs>
          <marker id={mid} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0L10 5L0 10z" fill="var(--teal)" />
          </marker>
          <linearGradient id={`g-${id}`} x1="0" x2="1">
            <stop offset="0" stopColor="var(--violet)" />
            <stop offset="1" stopColor="var(--teal)" />
          </linearGradient>
        </defs>

        {spec.groups?.map((g) => (
          <g key={g.label}>
            <rect x={g.x + 0.5} y={g.y} width={g.w - 1} height={g.h - 1} rx="14" fill="none" stroke="var(--line-strong)" strokeDasharray="4 5" />
            <text x={g.x + 14} y={g.y + 20} fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">
              {g.label}
            </text>
          </g>
        ))}

        {spec.edges.map((e, i) => (
          <g key={i}>
            <path
              id={`${id}-e${i}`}
              d={e.d}
              fill="none"
              stroke={e.dashed ? "var(--violet)" : "var(--teal)"}
              strokeWidth="1.6"
              strokeDasharray={e.dashed ? "5 4" : undefined}
              markerEnd={`url(#${mid})`}
              opacity="0.85"
            />
            {e.label && (
              <text x={e.label.x} y={e.label.y} textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">
                {e.label.text}
              </text>
            )}
            {!reduce && (
              <circle r="2.6" fill={e.dashed ? "var(--violet)" : "var(--teal)"}>
                <animateMotion dur={`${1.6 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.35}s`}>
                  <mpath href={`#${id}-e${i}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        ))}

        {spec.nodes.map((n) => (
          <g key={n.title + n.x}>
            <rect
              x={n.x + 0.5}
              y={n.y + 0.5}
              width={n.w - 1}
              height={n.h - 1}
              rx="11"
              fill="var(--surface)"
              stroke={n.accent ? `url(#g-${id})` : "var(--line-strong)"}
              strokeWidth={n.accent ? 1.6 : 1}
            />
            <text x={n.x + n.w / 2} y={n.y + n.h / 2 - 2} textAnchor="middle" fill="var(--fg)" fontSize="11.5" fontWeight="600" fontFamily="var(--font-sans)">
              {n.title}
            </text>
            <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 13} textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
