import {
  BODY_FONT,
  EMAIL_BRAND,
  EMAIL_COLORS,
  MONO_FONT,
  escapeHtml,
  normalizeEmailData,
} from "./shared.js";

const paragraphStyle = [
  "margin:0",
  `color:${EMAIL_COLORS.textSecondary}`,
  `font-family:${BODY_FONT}`,
  "font-size:16px",
  "line-height:1.75",
].join(";");

const labelStyle = [
  "margin:0 0 8px",
  `color:${EMAIL_COLORS.muted}`,
  `font-family:${MONO_FONT}`,
  "font-size:11px",
  "font-weight:700",
  "letter-spacing:0.2em",
  "line-height:1.5",
  "text-transform:uppercase",
].join(";");

function renderHeader({command, status}) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="padding:28px 28px 22px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="56" valign="top" style="width:56px;">
                <div role="img" aria-label="Chu Hoang Long portfolio logo" title="Chu Hoang Long portfolio logo" style="width:44px;height:44px;border:1px solid ${EMAIL_COLORS.accent};background:${EMAIL_COLORS.surfaceSecondary};color:${EMAIL_COLORS.accent};font-family:${MONO_FONT};font-size:16px;font-weight:700;line-height:44px;text-align:center;">${EMAIL_BRAND.initials}</div>
              </td>
              <td valign="top">
                <h1 style="margin:0;color:${EMAIL_COLORS.foreground};font-family:${BODY_FONT};font-size:21px;font-weight:700;letter-spacing:0.06em;line-height:1.25;text-transform:uppercase;">${EMAIL_BRAND.name}</h1>
                <p style="margin:5px 0 0;color:${EMAIL_COLORS.accent};font-family:${BODY_FONT};font-size:13px;font-weight:700;letter-spacing:0.1em;line-height:1.5;text-transform:uppercase;">${EMAIL_BRAND.role}</p>
              </td>
            </tr>
          </table>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:22px;border:1px solid ${EMAIL_COLORS.border};background:${EMAIL_COLORS.background};border-radius:6px;">
            <tr>
              <td style="padding:15px 16px;font-family:${MONO_FONT};font-size:13px;line-height:1.7;">
                <div style="color:${EMAIL_COLORS.accent};">${escapeHtml(command)}</div>
                <div style="color:${EMAIL_COLORS.success};">&#10003; ${escapeHtml(status)}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px;">
          <div style="height:1px;background:${EMAIL_COLORS.border};font-size:1px;line-height:1px;">&nbsp;</div>
        </td>
      </tr>
    </table>
  `;
}

function renderField(label, value, {multiline = false} = {}) {
  const safeValue = escapeHtml(value || "—");
  const formattedValue = multiline
    ? safeValue.replaceAll("\n", "<br>")
    : safeValue;

  return `
    <tr>
      <td style="padding:0 0 18px;">
        <p style="${labelStyle}">${escapeHtml(label)}</p>
        <div style="margin:0;color:${EMAIL_COLORS.foreground};font-family:${multiline ? BODY_FONT : MONO_FONT};font-size:${multiline ? "15px" : "14px"};line-height:${multiline ? "1.75" : "1.6"};word-break:break-word;">${formattedValue}</div>
      </td>
    </tr>
  `;
}

function renderMessageSummary(data, {includeName = false} = {}) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:26px 0;border:1px solid ${EMAIL_COLORS.border};background:${EMAIL_COLORS.surface};border-radius:6px;">
      <tr>
        <td style="padding:13px 18px;border-bottom:1px solid ${EMAIL_COLORS.border};background:${EMAIL_COLORS.surfaceSecondary};">
          <p style="margin:0;color:${EMAIL_COLORS.muted};font-family:${MONO_FONT};font-size:11px;font-weight:700;letter-spacing:0.2em;line-height:1.5;text-transform:uppercase;">Engineering panel / message summary</p>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 20px 4px;border-left:2px solid ${EMAIL_COLORS.accent};">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            ${includeName ? renderField("Name", data.name) : ""}
            ${renderField("Subject", data.subject)}
            ${renderField("Email", data.email)}
            ${renderField("Date", data.date)}
            ${renderField("Message", data.message, {multiline: true})}
          </table>
        </td>
      </tr>
    </table>
  `;
}

function renderChecklist(items) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      ${items
        .map(
          (item) => `
            <tr>
              <td width="28" valign="top" style="width:28px;padding:0 0 12px;color:${EMAIL_COLORS.success};font-family:${MONO_FONT};font-size:15px;line-height:1.6;">&#10003;</td>
              <td valign="top" style="padding:0 0 12px;color:${EMAIL_COLORS.textSecondary};font-family:${BODY_FONT};font-size:15px;line-height:1.6;">${escapeHtml(item)}</td>
            </tr>
          `,
        )
        .join("")}
    </table>
  `;
}

function renderButton(url, label, {secondary = false} = {}) {
  const background = secondary
    ? EMAIL_COLORS.surfaceSecondary
    : EMAIL_COLORS.accent;
  const color = secondary ? EMAIL_COLORS.foreground : EMAIL_COLORS.background;
  const border = secondary ? EMAIL_COLORS.borderMuted : EMAIL_COLORS.accent;

  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="display:inline-table;margin:0 8px 10px 0;">
      <tr>
        <td align="center" bgcolor="${background}" style="border:1px solid ${border};border-radius:4px;">
          <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:13px 18px;color:${color};font-family:${MONO_FONT};font-size:12px;font-weight:700;letter-spacing:0.12em;line-height:1;text-decoration:none;text-transform:uppercase;">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>
  `;
}

