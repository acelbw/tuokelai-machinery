"use client";

import Link from "next/link";
import { ArrowRight, ClipboardCheck, PackageCheck, PlayCircle, Ship, Truck, Users } from "lucide-react";
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
    galleryTitle: "Customer Visits & Process Records",
    photos: ["Customer Meeting", "Project Discussion", "On-Site Communication"],
    videos: ["Equipment & Delivery Record", "Loading Process", "Site Material", "Delivery Detail", "Project Reference"],
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
    galleryTitle: "客户接待与过程资料",
    photos: ["客户洽谈", "项目沟通", "现场交流"],
    videos: ["设备与交付记录", "装车过程", "现场资料", "交付细节", "项目参考"],
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
    galleryTitle: "Khách Hàng & Hồ Sơ Quy Trình",
    photos: ["Gặp Khách Hàng", "Trao Đổi Dự Án", "Liên Lạc Tại Chỗ"],
    videos: ["Hồ Sơ Thiết Bị", "Quá Trình Bốc Xếp", "Tư Liệu Hiện Trường", "Chi Tiết Giao Hàng", "Tham Khảo Dự Án"],
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
    galleryTitle: "زيارات العملاء وسجلات العملية",
    photos: ["لقاء العملاء", "مناقشة المشروع", "تواصل ميداني"],
    videos: ["سجل المعدات والتسليم", "عملية التحميل", "مواد الموقع", "تفاصيل التسليم", "مرجع المشروع"],
  },
} as const;

const icons = [ClipboardCheck, Truck, Ship, PackageCheck];
const photos = [
  "/media/cases/client-meeting-01.jpg",
  "/media/cases/client-meeting-02.jpg",
  "/media/cases/client-meeting-03.jpg",
];
const videos = [
  "/media/cases/delivery-video-01.mp4",
  "/media/cases/delivery-video-02.mp4",
  "/media/cases/delivery-video-03.mp4",
  "/media/cases/delivery-video-04.mp4",
  "/media/cases/delivery-video-05.mp4",
];

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

        <div className="mb-6 flex items-center gap-3">
          <Users className="h-5 w-5 text-brand-orange" />
          <h3 className="text-xl font-semibold text-white">{text.galleryTitle}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur"
            >
              <img src={photo} alt={text.photos[index]} className="h-72 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <p className="text-sm font-semibold text-white">{text.photos[index]}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
          {videos.map((video, index) => (
            <motion.div
              key={video}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur"
            >
              <div className="relative aspect-[9/16] bg-black">
                <video src={video} controls preload="metadata" className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/45 p-2 text-white backdrop-blur-sm">
                  <PlayCircle className="h-5 w-5" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-white">{text.videos[index]}</p>
              </div>
            </motion.div>
          ))}
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
