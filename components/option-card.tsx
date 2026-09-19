import { cn } from "@/lib/cn";

interface OptionCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

/** Selectable tile used across the challenge steps: red border and tint when picked. Pass text alignment via className. */
export function OptionCard({ selected, className, children, ...props }: OptionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "flex w-full flex-col justify-start border-2",
        selected ? "border-brand bg-brand-tint" : "border-option bg-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
