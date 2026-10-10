export default function TabsSkeleton() {
  return (
    <div className="flex justify-center gap-4">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-bg-soft" />
      ))}
    </div>
  );
}
