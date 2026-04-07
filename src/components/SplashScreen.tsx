import { useState, useEffect } from "react";
import dmvLogo from "@/assets/dmv-logo-new.jpeg";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1800);
    const timer2 = setTimeout(() => onFinish(), 2400);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-[600ms] ${
        fadeOut ? "opacity-0 scale-110 blur-md" : "opacity-100 scale-100 blur-0"
      }`}
      style={{
        background: "linear-gradient(160deg, hsl(152 45% 28%), hsl(152 45% 38%), hsl(140 35% 48%))",
      }}
    >
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full border border-primary-foreground/10 animate-[pulse_3s_ease-in-out_infinite]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[450px] w-[450px] sm:h-[700px] sm:w-[700px] rounded-full border border-primary-foreground/5 animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* Morphing glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-primary-foreground/5 blur-3xl morph-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-primary-foreground/5 blur-3xl morph-blob-fast" />

      <div className="relative mb-6 sm:mb-8 animate-scale-in">
        <div className="absolute -inset-4 sm:-inset-6 rounded-2xl bg-primary-foreground/10 blur-2xl animate-glow-pulse" />
        <img
          src={dmvLogo}
          alt="DMV Construction Logo"
          className="relative h-24 sm:h-32 md:h-40 w-auto rounded-2xl bg-primary-foreground/95 p-2 sm:p-3 shadow-2xl"
        />
      </div>

      <h1 className="relative mb-2 sm:mb-3 text-3xl sm:text-4xl md:text-6xl font-black tracking-[0.15em] sm:tracking-[0.2em] text-primary-foreground animate-hero-text">
        DMV
      </h1>
      <h2 className="relative mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl font-light tracking-[0.3em] sm:tracking-[0.4em] text-primary-foreground/90 animate-hero-text animate-hero-text-delay-1">
        CONSTRUCTION
      </h2>

      <p className="relative text-[10px] sm:text-sm font-medium tracking-widest text-primary-foreground/60 uppercase animate-hero-text animate-hero-text-delay-2 px-4 text-center">
        Building Trust, Delivering Excellence
      </p>

      <div className="relative mt-8 sm:mt-12 h-0.5 w-36 sm:w-48 overflow-hidden rounded-full bg-primary-foreground/20 animate-hero-text animate-hero-text-delay-3">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-foreground/60 to-primary-foreground/90"
          style={{ animation: "splash-load 1.8s ease-in-out forwards" }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
