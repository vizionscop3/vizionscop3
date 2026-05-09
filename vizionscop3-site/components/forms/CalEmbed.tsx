"use client";

export default function CalEmbed() {
  const username =
    process.env.NEXT_PUBLIC_CAL_USERNAME ?? "vizionscop3";
  const src = `https://cal.com/${username}?embed=true`;
  return (
    <iframe
      title="Cal.com scheduling"
      src={src}
      className="mt-4 min-h-[600px] w-full rounded-md border border-[var(--color-void-gray)] bg-[var(--color-deep-space)]"
      loading="lazy"
      allow="payment"
    />
  );
}
