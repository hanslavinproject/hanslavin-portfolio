import React, { useState, useEffect } from "react";
import { User, Layers, Cpu, Award, MessageSquare, Menu, X, CheckCircle, Calculator, Settings, CreditCard } from "lucide-react";

interface HeaderProps {
  onOpenAdmin?: () => void;
  onOpenClientPortal?: () => void;
}

export default function Header({ onOpenAdmin, onOpenClientPortal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Trayectoria", href: "#trayectoria", icon: Award },
    { label: "Casos de Éxito", href: "#proyectos", icon: Cpu },
    { label: "Habilidades", href: "#habilidades", icon: Layers },
    { label: "Suscripciones", href: "#suscripciones", icon: CreditCard },
    { label: "Laboratorio ROI", href: "#simulador", icon: CheckCircle },
    { label: "Cotizador Pro", href: "#cotizador", icon: Calculator },
    { label: "Contacto", href: "#contacto", icon: MessageSquare },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fbfbf9]/95 backdrop-blur-md border-b border-stone-200/50 py-4 shadow-xs"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand/Signature */}
        <a
          id="brand-logo"
          href="#top"
          onClick={(e) => handleLinkClick(e, "#top")}
          className="flex flex-col group"
        >
          <span className="font-display font-black text-base md:text-lg tracking-tight group-hover:text-brand-accent transition-colors duration-200">
            HANS LAVIN
          </span>
          <span className="font-sans text-[9px] md:text-[10px] tracking-wide text-brand-muted font-medium">
            Hago que los negocios funcionen mejor con tecnología e IA
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                id={`nav-${item.label.toLowerCase().replace(/ /g, "-")}`}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="font-sans text-sm font-medium text-brand-charcoal/80 hover:text-brand-accent transition-colors duration-200 flex items-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5 stroke-[2]" />
                {item.label}
              </a>
            );
          })}
          {onOpenClientPortal && (
            <button
              id="header-client-trigger"
              onClick={onOpenClientPortal}
              className="border border-stone-300 hover:border-brand-accent text-brand-charcoal hover:text-brand-accent px-3 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer bg-white"
              title="Abrir Portal de Clientes"
            >
              <User className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              Acceso Clientes
            </button>
          )}
          {onOpenAdmin && (
            <button
              id="header-admin-trigger"
              onClick={onOpenAdmin}
              className="border border-brand-accent/40 hover:border-brand-accent text-brand-accent px-3 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer bg-brand-accent/5 hover:bg-brand-accent/10"
              title="Abrir Panel de Administración"
            >
              <Settings className="w-3.5 h-3.5" />
              Consola Admin
            </button>
          )}
          <a
            id="nav-cta"
            href="#contacto"
            onClick={(e) => handleLinkClick(e, "#contacto")}
            className="bg-brand-charcoal hover:bg-brand-accent text-[#fbfbf9] px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-md"
          >
            Hablemos
          </a>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 text-brand-charcoal hover:text-brand-accent transition-colors focus:outline-hidden"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="md:hidden fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-[#fbfbf9]/98 backdrop-blur-lg z-40 border-t border-stone-200 animate-fadeIn">
          <nav className="flex flex-col p-8 gap-6 h-full justify-between pb-20">
            <div className="flex flex-col gap-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    id={`mobile-nav-${item.label.toLowerCase().replace(/ /g, "-")}`}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="font-sans font-medium text-lg text-brand-charcoal/90 hover:text-brand-accent flex items-center gap-3 py-2 border-b border-stone-100"
                  >
                    <Icon className="w-5 h-5 text-brand-accent" />
                    {item.label}
                  </a>
                );
              })}
            </div>
            <div className="flex flex-col gap-4">
              {onOpenClientPortal && (
                <button
                  id="mobile-header-client-trigger"
                  onClick={() => {
                    onOpenClientPortal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full border border-stone-300 text-brand-charcoal py-4 rounded-sm font-semibold uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 bg-white cursor-pointer"
                >
                  <User className="w-4 h-4 text-brand-accent" />
                  Acceso Clientes
                </button>
              )}
              {onOpenAdmin && (
                <button
                  id="mobile-header-admin-trigger"
                  onClick={() => {
                    onOpenAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full border border-brand-accent/40 text-brand-accent py-4 rounded-sm font-semibold uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 bg-brand-accent/5 hover:bg-brand-accent/10 cursor-pointer"
                >
                  <Settings className="w-4 h-4 animate-pulse" />
                  Consola de Administración
                </button>
              )}
              <a
                id="mobile-nav-cta"
                href="#contacto"
                onClick={(e) => handleLinkClick(e, "#contacto")}
                className="bg-brand-charcoal hover:bg-brand-accent text-center text-[#fbfbf9] py-4 rounded-sm font-semibold uppercase tracking-wider transition-all duration-300"
              >
                Iniciar Proyecto
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
