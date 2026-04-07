import { Phone, MapPin, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import dmvLogo from "@/assets/dmv-logo-new.jpeg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  const footerReveal = useScrollReveal({ threshold: 0.1 });

  return (
    <footer
      ref={footerReveal.ref}
      className={`relative overflow-hidden py-12 sm:py-14 text-primary-foreground reveal-base reveal-up ${footerReveal.isVisible ? "reveal-visible" : ""}`}
      style={{
        background: "linear-gradient(160deg, hsl(152 45% 28%), hsl(152 45% 36%), hsl(140 35% 42%))",
      }}
    >
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 80% 20%, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 flex items-center justify-center gap-3 sm:gap-4">
          <img src={dmvLogo} alt="DMV Construction - Trusted Builders in Dharmapuri" className="h-12 sm:h-14 w-auto rounded-lg bg-primary-foreground/90 p-1 sm:p-1.5 transition-transform duration-500 hover:scale-110 hover:rotate-3" />
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-wider">DMV CONSTRUCTION</h3>
            <p className="text-[10px] sm:text-xs tracking-widest text-primary-foreground/60 uppercase">Trusted Builders Since 2016</p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[
            { icon: Phone, label: "Contact", value: "+91 81221 01282\n+91 94431 01282" },
            { icon: MapPin, label: "Address", value: "19/17, 1st floor, Annamalai Gondar St,\nnear Municipality Office, Dharmapuri,\nTamil Nadu – 636701" },
            { icon: Mail, label: "Email", value: "dmvconstruction.dp@gmail.com" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-3 sm:gap-4 rounded-xl bg-primary-foreground/5 p-4 sm:p-5 transition-all duration-400 hover:bg-primary-foreground/10 hover:translate-y-[-2px]">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <h4 className="mb-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground/60">{item.label}</h4>
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-primary-foreground/10 pt-5">
          <p className="text-[10px] sm:text-xs text-primary-foreground/40">
            © 2026 DMV Construction. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-[10px] sm:text-xs text-primary-foreground/50 transition-all duration-300 hover:bg-primary-foreground/20 hover:text-primary-foreground/80"
          >
            <Lock className="h-3 w-3" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
