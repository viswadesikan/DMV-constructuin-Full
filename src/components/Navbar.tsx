import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import dmvLogo from "@/assets/dmv-logo-new.jpeg";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const target = document.querySelector(href);
    if (!target) return;
    const navHeight = (document.querySelector("nav") as HTMLElement)?.offsetHeight ?? 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <nav className="sticky top-0 z-40 border-b border-border/30 glass-effect animate-slide-down-nav">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <a href="#" onClick={(e) => scrollTo(e, "#")} className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <img src={dmvLogo} alt="DMV Construction" className="relative h-9 sm:h-10 w-auto rounded-lg bg-primary-foreground p-0.5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
          </div>
          <span className="text-base sm:text-lg font-black tracking-tight gradient-text animate-hero-text" style={{ fontFamily: "'Barlow Condensed', sans-serif", transform: "scaleX(1.5)", display: "inline-block", transformOrigin: "left center" }}>DMV</span>
        </a>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={(e) => scrollTo(e, link.href)}
              className="nav-link-fancy rounded-lg px-3 xl:px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground">
              {link.label}
            </a>
          ))}
          <Link to="/admin"
            className="ml-3 rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-foreground btn-magnetic">
            Admin
          </Link>
          <Link to="/client"
            className="ml-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground btn-magnetic">
            Client Login
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-foreground lg:hidden transition-transform duration-200 active:scale-90"
          aria-label="Toggle menu"
        >
          <div className="relative h-5 w-5">
            <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${open ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
            <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
          </div>
        </button>
      </div>

      <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-border/30 bg-background/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/5 hover:text-foreground hover:translate-x-2"
              style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          <Link to="/admin" onClick={() => setOpen(false)}
            className="block rounded-xl bg-secondary px-4 py-3 text-center text-sm font-semibold text-foreground mt-2">
            Admin
          </Link>
          <Link to="/client" onClick={() => setOpen(false)}
            className="block rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground mt-2">
            Client Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
