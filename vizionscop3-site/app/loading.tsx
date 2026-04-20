export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-obsidian)]">
      <div className="flex flex-col items-center">
        {/* Animated logo/spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--color-void-gray)]" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[var(--color-electric-cyan)]" />
        </div>
        
        {/* Loading text */}
        <p className="mt-6 font-[var(--font-mono)] text-sm text-[var(--color-echo-gray)]">
          Loading...
        </p>
      </div>
    </div>
  );
}
