"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white/70 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🏗️</span>
              <span className="font-bold text-white text-lg tracking-[-0.02em]">
                {t(lang, "site.name")}
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {t(lang, "site.slogan")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-5 uppercase tracking-[0.15em]">
              {t(lang, "footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {[
                { key: "nav.products", href: "/products" },
                { key: "nav.about", href: "/about" },
                { key: "nav.contact", href: "/contact" },
              ].map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {t(lang, link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-5 uppercase tracking-[0.15em]">
              {t(lang, "footer.contact")}
            </h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange/60" />
                <span>{t(lang, "footer.address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-brand-orange/60" />
                <span>+86 18607316354</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-brand-orange/60" />
                <a href="mailto:89482764@qq.com" className="hover:text-white transition-colors">
                  89482764@qq.com
                </a>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-5 uppercase tracking-[0.15em]">
              Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {["🇺🇸 EN", "🇨🇳 中文", "🇻🇳 Tiếng Việt", "🇸🇦 العربية"].map(
                (l) => (
                  <span
                    key={l}
                    className="text-xs text-white/30 bg-white/[0.03] px-3.5 py-2 rounded-xl border border-white/[0.06]"
                  >
                    {l}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-16 pt-8 text-center">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Changsha Tuokelai Machinery Equipment Co., Ltd.{" "}
            {t(lang, "footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
