"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { towerCranes, getBrandName } from "@/lib/products";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FeaturedProducts() {
  const { lang } = useLanguage();
  const featured = towerCranes.slice(0, 4);

  return (
    <section className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow={t(lang, "featured.eyebrow")}
          title={t(lang, "featured.title")}
          description={t(lang, "featured.subtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {featured.map((crane, i) => (
            <motion.div
              key={crane.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={`/products#${crane.id}`} className="block group">
                <div className="card-premium glass-panel rounded-3xl overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden bg-brand-bg-alt">
                    <img
                      src={crane.image}
                      alt={crane.model}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] text-brand-orange font-semibold uppercase tracking-widest mb-2">
                      {getBrandName(crane.brand, lang)}
                    </p>
                    <h3 className="font-semibold text-brand-text text-base mb-4 tracking-[-0.01em]">
                      {crane.model}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span className="text-brand-muted">
                        {t(lang, "products.spec.capacity")}: <span className="text-brand-text font-medium">{crane.specs.capacityTons}{t(lang, "products.capacityUnit")}</span>
                      </span>
                      <span className="text-brand-muted">
                        {t(lang, "products.spec.height")}: <span className="text-brand-text font-medium">{crane.specs.maxHeightM}{t(lang, "products.heightUnit")}</span>
                      </span>
                      <span className="text-brand-muted">
                        {t(lang, "products.spec.year")}: <span className="text-brand-text font-medium">{crane.specs.year}</span>
                      </span>
                      <span className="text-emerald-600 font-medium text-xs">
                        {t(lang, "products.condition.used")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 text-brand-muted hover:text-brand-text text-sm font-medium transition-colors group"
          >
            {t(lang, "featured.viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
