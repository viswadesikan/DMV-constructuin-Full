/** Strip HTML tags and trim whitespace */
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();

/** Remove characters that could be used for injection attacks */
const stripDangerous = (value: string) =>
  value.replace(/[<>"'`;\\{}()|]/g, "").trim();

export const sanitize = {
  text: (value: string, maxLength = 200) =>
    stripDangerous(stripHtml(value)).slice(0, maxLength),

  email: (value: string) => {
    const clean = stripHtml(value).toLowerCase().trim().slice(0, 254);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) ? clean : "";
  },

  phone: (value: string) =>
    value.replace(/[^\d+\-\s()]/g, "").trim().slice(0, 20),

  message: (value: string, maxLength = 1000) =>
    stripDangerous(stripHtml(value)).slice(0, maxLength),
};

export const validate = {
  name: (v: string) => v.trim().length >= 2 && v.trim().length <= 100,
  phone: (v: string) => /^[+\d][\d\s\-()]{6,19}$/.test(v.trim()),
  email: (v: string) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  message: (v: string) => v.trim().length >= 5 && v.trim().length <= 1000,
};
