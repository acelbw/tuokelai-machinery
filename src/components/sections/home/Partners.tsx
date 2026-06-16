"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const copy = {
  en: ["Cooperative Brands", "We source and match equipment from well-known Chinese and international machinery brands."],
  zh: ["合作品牌", "长期关注并匹配国内外主流工程机械品牌资源，帮助客户快速找到合适设备。"],
  vi: ["Thương Hiệu Hợp Tác", "Chúng tôi tìm nguồn và kết nối thiết bị từ các thương hiệu máy móc nổi tiếng."],
  ar: ["العلامات المتعاونة", "نوفر ونطابق المعدات من علامات صينية وعالمية معروفة."],
} as const;

const partners = ["ZOOMLION", "XCMG", "SANY", "POTAIN", "YONGMAO", "DAHAN", "ZTM", "LIEBHERR"];

export function Partners() {
  const { lang } = useLanguage();
  const [title, desc] = copy[lang];

  return (
    <section className="relative py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <p className="text-brand-orange text-xs font-semibold uppercase tracking-[0.25em]">{title}</p>
          <p className="mx-auto max-w-2xl text-sm text-brand-muted leading-relaxed">{desc}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="flex h-20 items-center justify-center rounded-2xl border border-brand-border-light bg-brand-bg-alt px-4 text-center text-sm font-bold tracking-wide text-brand-text shadow-sm"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
