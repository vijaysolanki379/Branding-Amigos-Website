import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  index,
  label,
  title,
  sub,
  dark = false,
  center = false,
}: {
  index: string;
  label: string;
  title: ReactNode;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[#8B93B8]">
          <span className="text-[#FF5A36]">[ {index}</span>
          <span className={dark ? "text-[#8B93B8]" : "text-[#475569]"}> / {label} </span>
          <span className="text-[#FF5A36]">]</span>
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-5 font-heading text-3xl leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl ${
            dark ? "text-white" : "text-[#0A0D2C]"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-[#A7AEC9]" : "text-[#475569]"}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
