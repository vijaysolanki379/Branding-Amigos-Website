import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, MousePointerClick, Search, TrendingUp } from "lucide-react";
import { EASE } from "./Reveal";

function Chip({
  className,
  delay,
  floatDuration,
  testId,
  children,
}: {
  className: string;
  delay: number;
  floatDuration: number;
  testId: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-testid={testId}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={`absolute z-10 ${className}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0C1030]/90 px-3.5 py-2.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.55, ease: EASE }}
      style={{ perspective: 1200 }}
      data-testid="hero-visual"
      className="relative mx-auto w-full max-w-[560px]"
      aria-label="Illustration of organic search growth over time"
      role="img"
    >
      <motion.div aria-hidden style={reduce ? undefined : { y: drift }} className="absolute -inset-10 -z-10">
        <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-[#3535D6]/30 blur-[110px]" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#FF5A36]/15 blur-[100px]" />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B0E2E]/90 to-[#070A24]/95 p-5 shadow-[0_40px_80px_-32px_rgba(3,4,18,0.9)] sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B93B8]">Organic Performance</p>
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B93B8]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5A36] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5A36]" />
            </span>
            Live
          </p>
        </div>

        <svg viewBox="0 0 560 380" className="h-auto w-full" aria-hidden>
          <defs>
            <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3535D6" stopOpacity="0.45" />
              <stop offset="1" stopColor="#3535D6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[60, 120, 180, 240, 300].map((y) => (
            <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
          {[20, 160, 300, 440].map((x, i) => (
            <text key={x} x={x} y="368" fill="#565E7E" fontSize="10" fontFamily="JetBrains Mono Variable, monospace" letterSpacing="2">
              WK {[1, 4, 8, 12][i]}
            </text>
          ))}

          <line x1="355" y1="70" x2="355" y2="352" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 5" />
          <text x="363" y="82" fill="#7C84A6" fontSize="10" fontFamily="JetBrains Mono Variable, monospace" letterSpacing="2">
            ROADMAP LIVE
          </text>

          <path
            d="M0,322 C80,314 130,286 195,262 C260,238 305,232 355,198 C405,164 450,128 560,62 L560,352 L0,352 Z"
            fill="url(#heroArea)"
          />
          <motion.path
            d="M0,322 C80,314 130,286 195,262 C260,238 305,232 355,198 C405,164 450,128 560,62"
            fill="none"
            stroke="#8A88FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.1, delay: 0.9, ease: "easeInOut" }}
          />
          <motion.path
            d="M410,158 C450,128 500,92 560,62"
            fill="none"
            stroke="#FF5A36"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 7"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 2.4, ease: "easeOut" }}
          />

          {[
            { cx: 195, cy: 262, accent: "#8A88FF", d: 1.6 },
            { cx: 355, cy: 198, accent: "#8A88FF", d: 2.0 },
            { cx: 560, cy: 62, accent: "#FF5A36", d: 2.6 },
          ].map((n) => (
            <g key={n.cx}>
              {!reduce && (
                <motion.circle
                  cx={n.cx}
                  cy={n.cy}
                  r="6"
                  fill="none"
                  stroke={n.accent}
                  strokeWidth="1.5"
                  initial={{ r: 6, opacity: 0.5 }}
                  animate={{ r: [6, 18], opacity: [0.5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: n.d, ease: "easeOut" }}
                />
              )}
              <circle cx={n.cx} cy={n.cy} r="4" fill="#0B0E2E" stroke={n.accent} strokeWidth="2" />
            </g>
          ))}
        </svg>

        <div className="mt-4 flex items-center gap-6">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B93B8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8A88FF]" /> Organic sessions
          </p>
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B93B8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A36]" /> Growth focus
          </p>
        </div>
      </motion.div>

      <Chip className="-top-5 left-1 sm:-left-6" delay={1.1} floatDuration={5.5} testId="hero-chip-search">
        <Search className="h-3.5 w-3.5 text-[#8A88FF]" />
        <span className="text-xs text-[#C6CCDF]">seo consulting services</span>
        <span className="ml-0.5 h-3.5 w-px animate-pulse bg-[#FF5A36]" />
      </Chip>
      <Chip className="top-[36%] -right-2 sm:-right-8" delay={1.35} floatDuration={6.5} testId="hero-chip-traffic">
        <TrendingUp className="h-3.5 w-3.5 text-[#FF5A36]" />
        <span className="text-xs font-medium text-white">Organic Traffic</span>
      </Chip>
      <Chip className="bottom-[26%] -left-2 sm:-left-8" delay={1.6} floatDuration={7} testId="hero-chip-rankings">
        <ArrowUpRight className="h-3.5 w-3.5 text-[#8A88FF]" />
        <span className="text-xs font-medium text-white">Keyword Rankings</span>
      </Chip>
      <Chip className="-bottom-5 right-6" delay={1.85} floatDuration={6} testId="hero-chip-leads">
        <MousePointerClick className="h-3.5 w-3.5 text-[#FF5A36]" />
        <span className="text-xs font-medium text-white">Qualified Leads</span>
      </Chip>
    </motion.div>
  );
}
