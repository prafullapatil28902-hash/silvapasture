"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "The Herd", href: "/cows" },
  { label: "Diary", href: "/diary" },
  { label: "The Vault", href: "/vault" },
  { label: "Impact", href: "/#impact" },
  { label: "The Ghee", href: "/#product" },
  { label: "Journal", href: "/#journal" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // On inner pages there is no full-height hero, so keep the bar solid.
  const solid = !isHome || scrolled;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-silk ${
        solid
          ? "bg-ivory/90 backdrop-blur-md border-b border-charcoal/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="#top"
          className={`serif text-lg tracking-[0.3em] transition-colors duration-700 ${
            solid ? "text-forest" : "text-ivory"
          }`}
        >
          SILVAPASTURE
        </Link>

        <ul
          className={`hidden items-center gap-9 text-[0.72rem] uppercase tracking-[0.18em] md:flex ${
            solid ? "text-charcoal/80" : "text-ivory/85"
          }`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <Link
            href="/the-ghee/reserve"
            className={`hidden text-[0.72rem] uppercase tracking-[0.18em] transition-colors hover:text-gold md:inline ${
              solid ? "text-forest" : "text-ivory"
            }`}
          >
            Reserve
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className={`md:hidden ${solid ? "text-forest" : "text-ivory"}`}
          >
            <span className="block h-px w-7 bg-current" />
            <span className="mt-2 block h-px w-7 bg-current" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col bg-ivory px-8 py-6"
          >
            <div className="flex items-center justify-between">
              <span className="serif tracking-[0.3em] text-forest">
                SILVAPASTURE
              </span>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="serif text-2xl text-forest"
              >
                ×
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-7">
              {[...links, { label: "Reserve", href: "/the-ghee/reserve" }].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="serif text-4xl text-forest"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
