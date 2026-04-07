import { useState } from "react";
import { Phone, MapPin, Mail, Clock, Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const titleReveal = useScrollReveal();
  const leftReveal = useScrollReveal();
  const rightReveal = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!API_URL) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/queries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) setError("Failed to send. Please try again.");
      else { setSubmitted(true); setForm({ name: "", phone: "", email: "", message: "" }); }
    } catch { setError("Failed to send. Please try again."); }
    setSubmitting(false);
  };

  const contactItems = [
    { icon: Phone, label: "Phone", value: "+91 81221 01282\n+91 94431 01282", href: "tel:+918122101282" },
    { icon: Mail, label: "Email", value: "dmvconstruction.dp@gmail.com", href: "mailto:dmvconstruction.dp@gmail.com" },
    { icon: MapPin, label: "Address", value: "19/17, 1st floor, Annamalai Gondar St,\nnear Municipality Road, Dharmapuri\nTamil Nadu 636701" },
    { icon: Clock, label: "Working Hours", value: "Mon – Sat: 9:00 AM – 6:00 PM" },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="contact">
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl morph-blob" />
      
      <div className="container relative mx-auto px-4 sm:px-6">
        <div ref={titleReveal.ref} className={`reveal-base reveal-up ${titleReveal.isVisible ? "reveal-visible" : ""}`}>
          <h2 className="mb-3 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="mx-auto mb-10 sm:mb-14 max-w-2xl text-center text-sm sm:text-base text-muted-foreground">
            Get in touch with us for your construction and real estate needs
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 sm:gap-6 md:grid-cols-2">
          <div ref={leftReveal.ref} className={`space-y-3 sm:space-y-4 reveal-base reveal-left ${leftReveal.isVisible ? "reveal-visible" : ""}`}>
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const Wrapper = item.href ? "a" : "div";
              return (
                <Wrapper
                  key={item.label}
                  {...(item.href ? { href: item.href } : {})}
                  className="premium-card glow-on-hover flex items-start gap-3 sm:gap-4 rounded-2xl p-4 sm:p-5"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.label}</h4>
                    <p className="text-xs sm:text-sm font-semibold text-foreground whitespace-pre-line">{item.value}</p>
                  </div>
                </Wrapper>
              );
            })}

            <div className="premium-card shimmer-border rounded-2xl p-5 sm:p-6">
              <h3 className="mb-4 text-sm sm:text-base font-bold text-foreground">Send a Query</h3>
              {submitted ? (
                <div className="rounded-xl bg-primary/10 p-4 text-center text-sm font-medium text-primary animate-scale-in">
                  ✅ Query sent! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {[
                    { placeholder: "Your Name", key: "name", required: true },
                    { placeholder: "Phone Number", key: "phone", required: true },
                    { placeholder: "Email (optional)", key: "email", type: "email" },
                  ].map((field) => (
                    <input
                      key={field.key}
                      required={field.required}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 focus:scale-[1.01]"
                    />
                  ))}
                  <textarea required placeholder="Your Message" rows={3} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all duration-300 focus:scale-[1.01]" />
                  {error && <p className="text-xs text-destructive">{error}</p>}
                  <button type="submit" disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground btn-magnetic disabled:opacity-60">
                    <Send className="h-4 w-4" />
                    {submitting ? "Sending..." : "Send Query"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div ref={rightReveal.ref} className={`premium-card overflow-hidden rounded-2xl reveal-base reveal-right ${rightReveal.isVisible ? "reveal-visible" : ""}`}>
            <iframe
              title="DMV Construction Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5593.472336548196!2d78.16171480796807!3d12.130598659985791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac17d03eb418e7%3A0x373b38618d0088d2!2sDMV%20CONSTRUCTION!5e0!3m2!1sen!2sin!4v1771391788768!5m2!1sen!2sin"
              className="w-full min-h-[350px] sm:min-h-[500px] md:min-h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
