"use client";

const skeletonClass =
  "animate-pulse rounded-md bg-gray-200/80";

export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`${skeletonClass} ${className}`.trim()}
      aria-hidden
      {...props}
    />
  );
}

export function SkeletonMetricCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
      </div>
      <Skeleton className="mt-4 h-8 w-20" />
    </div>
  );
}

export function SkeletonTableRow({ cols = 4 }: { cols?: number }) {
  return (
    <tr className="border-b border-gray-100">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-4">
          <Skeleton className="h-5 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonPlanCard() {
  return (
    <div className="rounded-2xl border border-[#3E8DB9]/20 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-16" />
      <Skeleton className="mt-2 h-4 w-full max-w-[200px]" />
      <div className="mt-6 space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonProfileCard() {
  return (
    <div className="rounded-2xl border border-[#3E8DB9]/20 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-6 w-40" />
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <Skeleton className="mb-1.5 h-4 w-24" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 shrink-0 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Skeleton className="mb-1.5 h-4 w-20" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="mb-1.5 h-4 w-20" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
        <div>
          <Skeleton className="mb-1.5 h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonPasswordCard() {
  return (
    <div className="rounded-2xl border border-[#3E8DB9]/20 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-6 w-36" />
        </div>
      </div>
      <div className="space-y-5">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <Skeleton className="mb-1.5 h-4 w-28" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonSidebarProfile() {
  return (
    <div className="flex items-center gap-3 px-1 py-2">
      <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
      <div className="flex-1 space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
