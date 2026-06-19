import { SiteNavigation } from "@/components/site-navigation";

export const metadata = {
  title: "Privacy | Akash Aakula",
  description: "Privacy details for the Akash Aakula portfolio.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <SiteNavigation />
      <section className="section-shell pt-32">
        <div className="calm-panel max-w-3xl rounded-[2rem] p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan">Privacy</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 text-base leading-8 text-white/[0.66]">
            This portfolio records basic visit and contact-form activity to understand traffic and respond to messages.
          </p>

          <div className="mt-8 grid gap-5 text-sm leading-7 text-white/[0.68]">
            <section>
              <h2 className="text-lg font-bold text-white">Visit Analytics</h2>
              <p className="mt-2">
                A visit event may store the page path, referrer, browser language, timezone, user agent, timestamp,
                and a hashed IP value. Raw IP addresses are not stored by the application.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white">Contact Messages</h2>
              <p className="mt-2">
                When you send a message, the submitted name, email, message, and timestamp are stored so Akash can reply.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white">Third Parties</h2>
              <p className="mt-2">
                Data may be processed by hosting, database, and optional notification providers used to run this site.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
