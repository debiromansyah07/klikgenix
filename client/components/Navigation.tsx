import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  language?: string;
  onLanguageChange?: (lang: string) => void;
}

export default function Navigation({
  language = "id",
  onLanguageChange,
}: NavigationProps) {
  const [currentLang, setCurrentLang] = useState(language);

  const toggleLanguage = () => {
    const newLang = currentLang === "id" ? "en" : "id";
    setCurrentLang(newLang);
    onLanguageChange?.(newLang);
  };

  const texts = {
    id: {
      home: "Beranda",
      features: "Fitur",
      pricing: "Harga",
      faq: "FAQ",
      contact: "Kontak",
      login: "Masuk",
      register: "Daftar",
    },
    en: {
      home: "Home",
      features: "Features",
      pricing: "Pricing",
      faq: "FAQ",
      contact: "Contact",
      login: "Login",
      register: "Register",
    },
  };

  const t = texts[currentLang as keyof typeof texts];

  return (
    <nav className="w-full flex items-center justify-between py-6 px-6 md:px-20 relative z-20">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F3b20a908b17e42928b5c1217ef1988c3?format=webp&width=800"
          alt="KlixGenix.ID"
          className="h-16 md:h-20 lg:h-24 w-auto"
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center space-x-8">
        <a
          href="#home"
          className="text-white hover:text-primary transition-colors"
        >
          {t.home}
        </a>
        <a
          href="#features"
          className="text-white hover:text-primary transition-colors"
        >
          {t.features}
        </a>
        <a
          href="#pricing"
          className="text-white hover:text-primary transition-colors"
        >
          {t.pricing}
        </a>
        <a
          href="/faq"
          className="text-white hover:text-primary transition-colors"
        >
          {t.faq}
        </a>
        <a
          href="/contact"
          className="text-white hover:text-primary transition-colors"
        >
          {t.contact}
        </a>
      </div>

      {/* Language & Auth */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Language Toggle Button */}
        <Button
          onClick={toggleLanguage}
          variant="ghost"
          size="sm"
          className="hidden sm:flex items-center space-x-2 text-white hover:bg-white/10 hover:text-primary transition-all duration-300"
        >
          <span>{currentLang === "id" ? "🇮🇩" : "🇺🇸"}</span>
          <span className="text-sm font-medium">
            {currentLang.toUpperCase()}
          </span>
        </Button>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Button
            asChild
            variant="ghost"
            className="text-white hover:bg-white/10 hidden sm:inline-flex"
          >
            <Link to="/masuk">{t.login}</Link>
          </Button>
          <Button
            asChild
            className="gradient-primary text-white font-medium px-4 md:px-6 text-sm md:text-base"
          >
            <Link to="/daftar">{t.register}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
