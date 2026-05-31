import { Calendar, Send } from "lucide-react";

export function ContactForm() {
  return (
    <form className="grid gap-4">
      <label className="sr-only" htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        placeholder="Name"
        className="min-h-14 rounded-2xl border border-white/12 bg-white/[0.06] px-4 text-white outline-none backdrop-blur-xl transition placeholder:text-white/[0.34] focus:border-cyan/50"
      />
      <label className="sr-only" htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        className="min-h-14 rounded-2xl border border-white/12 bg-white/[0.06] px-4 text-white outline-none backdrop-blur-xl transition placeholder:text-white/[0.34] focus:border-cyan/50"
      />
      <label className="sr-only" htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        placeholder="Message"
        rows={5}
        className="rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-4 text-white outline-none backdrop-blur-xl transition placeholder:text-white/[0.34] focus:border-cyan/50"
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="liquid-button">
          Send Message
          <Send className="h-4 w-4" />
        </button>
        <a href="#" className="liquid-button bg-white/[0.04]">
          Schedule Call
          <Calendar className="h-4 w-4" />
        </a>
      </div>
    </form>
  );
}
