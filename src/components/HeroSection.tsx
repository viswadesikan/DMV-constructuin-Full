import { Phone, MapPin } from "lucide-react";
import dmvLogo from "@/assets/dmv-logo-new.jpeg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-emerald-50 via-white to-green-100">
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <img
          src={dmvLogo}
          alt="Background Logo"
          className="w-[600px] md:w-[900px] object-contain"
        />
      </div>

      {/* Animated Glow Effects */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl animate-glow-pulse" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-green-400/20 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative container mx-auto px-6 text-center">
        {/* Company Name */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide text-gray-900 animate-hero-text">
          DMV CONSTRUCTION
        </h1>

        <div className="mx-auto mt-6 h-1 w-28 rounded-full bg-gradient-to-r from-emerald-400 to-green-600 animate-hero-text animate-hero-text-delay-1" />

        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl font-medium text-gray-600 animate-hero-text animate-hero-text-delay-2">
          Trusted Real Estate Builders & Construction Company in Dharmapuri
        </p>

        {/* Location */}
        <div className="mt-10 flex justify-center animate-hero-text animate-hero-text-delay-3">
          <div className="flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-lg border border-emerald-100 animate-float">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-700">
              Dharmapuri, Tamil Nadu
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 animate-hero-text animate-hero-text-delay-4">
          <a
            href="tel:+918122101282"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-12 py-4 text-lg font-bold text-white shadow-[0_15px_35px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_45px_rgba(16,185,129,0.6)]"
          >
            <Phone className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
