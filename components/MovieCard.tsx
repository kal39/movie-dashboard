"use client";

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "white" | "outline";
}

export default function StatusBadge({ children, variant = "orange" }: StatusBadgeProps) {
  const styles = {
    orange: "bg-[#fb8500] text-black border-[#fb8500]",
    white: "bg-[#f5ebe0] text-black border-[#f5ebe0]",
    outline: "bg-transparent text-[#fb8500] border-[#fb8500]/30"
  };

  return (
    <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${styles[variant]}`}>
      {children}
    </span>
  );
}