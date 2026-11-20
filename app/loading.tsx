/** Shown while a route's content is being prepared: a quiet skeleton of the usual page shape. */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="container-x pb-24 pt-40 lg:pt-48">
      <div className="skeleton relative h-3 w-40" />
      <div className="skeleton relative mt-8 h-14 w-full max-w-2xl" />
      <div className="skeleton relative mt-4 h-14 w-2/3 max-w-xl" />
      <div className="skeleton relative mt-10 h-5 w-full max-w-md" />
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border border-hairline bg-white">
            <div className="skeleton relative aspect-[3/2]" />
            <div className="space-y-3 p-6">
              <div className="skeleton relative h-3 w-24" />
              <div className="skeleton relative h-8 w-4/5" />
              <div className="skeleton relative h-4 w-3/5" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
