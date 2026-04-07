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
    setSubmitting(true);
    setError("");

    const res = await fetch(`${API_URL}/api/queries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setError("Failed to send. Please try again.");
    } else {
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    }
    setSubmitting(false);
  };

  return (
    <section className="py-16 md:py-20" id="contact">
      <div className="container mx-auto px-4">
        <div
          ref={titleReveal.ref}
          className={`reveal-base reveal-up ${titleReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Contact Us
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Get in touch with us for your construction and real estate needs
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Left: Contact Info + Query Form */}
          <div
            ref={leftReveal.ref}
            className={`space-y-4 reveal-base reveal-left ${leftReveal.isVisible ? "reveal-visible" : ""}`}
          >
            {[
              { icon: Phone, label: "Phone", value: "+91 81221 01282 \n+91 94431 01282", href: "tel:+918122101282" },
              { icon: Mail, label: "Email", value: "dmvconstruction.dp@gmail.com", href: "mailto:dmvconstruction.dp@gmail.com" },
              { icon: MapPin, label: "Address", value: "19/17,1st floor, Annamalai Gondar St, near Municipality Road\n Dharmapuri \nTamil Nadu 636701\nIndia" },
              { icon: Clock, label: "Working Hours", value: "Mon – Sat: 9:00 AM – 6:00 PM" },
            ].map((item) => {
              const Icon = item.icon;
              const Wrapper = item.href ? "a" : "div";
              return (
                <Wrapper
                  key={item.label}
                  {...(item.href ? { href: item.href } : {})}
                  className="premium-card flex items-start gap-4 rounded-2xl p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.label}</h4>
                    <p className="text-sm font-semibold text-foreground whitespace-pre-line">{item.value}</p>
                  </div>
                </Wrapper>
              );
            })}

            {/* Query Form */}
            <div className="premium-card rounded-2xl p-6">
              <h3 className="mb-4 text-base font-bold text-foreground">Send a Query</h3>
              {submitted ? (
                <div className="rounded-xl bg-primary/10 p-4 text-center text-sm font-medium text-primary animate-scale-in">
                  ✅ Query sent! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input required placeholder="Your Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                  <input required placeholder="Phone Number" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                  <input type="email" placeholder="Email (optional)" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                  <textarea required placeholder="Your Message" rows={3} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all" />
                  {error && <p className="text-xs text-destructive">{error}</p>}
                  <button type="submit" disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-60">
                    <Send className="h-4 w-4" />
                    {submitting ? "Sending..." : "Send Query"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map Embed */}
          <div
            ref={rightReveal.ref}
            className={`premium-card overflow-hidden rounded-2xl reveal-base reveal-right ${rightReveal.isVisible ? "reveal-visible" : ""}`}
          >
            <iframe
              title="DMV Construction Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5593.472336548196!2d78.16171480796807!3d12.130598659985791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac17d03eb418e7%3A0x373b38618d0088d2!2sDMV%20CONSTRUCTION!5e0!3m2!1sen!2sin!4v1771391788768!5m2!1sen!2sin"
              className="w-full min-h-[500px] border-0"
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
