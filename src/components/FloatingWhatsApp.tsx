import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/918122101282"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-10 blur-xl animate-ping" />

      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_10px_30px_rgba(34,197,94,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_40px_rgba(34,197,94,0.8)] hover:rotate-6">
        <MessageCircle className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
