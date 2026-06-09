"use client";

import { Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ContactPage() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-28 lg:py-36">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow={t(lang, "contact.eyebrow")}
          title={t(lang, "contact.title")}
          description={t(lang, "contact.subtitle")}
        />

        <div className="max-w-3xl mx-auto space-y-4">
          <ScrollReveal delay={0}>
            <div className="glass-panel rounded-3xl p-5 border border-brand-border-light flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/5 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <p className="text-xs text-brand-muted">{t(lang, "contact.info.address")}</p>
                <p className="text-sm font-medium text-brand-text">{t(lang, "footer.address")}</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="glass-panel rounded-3xl p-5 border border-brand-border-light flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/5 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <p className="text-xs text-brand-muted">{t(lang, "contact.info.phone")}</p>
                <p className="text-sm font-medium text-brand-text">+86 18607316354</p>
              </div>
            </div>
          </ScrollReveal>

          {/* QR Codes */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel rounded-3xl p-6 border border-brand-border-light text-center">
                <img src="/images/whatsapp-qr.jpg" alt="WhatsApp QR" className="w-40 h-40 mx-auto rounded-2xl object-cover mb-3 shadow-sm" />
                <p className="text-brand-text font-semibold text-sm">WhatsApp</p>
                <p className="text-brand-muted text-xs">{t(lang, "contact.info.whatsapp")}</p>
                <p className="text-brand-muted text-xs mt-0.5">+86 18673167034</p>
              </div>
              <div className="glass-panel rounded-3xl p-6 border border-brand-border-light text-center">
                <img src="/images/zalo-qr.jpg" alt="Zalo QR" className="w-40 h-40 mx-auto rounded-2xl object-cover mb-3 shadow-sm" />
                <p className="text-brand-text font-semibold text-sm">Zalo</p>
                <p className="text-brand-muted text-xs">{t(lang, "contact.info.zalo")}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
