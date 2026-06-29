import {
  generateAutoReplyEmail,
  generateAutoReplySubject,
  generateAutoReplyText,
  generateNotificationEmail,
  generateNotificationSubject,
  generateNotificationText,
} from "./email/index.js";

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://hlongdev.com",
  "https://www.hlongdev.com",
];

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map();

function getAllowedOrigins(env) {
  return String(env.CORS_ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(","))
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getCorsHeaders(origin, env) {
  const allowedOrigins = getAllowedOrigins(env);
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : "null";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function jsonResponse(body, status, origin, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(origin, env),
    },
  });
}

function validatePayload(payload) {
  const name = String(payload?.name ?? "").trim();
  const email = String(payload?.email ?? "").trim().toLowerCase();
  const subject = String(payload?.subject ?? "").trim();
  const message = String(payload?.message ?? "").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required" };
  }

  if (name.length > 120 || subject.length > 160 || message.length > 5000) {
    return { error: "Message fields exceed allowed length" };
  }

  if (!emailPattern.test(email)) {
    return { error: "A valid email is required" };
  }

  return { data: { name, email, subject, message } };
}

function getClientKey(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "anonymous"
  );
}

function isRateLimited(request) {
  const now = Date.now();
  const key = getClientKey(request);
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  record.count += 1;
  return record.count > RATE_LIMIT_MAX_REQUESTS;
}

async function sendResendEmail(env, payload) {
  const response = await fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${errorText}`);
  }

  return response.json();
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);

    if (url.pathname !== "/contact") {
      return jsonResponse({ error: "Not found" }, 404, origin, env);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(origin, env),
      });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, origin, env);
    }

    if (!getAllowedOrigins(env).includes(origin)) {
      return jsonResponse({ error: "Origin not allowed" }, 403, origin, env);
    }

    if (isRateLimited(request)) {
      return jsonResponse({ error: "Too many requests" }, 429, origin, env);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400, origin, env);
    }

    const { data, error } = validatePayload(payload);
    if (error) {
      return jsonResponse({ error }, 400, origin, env);
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
      return jsonResponse({ error: "Email service is not configured" }, 500, origin, env);
    }

    const emailData = {
      ...data,
      date: new Date().toISOString().slice(0, 10),
      portfolioUrl: env.PORTFOLIO_URL || "https://hlongdev.com",
      resumeUrl: env.RESUME_URL || "",
      contactEmail: env.CONTACT_TO_EMAIL,
    };

    try {
      await Promise.all([
        sendResendEmail(env, {
          from: env.CONTACT_FROM_EMAIL,
          to: env.CONTACT_TO_EMAIL,
          reply_to: data.email,
          subject: generateNotificationSubject(emailData),
          html: generateNotificationEmail(emailData),
          text: generateNotificationText(emailData),
        }),
        sendResendEmail(env, {
          from: env.CONTACT_FROM_EMAIL,
          to: data.email,
          reply_to: env.CONTACT_TO_EMAIL,
          subject: generateAutoReplySubject(emailData),
          html: generateAutoReplyEmail(emailData),
          text: generateAutoReplyText(emailData),
        }),
      ]);
    } catch (error) {
      console.error("Contact email delivery failed", error);
      return jsonResponse(
        { error: error instanceof Error ? error.message : "Failed to send contact email" },
        502,
        origin,
        env,
      );
    }

    return jsonResponse({ ok: true }, 200, origin, env);
  },
};
