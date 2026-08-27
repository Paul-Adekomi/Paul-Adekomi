import { User } from "lucide-react";

export default function About() {
  return (
    <div className="animate-fade-up grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[280px_1fr] lg:gap-20">
      <div className="flex items-center">
        <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-primary sm:text-4xl">
          <User size={36} />
          About
        </h2>
      </div>

      <div className="max-w-3xl">
        <p className="text-base leading-8 text-secondary/80 sm:text-lg">
          Recent Computer Science graduate based in Lagos, Nigeria, building
          toward a career as an AI-native software engineer. Passionate about
          creating practical, intelligent software solutions that combine modern
          web technologies with artificial intelligence.
        </p>

        <p className="mt-5 text-base leading-8 text-secondary/80 sm:text-lg">
          Continuously developing my skills through hands-on projects,
          self-directed learning, and real-world problem solving, with a strong
          interest in AI engineering, software development, and building
          products that solve meaningful problems.
        </p>
      </div>
    </div>
  );
}
