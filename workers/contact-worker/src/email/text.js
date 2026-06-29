import {EMAIL_BRAND, normalizeEmailData} from "./shared.js";

function renderSummary(data, {includeName = false} = {}) {
  const fields = [
    ...(includeName ? [["Name", data.name]] : []),
    ["Subject", data.subject],
    ["Email", data.email],
    ["Date", data.date],
    ["Message", data.message],
  ];

  return fields
    .map(([label, value]) => `${label}\n${value || "—"}`)
    .join("\n\n");
}

function renderLinks(data) {
  return [
    `Portfolio: ${data.portfolioUrl}`,
    ...(data.resumeUrl ? [`Resume: ${data.resumeUrl}`] : []),
    `Email: ${data.contactEmail}`,
    `GitHub: ${EMAIL_BRAND.githubUrl}`,
    `LinkedIn: ${EMAIL_BRAND.linkedinUrl}`,
  ].join("\n");
}

function renderTextEmail({
  data,
  terminalStatus,
  greeting,
  introduction,
  nextSteps,
}) {
  const parsedYear = new Date(data.date).getUTCFullYear();
  const copyrightYear = Number.isFinite(parsedYear)
    ? parsedYear
    : new Date().getUTCFullYear();

  return [
    EMAIL_BRAND.name,
    EMAIL_BRAND.role,
    "",
    terminalStatus,
    "",
    greeting,
    introduction,
    "",
    "MESSAGE SUMMARY",
    "------------------------------",
    renderSummary(data, {includeName: terminalStatus.includes("new-message")}),
    "------------------------------",
    "",
    "NEXT STEPS",
    ...nextSteps.map((step) => `✓ ${step}`),
    "",
    renderLinks(data),
    "",
    `${EMAIL_BRAND.displayName} / ${EMAIL_BRAND.role}`,
    `© ${copyrightYear} ${EMAIL_BRAND.displayName}`,
  ].join("\n");
}

export function generateAutoReplyText(input) {
  const data = normalizeEmailData(input);

  return renderTextEmail({
    data,
    terminalStatus:
      "$ contact --status received\n✓ Message successfully received",
    greeting: `Hi ${data.name},`,
    introduction:
      "Thank you for reaching out through my portfolio. I have successfully received your message and truly appreciate your interest. I usually respond within 24–48 hours.",
    nextSteps: [
      "Your message has been delivered successfully.",
      "I will review it personally.",
      "If necessary, I may contact you for additional information.",
      "Thank you for your patience.",
    ],
  });
}

export function generateNotificationText(input) {
  const data = normalizeEmailData(input);

  return renderTextEmail({
    data,
    terminalStatus:
      "$ contact --status new-message\n✓ New message ready for review",
    greeting: "New portfolio contact received.",
    introduction: `${data.name} submitted a message through ${data.portfolioUrl}.`,
    nextSteps: [
      "Review the message summary.",
      `Reply directly to ${data.email}.`,
      "Keep the original subject and context when responding.",
    ],
  });
}
