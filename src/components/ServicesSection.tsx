import { Layers, Building2, Landmark, Compass, HardHat } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Layers,
    title: "DTCP Layout Approval",
    desc: "Complete assistance for DTCP-approved residential and commercial layout planning with government compliance.",
  },
  {
    icon: Building2,
    title: "Building Plan Approval",
    desc: "End-to-end building plan approval services including structural design, documentation, and authority submissions.",
  },
  {
    icon: Landmark,
    title: "Local Body Approval",
    desc: "Village Panchayat, Town Panchayat, and Municipality approval services for all types of construction projects.",
  },
  {
    icon: Compass,
    title: "Vasthu Planning",
    desc: "Professional Vasthu-compliant planning services ensuring your property aligns with traditional architectural principles.",
  },
  {
    icon: HardHat,
    title: "Construction Services",
    desc: "Full-scale construction services from foundation to finishing with premium materials and skilled workforce.",
  },
];

const ServicesSection = () => {
  const titleReveal = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(services.length, 120);

  return (
    <section className="py-16 md:py-20 bg-secondary/30" id="services">
      <div className="container mx-auto px-4">
        <div
          ref={titleReveal.ref}
          className={`reveal-base reveal-up ${titleReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Comprehensive construction and real estate services under one roof
          </p>
        </div>

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`premium-card group rounded-2xl p-8 reveal-base reveal-up ${gridVisible ? "reveal-visible" : ""}`}
                style={getDelay(i)}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-foreground">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
