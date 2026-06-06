"use client";

import Link from "next/link";

type Variant = "ghost" | "reserve" | "text";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-sans text-[0.8rem] uppercase tracking-[0.18em] transition-all duration-500 ease-silk";

const variants: Record<Variant, string> = {
  ghost:
    "border border-gold/50 px-8 py-4 text-ivory hover:border-gold hover:bg-gold/10",
  reserve:
    "bg-ivory px-8 py-4 text-forest hover:bg-gold hover:text-forest",
  text: "text-ivory/80 hover:text-ivory",
};

export default function Button({
  children,
  href = "#",
  variant = "ghost",
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  dark?: boolean;
}) {
  const tone =
    variant === "text" && dark ? "text-charcoal/70 hover:text-charcoal" : "";
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${tone} ${className}`}>
      <span>{children}</span>
      {variant === "text" && (
        <span className="transition-transform duration-500 ease-silk group-hover:translate-x-1">
          →
        </span>
      )}
    </Link>
  );
}
