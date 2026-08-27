import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsAndProjects from "./components/SkillsAndProjects";
import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const year = new Date().getFullYear();

  return (
    <main className="relative z-10 min-h-screen overflow-hidden">
      <Navbar />

      {/* HERO */}
      <header
        id="home"
        className="min-h-screen w-full px-5 pt-28 pb-16 sm:px-8 lg:px-15"
      >
        <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center">
          <Hero />
        </div>
      </header>

      {/* ABOUT */}
      <section
        id="about"
        className="scroll-mt-24 w-full px-5 py-20 sm:px-8 lg:px-15 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <About />
        </div>
      </section>

      {/* SKILLS + PROJECTS */}
      <section
        id="projects"
        className="scroll-mt-24 w-full px-5 py-20 sm:px-8 lg:px-15 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <SkillsAndProjects />
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-24 flex min-h-125 w-full items-center justify-center px-5 py-24 text-center sm:px-8"
      >
        <div className="animate-fade-up flex max-w-2xl flex-col items-center justify-center gap-5">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-primary">
            Let's connect
          </span>

          <h2 className="font-headline text-3xl font-bold sm:text-4xl md:text-5xl">
            Initialize Connection
          </h2>

          <p className="max-w-xl text-secondary/80 leading-7">
            Currently open for new opportunities. Whether you have a question or
            just want to say hi, I'll try my best to get back to you.
          </p>

          <Link
            href="mailto:your-email@example.com"
            className="group mt-3 inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-7 py-3 font-headline text-background transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_30px_rgba(245,166,35,0.15)]"
          >
            <Mail size={17} />
            Email Me
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral/30 px-5 py-7 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row sm:text-left">
          <span className="text-secondary/70">
            © {year} <span className="text-primary">Paul Adekomi</span>. Built
            with Next.js.
          </span>

          <div className="flex items-center gap-5">
            <Link
              href="https://github.com/Paul-Adekomi"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              GitHub
            </Link>

            <Link
              href="https://x.com/padekomi"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              X
            </Link>

            <Link
              href="pauladekomi@gmail.com"
              className="transition-colors hover:text-primary"
            >
              Email
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
