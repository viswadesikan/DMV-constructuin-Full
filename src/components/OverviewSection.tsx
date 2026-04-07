import { Building2, Award, Users, CheckCircle } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useRef, useCallback } from "react";

const stats = [
  { icon: Building2, value: "250+", label: "Projects Completed", color: "from-emerald-400 to-green-500" },
  { icon: Users, value: "500+", label: "Happy Clients", color: "from-teal-400 to-cyan-500" },
  { icon: Award, value: "15+", label: "Years Experience", color: "from-green-400 to-emerald-500" },
  { icon: CheckCircle, value: "100%", label: "DTCP Approved", color: "from-cyan-400 to-teal-500" },
];

const TiltCard = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.04, 1.04, 1.04)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateY(0) rotateX(0) scale3d(1, 1, 1)";
  }, []);

  return (
    <div ref={ref} className={className} style={{ ...style, transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

const OverviewSection = () => {
  const titleReveal = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(stats.length, 150);
  const quoteReveal = useScrollReveal();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="overview">
      {/* Background decoration */}
      <div className="absolute top-10 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-emerald-100/40 rounded-full blur-3xl morph-blob" />
      <div className="absolute bottom-10 left-0 w-40 h-40 sm:w-48 sm:h-48 bg-teal-100/30 rounded-full blur-3xl morph-blob-fast" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div
          ref={titleReveal.ref}
          className={`reveal-base reveal-up ${titleReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <h2 className="mb-3 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            About <span className="gradient-text">DMV Construction</span>
          </h2>
          <p className="mx-auto mb-10 sm:mb-14 max-w-2xl text-center text-sm sm:text-base text-muted-foreground px-2">
            With over 15 years of experience in real estate and construction, DMV Construction has been the most trusted name in Dharmapuri.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <TiltCard
                key={stat.label}
                className={`premium-card glow-on-hover flex flex-col items-center gap-2 sm:gap-3 rounded-2xl p-5 sm:p-8 text-center reveal-base reveal-scale ${gridVisible ? "reveal-visible" : ""}`}
                style={getDelay(i)}
              >
                <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white icon-3d-hover" />
                </div>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">{stat.value}</span>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</span>
              </TiltCard>
            );
          })}
        </div>

        <div
          ref={quoteReveal.ref}
          className={`mx-auto mt-10 sm:mt-14 max-w-3xl rounded-2xl shimmer-border p-6 sm:p-8 text-center reveal-base reveal-up ${quoteReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
            We believe in <span className="font-bold gradient-text">building trust</span> through transparency, quality materials, and on-time delivery. Every project reflects our commitment to excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
