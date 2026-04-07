import { Phone, MapPin, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import dmvLogo from "@/assets/dmv-logo-new.jpeg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  const footerReveal = useScrollReveal({ threshold: 0.1 });

  return (
    <footer
      ref={footerReveal.ref}
      className={`relative overflow-hidden py-14 text-primary-foreground reveal-base reveal-up ${footerReveal.isVisible ? "reveal-visible" : ""}`}
      style={{
        background: "linear-gradient(160deg, hsl(152 45% 28%), hsl(152 45% 36%), hsl(140 35% 42%))",
      }}
    >
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 80% 20%, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="container relative mx-auto px-4">
        <div className="mb-10 flex items-center justify-center gap-4">
          <img src={dmvLogo} alt="DMV" className="h-14 w-auto rounded-lg bg-primary-foreground/90 p-1.5" />
          <div>
            <h3 className="text-lg font-black tracking-wider">DMV CONSTRUCTION</h3>
            <p className="text-xs tracking-widest text-primary-foreground/60 uppercase">Trusted Builders Since 2010</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex items-start gap-4 rounded-xl bg-primary-foreground/5 p-5 transition-all duration-300 hover:bg-primary-foreground/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-primary-foreground/60">Contact</h4>
              <p className="text-lg font-semibold">+91 81221 01282<br />+91 94431 01282</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl bg-primary-foreground/5 p-5 transition-all duration-300 hover:bg-primary-foreground/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-primary-foreground/60">Address</h4>
              <p className="text-sm leading-relaxed">
                Address: 19/17,1st floor, Annamalai Gondar St, near Municipality Road, Dharmapuri, <br />
                Tamil Nadu – 636701
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl bg-primary-foreground/5 p-5 transition-all duration-300 hover:bg-primary-foreground/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-primary-foreground/60">Email</h4>
              <p className="text-sm">dmvconstruction.dp@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-primary-foreground/10 pt-5">
          <p className="text-xs text-primary-foreground/40">
            © 2026 DMV Construction. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-xs text-primary-foreground/50 transition-all duration-300 hover:bg-primary-foreground/20 hover:text-primary-foreground/80"
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
