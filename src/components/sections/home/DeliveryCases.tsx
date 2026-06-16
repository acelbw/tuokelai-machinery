"use client";

import Link from "next/link";
import { ArrowRight, ClipboardCheck, Container, FileCheck2, PackageCheck, Ship, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionHeader } from "@/components/ui/SectionHeader";

const copy = {
  en: {
    eyebrow: "Delivery Cases",
    title: "From Yard Inspection To Global Delivery",
    desc: "Show customers the full process before they buy: equipment selection, inspection, loading, shipping and handover.",
    cta: "Request Delivery Records",
    steps: [
      ["Source & Inspect", "Confirm model, year, working condition and key components before quotation."],
      ["Load & Secure", "Professional loading plan with anti-rust protection, reinforcement and container photos."],
      ["Ship & Track", "Export documents, customs clearance and shipping updates until the machine reaches port."],
      ["Handover Support", "Provide installation guidance, spare parts support and after-sales communication."],
    ],
    cards: [
      ["Tower Crane Loading", "Container loading and reinforcement records available for buyer review."],
      ["Export Documentation", "Packing list, invoice, photos and shipping documents prepared clearly."],
      ["Overseas Delivery", "Equipment shipped to overseas projects with remote technical support."],
    ],
  },
  zh: {
    eyebrow: "交付案例",
    title: "从验机、装车到出口交付，全流程可追溯",
    desc: "把客户最关心的发货装车、配送、清关和交付过程展示出来，让客户下单前就能看清楚、放心合作。",
    cta: "索取发货资料",
    steps: [
      ["选型验机", "确认型号、年份、工况和核心部件，报价前先把设备情况说明白。"],
      ["装车加固", "提供装车方案、防锈保护、加固细节和装柜照片，运输更安心。"],
      ["出口跟踪", "协助整理箱单、发票、报关和船运资料，全程跟进到港。"],
      ["交付支持", "提供安装指导、配件采购和售后沟通，交付后也有人对接。"],
    ],
    cards: [
      ["塔机装柜记录", "装车、加固、封柜等过程资料可整理给客户查看。"],
      ["出口文件准备", "箱单、发票、设备照片、船运资料清楚完整。"],
      ["海外项目交付", "设备出口到海外项目，并提供远程技术支持。"],
    ],
  },
  vi: {
    eyebrow: "Hồ Sơ Giao Hàng",
    title: "Từ Kiểm Tra Tại Bãi Đến Giao Hàng Toàn Cầu",
    desc: "Hiển thị toàn bộ quy trình: chọn máy, kiểm tra, bốc xếp, vận chuyển và bàn giao.",
    cta: "Yêu Cầu Hồ Sơ",
    steps: [
      ["Tìm & Kiểm Tra", "Xác nhận model, năm, tình trạng và linh kiện chính trước khi báo giá."],
      ["Bốc Xếp", "Kế hoạch bốc xếp, chống gỉ, gia cố và hình ảnh container."],
      ["Vận Chuyển", "Chứng từ xuất khẩu, hải quan và cập nhật vận chuyển đến cảng."],
      ["Hỗ Trợ", "Hướng dẫn lắp đặt, phụ tùng và hỗ trợ sau bán."],
    ],
    cards: [
      ["Bốc Xếp Cần Cẩu", "Hồ sơ bốc xếp và gia cố có sẵn cho khách hàng."],
      ["Chứng Từ Xuất Khẩu", "Packing list, invoice, hình ảnh và chứng từ vận chuyển rõ ràng."],
      ["Giao Hàng Quốc Tế", "Thiết bị được giao đến dự án nước ngoài với hỗ trợ kỹ thuật."],
    ],
  },
  ar: {
    eyebrow: "حالات التسليم",
    title: "من الفحص إلى التسليم العالمي",
    desc: "نعرض عملية اختيار المعدات والفحص والتحميل والشحن والتسليم لزيادة ثقة العملاء.",
    cta: "اطلب سجلات التسليم",
    steps: [
      ["توفير وفحص", "تأكيد الموديل والسنة والحالة والمكونات الرئيسية قبل عرض السعر."],
      ["تحميل وتثبيت", "خطة تحميل وحماية من الصدأ وتثبيت وصور الحاوية."],
      ["شحن وتتبع", "مستندات التصدير والجمارك وتحديثات الشحن حتى الوصول."],
      ["دعم التسليم", "إرشادات تركيب ودعم قطع الغيار وخدمة ما بعد البيع."],
    ],
    cards: [
      ["تحميل الرافعة", "سجلات التحميل والتثبيت متاحة للمراجعة."],
      ["مستندات التصدير", "قائمة التعبئة والفاتورة والصور ومستندات الشحن بوضوح."],
      ["تسليم خارجي", "تسليم المعدات للمشاريع الخارجية مع دعم فني عن بعد."],
    ],
  },
} as const;

const icons = [ClipboardCheck, Truck, Ship, PackageCheck];
const cardIcons = [Container, FileCheck2, PackageCheck];

export function DeliveryCases() {
  const { lang } = useLanguage();
  const text = copy[lang];

  return (
    <section id="cases" className="relative overflow-hidden py-28 lg:py-36 bg-brand-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(238,112,0,0.18),transparent_32%),radial-gradient(circle_at_85%_70%,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow={text.eyebrow}
          title={text.title}
          description={text.desc}
          className="[&>h2]:text-white [&>p:last-child]:text-white/55"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-10">
          {text.steps.map(([title, desc], index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {text.cards.map(([title, desc], index) => {
            const CardIcon = cardIcons[index];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/[0.08] text-brand-orange ring-1 ring-white/10">
                  <CardIcon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-2xl bg-brand-orange px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark"
          >
            {text.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
