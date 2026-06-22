import React from "react";
import { Check, Sparkles, HelpCircle, Star, Shield, ArrowUpRight } from "lucide-react";

interface SubscriptionPlansProps {
  onSelectPlan: (planName: string) => void;
}

export default function SubscriptionPlans({ onSelectPlan }: SubscriptionPlansProps) {
  const plans = [
    {
      name: "Plan Inicial Autodidacta",
      desc: "Ideal para talleres pequeños y artesanos independientes que desean digitalizar su control básico.",
      price: "$97 USD/mes",
      priceLabel: "Acceso Gratuito de Prueba Inicial",
      badge: "Iniciación",
      popular: false,
      features: [
        "Acceso ilimitado al simulador interactivo de sincronización",
        "Matriz básica de habilidades del Director Organizacional",
        "Mapeo de 3 videos tutoriales (termoformado, planillas y ERP)",
        "Soporte comunitario vía formulario de contacto"
      ],
      actionLabel: "Iniciar de Forma Gratuita"
    },
    {
      name: "Plan Estrategia CIO & Sinergia",
      desc: "Para dueños de negocios e-commerce que buscan automatizar flujos CSV y triplicar márgenes.",
      price: "$297 USD/mes",
      priceLabel: "Licencia de suscripción mensual recurrente",
      badge: "El Más Solicitado",
      popular: true,
      features: [
        "Capacidad de sintonizar los 4 Módulos Cognitivos del Agente CIO",
        "Cargadores automáticos por lotes en Shopify y ClickUp",
        "Automatizaciones avanzadas de planillas de stock (cero clicks)",
        "Blueprints listos para usar de scripts en Python e IA",
        "Soporte dentro de 24 horas hábiles"
      ],
      actionLabel: "Reservar Interés en Plan"
    },
    {
      name: "Plan Especialista Taller Total MES",
      desc: "Consultoría integral uno a uno y digitalización física del piso de fabricación con tabletas.",
      price: "Desde $497 USD",
      priceLabel: "Cotización personalizada según escala del taller",
      badge: "Integral Corporativo",
      popular: false,
      features: [
        "Planificación del ROI con hoja de ruta y mentoría humana",
        "Digitalización física del taller con control visual directo",
        "Desarrollo personalizado de adaptadores CSV y bases SQL",
        "2 videollamadas mensuales de alineamiento operacional",
        "Agentes de IA pre-entrenados para resolver planos 3D"
      ],
      actionLabel: "Consultar Factibilidad de Taller"
    }
  ];

  return (
    <section id="suscripciones" className="py-20 bg-brand-gray-light border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-brand-accent font-semibold font-mono uppercase bg-brand-accent-light px-2.5 py-1 rounded-full select-none border border-brand-accent/15">
            <Star className="w-3 h-3 fill-current animate-spin" /> MODELO DE ALIANZAS &amp; PLANES
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-black text-brand-charcoal uppercase leading-tight tracking-tight">
            Suscripciones y Estructuras de Acompañamiento
          </h2>
          <p className="font-sans text-sm text-brand-muted leading-relaxed">
            Aunque aún no definimos los precios definitivos ni la oferta exacta del catálogo comercial, hemos estructurado tres niveles estratégicos basados en tus mermas operativas. <strong>Registra tu interés</strong> sin compromiso para recibir notificaciones exclusivas de lanzamiento.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          {plans.map((plan, index) => {
            return (
              <div 
                key={index}
                className={`bg-white border rounded-sm p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative select-none ${
                  plan.popular 
                    ? "border-brand-accent shadow-lg scale-102 lg:-translate-y-2" 
                    : "border-stone-250 hover:border-brand-accent/50 hover:shadow-md"
                }`}
              >
                {/* Popularity Badge */}
                {plan.badge && (
                  <span className={`absolute top-4 right-4 text-[8px] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded-sm border ${
                    plan.popular
                      ? "bg-brand-accent text-[#fbfbf9] border-brand-accent"
                      : "bg-[#fcfca6] text-brand-charcoal border-stone-300"
                  }`}>
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-6">
                  {/* Header info */}
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-black text-brand-charcoal uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="font-sans text-xs text-brand-muted leading-relaxed min-h-[48px]">
                      {plan.desc}
                    </p>
                  </div>

                  {/* Pricing Placeholder Indicator */}
                  <div className="py-4 border-y border-stone-150 space-y-1">
                    <div className="font-display text-xl md:text-2xl font-black text-brand-charcoal tracking-tight">
                      {plan.price}
                    </div>
                    <div className="font-mono text-[9px] text-[#865139] uppercase tracking-wide font-semibold block">
                      {plan.priceLabel}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] uppercase tracking-wide text-[#a7a79a] block font-black border-b border-stone-200/60 pb-1">
                      ¿Qué incluye esta alianza?
                    </span>
                    <ul className="space-y-2.5 text-xs font-sans text-brand-charcoal/90 pl-0.5">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="mt-8 space-y-2">
                  <div className="text-center font-mono text-[10px] uppercase font-bold text-stone-500 py-1 bg-stone-50 border border-stone-200/60 rounded-xs">
                    VALOR ESTIMADO: <span className="text-brand-accent font-black">{plan.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3 rounded-xs font-mono text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? "bg-brand-accent hover:bg-brand-charcoal text-[#fbfbf9]"
                        : "bg-brand-gray-light hover:bg-brand-accent hover:text-[#fbfbf9] text-brand-charcoal border border-stone-300"
                    }`}
                  >
                    <span>{plan.actionLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Disclaimers & Info */}
        <div className="bg-white border border-stone-200 p-5 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-mono text-[9px] font-bold text-brand-accent uppercase tracking-wider block">
              💡 NOTA COMERCIAL TRANSPARENTE
            </span>
            <p className="font-sans text-[11px] text-brand-muted max-w-3xl leading-relaxed">
              La venta directa dentro de la web no está vinculada a pasarelas reales en esta fase Beta. Registrar tu interés nos ayuda a entrenar el Cotizador Pro y priorizaremos tu contacto directo para estructurar soluciones personalizadas de inteligencia organizacional.
            </p>
          </div>
          <div className="text-xs font-mono text-brand-accent hover:underline shrink-0 font-bold uppercase transition-all">
            Santiago de Chile, 2026
          </div>
        </div>

      </div>
    </section>
  );
}
