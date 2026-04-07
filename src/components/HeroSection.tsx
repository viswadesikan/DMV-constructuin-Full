import { Phone, MapPin } from "lucide-react";
import dmvLogo from "@/assets/dmv-logo-new.jpeg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 md:py-32 lg:py-36">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-100" />
      
      {/* Morphing blobs */}
      <div className="absolute -top-20 -left-20 sm:-top-32 sm:-left-32 h-64 sm:h-96 w-64 sm:w-96 bg-emerald-300/25 blur-3xl morph-blob" />
      <div className="absolute -bottom-20 -right-20 sm:-bottom-32 sm:-right-32 h-64 sm:h-96 w-64 sm:w-96 bg-green-400/20 blur-3xl morph-blob-fast" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 sm:h-72 w-48 sm:w-72 bg-teal-200/15 blur-3xl morph-blob" style={{ animationDelay: "2s" }} />
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      {/* Watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
        <img src={dmvLogo} alt="" className="w-[400px] sm:w-[600px] md:w-[800px] object-contain animate-float-slow" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        {/* Company Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-wide gradient-text animate-hero-text leading-tight">
          DMV CONSTRUCTION
        </h1>

        <div className="mx-auto mt-4 sm:mt-6 h-1 w-20 sm:w-28 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-green-600 animate-hero-text animate-hero-text-delay-1" />

        <p className="mt-6 sm:mt-8 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-medium text-gray-600 animate-hero-text animate-hero-text-delay-2 px-2">
          Trusted Real Estate Builders & Construction Office in Dharmapuri
        </p>

        {/* Location Badge */}
        <div className="mt-8 sm:mt-10 flex justify-center animate-hero-text animate-hero-text-delay-3">
          <div className="flex items-center gap-2 sm:gap-3 rounded-full glass-card px-5 sm:px-6 py-2.5 sm:py-3 shadow-lg animate-float">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              Dharmapuri, Tamil Nadu
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 sm:mt-12 animate-hero-text animate-hero-text-delay-4">
          <a
            href="tel:+918122101282"
            className="group relative inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-8 sm:px-12 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white btn-magnetic shadow-[0_15px_40px_rgba(16,185,129,0.35)]"
          >
            <Phone className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110" />
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
