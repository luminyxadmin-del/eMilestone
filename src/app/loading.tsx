export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center bg-surface"
    >
      <span className="size-6 animate-spin rounded-full border-2 border-line border-t-amber" />
    </div>
  );
}
