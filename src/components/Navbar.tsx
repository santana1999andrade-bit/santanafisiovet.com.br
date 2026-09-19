import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Phone, MessageCircle, Menu, X, Shield, Lock } from 'lucide-react';
import pinscherLogo from '../assets/images/Gemini_Generated_Image_6aqzqm6aqzqm6aqz.jpg';

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { siteData } = useSiteData();
  const { doctorInfo } = siteData;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Modalidades', href: '#modalidades' },
    { label: 'O que Tratamos', href: '#tratamentos' },
    { label: 'Sinais de Alerta', href: '#alerta-tutor' },
    { label: 'Diário & Dicas', href: '#diario' },
    { label: 'Onde Atendemos', href: '#regioes' },
    { label: 'Avaliações', href: '#avaliacoes' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá ${doctorInfo.name}! Gostaria de tirar dúvidas e agendar uma avaliação domiciliar para meu pet.`
  );
  const whatsappUrl = `https://wa.me/${doctorInfo.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100 py-3'
          : 'bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-orange-100/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Pinscher Silhouette */}
        <a
          id="nav-brand-logo"
          href="#inicio"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl p-1"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-stone-200 p-1 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-orange-300 transition-all overflow-hidden shrink-0">
            <img
              src={pinscherLogo}
              alt="Silhueta Pinscher - Sant'Ana Fisiovet"
              className="w-full h-full object-contain mix-blend-multiply filter contrast-125"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-orange-600 leading-none whitespace-nowrap">
              Sant'Ana <span className="text-stone-400 font-normal">Fisiovet</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-stone-500 mt-0.5 truncate max-w-[190px] sm:max-w-none">
              Reabilitação Veterinária Domiciliar
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              id={`nav-link-${link.href.replace('#', '')}`}
              href={link.href}
              className="hover:text-orange-500 transition-colors py-2 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-orange-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CRMV Badge (Desktop only) */}
          <div className="hidden xl:inline-block text-xs font-bold bg-stone-100 px-3 py-1.5 rounded-full text-stone-500 border border-stone-200">
            {doctorInfo.crmv}
          </div>

          {/* Admin / Login Button */}
          {onOpenAdmin && (
            <button
              id="nav-btn-admin-login"
              type="button"
              onClick={onOpenAdmin}
              title="Acessar Área Administrativa / Login"
              aria-label="Acessar Área Administrativa"
              className="hidden sm:inline-flex items-center justify-center p-2.5 rounded-2xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors border border-transparent hover:border-stone-200"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Quick WhatsApp Primary CTA */}
          <a
            id="nav-cta-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all min-h-[44px] whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com a Dra.</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            id="btn-mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl text-stone-800 hover:bg-orange-50 transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center border border-stone-200"
            aria-label="Abrir Menu de Navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-stone-700" /> : <Menu className="w-5 h-5 text-stone-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden bg-white border-b border-orange-100 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-100">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Navegação Rápida
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full">
              <Shield className="w-3 h-3 text-orange-600" />
              <span>{doctorInfo.crmv}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                id={`mobile-link-${link.href.replace('#', '')}`}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center px-3 py-2.5 text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors min-h-[44px]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col gap-2">
            <a
              id="mobile-call-phone"
              href={`tel:${doctorInfo.whatsappNumber}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-stone-800 bg-[#FDFBF7] border border-stone-200 rounded-2xl hover:bg-orange-50 transition-colors min-h-[48px]"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              <span>Ligar: {doctorInfo.whatsappFormatted}</span>
            </a>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  handleLinkClick();
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-stone-500 hover:text-orange-600 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Painel Administrativo</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
