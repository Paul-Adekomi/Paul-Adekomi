"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

type Pulse = {
  from: number;
  to: number;
  progress: number;
  speed: number;
};

export default function MotionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrameId: number;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    let width = window.innerWidth;
    let height = window.innerHeight;

    const CONNECTION_DISTANCE = width < 640 ? 100 : width < 1024 ? 125 : 150;
    const MOUSE_DISTANCE = 160;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const particleCount = width < 640 ? 25 : width < 1024 ? 55 : 100;

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2.0 + 0.5,
    }));

    /*
     * Create data pulses.
     *
     * The pulse does NOT randomly jump between particles.
     * It finds an actual nearby connected particle.
     */
    const pulses: Pulse[] = Array.from({ length: 10 }, () => {
      const from = Math.floor(Math.random() * particleCount);

      let to = Math.floor(Math.random() * particleCount);

      let attempts = 0;

      while (attempts < 20) {
        const dx = particles[from].x - particles[to].x;
        const dy = particles[from].y - particles[to].y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (to !== from && distance < CONNECTION_DISTANCE) {
          break;
        }

        to = Math.floor(Math.random() * particleCount);
        attempts++;
      }

      return {
        from,
        to,
        progress: Math.random(),
        speed: Math.random() * 0.003 + 0.002,
      };
    });

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    /*
     * Find a nearby particle that can be connected
     * to the current particle.
     */
    const findNextParticle = (currentIndex: number) => {
      const possibleConnections: number[] = [];

      for (let i = 0; i < particles.length; i++) {
        if (i === currentIndex) continue;

        const dx = particles[currentIndex].x - particles[i].x;

        const dy = particles[currentIndex].y - particles[i].y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECTION_DISTANCE) {
          possibleConnections.push(i);
        }
      }

      if (possibleConnections.length === 0) {
        return null;
      }

      return possibleConnections[
        Math.floor(Math.random() * possibleConnections.length)
      ];
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      /*
       * --------------------------------
       * UPDATE PARTICLES
       * --------------------------------
       */

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around the screen
        if (particle.x < -10) {
          particle.x = width + 10;
        }

        if (particle.x > width + 10) {
          particle.x = -10;
        }

        if (particle.y < -10) {
          particle.y = height + 10;
        }

        if (particle.y > height + 10) {
          particle.y = -10;
        }

        /*
         * Mouse interaction
         */
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_DISTANCE) {
          const force = (MOUSE_DISTANCE - distance) / MOUSE_DISTANCE;

          particle.x -= dx * force * 0.003;
          particle.y -= dy * force * 0.003;
        }
      });

      /*
       * --------------------------------
       * DRAW CONNECTIONS
       * --------------------------------
       */

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.2;

            ctx.beginPath();

            ctx.moveTo(particles[i].x, particles[i].y);

            ctx.lineTo(particles[j].x, particles[j].y);

            ctx.strokeStyle = `rgba(0, 140, 255, ${opacity})`;

            ctx.lineWidth = 0.6;

            ctx.stroke();
          }
        }
      }

      /*
       * --------------------------------
       * DRAW PARTICLES
       * --------------------------------
       */

      particles.forEach((particle) => {
        /*
         * Small glow
         */
        ctx.beginPath();

        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(0, 150, 255, 0.04)";

        ctx.fill();

        /*
         * Main node
         */
        ctx.beginPath();

        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(0, 170, 255, 0.65)";

        ctx.fill();
      });

      /*
       * --------------------------------
       * MOVING DATA PULSES
       * --------------------------------
       */

      pulses.forEach((pulse) => {
        const from = particles[pulse.from];
        const to = particles[pulse.to];

        if (!from || !to) return;

        const dx = from.x - to.x;
        const dy = from.y - to.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        /*
         * If the connection disappeared because
         * the particles moved apart, find another.
         */
        if (distance >= CONNECTION_DISTANCE) {
          const nextParticle = findNextParticle(pulse.from);

          if (nextParticle !== null) {
            pulse.to = nextParticle;
            pulse.progress = 0;
          }

          return;
        }

        /*
         * Move the pulse
         */
        pulse.progress += pulse.speed;

        /*
         * Pulse reached destination
         */
        if (pulse.progress >= 1) {
          pulse.from = pulse.to;

          const nextParticle = findNextParticle(pulse.from);

          if (nextParticle !== null) {
            pulse.to = nextParticle;
          } else {
            pulse.to = Math.floor(Math.random() * particleCount);
          }

          pulse.progress = 0;
        }

        /*
         * Calculate pulse position
         */
        const x = from.x + (to.x - from.x) * pulse.progress;

        const y = from.y + (to.y - from.y) * pulse.progress;

        /*
         * Glow
         */
        ctx.beginPath();

        ctx.arc(x, y, 7, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(0, 170, 255, 0.05)";

        ctx.fill();

        /*
         * Bright pulse
         */
        ctx.beginPath();

        ctx.arc(x, y, 2, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(0, 200, 255, 0.95)";

        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(0, 170, 255, 0.9)";

        ctx.fill();

        ctx.shadowBlur = 0;
      });

      /*
       * --------------------------------
       * MOUSE GLOW
       * --------------------------------
       */

      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          180,
        );

        gradient.addColorStop(0, "rgba(0, 150, 255, 0.04)");

        gradient.addColorStop(1, "rgba(0, 150, 255, 0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);

        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("resize", resizeCanvas);

      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
}
