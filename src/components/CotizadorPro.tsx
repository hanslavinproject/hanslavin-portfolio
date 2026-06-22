import React, { useState, useEffect } from "react";
import { 
  Calculator, 
  Layers, 
  Cpu, 
  DollarSign, 
  Coins, 
  Clock, 
  CalendarDays, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Percent,
  Check,
  ClipboardCheck,
  TrendingDown,
  Info,
  Gift,
  Flame,
  Zap,
  ArrowUpRight
} from "lucide-react";

interface CotizadorProProps {
  onApplyQuoteToForm: (message: string, category: string) => void;
}

// 1. CORE DEVELOPER MODULES CATALOG WITH TRADITIONAL VS AI-DRIVEN HOURS
interface CatalogItem {
  id: string;
  name: string;
  tradHours: number;
  aiBaseHours: number;
  badge: string;
  description: string;
  info: {
    what: string;
    includes: string;
    why: string;
    time: string;
  };
}

const CATALOG_MODULES: CatalogItem[] = [
  {
    id: "ecommerce_mes",
    name: "App Printer & Sistema MES Taller",
    tradHours: 120,
    aiBaseHours: 28,
    badge: "E-commerce Industrial",
    description: "Aplicación a medida integrada al sitio web para procesar órdenes, automatizar la adaptación de archivos y controlar el flujo físico del taller.",
    info: {
      what: "Un motor automatizado a medida (como en moldesfacil.com) que procesa pedidos web y genera el archivo de corte listo para operar al instante.",
      includes: "Procesamiento de catálogo por CSV, formateo de plantillas PDF para planos de corte, adaptadores de impresión y control de flujo de fabricación (MES).",
      why: "Evita que un operador pierda de 20 a 30 minutos adaptando trazos a mano. El sistema automatiza las hojas listas para imprimir en un toque.",
      time: "Tradicional: 120 horas de desarrollo full-stack | Con IA/Scaffolding: 28 horas efectivas."
    }
  },
  {
    id: "admin_dashboard",
    name: "Panel de Operario & Dashboard Multi-rol",
    tradHours: 80,
    aiBaseHours: 20,
    badge: "Control y Logística",
    description: "Área administrativa segura enfocada en velocidad. Permite controlar stock técnico, órdenes entrantes y prioridades de impresión.",
    info: {
      what: "Un dashboard web rápido optimizado para celulares y tablets en el taller, reduciendo clics innecesarios para el operario físico.",
      includes: "Logins protegidos con OTP, listados reactivos filtrables, actualización manual de estados en un toque e importador masivo.",
      why: "Tus operarios necesitan simplicidad táctil, no un software complejo saturado de métricas inaccesibles en pantallas pequeñas.",
      time: "Tradicional: 80 horas de maquetación backend | Con IA/Scaffolding: 20 horas efectivas."
    }
  },
  {
    id: "postgresql_schema",
    name: "Backend Robusto & Base de Datos Postgres",
    tradHours: 65,
    aiBaseHours: 14,
    badge: "Arquitectura Datos",
    description: "Diseño relacional a prueba de duplicación o pérdidas. Estructura idónea para transacciones y trazabilidad de productos.",
    info: {
      what: "Capa profunda de servidor que almacena de manera segura clientes, pedidos, historiales de descarga e incentivos por referidos.",
      includes: "Esquemas Drizzle ORM, migraciones rápidas, conexiones protegidas por pooling y queries optimizados con índices de velocidad.",
      why: "Asegura integridad de datos ante picos de tráfico. Si el navegador borra caché, el cliente sigue teniendo acceso duradero a sus compras.",
      time: "Tradicional: 65 horas de configuración y testing | Con IA/Scaffolding: 14 horas efectivas."
    }
  },
  {
    id: "gemini_agents",
    name: "Integración Gemini API & Agente IA",
    tradHours: 50,
    aiBaseHours: 12,
    badge: "Agentes Súper Inteligentes",
    description: "Mecanismo que procesa textos, redacta cotizaciones de forma sintética o categoriza planos basándose en el SDK moderno de Gemini.",
    info: {
      what: "Un pipeline del SDK `@google/genai` server-side que toma las descripciones de tus moldes y automatiza fichas técnicas sin error.",
      includes: "Validación de Prompting estructurado (JSON output), manejo ágil de temperatura y control de errores por límite de tokens.",
      why: "Delegar la redacción tediosa te ahorra horas semanales. Tus nuevos productos se suben con descripciones optimizadas al instante.",
      time: "Tradicional: 50 horas programando lógica NLP | Con IA: 12 horas usando modelos fundacionales."
    }
  },
  {
    id: "frontend_vibes",
    name: "Front-end de Alta Conversión & Figma",
    tradHours: 45,
    aiBaseHours: 10,
    badge: "Estética Editorial",
    description: "Conversión de diseños refinados a código limpio React + Tailwind CSS. Enfoque boutique visual, animaciones fluidas.",
    info: {
      what: "La cara visible de tu marca. Diseño editorial, espaciados amplios, tipografía cuidada (Inter/Space Grotesk) y adaptabilidad responsiva.",
      includes: "Motion layout, micro-interacciones interactivas, carga inteligente priorizada (lazy loading) y accesibilidad de alto contraste.",
      why: "La primera impresión define si tu molde o servicio vale $5 o $50. Un diseño pulcro transmite un profesionalismo premium instantáneo.",
      time: "Tradicional: 45 horas maquetando CSS y layouts | Con IA: 10 horas mediante generación iterativa estructurada."
    }
  },
  {
    id: "notifications_whatsapp",
    name: "Notificaciones WhatsApp / Twilio & Email API",
    tradHours: 35,
    aiBaseHours: 8,
    badge: "Alertas Automáticas",
    description: "Servicio integrado para despachar alertas de despacho o recordatorios de citas mediante plantillas oficiales y pasarelas.",
    info: {
      what: "Flujos automatizados que disparan mensajes transaccionales reduciendo la ansiedad de tu cliente sobre sus despachos.",
      includes: "Conexión a APIs externas (Twilio o Resend), reintentos automáticos de envío de mails y plantillas HTML dinámicas.",
      why: "Un cliente informado gasta 80% menos tiempo llamando a soporte para preguntar dónde está su archivo técnico.",
      time: "Tradicional: 35 horas de cableado de APIs externas | Con IA: 8 horas automatizadas."
    }
  }
];

