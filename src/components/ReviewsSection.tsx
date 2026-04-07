import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const API_URL = import.meta.env.VITE_API_URL ?? "";

interface Review {
  _id: string;
  name: string;
  text: string;
  rating: number;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", text: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const titleReveal = useScrollReveal();
  const formReveal = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(6, 100);

  useEffect(() => {
    fetch(`${API_URL}/api/reviews`)
      .then((r) => r.json())
      .then(setReviews)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitted(true);
    setShowForm(false);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <section className="py-16 md:py-20 bg-secondary/30" id="reviews">
      <div className="container mx-auto px-4">
        <div
          ref={titleReveal.ref}
          className={`mb-12 text-center reveal-base reveal-up ${titleReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-black text-foreground">{avgRating}</span>
            <span className="text-sm text-muted-foreground">/ 5.0 Rating</span>
          </div>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Customer Reviews</h2>
          <p className="text-muted-foreground mb-6">What our clients say about us</p>
          {!submitted ? (
            <button onClick={() => setShowForm(!showForm)}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:shadow-lg transition-all duration-300 hover:scale-105">
              {showForm ? "Cancel" : "✍️ Write a Review"}
            </button>
          ) : (
            <p className="text-sm font-medium text-primary">✅ Thank you! Your review is pending approval.</p>
          )}
        </div>

        {/* Review Form */}
        {showForm && (
          <div
            ref={formReveal.ref}
            className="animate-fade-in"
          >
            <form onSubmit={handleSubmit} className="mx-auto mb-12 max-w-lg premium-card rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground">Share Your Experience</h3>
              <input required placeholder="Your Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}
                    className="transition-transform duration-200 hover:scale-125">
                    <Star className={`h-6 w-6 transition-colors ${star <= form.rating ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
                  </button>
                ))}
              </div>
              <textarea required placeholder="Write your review..." rows={3} value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all" />
              <button type="submit"
                className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                Submit Review
              </button>
            </form>
          </div>
        )}

        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground">No reviews yet. Be the first to review!</p>
        ) : (
          <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <div
                key={review._id}
                className={`premium-card rounded-2xl p-6 reveal-base reveal-up ${gridVisible ? "reveal-visible" : ""}`}
                style={getDelay(i)}
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-4 w-4 ${j < review.rating ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{review.text}"</p>
                <p className="text-sm font-bold text-foreground">{review.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
