import { cleanSingleLine, normalizeEmailData } from "./shared.js";

function subjectSuffix(input) {
  const { subject } = normalizeEmailData(input);
  return cleanSingleLine(subject, 120);
}

export function generateAutoReplySubject(input) {
  return `Message received — ${subjectSuffix(input)}`;
}

export function generateNotificationSubject(input) {
  return `New portfolio message — ${subjectSuffix(input)}`;
}
