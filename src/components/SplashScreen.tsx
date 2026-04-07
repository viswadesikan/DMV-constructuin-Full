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
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-[600ms] ${
        fadeOut ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{
        background: "linear-gradient(160deg, hsl(152 45% 32%), hsl(152 45% 42%), hsl(140 35% 50%))",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[500px] w-[500px] rounded-full border border-primary-foreground/10 animate-[pulse_3s_ease-in-out_infinite]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[700px] w-[700px] rounded-full border border-primary-foreground/5 animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      <div className="relative mb-8 animate-scale-in">
        <div className="absolute -inset-4 rounded-2xl bg-primary-foreground/10 blur-2xl animate-glow-pulse" />
        <img
          src={dmvLogo}
          alt="DMV Construction Logo"
          className="relative h-32 w-auto rounded-2xl bg-primary-foreground/95 p-3 shadow-2xl md:h-40"
        />
      </div>

      <h1 className="relative mb-3 text-4xl font-black tracking-[0.2em] text-primary-foreground md:text-6xl animate-hero-text">
        DMV
      </h1>
      <h2 className="relative mb-6 text-xl font-light tracking-[0.4em] text-primary-foreground/90 md:text-2xl animate-hero-text animate-hero-text-delay-1">
        CONSTRUCTION
      </h2>

      <p className="relative text-sm font-medium tracking-widest text-primary-foreground/60 uppercase animate-hero-text animate-hero-text-delay-2">
        Building Trust, Delivering Excellence
      </p>

      <div className="relative mt-12 h-0.5 w-48 overflow-hidden rounded-full bg-primary-foreground/20 animate-hero-text animate-hero-text-delay-3">
        <div
          className="h-full rounded-full bg-primary-foreground/80"
          style={{ animation: "splash-load 1.8s ease-in-out forwards" }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
