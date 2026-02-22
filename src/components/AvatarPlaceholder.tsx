/** Person silhouette icon for avatar when no image - avoids next/image SVG quirks */
export default function AvatarPlaceholder({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex pt-1 justify-center overflow-hidden rounded-full bg-[#E2E8F0] ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        className="h-[80%] w-[80%] text-[#94A3B8]"
        aria-hidden
      >
        <circle cx="40" cy="32" r="12" fill="currentColor" />
        <path
          d="M20 70c0-11 8.954-20 20-20s20 9 20 20"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
