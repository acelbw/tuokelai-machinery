"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { lang, setLang, languages } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { key: "nav.home", href: "/" },
    { key: "nav.products", href: "/products" },
    { key: "nav.about", href: "/about" },
    { key: "nav.contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="text-xl">🏗️</span>
            <span className="font-bold text-brand-text text-sm lg:text-base tracking-[-0.02em] group-hover:text-brand-orange transition-colors duration-300">
              {t(lang, "site.name")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="px-4 py-2 text-sm text-brand-muted hover:text-brand-text transition-colors duration-200 rounded-xl hover:bg-brand-bg-alt font-medium"
              >
                {t(lang, link.key)}
              </Link>
            ))}
          </div>

          {/* Language + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-brand-muted hover:text-brand-text transition-colors rounded-xl hover:bg-brand-bg-alt">
                <span className="text-base">{languages.find((l) => l.code === lang)?.flag}</span>
                <span className="text-xs font-medium">{languages.find((l) => l.code === lang)?.label}</span>
                <ChevronDown className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white border border-brand-border rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[170px] shadow-xl shadow-black/5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-xl transition-all duration-200 text-left",
                      lang === l.code
                        ? "bg-brand-bg-alt text-brand-text font-medium"
                        : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-alt"
                    )}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-300"
            >
              {t(lang, "nav.quote")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2 text-brand-muted hover:text-brand-text transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-brand-border">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-brand-muted hover:text-brand-text transition-colors rounded-xl font-medium"
              >
                {t(lang, link.key)}
              </Link>
            ))}
            <div className="border-t border-brand-border pt-5 mt-4">
              <p className="text-[11px] text-brand-muted px-4 mb-3 uppercase tracking-widest font-medium">
                Language
              </p>
              <div className="grid grid-cols-2 gap-1.5 px-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setMobileOpen(false); }}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-xl transition-all",
                      lang === l.code
                        ? "bg-brand-bg-alt text-brand-text font-medium"
                        : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-alt"
                    )}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-5 py-3.5 rounded-xl text-sm transition-all mt-3"
            >
              {t(lang, "nav.quote")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
