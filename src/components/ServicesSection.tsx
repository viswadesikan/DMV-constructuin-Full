import { X, ChevronDown, ChevronUp, Phone, MessageSquare, ArrowRight, CheckCircle2, AlertTriangle, Star, Building, Info } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useRef, useCallback, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { servicesData } from "@/data/servicesData";

const INITIAL_COUNT = 6;

const TiltInner = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(5px)`;
  }, []);
  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateZ(0)";
  }, []);
  return (
    <div ref={ref} className={className} style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

const ServicesSection = () => {
  const titleReveal = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(servicesData.length, 80);
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const [originStyle, setOriginStyle] = useState("50% 50%");
  const [showAll, setShowAll] = useState(false);

  const handleCardClick = (service: typeof servicesData[0], e: React.MouseEvent<HTMLDivElement>) => {
    // Calculate transform-origin relative to the viewport center
    // so the modal VISUALLY grows from the card's position
    const rect = e.currentTarget.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    // Convert card center to percentage origin within the modal container (centered in viewport)
    const ox = ((cardCenterX / vpW) * 100).toFixed(1);
    const oy = ((cardCenterY / vpH) * 100).toFixed(1);
    setOriginStyle(`${ox}% ${oy}%`);
    setSelectedService(service);
  };

  const displayedServices = showAll ? servicesData : servicesData.slice(0, INITIAL_COUNT);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    if (selectedService) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedService]);

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
            Tap any service card to learn more — all {servicesData.length} services offered under one roof
          </p>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                onClick={(e) => handleCardClick(service, e)}
                className={`cursor-pointer reveal-base reveal-up ${gridVisible ? "reveal-visible" : ""}`}
                style={{ ...getDelay(i) }}
              >
                <TiltInner className="premium-card glow-on-hover group h-full rounded-2xl p-6 sm:p-8">
                  <div className={`mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1`}>
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold text-foreground group-hover:gradient-text transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {service.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More <ArrowRight className="h-3 w-3" />
                  </div>
                </TiltInner>
              </div>
            );
          })}
        </div>

        {/* View More / Less toggle */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll(v => !v)}
            className="group flex items-center gap-2.5 rounded-2xl border border-primary/30 bg-primary/5 px-8 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
          >
            {showAll ? (
              <><ChevronUp className="h-4 w-4" /> Show Less</>
            ) : (
              <><ChevronDown className="h-4 w-4" /> View All {servicesData.length} Services</>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-12 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-black/75 pointer-events-auto"
              onClick={() => setSelectedService(null)}
            />

            {/* Modal — scale from card origin, GPU-only composited animation */}
            <motion.div
              key={selectedService.title}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.55 }}
              transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.5 }}
              className="relative max-h-[95vh] max-w-2xl w-full bg-background overflow-hidden shadow-2xl flex flex-col pointer-events-auto"
              style={{ borderRadius: 24, transformOrigin: originStyle, willChange: "transform, opacity" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`shrink-0 relative overflow-hidden bg-gradient-to-br ${selectedService.gradient} p-5 sm:p-7`}>
                <div className="absolute inset-0 bg-black/10" />
                {/* Close button — large touch target */}
                <button
                  onClick={() => setSelectedService(null)}
                  aria-label="Close"
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/25 text-white transition-colors hover:bg-black/50 active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative z-10 flex items-center gap-4 text-white pr-10">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30">
                    <selectedService.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold leading-tight">{selectedService.title}</h3>
                    <p className="text-white/80 text-xs mt-1 hidden sm:block max-w-sm">{selectedService.desc}</p>
                  </div>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 sm:space-y-6">

                {/* 1. About */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary mb-2.5">
                    <Info className="h-4 w-4" /> About {selectedService.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedService.about}</p>
                </div>

                {/* 2. Important */}
                <div className="rounded-xl border border-amber-300/60 bg-amber-50/60 dark:bg-amber-900/15 dark:border-amber-700/40 p-4 sm:p-5">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-400 mb-2">
                    <AlertTriangle className="h-4 w-4" /> Important Note
                  </h4>
                  <p className="text-sm text-amber-900/80 dark:text-amber-200/70 leading-relaxed">{selectedService.important}</p>
                </div>

                {/* 3. Advantages & Challenges */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="premium-card rounded-xl p-4 sm:p-5 border-l-4 border-emerald-500">
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Advantages
                    </h4>
                    <ul className="space-y-2">
                      {selectedService.advantage.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-emerald-500 mt-0.5 text-base leading-none">•</span>
                          <span className="leading-relaxed">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="premium-card rounded-xl p-4 sm:p-5 border-l-4 border-rose-500">
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                      <X className="h-4 w-4 text-rose-500" /> Challenges
                    </h4>
                    <ul className="space-y-2">
                      {selectedService.disadvantage.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-rose-500 mt-0.5 text-base leading-none">•</span>
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4. Our Main Projects */}
                <div className="premium-card rounded-xl p-4 sm:p-5">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                    <Building className="h-4 w-4 text-primary" /> Our Main Projects
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.mainProjects.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5. Why Choose DMV */}
                <div className="rounded-xl bg-primary/5 border border-primary/15 p-4 sm:p-5">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
                    <Star className="h-4 w-4" /> Why Choose DMV Construction
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedService.whyDMV}</p>
                </div>

                {/* 6. A word from DMV */}
                <div className="rounded-xl border-l-4 border-primary pl-4 pr-3 py-3 bg-secondary/40">
                  <p className="text-sm text-foreground font-medium italic leading-relaxed">"{selectedService.dmvNote}"</p>
                  <p className="text-xs text-muted-foreground mt-1.5 font-semibold">— D.M.V Construction Team</p>
                </div>

                {/* 7. & 8. Query + Contact Links */}
                <div className="grid grid-cols-2 gap-3 pt-1 pb-1">
                  <a
                    href="#contact"
                    onClick={() => setSelectedService(null)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 px-4 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:brightness-110 hover:scale-105 active:scale-95"
                  >
                    <MessageSquare className="h-4 w-4" /> Send Query
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setSelectedService(null)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 py-3 px-4 text-sm font-semibold text-primary transition-all hover:bg-primary/15 hover:scale-105 active:scale-95"
                  >
                    <Phone className="h-4 w-4" /> Contact Us
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
