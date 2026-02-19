import { ReactNode } from "react";

export default function MetricCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-[#E0F2FE] p-6 shadow-sm border border-sky-100/80 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-gray-600 md:text-lg">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">{value}</p>
        </div>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm md:h-16 md:w-16 [&>svg]:w-7 [&>svg]:h-7 md:[&>svg]:w-8 md:[&>svg]:h-8">
          {icon}
        </div>
      </div>
    </div>
  );
}
