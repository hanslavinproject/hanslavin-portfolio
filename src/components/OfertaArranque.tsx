import React from "react";
import { Check, ClipboardList, Zap, ArrowRight, ShieldCheck, Timer } from "lucide-react";

export default function OfertaArranque() {
  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contacto");
    if (contactSection) {
      // Find the message textarea to auto-fill or prepopulate info
      const textarea = document.querySelector("textarea[name='message']") as HTMLTextAreaElement;
      if (textarea) {
        textarea.value = "Hola Hans, me interesa reservar el Sprint de Diagnóstico Digital de $300-$500 USD.";
        // Trigger input event
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
      }
      
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const inclusions = [
    "Sesión de diagnóstico de 2 horas (videollamada)",
    "Mapeo de procesos actuales (As-Is)",
    "Identificación de 3 oportunidades de automatización",
    "Reporte ejecutivo de una página con hoja de ruta To-Be",
    "Grabación de la sesión para tu equipo"
  ];

  return (
    <section id="oferta-arranque" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Container with a subtle frame */}
        <div className="bg-[#fbfbf9] border border-stone-200 p-8 md:p-12 rounded-sm relative overflow-hidden">
          
          {/* Subtle accent border top */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-accent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-[10px] text-brand-accent font-semibold font-mono uppercase bg-brand-accent-light px-2.5 py-1 rounded-full select-none border border-brand-accent/15">
                <Zap className="w-3 h-3 fill-current animate-pulse text-brand-accent" /> ⚡ OFERTA DE ENTRADA
              </div>
              
              <div className="space-y-2">
                <h2 className="font-display text-3xl md:text-4xl font-black text-brand-charcoal uppercase leading-tight tracking-tight">
                  Sprint de Diagnóstico Digital
                </h2>
                <p className="font-display text-base md:text-lg font-bold text-brand-accent uppercase tracking-wide">
                  Claridad total en 5 días. Sin compromiso.
                </p>
              </div>

              <p className="font-sans text-sm text-brand-muted leading-relaxed max-w-3xl">
                Sesión de diagnóstico profunda de 2 horas donde mapeamos los cuellos de botella operativos de tu negocio, identificamos dónde la IA y la automatización te ahorran tiempo y dinero, y te entrego un reporte de una página con el plan de acción concreto. No dejes tu escalamiento al azar de planillas infinitas.
              </p>

              {/* Inclusions list */}
              <div className="space-y-3 pt-2">
                <h4 className="font-mono text-[9px] uppercase tracking-wider text-[#a7a79a] font-black border-b border-stone-200/60 pb-1">
                  ¿Qué incluye exactamente el Sprint?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-brand-charcoal/90">
                      <Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right pricing & CTA column */}
            <div className="lg:col-span-4 bg-white border border-stone-250 p-6 rounded-sm space-y-5 shadow-xs relative">
              
              <div className="absolute -top-3 left-4">
                <span className="bg-[#fcfca6] text-brand-charcoal border border-stone-300 text-[8px] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded-sm">
                  PAGO ÚNICO
                </span>
              </div>

              <div className="space-y-1 pt-2">
                <span className="font-mono text-[9.5px] text-stone-400 uppercase tracking-wider block">Inversión del Diagnóstico</span>
                <div className="font-display text-2xl md:text-3xl font-black text-brand-charcoal tracking-tight">
                  $300 – $500 USD
                </div>
                <div className="font-mono text-[9px] text-[#865139] uppercase tracking-wide font-semibold block">
                  Pago único · Entrega en 5 días
                </div>
              </div>

              <div className="border-t border-stone-150 pt-4 space-y-4">
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="w-full bg-brand-accent hover:bg-brand-charcoal text-[#fbfbf9] py-3.5 rounded-xs font-mono text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>RESERVAR MI DIAGNÓSTICO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex gap-2 items-start text-[10px] text-brand-muted leading-relaxed">
                  <Timer className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                  <p>
                    Los diagnósticos se agendan con disponibilidad limitada. <strong>Máximo 4 por mes</strong>.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
