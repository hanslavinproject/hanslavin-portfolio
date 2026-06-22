import React, { useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2, Award, Zap, HeartHandshake } from "lucide-react";

export default function Hero() {
  const [profileType, setProfileType] = useState<"traditional" | "autodidact">("autodidact");

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contacto");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth"
      });
    }
  };

  const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSection = document.querySelector("#proyectos");
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#fbfbf9]">
      {/* Editorial Grid Grid lines background for clean architectural feel */}
      <div className="absolute inset-x-0 top-0 h-full w-full opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Summary Info */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent-light text-brand-accent rounded-full font-mono text-xs tracking-wider font-semibold uppercase animate-pulse">
              <Sparkles className="w-3 h-3" />
              Soluciones Digitales &amp; Project Management
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-charcoal leading-[1.1]">
              Transformo ideas complejas en <span className="text-brand-accent">sistemas que facturan</span>.
            </h1>

            <p className="font-sans text-lg text-brand-muted max-w-xl leading-relaxed">
              No soy un desarrollador tradicional y no pasé por aulas universitarias. Llevo 10 años aprendiendo en la realidad del mercado: fundando negocios, automatizando talleres de manufactura bajo demanda y traduciendo la visión empresarial en tecnología aplicada impulsada por IA.
            </p>

            {/* Core Values Quick Row */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg border-y border-stone-200 py-4 my-2">
              <div className="text-center md:text-left">
                <span className="block font-display text-2xl font-bold text-brand-charcoal">10+</span>
                <span className="font-mono text-[10px] uppercase text-brand-muted tracking-wider">Años de Negocio</span>
              </div>
              <div className="text-center md:text-left border-x border-stone-200 px-4">
                <span className="block font-display text-2xl font-bold text-brand-charcoal">100%</span>
                <span className="font-mono text-[10px] uppercase text-brand-muted tracking-wider">Autodidacta</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block font-display text-2xl font-bold text-brand-charcoal">IA+</span>
                <span className="font-mono text-[10px] uppercase text-brand-muted tracking-wider">Diseñador de Soluciones</span>
              </div>
            </div>

            {/* Actions Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                id="hero-cta-primary"
                onClick={scrollToContact}
                className="group bg-brand-charcoal hover:bg-brand-accent text-[#fbfbf9] px-6 py-3.5 rounded-sm font-semibold uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-brand-charcoal hover:border-brand-accent cursor-pointer"
              >
                Trabajemos juntos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="hero-cta-secondary"
                onClick={scrollToProjects}
                className="bg-transparent hover:bg-brand-gray-light text-brand-charcoal border border-brand-charcoal/30 px-6 py-3.5 rounded-sm font-semibold uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Ver Casos de Éxito
              </button>
            </div>
          </div>

          {/* Dynamic Interactive Paradigm Card: Addresses Imposter Syndrome gloriously */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border border-stone-200 rounded-sm shadow-xl p-6 md:p-8 relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-brand-charcoal text-[#fbfbf9] font-mono text-[9px] uppercase tracking-wider rounded-xs">
                Métricas de Valor Real
              </div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-md text-brand-charcoal">
                  ¿Por qué contratar un perfil híbrido?
                </h3>
              </div>

              {/* Toggle controls */}
              <div className="flex rounded-xs bg-brand-gray-light p-1 mb-6 border border-stone-200">
                <button
                  type="button"
                  id="tab-paradigm-traditional"
                  onClick={() => setProfileType("traditional")}
                  className={`flex-1 py-1.5 text-center font-mono text-[11px] uppercase tracking-wider rounded-xs transition-all duration-200 cursor-pointer ${
                    profileType === "traditional"
                      ? "bg-white text-brand-charcoal shadow-xs font-bold"
                      : "text-brand-muted hover:text-brand-charcoal"
                  }`}
                >
                  Perfil Clásico Teórico
                </button>
                <button
                  type="button"
                  id="tab-paradigm-autodidact"
                  onClick={() => setProfileType("autodidact")}
                  className={`flex-1 py-1.5 text-center font-mono text-[11px] uppercase tracking-wider rounded-xs transition-all duration-200 cursor-pointer ${
                    profileType === "autodidact"
                      ? "bg-brand-accent text-[#fbfbf9] shadow-xs font-bold"
                      : "text-brand-muted hover:text-brand-charcoal"
                  }`}
                >
                  Mi Perfil Autodidacta
                </button>
              </div>

              {/* Dynamic Content */}
              {profileType === "traditional" ? (
                <div id="content-paradigm-traditional" className="space-y-4 animate-fadeIn min-h-[250px] flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <p className="font-sans text-xs text-brand-muted italic">
                      Se enfoca en un único silo de conocimiento sin entender cómo se monetiza o cómo encajan las piezas de caja y taller.
                    </p>
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5 text-red-600 text-xs font-bold">×</div>
                      <div>
                        <h4 className="font-sans text-xs font-bold text-brand-charcoal">Código de pizarrón</h4>
                        <p className="font-sans text-[11px] text-brand-muted leading-relaxed">Conoce teoría de algoritmos refinados de universidad, pero carece de intuición sobre costos de hosting, envíos de inventario o embudos publicitarios.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5 text-red-600 text-xs font-bold">×</div>
                      <div>
                        <h4 className="font-sans text-xs font-bold text-brand-charcoal font-sans">Gestión burocrática</h4>
                        <p className="font-sans text-[11px] text-brand-muted leading-relaxed">Satura la mesa con procesos de cascada largos y documentación inútil antes de poner un producto mínimo viable frente al usuario real.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 p-3 border border-red-100 rounded-sm mt-4">
                    <span className="font-mono text-[10px] text-red-800 uppercase tracking-wider font-semibold block">Deficiencia de Campo:</span>
                    <span className="font-sans text-[11px] text-red-700">“Le cuesta conectar la facturación, el stock real de productos y el retorno con los requerimientos técnicos.”</span>
                  </div>
                </div>
              ) : (
                <div id="content-paradigm-autodidact" className="space-y-4 animate-fadeIn min-h-[250px] flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <p className="font-sans text-xs text-brand-accent italic font-medium">
                      “El mercado no paga títulos; paga resultados.” Conecto la tecnología, las ventas digitales y el taller bajo demanda para optimizar márgenes reales.
                    </p>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-xs font-bold text-brand-charcoal">Visión de Negocio Completa (360°)</h4>
                        <p className="font-sans text-[11px] text-brand-muted leading-relaxed">Entiendo de Meta Ads, conversiones de inventarios pesados por CSV, pasarelas de pago y logística de taller físico porque he arriesgado mi propio dinero.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-xs font-bold text-brand-charcoal">Soluciones Rápidas con IA</h4>
                        <p className="font-sans text-[11px] text-brand-muted leading-relaxed">Armo sistemas de conversión gráfica automáticos e integraciones en semanas, coordinando programadores senior al hablar su mismo idioma práctico.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-brand-accent-light p-3 border border-brand-accent/20 rounded-sm mt-4">
                    <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider font-semibold block">Ventaja Competitiva Principal:</span>
                    <span className="font-sans text-[11px] text-brand-charcoal font-medium">“10 años de experiencia ejecutando, quebrando, aprendiendo y resurgiendo. Creador de soluciones orientado a la liquidez de caja.”</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
