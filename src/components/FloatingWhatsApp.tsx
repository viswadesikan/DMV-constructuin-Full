import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/918122101282"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group"
    >
      {/* Ping ring */}
      <span className="absolute inset-0 rounded-full bg-green-400 opacity-20 blur-xl animate-ping" />
      
      {/* Glow ring */}
      <span className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-40" />

      <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-[0_10px_30px_rgba(34,197,94,0.5)] transition-all duration-500 hover:scale-110 hover:shadow-[0_20px_50px_rgba(34,197,94,0.6)] hover:rotate-12 active:scale-95">
        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-500 group-hover:scale-110" />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