// 2. ADDITIONAL DIGITAL STACKS (FLAT FEE VALUE INCORPORATED ACCORDING TO DOCUMENTATION)
const STACK_ADDITIONAL_SERVICES = [
  {
    id: "gpt_claude",
    name: "Pipeline Premium API (ChatGPT / Claude)",
    priceUsd: 150,
    priceClp: 140000,
    description: "Estructuración avanzada de modelos paralelos de respaldo para asegurar que si un servicio cae, el otro tome control automático."
  },
  {
    id: "clickup_automations",
    name: "Setup ClickUp Automatizado & Docs",
    priceUsd: 120,
    priceClp: 110000,
    description: "Creación de tus tableros Kanban, flujos de transición de estados y automatización de entrega del proyecto en ClickUp."
  },
  {
    id: "meta_leads",
    name: "Campaña de Leads META Ads / TikTok",
    priceUsd: 250,
    priceClp: 230000,
    description: "Configuración del Business Manager, pixel de seguimiento, públicos personalizados y estructuración del copy persuasivo del embudo."
  },
  {
    id: "saleads_funnel",
    name: "Embudo Automático con Saleads",
    priceUsd: 180,
    priceClp: 165000,
    description: "Configura integraciones ágiles de embudo con Saleads para clasificar y derivar leads cualificados automáticamente a WhatsApp."
  }
];

// 3. MULTIPLIERS DEFINE ACCORDING TO SPECS
const COMPLEXITY_MULTIPLIERS = [
  { id: "simple", name: "Simple (Prototipo Veloz)", multiplier: 0.7, description: "Alcance acotado, enfocado en validar hipótesis rápido con flujos estándar." },
  { id: "standard", name: "Estándar (Producción Estable)", multiplier: 1.0, description: "Casos robustos ideales para venta masiva de moldes u operaciones continuas." },
  { id: "complex", name: "Complejo (Flujo Personalizado)", multiplier: 1.5, description: "Integraciones avanzadas de software heredado o migración profunda." },
  { id: "scalability", name: "Muy Complejo (Alta Escala)", multiplier: 2.0, description: "Bases de datos concurrentes y máxima cobertura de casos de error físicos." }
];

const URGENCY_MULTIPLIERS = [
  { id: "normal", name: "Normal (Cola ClickUp)", multiplier: 1.0, description: "Se devela ordenadamente según cronograma general de proyectos." },
  { id: "urgent", name: "Urgente (Sprints de 3 días)", multiplier: 1.3, description: "+30% tarifa. Avance diario, canales dedicados y sprints acelerados." },
  { id: "critical", name: "Crítico (Fast-track Extremo)", multiplier: 1.6, description: "+60% tarifa. Despliegue de emergencia interrumpiendo cola, soporte 24/7." }
];

const TAX_MATRIX = [
  { id: "neto", name: "Pago Neto (Cero adicionales / Exterior)", rate: 0.0, description: "Focos de exportación de servicios de consultoría o pagos libres." },
  { id: "boleta", name: "Retención Boleta Honorarios Chile (13.75%)", rate: 0.1375, description: "Boleta formal de honorarios con retención legal para personas naturales." },
  { id: "factura", name: "Factura de Empresa afecto IVA (+19%)", rate: 0.19, description: "Servicios corporativos con emisión de factura exenta/afecta de mi sociedad." }
];

