const DEFAULT_DEV_CONTACT_API_URL = "https://api.hlongdev.com/contact";

function getContactEndpoint() {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_CONTACT_API_DEV_URL || DEFAULT_DEV_CONTACT_API_URL;
  }

  return import.meta.env.VITE_CONTACT_API_URL;
}

export async function sendContactMessage(payload) {
  const endpoint = getContactEndpoint();

  if (!endpoint) {
    throw new Error("Contact API endpoint is not configured");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.error || "Failed to send contact message");
  }

  return response.json();
}
