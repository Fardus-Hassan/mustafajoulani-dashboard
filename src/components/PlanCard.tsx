"use client";

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3E8DB9]">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}

function EmptyCircleIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white" />
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: { text: string; included: boolean }[];
};

type PlanCardProps = {
  plan: Plan;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PlanCard({ plan, onEdit, onDelete }: PlanCardProps) {
  const periodLabel = plan.period.toLowerCase();

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
      {/* Gradient header: lighter blue top → darker blue bottom */}
      <div
        className="px-6 pt-6 pb-5 md:px-8 md:pt-8 md:pb-6"
        style={{
          background: "linear-gradient(180deg, #3E8DB9 0%, #3E8DB980 100%)",
        }}
      >
        <h3 className="text-xl font-bold text-white md:text-2xl">{plan.name}</h3>
        <p className="mt-2 flex items-baseline gap-1.5">
          <span className="text-4xl font-bold leading-none text-white md:text-5xl">{plan.price}</span>
          <span className="text-base font-normal text-white/95">/{periodLabel}</span>
        </p>
      </div>
      {/* White body */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 md:px-8 md:pb-8 md:pt-6">
        <p className="text-base font-normal text-gray-600 md:text-[17px]">{plan.description}</p>
        <ul className="mt-5 space-y-4 md:mt-6 md:space-y-[18px]">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-base font-normal text-gray-700 md:text-[17px]">
              {f.included ? <CheckIcon /> : <EmptyCircleIcon />}
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex gap-4 md:mt-10">
          <button
            type="button"
            onClick={onDelete}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-red-500 bg-white py-3.5 text-base font-normal text-red-500 transition-colors hover:bg-red-50 md:py-4"
          >
            Delete
            <TrashIcon />
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3E8DB9] py-3.5 text-base font-normal text-white transition-colors hover:bg-blue-600 md:py-4"
          >
            Edit
            <PencilIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
