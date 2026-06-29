export const EMAIL_BRAND = Object.freeze({
  name: "CHU HOANG LONG",
  displayName: "Chu Hoang Long",
  initials: "HL",
  role: "Full Stack Developer",
  email: "hoanglongchu006@gmail.com",
  githubUrl: "https://github.com/hoanglong1811",
  linkedinUrl: "https://linkedin.com/in/chuhoanglong",
  portfolioUrl: "https://hlongdev.com",
});

export const EMAIL_COLORS = Object.freeze({
  background: "#0b0b0b",
  surface: "#151515",
  surfaceSecondary: "#111111",
  foreground: "#eaeaea",
  textSecondary: "#bebebe",
  muted: "#8b8b8b",
  accent: "#ff5a1f",
  border: "#232323",
  borderMuted: "#2b2b2b",
  success: "#9ee7b6",
  successBackground: "#101a13",
  successBorder: "#1f3d2a",
});

export const BODY_FONT = "Arial, Helvetica, sans-serif";
export const MONO_FONT = "'Courier New', Courier, monospace";

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function cleanSingleLine(value, maxLength = 160) {
  return String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeUrl(value, fallback = "") {
  const candidate = String(value ?? "").trim();
  if (!candidate) return fallback;

  try {
    const url = new URL(candidate);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

export function normalizeEmailData(input = {}) {
  const portfolioUrl = sanitizeUrl(input.portfolioUrl, EMAIL_BRAND.portfolioUrl);

  return {
    name: String(input.name ?? "Visitor").trim() || "Visitor",
    email: String(input.email ?? "").trim(),
    subject: cleanSingleLine(input.subject || "Portfolio contact", 160),
    message: String(input.message ?? "").trim(),
    date: cleanSingleLine(input.date || new Date().toISOString().slice(0, 10), 40),
    portfolioUrl,
    resumeUrl: sanitizeUrl(input.resumeUrl),
    contactEmail: String(input.contactEmail ?? EMAIL_BRAND.email).trim() || EMAIL_BRAND.email,
  };
}
