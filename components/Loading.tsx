export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-sm border border-line bg-white"
        >
          <div className="aspect-[4/3] w-full bg-navy/10" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-2/3 rounded bg-navy/10" />
            <div className="h-3 w-full rounded bg-navy/10" />
            <div className="h-3 w-1/2 rounded bg-navy/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
