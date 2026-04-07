import { Layers, Building2, Landmark, Compass, HardHat } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useRef, useCallback } from "react";

const services = [
  { icon: Layers, title: "DTCP Layout Approval", desc: "Complete assistance for DTCP-approved residential and commercial layout planning with government compliance.", gradient: "from-emerald-400 to-green-500" },
  { icon: Building2, title: "Building Plan Approval", desc: "End-to-end building plan approval services including structural design, documentation, and authority submissions.", gradient: "from-teal-400 to-cyan-500" },
  { icon: Landmark, title: "Local Body Approval", desc: "Village Panchayat, Town Panchayat, and Municipality approval services for all types of construction projects.", gradient: "from-green-400 to-emerald-500" },
  { icon: Compass, title: "Vasthu Planning", desc: "Professional Vasthu-compliant planning services ensuring your property aligns with traditional architectural principles.", gradient: "from-cyan-400 to-teal-500" },
  { icon: HardHat, title: "Construction Services", desc: "Full-scale construction services from foundation to finishing with premium materials and skilled workforce.", gradient: "from-emerald-500 to-green-600" },
];

const TiltCard = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
  }, []);
  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateZ(0)";
  }, []);

  return (
    <div ref={ref} className={className} style={{ ...style, transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

const ServicesSection = () => {
  const titleReveal = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(services.length, 100);

  return (
    <section className="relative py-16 md:py-24 bg-secondary/30 overflow-hidden" id="services">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-primary/5 rounded-full blur-3xl morph-blob" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div ref={titleReveal.ref} className={`reveal-base reveal-up ${titleReveal.isVisible ? "reveal-visible" : ""}`}>
          <h2 className="mb-3 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="mx-auto mb-10 sm:mb-14 max-w-2xl text-center text-sm sm:text-base text-muted-foreground">
            Comprehensive construction and real estate services under one roof
          </p>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <TiltCard
                key={service.title}
                className={`premium-card glow-on-hover group rounded-2xl p-6 sm:p-8 reveal-base reveal-up ${gridVisible ? "reveal-visible" : ""}`}
                style={getDelay(i)}
              >
                <div className={`mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-110`}>
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white icon-3d-hover" />
                </div>
                <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold text-foreground group-hover:gradient-text transition-colors duration-300">{service.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
