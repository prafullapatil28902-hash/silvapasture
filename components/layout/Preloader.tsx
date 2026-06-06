"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sp-loaded")) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("sp-loaded", "1");
      setDone(true);
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest-deep"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="serif text-xl text-ivory md:text-2xl"
          >
            SILVAPASTURE
          </motion.span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 h-px bg-gold"
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-6 text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50"
          >
            Preserved, not produced
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
