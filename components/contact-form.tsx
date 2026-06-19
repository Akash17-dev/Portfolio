"use client";

import { FormEvent, useState } from "react";
import { Calendar, Send } from "lucide-react";

type SubmitState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send message.");
      }

      form.reset();
      setSubmitState("success");
      setFeedback("Message sent. I will get back to you soon.");
    } catch (error) {
      setSubmitState("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send message.");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        placeholder="Name"
        required
        className="min-h-14 rounded-2xl border border-white/12 bg-white/[0.06] px-4 text-white outline-none backdrop-blur-xl transition placeholder:text-white/[0.34] focus:border-cyan/50"
      />
      <label className="sr-only" htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
        className="min-h-14 rounded-2xl border border-white/12 bg-white/[0.06] px-4 text-white outline-none backdrop-blur-xl transition placeholder:text-white/[0.34] focus:border-cyan/50"
      />
      <label className="sr-only" htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        placeholder="Message"
        rows={5}
        required
        className="rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-4 text-white outline-none backdrop-blur-xl transition placeholder:text-white/[0.34] focus:border-cyan/50"
      />
      {feedback ? (
        <p
          role="status"
          className={`rounded-2xl border px-4 py-3 text-sm ${
            submitState === "success"
              ? "border-mint/30 bg-mint/10 text-mint"
              : "border-coral/35 bg-coral/10 text-coral"
          }`}
        >
          {feedback}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="liquid-button disabled:cursor-not-allowed disabled:opacity-60" disabled={submitState === "sending"}>
          {submitState === "sending" ? "Sending..." : "Send Message"}
          <Send className="h-4 w-4" />
        </button>
        <a href="mailto:akulaakash17@gmail.com?subject=Project%20Call%20Request" className="liquid-button bg-white/[0.04]">
          Schedule Call
          <Calendar className="h-4 w-4" />
        </a>
      </div>
    </form>
  );
}