function renderActions(data) {
  return `
    <div style="margin-top:24px;">
      ${renderButton(data.portfolioUrl, "Visit Portfolio")}
      ${data.resumeUrl ? renderButton(data.resumeUrl, "Download Resume", {secondary: true}) : ""}
    </div>
  `;
}

function copyrightYear(date) {
  const parsedYear = new Date(date).getUTCFullYear();
  return Number.isFinite(parsedYear) ? parsedYear : new Date().getUTCFullYear();
}

function renderFooter(data) {
  const linkStyle = `color:${EMAIL_COLORS.textSecondary};font-family:${MONO_FONT};font-size:12px;line-height:1.8;text-decoration:underline;text-decoration-color:${EMAIL_COLORS.borderMuted};`;

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="padding:0 28px;">
          <div style="height:1px;background:${EMAIL_COLORS.border};font-size:1px;line-height:1px;">&nbsp;</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px 28px;">
          <p style="margin:0;color:${EMAIL_COLORS.foreground};font-family:${BODY_FONT};font-size:15px;font-weight:700;letter-spacing:0.06em;line-height:1.5;text-transform:uppercase;">${EMAIL_BRAND.name}</p>
          <p style="margin:3px 0 14px;color:${EMAIL_COLORS.accent};font-family:${BODY_FONT};font-size:12px;font-weight:700;letter-spacing:0.1em;line-height:1.5;text-transform:uppercase;">${EMAIL_BRAND.role}</p>
          <p style="margin:0 0 14px;">
            <a href="mailto:${escapeHtml(data.contactEmail)}" style="${linkStyle}">Email</a>
            <span style="color:${EMAIL_COLORS.borderMuted};">&nbsp;/&nbsp;</span>
            <a href="${EMAIL_BRAND.githubUrl}" target="_blank" rel="noopener noreferrer" style="${linkStyle}">GitHub</a>
            <span style="color:${EMAIL_COLORS.borderMuted};">&nbsp;/&nbsp;</span>
            <a href="${EMAIL_BRAND.linkedinUrl}" target="_blank" rel="noopener noreferrer" style="${linkStyle}">LinkedIn</a>
            <span style="color:${EMAIL_COLORS.borderMuted};">&nbsp;/&nbsp;</span>
            <a href="${escapeHtml(data.portfolioUrl)}" target="_blank" rel="noopener noreferrer" style="${linkStyle}">Portfolio</a>
          </p>
          <p style="margin:0;color:${EMAIL_COLORS.muted};font-family:${BODY_FONT};font-size:12px;line-height:1.7;">&copy; ${copyrightYear(data.date)} ${EMAIL_BRAND.displayName}</p>
        </td>
      </tr>
    </table>
  `;
}

function renderEmailShell({
  data,
  preview,
  command,
  status,
  heading,
  introduction,
  nextSteps,
  includeName,
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background:${EMAIL_COLORS.background};color:${EMAIL_COLORS.foreground};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${EMAIL_COLORS.background}" style="width:100%;background:${EMAIL_COLORS.background};">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <div role="article" aria-roledescription="email" aria-label="${escapeHtml(heading)}" style="width:100%;max-width:600px;margin:0 auto;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="${EMAIL_COLORS.surface}" style="width:100%;max-width:600px;border:1px solid ${EMAIL_COLORS.border};border-radius:6px;background:${EMAIL_COLORS.surface};">
              <tr>
                <td>
                  ${renderHeader({command, status})}
                  <div style="padding:26px 28px 30px;">
                    <h2 style="margin:0 0 14px;color:${EMAIL_COLORS.foreground};font-family:${BODY_FONT};font-size:22px;font-weight:700;line-height:1.35;">${escapeHtml(heading)}</h2>
                    <div style="${paragraphStyle}">${introduction}</div>
                    ${renderMessageSummary(data, {includeName})}
                    <p style="${labelStyle}">Next steps</p>
                    ${renderChecklist(nextSteps)}
                    ${renderActions(data)}
                  </div>
                  ${renderFooter(data)}
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function generateAutoReplyEmail(input) {
  const data = normalizeEmailData(input);

  return renderEmailShell({
    data,
    preview: `Message received. Thank you for contacting ${EMAIL_BRAND.displayName}.`,
    command: "$ contact --status received",
    status: "Message successfully received",
    heading: `Hi ${data.name},`,
    introduction: `
      <p style="${paragraphStyle}">Thank you for reaching out through my portfolio.</p>
      <p style="${paragraphStyle};margin-top:10px;">I have successfully received your message and truly appreciate your interest. I usually respond within <strong style="color:${EMAIL_COLORS.foreground};">24–48 hours</strong>.</p>
    `,
    nextSteps: [
      "Your message has been delivered successfully.",
      "I will review it personally.",
      "If necessary, I may contact you for additional information.",
      "Thank you for your patience.",
    ],
    includeName: false,
  });
}

export function generateNotificationEmail(input) {
  const data = normalizeEmailData(input);

  return renderEmailShell({
    data,
    preview: `New portfolio message from ${data.name}: ${data.subject}`,
    command: "$ contact --status new-message",
    status: "New message ready for review",
    heading: "New portfolio contact received.",
    introduction: `
      <p style="${paragraphStyle}"><strong style="color:${EMAIL_COLORS.foreground};">${escapeHtml(data.name)}</strong> submitted a message through <a href="${escapeHtml(data.portfolioUrl)}" style="color:${EMAIL_COLORS.accent};text-decoration:underline;">your portfolio</a>.</p>
    `,
    nextSteps: [
      "Review the message summary.",
      `Reply directly to ${data.email}.`,
      "Keep the original subject and context when responding.",
    ],
    includeName: true,
  });
}
