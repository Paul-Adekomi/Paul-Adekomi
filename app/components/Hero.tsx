import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
      {/* LEFT */}
      <div className="animate-fade-up w-full">
        <div className="mb-5 flex w-max items-center gap-3 rounded-full border border-neutral/60 bg-black/10 px-4 py-2 backdrop-blur-sm">
          <span className="block h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_12px_rgba(245,166,35,0.8)]" />

          <span className="font-headline text-xs sm:text-sm">
            Available for roles
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-sm tracking-wider text-primary">
              Hello, I'm
            </p>

            <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Paul Adekomi
            </h1>

            <p className="font-headline text-2xl font-medium text-secondary/80 sm:text-3xl">
              AI-Native Software Engineer
            </p>
          </div>

          <p className="max-w-xl text-base leading-7 text-secondary/80 sm:text-lg">
            Building AI-powered web applications with FastAPI, Next.js, and
            LLM-powered features.
          </p>

          <div className="flex w-full flex-col gap-3 font-headline sm:w-max sm:flex-row sm:items-center">
            <Link
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-primary px-5 py-3 text-background transition-all duration-300 hover:bg-transparent hover:text-primary hover:border-primary hover:shadow-[0_0_25px_rgba(245,166,35,0.15)]"
            >
              View My Work
              <ArrowDown
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </Link>

            <Link
              href="https://github.com/Paul-Adekomi"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-1 rounded-md border border-neutral px-5 py-3 transition-all duration-300 hover:border-primary hover:text-primary"
            >
              GitHub
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-1 rounded-md border border-neutral px-5 py-3 transition-all duration-300 hover:border-primary hover:text-primary"
            >
              X
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* TERMINAL */}
      <div className="animate-fade-up-delayed relative mx-auto w-full max-w-2xl lg:max-w-none">
        {/* Glow behind terminal */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/5 blur-3xl" />

        <div className="animate-float">
          <Image
            src="/terminal.png"
            alt="Developer terminal"
            width={750}
            height={750}
            priority
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
}