export default function CotizadorPro({ onApplyQuoteToForm }: CotizadorProProps) {
  // Configurations
  const [currency, setCurrency] = useState<"USD" | "CLP">("USD");
  const [selectedModules, setSelectedModules] = useState<string[]>(["ecommerce_mes", "admin_dashboard"]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["clickup_automations"]);
  
  const [complexity, setComplexity] = useState<string>("standard");
  const [urgency, setUrgency] = useState<string>("normal");
  const [taxScheme, setTaxScheme] = useState<string>("neto");

  const [hourlyRate, setHourlyRate] = useState<number>(currency === "USD" ? 40 : 35000);
  const [hasReferrer, setHasReferrer] = useState<boolean>(false);
  const [referrerCode, setReferrerCode] = useState<string>("");
  const [activeModuleInfo, setActiveModuleInfo] = useState<string | null>("ecommerce_mes");

  // Output math totals
  const [totalTradHours, setTotalTradHours] = useState(0);
  const [totalAiHours, setTotalAiHours] = useState(0);
  const [hoursSaved, setHoursSaved] = useState(0);

  const [subtotalTradCost, setSubtotalTradCost] = useState(0);
  const [subtotalAiCost, setSubtotalAiCost] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [taxesValue, setTaxesValue] = useState(0);
  const [finalAiCost, setFinalAiCost] = useState(0);
  
  const [savingsValue, setSavingsValue] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(0);
  const [weeksEstimated, setWeeksEstimated] = useState(0);

  // Copy success animation trigger
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Sync default hourly rate on currency change
  useEffect(() => {
    if (currency === "USD") {
      setHourlyRate(40);
    } else {
      setHourlyRate(35000);
    }
  }, [currency]);

  // Execute Core Math Engine
  useEffect(() => {
    // 1. Resolve selected catalogs
    const activeCatalogItems = CATALOG_MODULES.filter(m => selectedModules.includes(m.id));
    
    // Sum multipliers
    const compDetails = COMPLEXITY_MULTIPLIERS.find(c => c.id === complexity) || COMPLEXITY_MULTIPLIERS[1];
    const urgDetails = URGENCY_MULTIPLIERS.find(u => u.id === urgency) || URGENCY_MULTIPLIERS[0];
    const taxDetails = TAX_MATRIX.find(t => t.id === taxScheme) || TAX_MATRIX[0];

    // Total Hours Raw
    const baseTradHours = activeCatalogItems.reduce((acc, curr) => acc + curr.tradHours, 0);
    const baseAiHours = activeCatalogItems.reduce((acc, curr) => acc + curr.aiBaseHours, 0);

    // Multiply hours by complexity multiplier
    const finalTradHoursCalc = Math.round(baseTradHours * compDetails.multiplier);
    const finalAiHoursCalc = Math.round(baseAiHours * compDetails.multiplier);

    setTotalTradHours(finalTradHoursCalc);
    setTotalAiHours(finalAiHoursCalc);
    setHoursSaved(Math.max(0, finalTradHoursCalc - finalAiHoursCalc));

    // 2. Resolve additional stacks flat fee
    const activeAddonsDetails = STACK_ADDITIONAL_SERVICES.filter(a => selectedAddons.includes(a.id));
    const flatAddonSum = activeAddonsDetails.reduce((acc, curr) => {
      const price = currency === "USD" ? curr.priceUsd : curr.priceClp;
      return acc + price;
    }, 0);

    // 3. Cost Calculations
    // Trad Cost: Traditional Hours * Rate (Assumes standard rate is equivalent for both models, highlighting workflow leverage)
    const rawTradCost = (finalTradHoursCalc * hourlyRate) + flatAddonSum;
    setSubtotalTradCost(Math.round(rawTradCost));

    // AI Cost: AI Hours * Rate * Urgency Modifier
    const rawAiCost = ((finalAiHoursCalc * hourlyRate) * urgDetails.multiplier) + flatAddonSum;
    const roundedAiCost = Math.round(rawAiCost);

    // Apply 10% referral discount if active
    const discountAmount = hasReferrer ? Math.round(roundedAiCost * 0.1) : 0;
    setDiscountValue(discountAmount);

    const costAfterDiscount = roundedAiCost - discountAmount;
    setSubtotalAiCost(costAfterDiscount);

    // Apply Tax matrix
    const taxAmount = Math.round(costAfterDiscount * taxDetails.rate);
    setTaxesValue(taxAmount);

    // Final calculations
    const finalCost = costAfterDiscount + taxAmount;
    setFinalAiCost(finalCost);

    // Business Saving ROI Highlight (Value Proposition Pitch!)
    const savings = Math.max(0, rawTradCost - finalCost);
    setSavingsValue(savings);
    setSavingsPercentage(rawTradCost > 0 ? Math.round((savings / rawTradCost) * 100) : 0);

    // Velocity estimates: Assumes a steady throughput of 15 fully-focused sprint development hours per week.
    const weeksFraction = Math.ceil(finalAiHoursCalc / 15);
    setWeeksEstimated(Math.max(1, weeksFraction));

  }, [
    selectedModules,
    selectedAddons,
    complexity,
    urgency,
    taxScheme,
    currency,
    hourlyRate,
    hasReferrer
  ]);

  const handleToggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      if (selectedModules.length > 1) {
        setSelectedModules(selectedModules.filter(m => m !== id));
      }
    } else {
      setSelectedModules([...selectedModules, id]);
    }
    setActiveModuleInfo(id);
  };

  const handleToggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const formatValue = (num: number) => {
    if (currency === "USD") {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
    } else {
      return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(num);
    }
  };

  const generateProposalText = () => {
    const activeCatalogItems = CATALOG_MODULES.filter(m => selectedModules.includes(m.id));
    const activeAddonsItems = STACK_ADDITIONAL_SERVICES.filter(a => selectedAddons.includes(a.id));

    const modulesLines = activeCatalogItems
      .map(m => `  • ${m.name} (${Math.round(m.aiBaseHours * (COMPLEXITY_MULTIPLIERS.find(c => c.id === complexity)?.multiplier || 1.0))} hrs efectivas con IA)`)
      .join("\n");

    const addonsLines = activeAddonsItems
      .map(a => `  • ${a.name} (+${formatValue(currency === "USD" ? a.priceUsd : a.priceClp)})`)
      .join("\n");

    return `COTIZACIÓN PROFESIONAL EXPRESO · HANS LAVIN PROJECT MANAGER
Modelo Eficiente: Desarrollo Tradicional vs. Metodología Potenciada por Inteligencia Artificial (IA)
==================================================

📐 ALCANCE E-COMMERCE / SOFTWARE DE TALLER:
${modulesLines}

⚙️ STACKS Y AUDITORIAS DIGITALES:
${addonsLines || "  • Ningún stack o automatización META/Saleads integrada"}

⚡ PARÁMETROS OPERATIVOS DE ESTUDIO:
  • Complejidad: ${COMPLEXITY_MULTIPLIERS.find(c => c.id === complexity)?.name}
  • Grado Urgencia: ${URGENCY_MULTIPLIERS.find(u => u.id === urgency)?.name}
  • Régimen Fiscal: ${TAX_MATRIX.find(t => t.id === taxScheme)?.name}
  • Referido Aplicado: ${hasReferrer ? "SÍ (10% de descuento incluido)" : "NO"}

📊 COMPARATIVA ESTRATÉGICA DE TIEMPOS:
  • Estimación Desarrollo Tradicional: ~${totalTradHours} horas laborables
  • Estimación Metodología Hans (con IA): ~${totalAiHours} horas efectivas
  ⏳ ¡Ahorro absoluto de un ${Math.round((1 - (totalAiHours / (totalTradHours || 1))) * 100)}% en tiempo de ejecución de código!

💰 DESGLOSE DEL PRESUPUESTO (${currency}):
  • Costo Estimado Desarrollo Tradicional: ${formatValue(subtotalTradCost)} ${currency}
  • Tarifa por Hora Pactada: ${formatValue(hourlyRate)} /hr
  • Descuento por Referido: ${hasReferrer ? formatValue(discountValue) : "$0"}
  • Impuestos o Boleta Aplicada: ${formatValue(taxesValue)}
  ------------------------------------------------
  🎉 TOTAL PROPUESTA HANS LAVIN: ${formatValue(finalAiCost)} ${currency}
  🔐 AHORRO REAL DIRECTO EN PRESUPUESTO: ${formatValue(savingsValue)} ${currency} (~${savingsPercentage}% menos)
  ⏳ PLAZO DE ENTREGA CRONOLÓGICO: ~${weeksEstimated} ${weeksEstimated === 1 ? "semana" : "semanas"}

==================================================
Hola Hans, analicé mi proyecto con tu Cotizador Pro Copias de tu portafolio. Me fascina el contraste de horas de desarrollo tradicionales vs tu metodología ágil optimizada con IA. Me gustaría agendar un meeting de 15 minutos para que mapeemos nuestro primer Kanban en ClickUp y arranquemos el proyecto. ¡Vamos!`;
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generateProposalText());
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  const handleApplyToForm = () => {
    const text = generateProposalText();
    let category = "strategy";
    if (selectedModules.includes("ecommerce_mes") || selectedAddons.includes("saleads_funnel")) {
      category = "ecommerce";
    } else if (selectedModules.includes("gemini_agents") || selectedAddons.includes("gpt_claude")) {
      category = "automations";
    }

    onApplyQuoteToForm(text, category);

    // Scroll seamlessly to contact form
    const formElement = document.getElementById("contacto");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("contact-message-input");
        if (input) input.focus();
      }, 700);
    }
  };

  const focusedModule = CATALOG_MODULES.find(m => m.id === activeModuleInfo);

  return (
    <section id="cotizador" className="py-24 bg-[#FAF9F5] border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Dynamic Heading Hero Block - Warm graphic design studio feel */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-accent font-extrabold block mb-2">
              PROPUESTA ABIERTA Y TRANSPARENTE
            </span>
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-brand-accent stroke-[1.5]" />
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-brand-charcoal">
                Cotizador Pro: <span className="font-light italic text-stone-600">Velocidad &amp; Transparencia</span>
              </h2>
            </div>
            <p className="font-sans text-sm text-brand-muted mt-3 max-w-xl leading-relaxed">
              Descubre por qué desarrollo más rápido y más seguro usando Inteligencia Artificial. Modula las necesidades de tu taller, los servicios META y tu nivel de prioridad legal para una cotización instantánea.
            </p>
          </div>

          {/* Currency selectors */}
          <div className="shrink-0 flex items-center bg-white p-1 rounded-sm border border-stone-200 shadow-xs">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-5 py-2 font-mono text-xs uppercase font-extrabold transition-all duration-300 rounded-xs flex items-center gap-1.5 cursor-pointer ${
                currency === "USD"
                  ? "bg-brand-charcoal text-white shadow-md"
                  : "text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              USD
            </button>
            <button
              onClick={() => setCurrency("CLP")}
              className={`px-5 py-2 font-mono text-xs uppercase font-extrabold transition-all duration-300 rounded-xs flex items-center gap-1.5 cursor-pointer ${
                currency === "CLP"
                  ? "bg-brand-charcoal text-white shadow-md"
                  : "text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              CLP (Chile)
            </button>
          </div>
        </div>

        {/* Real-time Toast alert */}
        {copiedSuccess && (
          <div className="fixed bottom-6 right-6 bg-brand-charcoal text-[#fbfbf9] px-5 py-3.5 rounded-xs shadow-2xl border border-brand-accent/20 flex items-center gap-3 z-50 animate-fadeIn font-mono text-xs font-semibold">
            <Check className="w-4 h-4 text-brand-accent" />
            <span>¡Cotización exportada en formato texto!</span>
          </div>
        )}

        {/* Interactive Workspace Workboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Configurator Side (Left: 7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* STEP 1: MODULE CATALOG COMPONENT CHANGER */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline border-b border-stone-200/60 pb-2">
                <h3 className="font-display font-black text-xs uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-charcoal text-white font-mono text-[9px] flex items-center justify-center font-bold">1</span>
                  Elige los Módulos Tecnológicos de tu Software
                </h3>
                <span className="font-mono text-[9px] text-[#a1a195] uppercase font-bold">
                  Catálogo Editable
                </span>
              </div>

              <div className="space-y-3">
                {CATALOG_MODULES.map((item) => {
                  const isChecked = selectedModules.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleModule(item.id)}
                      className={`p-4 border rounded-xs cursor-pointer transition-all duration-300 text-left flex items-start gap-4 hover:border-brand-accent/40 ${
                        isChecked
                          ? "bg-white border-brand-accent shadow-xs"
                          : "bg-white/45 border-stone-200/80 hover:bg-white"
                      }`}
                    >
                      <div className="mt-1">
                        <div className={`w-4 h-4 border-2 rounded-xs flex items-center justify-center transition-all ${
                          isChecked 
                            ? "bg-brand-accent border-brand-accent text-white" 
                            : "bg-white border-stone-300"
                        }`}>
                          {isChecked && <span className="text-[10px] leading-none font-bold">✓</span>}
                        </div>
                      </div>

                      <div className="flex-1 space-y-1 select-none">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-display font-bold text-xs text-brand-charcoal leading-snug">
                            {item.name}
                          </span>
                          <span className="font-mono text-[8px] bg-brand-accent-light px-2 py-0.5 rounded-sm text-brand-accent font-bold uppercase tracking-wider">
                            {item.badge}
                          </span>
                        </div>
                        <p className="font-sans text-[11.5px] text-brand-muted leading-relaxed">
                          {item.description}
                        </p>

                        {/* Traditional vs AI hours comparison on small indicator */}
                        <div className="pt-2 flex items-center gap-3.5 text-[9px] font-mono text-[#8a8a7c]">
                          <span>Tradicional: <strong className="text-stone-700">{item.tradHours}h</strong></span>
                          <span>•</span>
                          <span className="text-brand-accent">Con IA Hans: <strong className="font-bold">{item.aiBaseHours}h</strong></span>
                          <span>•</span>
                          <span className="font-bold text-[#1b9a5f]">+{Math.round(((item.tradHours - item.aiBaseHours) / item.aiBaseHours) * 100)}% velocidad (+{Math.round((item.tradHours / item.aiBaseHours) * 10) / 10}x más rápido)</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* INTERACTIVE COMPONENT INFORMATION POPUP (Feature 4a - Vende y educa al mismo tiempo) */}
            {focusedModule && (
              <div className="bg-[#FAF8F2] border border-brand-accent/20 p-5 rounded-xs space-y-3.5 text-left animate-fadeIn">
                <span className="font-mono text-[9px] text-[#a3795a] font-extrabold tracking-widest uppercase flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-brand-accent" />
                  ¿CÓMO TRABAJO ESTE MÓDULO?: {focusedModule.name}
                </span>

                <div className="grid grid-[#FAF8F2] gap-4 text-xs">
                  <div>
                    <span className="font-display font-extrabold text-brand-charcoal block mb-0.5">¿Qué es y qué soluciona?</span>
                    <p className="font-sans text-[11px] text-brand-muted leading-relaxed">{focusedModule.info.what}</p>
                  </div>
                  {focusedModule.id === "ecommerce_mes" && (
                    <div className="bg-brand-accent/5 p-3 border border-brand-accent/15 rounded-xs">
                      <span className="font-mono text-[9px] text-brand-accent font-bold uppercase tracking-wider block mb-1">💡 NOTA DE DISEÑO &amp; HISTORIA:</span>
                      <p className="font-sans text-[11px] text-brand-charcoal leading-relaxed">
                        Este módulo representa mi caso de éxito insignia en <strong>Moldes Fácil</strong>. Nació de la necesidad de automatizar la producción en nuestro taller. Desarrollé la lógica de la <strong>APP Printer</strong> integrada que procesa los CSVs del catálogo a medida y divide automáticamente planos complejos de plotter a hojas domésticas (A4/Carta). Lo incluyo aquí para ilustrar cómo puedo estructurar flujos MES para eliminar la intervención manual de operarios.
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="font-display font-extrabold text-brand-charcoal block mb-0.5">¿Qué incluye el código?</span>
                    <p className="font-sans text-[11px] text-brand-muted leading-relaxed">{focusedModule.info.includes}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-stone-200/50 pt-2.5 mt-1">
                    <div>
                      <span className="font-display font-extrabold text-brand-charcoal block mb-0.5">El valor del tiempo</span>
                      <p className="font-mono text-[10px] text-brand-accent leading-snug">{focusedModule.info.time}</p>
                    </div>
                    <div>
                      <span className="font-display font-extrabold text-brand-charcoal block mb-0.5">Impacto Estratégico</span>
                      <p className="font-sans text-[11px] text-stone-700 font-semibold leading-relaxed">{focusedModule.info.why}</p>
                    </div>
                  </div>
                  {focusedModule.id === "ecommerce_mes" && (
                    <div className="mt-2 pt-2.5 border-t border-stone-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px]">
                      <span className="text-brand-muted italic">¿Quieres ver cómo opera? Revisa mi caso de éxito:</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.querySelector("#proyectos");
                          if (element) {
                            window.scrollTo({
                              top: element.getBoundingClientRect().top + window.scrollY - 80,
                              behavior: "smooth"
                            });
                          }
                        }}
                        className="text-brand-accent hover:text-brand-charcoal transition-colors font-mono font-bold flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer text-left"
                      >
                        [ Ver Proyecto Moldes Fácil ] <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: ADDITIONAL SERVICES INTEGRATION (SALEADS, META ADS Campaigns) */}
            <div className="space-y-4 pt-4 border-t border-stone-200/40">
              <div className="flex justify-between items-baseline border-b border-stone-200/60 pb-2">
                <h3 className="font-display font-black text-xs uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-charcoal text-white font-mono text-[9px] flex items-center justify-center font-bold">2</span>
                  Servicios Adicionales (Automatizaciones, META &amp; Saleads)
                </h3>
                <span className="font-mono text-[9px] text-brand-muted uppercase block">Flat Fees</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STACK_ADDITIONAL_SERVICES.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const rateToShow = currency === "USD" ? addon.priceUsd : addon.priceClp;
                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`p-4 border rounded-xs cursor-pointer transition-all duration-300 text-left flex flex-col justify-between hover:border-brand-accent/40 ${
                        isChecked
                          ? "bg-white border-brand-charcoal shadow-xs"
                          : "bg-white/45 border-stone-200/80 hover:bg-white"
                      }`}
                    >
                      <div className="space-y-1 select-none">
                        <div className="flex items-start gap-2.5">
                          <div className="mt-0.5 shrink-0">
                            <div className={`w-3.5 h-3.5 border-2 rounded-xs flex items-center justify-center transition-all ${
                              isChecked ? "bg-brand-charcoal border-brand-charcoal text-white" : "bg-white border-stone-300"
                            }`}>
                              {isChecked && <span className="text-[9px] leading-none font-bold">✓</span>}
                            </div>
                          </div>
                          <span className="font-display font-extrabold text-xs text-brand-charcoal leading-snug">
                            {addon.name}
                          </span>
                        </div>
                        <p className="font-sans text-[10.5px] text-brand-muted leading-relaxed pl-6">
                          {addon.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-100 pl-6 mt-3 flex justify-between items-baseline shrink-0 font-mono text-[10px]">
                        <span className="text-[#989a91]">Valor fijo:</span>
                        <span className="font-bold text-brand-accent">{formatValue(rateToShow)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: COMPLEXITY & URGENCY ADJUSTMENTS */}
            <div className="space-y-4 pt-4 border-t border-stone-200/40">
              <div className="border-b border-stone-200/60 pb-2">
                <h3 className="font-display font-black text-xs uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-charcoal text-white font-mono text-[9px] flex items-center justify-center font-bold">3</span>
                  Define la Complejidad y Grado de Prioridad
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Complexity Multipliers dropdown styled as minimal grid cards */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted block">Multiplicador de Complejidad:</span>
                  <div className="space-y-2">
                    {COMPLEXITY_MULTIPLIERS.map((cur) => (
                      <div
                        key={cur.id}
                        onClick={() => setComplexity(cur.id)}
                        className={`p-3 border rounded-xs cursor-pointer text-left transition-all ${
                          complexity === cur.id 
                            ? "bg-brand-charcoal text-[#fbfbf9] border-brand-charcoal" 
                            : "bg-white border-stone-200 hover:border-brand-accent/40"
                        }`}
                      >
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-display font-bold text-xs">{cur.name}</span>
                          <span className="font-mono text-[10px] text-brand-accent">x{cur.multiplier}</span>
                        </div>
                        <p className={`font-sans text-[10px] ${complexity === cur.id ? "text-stone-300" : "text-brand-muted"}`}>
                          {cur.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Urgency Multipliers */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted block">Prioridad de Despacho del Código:</span>
                  <div className="space-y-2">
                    {URGENCY_MULTIPLIERS.map((urg) => (
                      <div
                        key={urg.id}
                        onClick={() => setUrgency(urg.id)}
                        className={`p-3 border rounded-xs cursor-pointer text-left transition-all ${
                          urgency === urg.id 
                            ? "bg-brand-accent-light/60 border-brand-accent" 
                            : "bg-white border-stone-200 hover:border-brand-accent/40"
                        }`}
                      >
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-display font-extrabold text-xs text-brand-charcoal">{urg.name}</span>
                          <span className="font-mono text-[10px] text-brand-accent font-bold">x{urg.multiplier}</span>
                        </div>
                        <p className="font-sans text-[10px] text-brand-muted">
                          {urg.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* STEP 4: TAXES AND REFERRAL SYSTEM IN SCOPE */}
            <div className="space-y-4 pt-4 border-t border-stone-200/40">
              <div className="border-b border-stone-200/60 pb-2">
                <h3 className="font-display font-black text-xs uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-charcoal text-white font-mono text-[9px] flex items-center justify-center font-bold">4</span>
                  Régimen Tributario &amp; Programa de Referidos
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Taxes toggle select */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted block">Esquema Legal de Factura Chile:</span>
                  <select
                    value={taxScheme}
                    onChange={(e) => setTaxScheme(e.target.value)}
                    className="w-full bg-white border border-stone-250 text-xs text-brand-charcoal focus:border-brand-accent focus:outline-hidden px-3.5 py-2.5 rounded-xs cursor-pointer select-none font-sans"
                  >
                    {TAX_MATRIX.map((tax) => (
                      <option key={tax.id} value={tax.id}>
                        {tax.name}
                      </option>
                    ))}
                  </select>
                  <p className="font-sans text-[10px] text-brand-muted leading-tight">
                    {TAX_MATRIX.find(t => t.id === taxScheme)?.description}
                  </p>
                </div>

                {/* Referral active box with conditional 10% */}
                <div className="bg-white border border-stone-200 p-4 rounded-xs space-y-3.5">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="checkbox-referrer"
                      checked={hasReferrer}
                      onChange={(e) => setHasReferrer(e.target.checked)}
                      className="accent-brand-accent w-4 h-4 rounded-sm cursor-pointer"
                    />
                    <label htmlFor="checkbox-referrer" className="font-display font-bold text-xs text-brand-charcoal cursor-pointer select-none">
                      Tengo un Referido o Código de Socio
                    </label>
                  </div>

                  {hasReferrer && (
                    <div className="flex gap-2.5 animate-fadeIn">
                      <input
                        type="text"
                        value={referrerCode}
                        onChange={(e) => setReferrerCode(e.target.value)}
                        placeholder="Introduce código de socio (Ej: SES_MOLDES_10)"
                        className="w-full bg-[#FAF9F5] border border-stone-250 focus:border-brand-accent text-xs px-3 py-1.5 rounded-sm select-none focus:outline-hidden text-brand-charcoal font-sans"
                      />
                      <div className="bg-brand-accent-light text-brand-accent text-[9px] font-mono rounded-sm px-2.5 flex items-center font-bold uppercase tracking-wide">
                        <Gift className="w-3.5 h-3.5 mr-1" />
                        -10% aplicado
                      </div>
                    </div>
                  )}

                  <p className="font-sans text-[10px] text-brand-muted leading-relaxed">
                    Si te refirió un cliente activo de talleres anteriores, activas un <strong>10% descuento</strong> automático en horas del MVP.
                  </p>
                </div>

              </div>
            </div>

            {/* Custom Hourly rate adjuster manually */}
            <div className="bg-white border border-stone-200/85 p-5 rounded-xs space-y-3 shadow-xs">
              <div className="flex justify-between items-baseline font-mono text-[9px] font-extrabold text-[#7e8076]">
                <span>AJUSTAR VALOR DE TASA POR HORA PACTADA:</span>
                <span className="text-brand-accent font-bold text-xs">{formatValue(hourlyRate)}/hr</span>
              </div>
              <input
                type="range"
                min={currency === "USD" ? "20" : "15000"}
                max={currency === "USD" ? "90" : "75000"}
                step={currency === "USD" ? "5" : "2500"}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full accent-brand-accent h-1 bg-stone-200 rounded-lg cursor-pointer transition-all"
              />
              <p className="font-sans text-[10px] text-brand-muted leading-relaxed">
                Tasa por hora referencial pactada de desarrollo. Un valor estándar para el modelo PM Senior freelance suele oscilar en los $40 USD o $35.000 CLP.
              </p>
            </div>

          </div>

          {/* QUOTE BOARD - CALCULATION DASHBOARD RIGHT (5 Columns) */}
          <div className="lg:col-span-12 xl:col-span-5 bg-white border border-stone-250 rounded-xs p-6 md:p-8 shadow-xl space-y-6 lg:sticky lg:top-24">
            
            {/* HERO SAVINGS PITCH IN THE WORKBENCH BOARD */}
            <div className="bg-brand-charcoal text-[#fbfbf9] p-5 rounded-xs space-y-4 border border-brand-accent/25 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-12 rotate-12">
                <TrendingDown className="w-24 h-24 text-brand-accent" />
              </div>

              <div className="space-y-1 z-10 relative">
                <span className="font-mono text-[9px] text-[#bcbcb0] font-bold block uppercase tracking-wider">
                  DIFERENCIAL AHORRO METODOLÓGICO HANS (ROI)
                </span>
                <h4 className="font-display font-black text-lg text-brand-accent">
                  ¡Ahorras un {savingsPercentage}% de tu presupuesto!
                </h4>
                <p className="font-sans text-[11px] text-stone-300 leading-relaxed">
                  Gracias al bootstrapping optimizado con IA y scaffolding propio, reducimos el total de horas programables tradicionales en un <strong>73%</strong> sin comprometer seguridad.
                </p>
              </div>

              {/* Progress visual comparison */}
              <div className="space-y-3 pt-3.5 border-t border-stone-200/20 z-10 relative">
                
                {/* Traditional hours gauge */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[9px] text-stone-300">
                    <span>Desarrollo Tradicional</span>
                    <span>~{totalTradHours} horas estimadas</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#f87171]" style={{ width: "100%" }}></div>
                  </div>
                </div>

                {/* AI / Hans hours gauge */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[9px] text-brand-accent font-bold">
                    <span>Metodología Hans (con IA)</span>
                    <span>~{totalAiHours} horas efectivas</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1b9a5f]" style={{ width: `${Math.max(12, Math.round((totalAiHours / (totalTradHours || 1)) * 100))}%` }}></div>
                  </div>
                </div>

                <div className="pt-2 text-center text-[10px] font-mono text-brand-accent font-bold">
                  🎁 Te ahorras ~{hoursSaved} horas de trabajo técnico de codificación
                </div>
              </div>
            </div>

            {/* UPPER SUMMARY OF PRICING STATS */}
            <div className="space-y-1 pt-2">
              <span className="font-mono text-[8px] text-stone-400 uppercase tracking-widest font-black block">
                VALOR ESTIMADO DE PROPUESTA HANS LAVIN
              </span>
              <div className="flex justify-between items-baseline">
                <span className="font-display font-black text-3xl md:text-4xl text-brand-charcoal tracking-tight">
                  {formatValue(finalAiCost)}
                </span>
                <span className="font-mono text-xs uppercase text-brand-accent font-bold">
                  {currency} Final / Neto
                </span>
              </div>
            </div>

            {/* QUICK ESTIMATE SPEC CHART */}
            <div className="grid grid-cols-2 gap-3.5 font-sans">
              <div className="bg-[#FAF9F5] p-3 rounded-xs border border-stone-200 space-y-1">
                <span className="font-mono text-[8px] text-brand-muted uppercase block">Costo Tradicional:</span>
                <p className="font-display font-extrabold text-xs text-red-600 line-through">
                  {formatValue(subtotalTradCost)}
                </p>
              </div>
              <div className="bg-[#FAF9F5] p-3 rounded-xs border border-stone-200 space-y-1 text-left">
                <span className="font-mono text-[8px] text-brand-accent uppercase block">Ahorro Neto Directo:</span>
                <p className="font-display font-extrabold text-xs text-[#1b9a5f]">
                  -{formatValue(savingsValue)}
                </p>
              </div>
            </div>

            {/* INTUITIVE GANTT PLANNER TIMELINE */}
            <div className="space-y-2.5 pt-2">
              <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest font-bold block">
                ESTADO DEL PROYECTO &amp; SPRINT METODOLÓGICO:
              </span>
              <div className="bg-[#FAF9F5] border border-stone-200/80 p-4 rounded-xs space-y-3">
                <div className="flex justify-between font-mono text-[9px]">
                  <span className="text-[#969890] uppercase">Plazo estimado:</span>
                  <span className="font-extrabold text-brand-charcoal">~{weeksEstimated} {weeksEstimated === 1 ? "semana" : "semanas"} de sprints</span>
                </div>
                
                {/* Visual state line tracker */}
                <div className="flex gap-1.5 h-1">
                  <div className="flex-1 bg-brand-charcoal rounded-full"></div>
                  <div className={`flex-1 rounded-full ${weeksEstimated >= 2 ? "bg-brand-accent" : "bg-stone-200"}`}></div>
                  <div className={`flex-1 rounded-full ${weeksEstimated >= 3 ? "bg-stone-400" : "bg-stone-200"}`}></div>
                  <div className={`flex-1 rounded-full ${weeksEstimated >= 4 ? "bg-[#1b9a5f]" : "bg-stone-200"}`}></div>
                </div>

                <div className="flex gap-2 items-center text-[10px] text-brand-muted leading-tight">
                  <CalendarDays className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                  <span>Configurado como <strong>{URGENCY_MULTIPLIERS.find(u => u.id === urgency)?.name}</strong>. Se entrega reporte de avance periódico.</span>
                </div>
              </div>
            </div>

            {/* DETAILED ITEMIZED BILL STATEMENT */}
            <div className="border-t border-b border-stone-150 py-4 font-mono text-[11px] space-y-1.5">
              <span className="font-mono text-[8.5px] text-stone-400 uppercase tracking-wider block font-black mb-2">
                DESGLOSE DETALLADO DE CONTABILIDAD
              </span>
              
              <div className="flex justify-between text-brand-charcoal">
                <span>Costo desarrollo base (${totalAiHours}h con IA):</span>
                <span>{formatValue(totalAiHours * hourlyRate)}</span>
              </div>
              
              {selectedAddons.length > 0 && (
                <div className="flex justify-between text-[#8e8e81]">
                  <span>Adicionales (Automation/Campaigns):</span>
                  <span>+ {formatValue(STACK_ADDITIONAL_SERVICES.filter(a => selectedAddons.includes(a.id)).reduce((acc, curr) => acc + (currency === "USD" ? curr.priceUsd : curr.priceClp), 0))}</span>
                </div>
              )}

              {hasReferrer && (
                <div className="flex justify-between text-[#1b9a5f] font-bold">
                  <span>Referido socio aplicado (-10%):</span>
                  <span>- {formatValue(discountValue)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#8e8e81]">
                <span>Alineación impositiva / Retenciones:</span>
                <span>+ {formatValue(taxesValue)}</span>
              </div>

              <div className="flex justify-between text-brand-charcoal border-t border-stone-200/50 pt-2 text-xs font-extrabold mt-1">
                <span>Presupuesto Final Planificado:</span>
                <span>{formatValue(finalAiCost)} {currency}</span>
              </div>
            </div>

            {/* EXPORT WORKBENCH CONTROLS */}
            <div className="space-y-3.5">
              
              <button
                type="button"
                onClick={handleApplyToForm}
                className="w-full bg-brand-charcoal text-[#fbfbf9] hover:bg-brand-accent text-xs font-mono uppercase tracking-widest font-black py-4 rounded-xs justify-center flex items-center gap-2 cursor-pointer shadow-md group transition-all duration-300"
              >
                Cargar Presupuesto al Formulario de Contacto
                <ArrowRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleCopyToClipboard}
                className="w-full bg-white text-brand-charcoal border border-stone-250 hover:border-brand-accent hover:text-brand-accent text-[11px] font-mono font-extrabold py-2.5 rounded-xs flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300"
              >
                <ClipboardCheck className="w-4 h-4 text-[#8a8a7c]" />
                Exportar Propuesta Formato Texto Estructurado
              </button>

              <div className="flex gap-2 items-center justify-center text-[10.5px] text-[#919289] leading-tight text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <span>La propuesta es editable y se procesa localmente sin costo</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
