"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

export function CTASection() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-orange/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-text mb-6 tracking-[-0.03em] leading-[1.08]"
        >
          {t(lang, "cta.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-brand-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {t(lang, "cta.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-10 py-4 rounded-2xl text-sm transition-all duration-300 shadow-lg shadow-brand-orange/25 group"
          >
            {t(lang, "cta.button")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
