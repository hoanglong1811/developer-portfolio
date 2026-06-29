import { useState } from "react";
import { Send } from "lucide-react";

import GlassCard from "@/components/shared/GlassCard";
import { Button } from "@/components/ui/button";
import Field from "@/components/ui/field";
import { sendContactMessage } from "@/services/contactService";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const isSending = status === "sending";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setStatus("sending");
    setFeedbackMessage("");

    try {
      await sendContactMessage(payload);
      form.reset();
      setStatus("success");
      setFeedbackMessage("Message sent. I will get back to you soon.");
    } catch (error) {
      setStatus("error");
      setFeedbackMessage(error.message || "Unable to send message. Please try again.");
    }
  };

  return (
    <GlassCard className="p-5 sm:p-7">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" placeholder="Name" required disabled={isSending} />
          <Field label="Email" name="email" placeholder="Email" type="email" required disabled={isSending} />
        </div>

        <Field label="Subject" name="subject" placeholder="Subject" required disabled={isSending} />
        <Field label="Message" name="message" placeholder="Message" textarea required disabled={isSending} />

        {feedbackMessage && (
          <p
            className={
              status === "success"
                ? "text-sm leading-6 text-success-text"
                : "text-sm leading-6 text-destructive"
            }
            role="status"
            aria-live="polite"
          >
            {feedbackMessage}
          </p>
        )}

        <Button type="submit" size="lg" className="mt-2" disabled={isSending}>
          {isSending ? "Sending" : "Send Message"}
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </form>
    </GlassCard>
  );
}
