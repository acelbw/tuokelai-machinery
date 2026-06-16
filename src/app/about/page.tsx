"use client";

import { motion } from "framer-motion";
import { Award, Building2, CheckCircle, Factory, Globe2, Handshake, Lightbulb, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";

const content = {
  en: {
    intro:
      "Changsha Tuokelai Machinery Equipment Co., Ltd. focuses on used tower cranes and construction machinery export. Based in Hunan, one of China's core machinery hubs, we help overseas buyers find reliable equipment with clear condition information and practical logistics support.",
    sections: [
      ["Service Scope", "Used tower cranes, truck cranes, construction machinery sourcing, inspection, loading, export documents and shipping coordination."],
      ["Main Business Scale", "Long-term access to mainstream brands and equipment resources across China, supporting model matching and fast quotation."],
      ["Enterprise Advantages", "Transparent equipment condition, practical pricing, inspection support, loading photos and one-to-one communication before shipment."],
      ["Development Philosophy", "Build long-term trust through reliable machines, clear process records and responsible after-sales support."],
      ["Cooperative Brands", "Zoomlion, XCMG, SANY, Potain, Yongmao, DAHAN, ZTM and other mainstream equipment brands."],
    ],
    stats: [["10+", "Years Experience"], ["30+", "Export Countries"], ["500+", "Equipment Supplied"], ["24h", "Fast Response"]],
  },
  zh: {
    intro:
      "长沙拓科莱机械设备有限公司专注于二手塔式起重机及工程机械出口，立足湖南长沙工程机械产业资源，面向海外客户提供设备采购、验机、装车、出口和交付支持。我们希望客户在下单前就能看清设备情况、交易流程和服务保障。",
    sections: [
      ["服务范围", "二手塔机、汽车吊及工程机械设备采购；设备验机；装车加固；出口文件；海运配送；交付后的技术与配件支持。"],
      ["主营规模", "长期对接国内主流品牌和设备资源，可根据客户预算、吨位、年份、工况快速匹配设备并报价。"],
      ["企业优势", "设备来源清楚、工况说明透明、价格更具竞争力，并可提供验机记录、装柜照片、物流进度等过程资料。"],
      ["发展理念", "以诚信为基础，以设备质量和交付服务建立长期合作，让海外客户买得明白、用得放心。"],
      ["合作品牌", "Zoomlion 中联重科、XCMG 徐工、SANY 三一、Potain、Yongmao 永茂、DAHAN 大汉、ZTM 等主流品牌。"],
    ],
    stats: [["10+", "行业经验"], ["30+", "出口国家"], ["500+", "服务设备"], ["24h", "快速响应"]],
  },
  vi: {
    intro:
      "Changsha Tuokelai Machinery Equipment Co., Ltd. tập trung xuất khẩu cần cẩu tháp và máy móc xây dựng đã qua sử dụng, cung cấp tìm nguồn, kiểm tra, bốc xếp, chứng từ xuất khẩu và hỗ trợ giao hàng.",
    sections: [
      ["Phạm Vi Dịch Vụ", "Tìm nguồn, kiểm tra, bốc xếp, chứng từ xuất khẩu, vận chuyển và hỗ trợ kỹ thuật."],
      ["Quy Mô Kinh Doanh", "Kết nối nhiều nguồn thiết bị và thương hiệu tại Trung Quốc để báo giá nhanh."],
      ["Ưu Thế", "Tình trạng máy rõ ràng, giá cạnh tranh, hình ảnh bốc xếp và cập nhật vận chuyển."],
      ["Triết Lý", "Xây dựng niềm tin lâu dài bằng thiết bị đáng tin cậy và dịch vụ có trách nhiệm."],
      ["Thương Hiệu", "Zoomlion, XCMG, SANY, Potain, Yongmao, DAHAN, ZTM và các thương hiệu chính."],
    ],
    stats: [["10+", "Năm Kinh Nghiệm"], ["30+", "Quốc Gia"], ["500+", "Thiết Bị"], ["24h", "Phản Hồi"]],
  },
  ar: {
    intro:
      "تركز شركة تشانغشا توكولاي لمعدات الآلات على تصدير الرافعات البرجية ومعدات البناء المستعملة، مع دعم الفحص والتحميل ومستندات التصدير والشحن.",
    sections: [
      ["نطاق الخدمة", "توفير المعدات والفحص والتحميل ومستندات التصدير والشحن والدعم الفني."],
      ["حجم الأعمال", "مصادر واسعة للعلامات والمعدات في الصين مع مطابقة سريعة للنماذج."],
      ["المزايا", "حالة واضحة للمعدات وأسعار تنافسية وصور تحميل وتحديثات شحن."],
      ["الفلسفة", "بناء ثقة طويلة الأمد من خلال معدات موثوقة وخدمة مسؤولة."],
      ["العلامات", "Zoomlion و XCMG و SANY و Potain و Yongmao و DAHAN و ZTM وغيرها."],
    ],
    stats: [["10+", "سنوات خبرة"], ["30+", "دولة"], ["500+", "معدات"], ["24h", "استجابة"]],
  },
} as const;

const icons = [Factory, Building2, ShieldCheck, Lightbulb, Handshake];

export default function AboutPage() {
  const { lang } = useLanguage();
  const text = content[lang];

  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[url('/images/products/crane-05.jpg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-brand-orange/5 to-brand-bg" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow={t(lang, "about.eyebrow")}
          title={t(lang, "about.title")}
          description={t(lang, "about.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-brand-border-light bg-white p-8 lg:p-10 shadow-sm"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10">
              <Globe2 className="h-6 w-6 text-brand-orange" />
            </div>
            <h3 className="mb-5 text-2xl font-bold tracking-[-0.02em] text-brand-text">
              {t(lang, "about.story.title")}
            </h3>
            <p className="text-base leading-8 text-brand-muted">{text.intro}</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {text.stats.map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl border border-brand-border-light bg-brand-bg-alt p-6 text-center"
              >
                <div className="mb-2 text-4xl font-bold tracking-[-0.03em] text-brand-text">{value}</div>
                <p className="text-sm text-brand-muted">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {text.sections.map(([title, desc], index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-3xl border border-brand-border-light bg-white p-7 shadow-sm"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10">
                    <Icon className="h-5 w-5 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-brand-text">{title}</h3>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                  <p className="text-sm leading-7 text-brand-muted">{desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
