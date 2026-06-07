"use client";

import { motion } from "framer-motion";
import { CheckCircle, DollarSign, Truck, Headphones } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";

const items = [
  { icon: CheckCircle, key: "why.1" },
  { icon: DollarSign, key: "why.2" },
  { icon: Truck, key: "why.3" },
  { icon: Headphones, key: "why.4" },
];

export function WhyUs() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-28 lg:py-36 bg-brand-bg-alt">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow={t(lang, "why.eyebrow")}
          title={t(lang, "why.title")}
          description={t(lang, "why.subtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="card-premium glass-panel rounded-3xl p-7 lg:p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/5 flex items-center justify-center mb-6 ring-1 ring-brand-orange/10">
                  <item.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="font-semibold text-brand-text text-lg mb-3 tracking-[-0.01em]">
                  {t(lang, `${item.key}.title`)}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {t(lang, `${item.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
