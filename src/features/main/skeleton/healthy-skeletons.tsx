export function MealsListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="h-26 w-full animate-pulse rounded-lg bg-bg-soft" />
      ))}
    </div>
  );
}

export function MealDetailsSkeleton() {
  return (
    <div>
      <div className="min-h-128 w-full animate-pulse rounded-lg bg-bg-soft" />
      <div className="mt-10 h-9 w-48 animate-pulse rounded-lg bg-bg-soft" />
      <div className="mt-6 h-40 w-full animate-pulse rounded-lg bg-bg-soft" />
    </div>
  );
}
