"use client";

import { motion } from "framer-motion";
import { Target, Award, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow={t(lang, "about.eyebrow")}
          title={t(lang, "about.title")}
          description={t(lang, "about.subtitle")}
        />

        <div className="max-w-4xl mx-auto">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-20"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 tracking-[-0.02em]">
              {t(lang, "about.story.title")}
            </h3>
            <div className="space-y-5 text-brand-muted leading-relaxed text-base">
              <p>{t(lang, "about.story.p1")}</p>
              <p>{t(lang, "about.story.p2")}</p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="card-premium glass-panel rounded-3xl p-7 lg:p-9 border border-white/[0.04] flex gap-6 mb-5"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-orange/[0.06] flex items-center justify-center shrink-0 ring-1 ring-brand-orange/[0.08]">
              <Target className="w-6 h-6 text-brand-orange" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-xl mb-3 tracking-[-0.01em]">
                {t(lang, "about.mission.title")}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                {t(lang, "about.mission.text")}
              </p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="card-premium glass-panel rounded-3xl p-7 lg:p-9 border border-white/[0.04] flex gap-6 mb-5"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-400/[0.06] flex items-center justify-center shrink-0 ring-1 ring-emerald-400/[0.08]">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-xl mb-3 tracking-[-0.01em]">
                {t(lang, "about.cert.title")}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                {t(lang, "about.cert.text")}
              </p>
            </div>
          </motion.div>

          {/* Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="card-premium glass-panel rounded-3xl p-7 lg:p-9 border border-white/[0.04] flex gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-400/[0.06] flex items-center justify-center shrink-0 ring-1 ring-blue-400/[0.08]">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-xl mb-3 tracking-[-0.01em]">
                {t(lang, "about.transactions.title")}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                {t(lang, "about.transactions.text")}
              </p>
              <div className="mt-5 bg-white/[0.01] rounded-2xl p-8 text-center border border-dashed border-white/[0.06]">
                <p className="text-brand-muted/60 text-sm">
                  📋 {t(lang, "about.transactions.placeholder")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
