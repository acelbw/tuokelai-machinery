"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Mail, Truck, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { getBrandName, getTowerCranes, type TowerCrane } from "@/lib/products";
import {
  filterProductsByCategory,
  getEmptyCategoryMessage,
  getProductCategoryLabel,
  normalizeProductCategory,
  productCategories,
  type ProductCategory,
} from "@/lib/productCategories";
import { SectionHeader } from "@/components/ui/SectionHeader";

const categoryIcons = {
  "tower-cranes": Building2,
  "truck-cranes": Truck,
  "other-equipment": Wrench,
} as const;

export default function ProductsPage() {
  const { lang } = useLanguage();
  const [cranes, setCranes] = useState<TowerCrane[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<ProductCategory>("tower-cranes");

  useEffect(() => {
    getTowerCranes().then(setCranes);
  }, []);

  const visibleProducts = filterProductsByCategory(cranes, activeCategory);

  return (
    <section className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow={t(lang, "products.eyebrow")}
          title={t(lang, "products.title")}
          description={t(lang, "products.subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-14">
          {productCategories.map((category) => {
            const Icon = categoryIcons[category.id];
            const count = cranes.filter(
              (product) =>
                normalizeProductCategory(product.category) === category.id,
            ).length;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={isActive}
                className={`group rounded-3xl border p-6 text-left transition-all duration-300 ${
                  isActive
                    ? "border-brand-orange bg-brand-orange text-white shadow-lg shadow-brand-orange/15"
                    : "border-brand-border-light bg-white hover:border-brand-orange/40 hover:-translate-y-1"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isActive
                        ? "bg-white/15"
                        : "bg-brand-orange/5 text-brand-orange"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-brand-bg-alt text-brand-muted"
                    }`}
                  >
                    {count}
                  </span>
                </div>
                <h2
                  className={`text-lg font-bold mt-5 ${
                    isActive ? "text-white" : "text-brand-text"
                  }`}
                >
                  {category.label[lang]}
                </h2>
                <p
                  className={`text-sm leading-relaxed mt-2 ${
                    isActive ? "text-white/75" : "text-brand-muted"
                  }`}
                >
                  {category.description[lang]}
                </p>
              </button>
            );
          })}
        </div>

        <div className="flex items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-[11px] text-brand-orange font-semibold uppercase tracking-[0.15em] mb-2">
              {t(lang, "nav.products")}
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-brand-text tracking-[-0.03em]">
              {getProductCategoryLabel(activeCategory, lang)}
            </h2>
          </div>
          <span className="text-sm text-brand-muted">
            {visibleProducts.length}
          </span>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="glass-panel rounded-3xl border border-brand-border-light px-6 py-14 text-center">
            <p className="text-brand-muted max-w-2xl mx-auto leading-relaxed">
              {getEmptyCategoryMessage(lang)}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 mt-6 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t(lang, "products.inquiry")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleProducts.map((crane, i) => (
              <motion.div
                key={crane.id}
                id={crane.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="card-premium glass-panel rounded-3xl overflow-hidden">
                  <div className="aspect-[16/10] bg-brand-bg-alt overflow-hidden">
                    <img
                      src={crane.image}
                      alt={crane.model}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-[11px] text-brand-orange font-semibold uppercase tracking-widest mb-1.5">
                          {getBrandName(crane.brand, lang)}
                        </p>
                        <h3 className="text-xl font-bold text-brand-text tracking-[-0.02em]">
                          {crane.model}
                        </h3>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-[11px] font-medium px-3 py-1.5 rounded-full border border-emerald-100">
                        {t(lang, "products.condition.used")}
                      </span>
                    </div>
                    <p className="text-sm text-brand-muted leading-relaxed mb-6">
                      {crane.description[lang] || crane.description.en}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {[
                        {
                          label: t(lang, "products.spec.capacity"),
                          value: crane.specs.capacityTons,
                          unit: t(lang, "products.capacityUnit"),
                        },
                        {
                          label: t(lang, "products.spec.height"),
                          value: crane.specs.maxHeightM,
                          unit: t(lang, "products.heightUnit"),
                        },
                        {
                          label: t(lang, "products.spec.radius"),
                          value: crane.specs.workingRadiusM,
                          unit: t(lang, "products.radiusUnit"),
                        },
                        {
                          label: t(lang, "products.spec.year"),
                          value: crane.specs.year,
                          unit: "",
                        },
                      ].map((spec) => (
                        <div
                          key={spec.label}
                          className="bg-brand-bg-alt rounded-2xl p-4 border border-brand-border-light"
                        >
                          <p className="text-[10px] uppercase tracking-wider text-brand-muted mb-1 font-medium">
                            {spec.label}
                          </p>
                          <p className="text-xl font-bold text-brand-text tracking-[-0.02em]">
                            {spec.value}
                            {spec.unit && (
                              <span className="text-sm text-brand-muted ml-0.5 font-normal">
                                {spec.unit}
                              </span>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2.5 w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3.5 rounded-2xl text-sm transition-all duration-300"
                    >
                      <Mail className="w-4 h-4" />
                      {t(lang, "products.inquiry")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
