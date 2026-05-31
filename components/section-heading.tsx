export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <div className="pill mb-4 inline-flex">{eyebrow}</div>
      <h2 className="text-balance text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl">
        {title}
      </h2>
    </div>
  );
}
