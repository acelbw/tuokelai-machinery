"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

export function HeroSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Warm dark background */}
      <div className="absolute inset-0 bg-brand-dark" />
      <div className="absolute inset-0 bg-dots opacity-30" />

      {/* Warm ambient glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/[0.06] rounded-full blur-[150px] translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/[0.04] rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-5 py-2 mb-12 backdrop-blur-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange" />
          </span>
          <span className="text-brand-orange/80 text-xs font-medium tracking-wide">
            {t(lang, "hero.badge")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.02] mb-8 tracking-[-0.04em] max-w-5xl mx-auto"
        >
          {t(lang, "hero.title")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t(lang, "hero.subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/products"
            className="group inline-flex items-center justify-center gap-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-8 py-4 rounded-2xl text-sm transition-all duration-300 shadow-lg shadow-brand-orange/25"
          >
            {t(lang, "hero.cta")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.10] text-white border border-white/[0.10] px-8 py-4 rounded-2xl text-sm font-medium transition-all duration-300 backdrop-blur-sm"
          >
            {t(lang, "hero.cta2")}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-white/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
