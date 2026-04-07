import { Building2, Award, Users, CheckCircle } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const stats = [
  { icon: Building2, value: "250+", label: "Projects Completed" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: CheckCircle, value: "100%", label: "DTCP Approved" },
];

const OverviewSection = () => {
  const titleReveal = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(stats.length, 150);
  const quoteReveal = useScrollReveal();

  return (
    <section className="py-16 md:py-20" id="overview">
      <div className="container mx-auto px-4">
        <div
          ref={titleReveal.ref}
          className={`reveal-base reveal-up ${titleReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            About DMV Construction
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            With over 15 years of experience in real estate and construction, DMV Construction has been the most trusted name in Dharmapuri for DTCP-approved layouts, building plans, and quality construction services.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`premium-card flex flex-col items-center gap-3 rounded-2xl p-8 text-center reveal-base reveal-scale ${gridVisible ? "reveal-visible" : ""}`}
                style={getDelay(i)}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <span className="text-3xl font-black text-foreground">{stat.value}</span>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </div>
            );
          })}
        </div>

        <div
          ref={quoteReveal.ref}
          className={`mx-auto mt-12 max-w-3xl rounded-2xl bg-primary/5 p-8 text-center reveal-base reveal-up ${quoteReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <p className="text-lg leading-relaxed text-foreground/80">
            We believe in <span className="font-bold text-primary">building trust</span> through transparency, quality materials, and on-time delivery. Every project we undertake reflects our commitment to excellence and our clients' vision of their dream property.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
