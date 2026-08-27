import { ArrowUpRight, Code, GraduationCap, Notebook } from "lucide-react";
import Link from "next/link";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Tailwind", "Next.js"],
  },
  {
    title: "Backend",
    skills: ["Python", "FastAPI", "Node.js", "SQLAlchemy"],
  },
  {
    title: "AI & Tools",
    skills: ["Groq / LLMs", "Cloudinary", "JWT Auth"],
  },
  {
    title: "Foundational",
    skills: ["Go"],
  },
];

const projects = [
  {
    title: "AI Text Summarizer",
    link: "https://ai-text-summarizer-beta-ten.vercel.app",
    source_link: "https://github.com/Paul-Adekomi/ai-text-summarizer",
    description:
      "Real-time AI summarization with custom validation. Built using modern API standards for seamless integration.",
    icon: Notebook,
    tags: ["FastAPI", "Groq", "Next.js"],
  },
  {
    title: "StudyForge",
    link: "https://study-forge-peach.vercel.app",
    source_link: "https://github.com/Paul-Adekomi/study-forge",
    description:
      "Full-stack AI study assistant featuring authentication, CRUD, AI-generated flashcards, and Cloudinary avatar uploads.",
    icon: GraduationCap,
    tags: ["Full-stack", "Auth", "Cloudinary"],
  },
];

export default function SkillsAndProjects() {
  return (
    <div className="w-full">
      {/* SKILLS */}
      <div className="mb-28 flex w-full flex-col gap-10">
        <SectionTitle icon={<Code size={34} />} title="Technical Arsenal" />

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <div
              key={group.title}
              className="animate-fade-up group rounded-2xl border border-neutral/30 bg-gray-800/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/3"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="border-b border-neutral/30 pb-4">
                <span className="font-headline text-lg font-bold uppercase tracking-wide">
                  {group.title}
                </span>
              </div>

              <ul className="mt-5 flex flex-col gap-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-secondary/80 transition-colors group-hover:text-secondary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <div className="flex w-full flex-col gap-10">
        <SectionTitle icon={<Code size={34} />} title="Featured Projects" />

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <div
                key={project.title}
                className="projects animate-fade-up group relative min-h-85 overflow-hidden rounded-2xl border border-neutral/30 bg-gray-800/10 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Background glow */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon size={24} />
                    </span>

                    <Link
                      href={project.link}
                      aria-label={`View ${project.title}`}
                      className="rounded-lg p-3 text-secondary/60 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                    >
                      Live view
                      <ArrowUpRight size={22} className="inline" />
                    </Link>
                  </div>

                  <div className="mt-auto flex flex-col gap-4 pt-12">
                    <h3 className="font-headline text-2xl font-bold sm:text-3xl">
                      {project.title}
                    </h3>

                    <p className="max-w-xl leading-7 text-secondary/70">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={project.source_link}
                          className="rounded-lg p-3 text-secondary/60 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                        >
                          View Source Code
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-primary">{icon}</span>

      <h2 className="font-headline text-3xl font-bold sm:text-4xl">{title}</h2>
    </div>
  );
}
