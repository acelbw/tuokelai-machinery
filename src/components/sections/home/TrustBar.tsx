"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

const stats = [
  { key: "trust.years", value: "10+" },
  { key: "trust.countries", value: "30+" },
  { key: "trust.units", value: "500+" },
  { key: "trust.satisfaction", value: "98%" },
];

export function TrustBar() {
  const { lang } = useLanguage();

  return (
    <section className="relative -mt-1 py-16 lg:py-20 border-y border-brand-border-light bg-brand-bg-alt/50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center py-6 px-4 rounded-2xl bg-white border border-brand-border-light"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text mb-2 tracking-[-0.03em]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-brand-muted font-medium">
                {t(lang, stat.key)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
