import { Layers, Building2, Landmark, Compass, HardHat, ShieldCheck, Flame, Droplets, Factory, Box, GitBranch, Zap, X } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useRef, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { 
    icon: Layers, title: "DTCP Layout Approval", desc: "Complete assistance for DTCP-approved residential and commercial layout planning with government compliance.", gradient: "from-emerald-400 to-green-500",
    about: "DTCP (Directorate of Town and Country Planning) approval is mandatory for land development. It ensures the layout conforms to zoning and planning regulations out of city corporation limits.",
    important: "Unauthorized layouts lack basic amenities and are legally restricted from property registration and building approvals.",
    advantage: ["Legal security and clear title", "Eligible for bank loans", "Guaranteed basic infrastructure space (roads, parks)"],
    disadvantage: ["Process can be time-consuming", "Involves government processing fees and layout charges"]
  },
  { 
    icon: Building2, title: "Building Plan Approval", desc: "End-to-end building plan approval services including structural design, documentation, and authority submissions.", gradient: "from-teal-400 to-cyan-500",
    about: "A Building Plan Approval ensures that your proposed construction adheres to local building codes, safety standards, and regional zoning bypass laws.",
    important: "Constructing without an approved plan can lead to demolition notices, heavy penalties, and inability to secure power/water connections.",
    advantage: ["Ensures structural safety and proper ventilation", "Avoids legal penalties and demolition", "Higher resale value of the property"],
    disadvantage: ["Requires precise architectural drawings before starting", "Any deviations during construction can cause approval cancellation"]
  },
  { 
    icon: Landmark, title: "Local Body Approval", desc: "Village Panchayat, Town Panchayat, and Municipality approval services for all types of construction projects.", gradient: "from-green-400 to-emerald-500",
    about: "Local Body Approval is required for building construction within specific municipal, town, or village panchayat limits.",
    important: "Every tier of local governance has its own set of rules regarding FSI (Floor Space Index), setbacks, and building heights.",
    advantage: ["Streamlined local municipal services (trash, water)", "Quickest approval for smaller residential plots", "Direct local authority support"],
    disadvantage: ["Rules vary heavily between different local panchayats", "Requires frequent follow-ups with local officers"]
  },
  { 
    icon: Compass, title: "Vasthu Planning", desc: "Professional Vasthu-compliant planning services ensuring your property aligns with traditional architectural principles.", gradient: "from-cyan-400 to-teal-500",
    about: "Vasthu Shastra is a traditional Indian system of architecture that integrates design with nature, utilizing geometric patterns, symmetry, and directional alignments.",
    important: "Careful planning is required to balance Vasthu principles with modern practical architecture without sacrificing available space.",
    advantage: ["Promotes positive energy and well-being", "High demand in the Indian real estate market", "Improves spatial harmony"],
    disadvantage: ["Can restrict creative architectural designs", "May lead to slightly inefficient use of irregular plot shapes"]
  },
  { 
    icon: HardHat, title: "Construction Services", desc: "Full-scale construction services from foundation to finishing with premium materials and skilled workforce.", gradient: "from-emerald-500 to-green-600",
    about: "We provide comprehensive turnkey construction solutions, handling everything from procurement of high-grade raw materials to the final finishing touches.",
    important: "Choosing the right contractor means the difference between a structurally sound legacy home and a maintenance nightmare.",
    advantage: ["Single point of contact for the entire project", "Strict adherence to timelines and budget", "Professional quality control and warranties"],
    disadvantage: ["Requires significant initial capital planning", "Unforeseen weather delays can impact the overall project duration"]
  },
  { 
    icon: ShieldCheck, title: "Agri NOC", desc: "Agricultural No Objection Certificate services for land-use conversion and construction on agricultural land.", gradient: "from-lime-400 to-green-500",
    about: "An Agri NOC is a critical document required to legally convert agricultural land for residential, commercial, or industrial use.",
    important: "Building on agricultural land without legal land-use conversion is illegal and the property can be seized or demolished by the state.",
    advantage: ["Unlocks the commercial value of agricultural land", "Allows legal construction and development", "Prevents future land disputes"],
    disadvantage: ["Lengthy bureaucratic procedure involving multiple departments", "Conversion fees can be expensive depending on the zone"]
  },
  { 
    icon: Flame, title: "Fire NOC & Licence", desc: "Fire safety NOC and licence procurement for commercial, industrial, and residential buildings as per norms.", gradient: "from-orange-400 to-red-500",
    about: "Fire No Objection Certificate is issued by the Fire and Rescue Services Department, certifying that a building is equipped with necessary fire safety measures.",
    important: "Mandatory for commercial complexes, schools, hospitals, and high-rise residential apartments before public occupation.",
    advantage: ["Ensures absolute safety of occupants", "Legal compliance preventing business shutdown", "Drastically reduces building insurance premiums"],
    disadvantage: ["Requires installation of expensive fire safety equipment", "Needs periodic renewals and rigorous inspections"]
  },
  { 
    icon: Droplets, title: "PWD – WRD NOC", desc: "Public Works Department and Water Resources Department NOC services for construction near water bodies and roads.", gradient: "from-blue-400 to-cyan-500",
    about: "NOC from PWD and WRD is mandatory if your plot is located near highways, lakes, canals, or other protected water bodies.",
    important: "The NOC ensures your construction does not encroach on water catchments or road expansion reservations.",
    advantage: ["Protects your property from future road widening demolitions", "Prevents flooding and waterlogging issues", "Secures legally unquestionable property titles"],
    disadvantage: ["Strict setback rules might reduce usable plot area", "Documentation and land surveying processes take considerable time"]
  },
  { 
    icon: Factory, title: "Building Running Licence", desc: "Building running licence for industrial buildings — ensuring full legal compliance for operational facilities.", gradient: "from-slate-400 to-gray-500",
    about: "A Running Licence is required to officially operate heavy machinery, factories, and industrial units within a constructed building.",
    important: "Operating without a licence can lead to immediate sealing of the premises and severe legal action against the owners.",
    advantage: ["Authorises commercial and large-scale industrial operations", "Builds trust with clients and regulatory bodies", "Crucial for passing factory audits"],
    disadvantage: ["Requires stringent adherence to labor and emissions laws", "Annual or periodic renewal is strictly mandatory"]
  },
  { 
    icon: Box, title: "3D Elevation", desc: "Photorealistic 3D exterior and interior elevation designs and walkthroughs to visualise your project before construction.", gradient: "from-purple-400 to-indigo-500",
    about: "3D Elevation provides a hyper-realistic visual preview of the building's exterior and interior before a single brick is physically laid.",
    important: "Helps in finalizing materials, colors, and design elements, avoiding costly rework during the actual physical construction phase.",
    advantage: ["Crystal clear visualization of the final product", "Easy to experiment with different design styles digitally", "Helps in attracting investors or buyers early"],
    disadvantage: ["Adds an initial design cost to the project budget", "Highly complex aesthetic designs may be challenging to execute physically"]
  },
  { 
    icon: GitBranch, title: "Structural Drawing", desc: "Detailed structural drawings prepared by certified engineers for safe and code-compliant construction.", gradient: "from-yellow-400 to-amber-500",
    about: "Structural drawings are the engineering blueprints that calculate load-bearing capacities, steel reinforcement details, and foundation depths.",
    important: "A building's safety and longevity rely entirely on the exact mathematical calculations in the structural drawing.",
    advantage: ["Prevents building collapse and foundational cracks", "Optimizes the use of steel and concrete, saving material costs", "Required for all official building plan approvals"],
    disadvantage: ["Requires specialized structural engineering software and expertise", "Last-minute changes in architecture require complete recalculation"]
  },
  { 
    icon: Zap, title: "Plumbing & Electrical Drawing", desc: "Comprehensive plumbing and electrical layout drawings for residential, commercial, and industrial projects.", gradient: "from-teal-400 to-emerald-500",
    about: "M.E.P (Mechanical, Electrical, and Plumbing) drawings plot the hidden nervous system of a building, including pipes, wires, and internal systems.",
    important: "Proper drawing planning prevents future wall breakages and ensures balanced electrical loads to prevent fire hazards.",
    advantage: ["Efficient water and power distribution without drops", "Easy maintenance and troubleshooting years in the future", "Avoids physical clashes between pipes and structural beams"],
    disadvantage: ["Often overlooked in small projects leading to messy implementations", "Requires perfect coordination with structural and architectural designs"]
  },
];

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
    <div 
      ref={ref} 
      className={className} 
      style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s" }} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const ServicesSection = () => {
  const titleReveal = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(services.length, 100);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  // Disable body scroll when modal is open and add ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };

    if (selectedService) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
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
            Comprehensive construction and real estate services under one roof
          </p>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                layoutId={`card-wrapper-${service.title}`}
                key={service.title}
                onClick={() => setSelectedService(service)}
                className={`cursor-pointer reveal-base reveal-up ${gridVisible ? "reveal-visible" : ""}`}
                style={{ ...getDelay(i), borderRadius: 16 }}
              >
                <TiltInner className="premium-card glow-on-hover group h-full rounded-2xl p-6 sm:p-8">
                  <div className={`mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1`}>
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white icon-3d-hover" />
                  </div>
                  <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold text-foreground group-hover:gradient-text transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {service.desc}
                  </p>
                  <div className="mt-4 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read More →
                  </div>
                </TiltInner>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Service Details Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/70 pointer-events-auto" 
              onClick={() => setSelectedService(null)} 
            />
            
            {/* Expanding Modal Card */}
            <motion.div 
              layoutId={`card-wrapper-${selectedService.title}`}
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
              className="relative max-h-full max-w-3xl w-full bg-background overflow-hidden shadow-xl flex flex-col pointer-events-auto transform-gpu"
              style={{ borderRadius: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-6 sm:p-8 shrink-0 relative overflow-hidden bg-gradient-to-br ${selectedService.gradient}`}>
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                <button 
                  onClick={() => setSelectedService(null)} 
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors z-10 cursor-pointer pointer-events-auto"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative z-10 flex items-center gap-4 sm:gap-5 text-white">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30 shadow-inner">
                    <selectedService.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{selectedService.title}</h3>
                    <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-lg hidden sm:block">{selectedService.desc}</p>
                  </div>
                </div>
              </div>

              {/* Scrollable Body Content */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ delay: 0.2 }}
                className="p-6 sm:p-8 overflow-y-auto w-full space-y-6 sm:space-y-8 bg-secondary/10"
              >
                {/* About */}
                <div>
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                    <span className="w-6 h-[2px] bg-primary rounded-full"></span> About {selectedService.title}
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {selectedService.about}
                  </p>
                </div>

                {/* Important */}
                <div className="bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 sm:p-6 shadow-sm">
                  <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                    <span className="text-xl mb-0.5">⚠️</span> Important Note
                  </h4>
                  <p className="text-sm text-amber-900/90 dark:text-amber-200/80 leading-relaxed font-medium">
                    {selectedService.important}
                  </p>
                </div>

                {/* Adv/Disadv Grid */}
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 pt-2">
                  
                  {/* Advantages */}
                  <div className="premium-card rounded-2xl p-5 sm:p-6 border-l-4 border-l-emerald-500">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">✓</span> 
                      Advantages
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.advantage.map((adv, i) => (
                        <li key={`adv-${i}`} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="text-emerald-500 mt-1 text-xs px-1.5">•</span>
                          <span className="leading-relaxed">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Disadvantages */}
                  <div className="premium-card rounded-2xl p-5 sm:p-6 border-l-4 border-l-rose-500">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">✕</span> 
                      Challenges
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.disadvantage.map((dis, i) => (
                        <li key={`dis-${i}`} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="text-rose-500 mt-1 text-xs px-1.5">•</span>
                          <span className="leading-relaxed">{dis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ServicesSection;
