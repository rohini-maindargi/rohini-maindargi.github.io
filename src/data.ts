export const profile = {
  name: "Rohini Maindargi",
  role: "Cloud & DevOps Engineer",
  location: "Hyderabad, India",
  availability: "Open to Cloud, DevOps & SRE roles",
  email: "rohinimaindargi@gmail.com",
  phone: "+91 80504 95331",
  phoneHref: "tel:+918050495331",
  linkedin: "https://www.linkedin.com/in/rohini-maindargi",
  github: "https://github.com/rohini-maindargi",
  resume: "https://drive.google.com/file/d/12XKIwenjgIvEZPpg53Y4soW7imboj5qy/view?usp=sharing",
};

export const glance = [
  { label: "Current role", value: "Cloud Engineer, Genpact", note: "2023 — Present" },
  { label: "Certified", value: "AWS Solutions Architect – Associate", note: "AWS Cloud Practitioner" },
  { label: "Core stack", value: "AWS · Terraform · Kubernetes", note: "Docker · ArgoCD · Jenkins · CloudWatch" },
  { label: "Experience", value: "3+ years in cloud & DevOps", note: "Genpact · Concentrix" },
];

export const experience = [
  {
    role: "Cloud Engineer",
    company: "Genpact",
    place: "Hyderabad, India",
    period: "2023 — Present",
    points: [
      "Designed the AWS network and compute foundations (VPC, subnets, security groups, IAM, EC2, RDS, S3) for high availability and scale.",
      "Replaced manual provisioning with Terraform and CloudFormation, making environments repeatable and deployments faster.",
      "Delivered consistent, reliable releases to EC2 through CI/CD pipelines on AWS CodePipeline, CodeBuild, CodeDeploy and Jenkins.",
      "Improved uptime by monitoring with CloudWatch and CloudTrail and investigating and resolving incidents.",
      "Partnered with security and networking teams to enforce IAM best practices, network policies and secure architecture, in Agile/Scrum sprints with peer reviews and documentation.",
    ],
  },
  {
    role: "Cloud Technical Support Intern",
    company: "Concentrix",
    place: "Bangalore, India",
    period: "2022 — 2023",
    points: [
      "Supported AWS services: ticket handling, troubleshooting and escalations.",
      "Helped stabilise cloud environments and improved customer satisfaction by reducing resolution time.",
    ],
  },
];

export type Project = {
  id: "iac" | "multiregion" | "gitops";
  title: string;
  problem: string;
  approach: string[];
  result: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "gitops",
    title: "End-to-End CI/CD Pipeline with GitOps",
    problem: "Manual deployments are slow, inconsistent between releases and hard to roll back.",
    approach: [
      "GitHub commits trigger Jenkins jobs that compile, test and package the app with Maven.",
      "The app is containerised with Docker and versioned images are published to a registry.",
      "ArgoCD syncs Kubernetes manifests from Git, so the cluster always matches what is declared in the repo.",
    ],
    result: "Every commit flows to a running app on Kubernetes automatically, with consistent releases and one-step rollbacks.",
    tags: ["GitHub", "Jenkins", "Maven", "Docker", "Kubernetes", "ArgoCD"],
  },
  {
    id: "multiregion",
    title: "Multi-Region, Load-Balanced Application",
    problem: "An application running in a single region goes down when that region does.",
    approach: [
      "Route 53 with health checks and failover routing in front of two AWS regions.",
      "Each region runs an Application Load Balancer and an EC2 Auto Scaling group.",
      "Cross-region RDS replication, plus tested backup and restore procedures.",
    ],
    result: "Traffic shifts to a healthy region on failure, with data already replicated and backups ready to restore.",
    tags: ["Route 53", "ALB", "Auto Scaling", "EC2", "RDS"],
  },
  {
    id: "iac",
    title: "Automated Infrastructure Deployment (IaC)",
    problem: "Environments built by hand drift apart and are slow and risky to reproduce.",
    approach: [
      "Reusable Terraform modules and CloudFormation templates for VPC, subnets, security groups, EC2, RDS and IAM roles.",
      "Parameterised environments for dev, staging and production.",
      "Remote state so every change is planned and applied against one source of truth.",
    ],
    result: "Dev, staging and production are provisioned from the same code, consistently and repeatably.",
    tags: ["Terraform", "CloudFormation", "AWS"],
  },
];

export const skills = [
  { icon: "cloud", title: "AWS", wide: true, items: ["EC2", "S3", "RDS", "VPC", "IAM", "Route 53", "Lambda", "ALB / ELB", "Auto Scaling"] },
  { icon: "code", title: "Infrastructure as Code", items: ["Terraform", "CloudFormation"] },
  { icon: "workflow", title: "CI/CD & Automation", items: ["Jenkins", "CodePipeline", "CodeBuild", "CodeDeploy", "Git"] },
  { icon: "boxes", title: "Containers & GitOps", items: ["Docker", "Kubernetes", "ArgoCD"] },
  { icon: "activity", title: "Observability", items: ["CloudWatch", "CloudTrail", "Prometheus"] },
  { icon: "shield", title: "Security & Networking", wide: true, items: ["IAM best practices", "Least privilege", "MFA", "VPC design", "Security groups", "NACLs", "Subnetting", "Route tables"] },
  { icon: "terminal", title: "Linux & Scripting", items: ["Linux", "Windows", "Python", "Bash"] },
  { icon: "users", title: "Ways of working", items: ["Agile / Scrum", "Incident management", "Jira", "ServiceNow"] },
] as const;

export const certifications = [
  { code: "SAA", title: "AWS Certified Solutions Architect – Associate", detail: "SAA-C03", url: "" },
  {
    code: "CLF",
    title: "AWS Certified Cloud Practitioner",
    detail: "CLF-C02",
    url: "https://drive.google.com/file/d/18gkR7L8j6SUi040Q1arOhKT9Td7QcfR3/view?usp=drivesdk",
  },
  { code: "CCNA", title: "Cisco CCNA", detail: "Network Fundamentals and Essentials", url: "" },
  { code: "IP", title: "IP Addressing and Subnetting", detail: "Networking fundamentals", url: "" },
];

export const education = {
  degree: "B.Tech, Electronics & Communication Engineering",
  school: "Central University of Karnataka",
  period: "2018 — 2022",
  note: "IEEE Student Member",
};
