import { useState, useEffect } from "react";
import { INTERACTIVE_SCENARIOS } from "../data";
import { 
  Heart, CheckCircle2, ChevronRight, HelpCircle, Activity, Sparkles, 
  Clock, DollarSign, ArrowUpRight, Lock, Unlock, FileText, Send, 
  ShieldCheck, Terminal, Play
} from "lucide-react";

export default function InteractiveDiagnostic() {
  const [activeTab, setActiveTab] = useState<"diagnostico" | "roi" | "agente">("diagnostico");
  
  // Scenarios State
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("scen-1");
  const activeScenario =
    INTERACTIVE_SCENARIOS.find((sc) => sc.id === selectedScenarioId) ||
    INTERACTIVE_SCENARIOS[0];

  // ROI Calculator State
  const [ordersPerWeek, setOrdersPerWeek] = useState<number>(60);
  const [minutesPerOrder, setMinutesPerOrder] = useState<number>(25); // Referencing Moldes Fácil pre-automation timing!
  const [hourlyCost, setHourlyCost] = useState<number>(18);

  // ROI Calculations
  const hoursWastedPerMonth = Math.round((ordersPerWeek * 4.33 * minutesPerOrder) / 60);
  const moneyWastedPerYear = Math.round((ordersPerWeek * 52 * (minutesPerOrder / 60)) * hourlyCost);
  const workWeeksWastedPerYear = Math.round(((ordersPerWeek * 52 * minutesPerOrder) / 60) / 40);

  // Premium Access State
  const [membershipCode, setMembershipCode] = useState<string>("");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [unlockMessage, setUnlockMessage] = useState<string>("");

  // Dynamic Trained Agent Settings
  const [agentName, setAgentName] = useState("Agente CIO de IA & Director de Inteligencia Organizacional");
  const [agentTone, setAgentTone] = useState("Ejecutivo de taller, analítico de fricciones manuales, proactivo y muy enfocado a resultados de negocio");
  const [agentInstructions, setAgentInstructions] = useState("");
  const [agentSkills, setAgentSkills] = useState<any[]>([]);

  const loadAgentConfig = () => {
    setAgentName(localStorage.getItem("cio_agent_name") || "Agente CIO de IA & Director de Inteligencia Organizacional");
    setAgentTone(localStorage.getItem("cio_agent_tone") || "Ejecutivo de taller, analítico de fricciones manuales, proactivo y muy enfocado a resultados de negocio");
    setAgentInstructions(localStorage.getItem("cio_agent_instructions") || "");
    try {
      const savedCsv = localStorage.getItem("cio_agent_skills_csv");
      if (savedCsv) {
        setAgentSkills(JSON.parse(savedCsv));
      } else {
        setAgentSkills([
          { Habilidad: "Arquitectura de Soluciones con Modelos de IA", Categoria: "Sistemas Inteligentes", Impacto: "Recorte del 80% de tiempos de edición de planos." },
          { Habilidad: "Diseño de Sistemas MES y Flujos de Información", Categoria: "Operación de Taller", Impacto: "Control visual de stock y entregas fluidas en tabletas." },
          { Habilidad: "Automatización Operativa Avanzada de Datos", Categoria: "Manipulación de Datos", Impacto: "Suelda flujos inconexos mediante parseo dinámico de planillas y carga automatizada." }
        ]);
      }
    } catch {
      setAgentSkills([]);
    }
  };

  useEffect(() => {
    loadAgentConfig();
    window.addEventListener("cio_agent_updated", loadAgentConfig);
    return () => window.removeEventListener("cio_agent_updated", loadAgentConfig);
  }, []);

  // Consultant Form State
  const [clientCompany, setClientCompany] = useState<string>("");
  const [clientBizType, setClientBizType] = useState<string>("ecommerce");
  const [clientBottleneck, setClientBottleneck] = useState<string>("");
  const [clientWastedHours, setClientWastedHours] = useState<number>(15);
  const [clientTools, setClientTools] = useState<string>("");

  // Simulated AI Analyzer States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [auditResult, setAuditResult] = useState<any | null>(null);

  const handleScrollToContact = () => {
    const contactSection = document.querySelector("#contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Access code check handler
  const handleVerifyAccessCode = () => {
    const sanitized = membershipCode.trim().toUpperCase();
    if (sanitized === "SOCIOIA" || sanitized === "MOLDESTALLER" || sanitized === "MEMBRESIA2026") {
      setIsUnlocked(true);
      setUnlockMessage("¡Clave de Membresía validada con éxito! Has desbloqueado el Agente CIO Consultor ILIMITADO con soporte de API avanzada.");
    } else {
      setUnlockMessage("Clave incorrecta. Ponte en contacto para adquirir tu Membresía o utiliza la Demo gratuita de abajo.");
      setTimeout(() => setUnlockMessage(""), 4000);
    }
  };

  // Simulated deep AI processing cycle
  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setIsGenerating(false);
          // Build custom audit result structured executive report
          const savingsMoney = clientWastedHours * 52 * 20; // Opportunity value per hours wasted
          
          let tailoredSolutionText = "";
          let tailoredPhase1 = "";
          let tailoredPhase2 = "";
          let tailoredPhase3 = "";

          if (clientBizType === "ecommerce") {
            tailoredSolutionText = "Creación de un motor e-commerce autónomo desacoplado de licencias costosas, integrando almacenamiento ágil en la nube, procesamiento masivo por lotes de CSV estructurados y webhooks de órdenes en tiempo real.";
            tailoredPhase1 = "Mapear inventario y depurar base de datos legacy a una estructura relacional óptima.";
            tailoredPhase2 = "Desarrollar el script adaptador para procesar automáticamente catálogos masivos y subir imágenes a la nube.";
            tailoredPhase3 = "Conectar webhooks para automatizar confirmaciones de stock y pasarela de pago instantánea.";
          } else if (clientBizType === "taller") {
            tailoredSolutionText = "Estructura de un Sistema MES (Manufacturing Execution System) con pantallas simplificadas en tabletas para talleristas, parseador de archivos vectoriales para generar planos finales y reducción de clics operativos.";
            tailoredPhase1 = "Auditoría de tiempos de operarios en el traspaso de formatos industriales a hogareños.";
            tailoredPhase2 = "Montar el conversor de planos gráfico interactivo (repaginando automáticamente a A4/Carta).";
            tailoredPhase3 = "Implementar tablero Kanban digital para ordenar las asignaciones del taller según stock real de insumos.";
          } else if (clientBizType === "agencia") {
            tailoredSolutionText = "Arquitectura de procesos con bases de datos dinámicas con un motor de consultas optimizado con IA y automatización automatizada de reportería de clientes mediante plantillas digitales.";
            tailoredPhase1 = "Integrar tableros de gestión (ClickUp/Notion) mediante automatizaciones personalizadas (APIs).";
            tailoredPhase2 = "Programar el agente de pre-procesamiento de briefs que redacte los entregables iniciales.";
            tailoredPhase3 = "Configurar dashboard de valor percibido por clientes con sincronización automática.";
          } else {
            tailoredSolutionText = "Motor relacional a medida integrado con scripts de optimización diaria de datos y tableros auto-administrables adaptados a la operación real.";
            tailoredPhase1 = "Levantamiento de procesos redundantes de oficina (flujo As-Is).";
            tailoredPhase2 = "Programar microservicios livianos para automatizar la transferencia de archivos repetitivos.";
            tailoredPhase3 = "Capacitación interactiva del personal con documentación ágil y guías del simulador.";
          }

          setAuditResult({
            company: clientCompany || "Mi Proyecto / Taller",
            bizType: clientBizType,
            bottleneck: clientBottleneck || "Tareas manuales recurrentes de inventario y planos",
            wastedHours: clientWastedHours,
            tools: clientTools || "Planillas excel, cuadernos manuales y chats",
            isDemo: !isUnlocked,
            savings: savingsMoney,
            architecture: tailoredSolutionText,
            fases: [
              { title: "Fase 01: Estructuración & Depuración", desc: tailoredPhase1 },
              { title: "Fase 02: Motor de Automatización Sincrónica", desc: tailoredPhase2 },
              { title: "Fase 03: Control Visual de Entregas (Flujo MES)", desc: tailoredPhase3 }
            ]
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [isGenerating, clientBizType, clientCompany, clientBottleneck, clientWastedHours, clientTools, isUnlocked, agentName, agentTone, agentSkills]);

  // Handler to run audit demo
  const triggerAuditRun = () => {
    setIsGenerating(true);
    setGenerationStep(0);
    setAuditResult(null);
  };

  return (
    <section id="simulador" className="py-20 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block & Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-semibold block mb-2">
              HERRAMIENTA CLAVE DE CONSULTORÍA
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-brand-charcoal">
              Laboratorio Operativo: <span className="font-light italic text-stone-600 font-sans">Simula tu Impacto</span>
            </h2>
            <p className="font-sans text-sm text-brand-muted mt-2">
              Mide cuellos de botella reales o calcula el ROI exacto de digitalizar tus flujos manuales antes de programar una sola línea de código.
            </p>
          </div>

          {/* Premium Selector Tabs */}
          <div className="flex bg-stone-100 p-1 rounded-sm border border-stone-200 self-start md:self-auto shrink-0 font-mono text-[10px] font-bold">
            <button
              onClick={() => setActiveTab("diagnostico")}
              className={`px-4 py-2 rounded-xs transition-all cursor-pointer ${
                activeTab === "diagnostico"
                  ? "bg-brand-charcoal text-white shadow-xs"
                  : "text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              [ 01. DIAGNÓSTICO DE FLUIDEZ ]
            </button>
            <button
              onClick={() => setActiveTab("roi")}
              className={`px-4 py-2 rounded-xs transition-all cursor-pointer ${
                activeTab === "roi"
                  ? "bg-brand-charcoal text-white shadow-xs"
                  : "text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              [ 02. SIMULADOR ROI ]
            </button>
            <button
              onClick={() => setActiveTab("agente")}
              className={`px-4 py-2 rounded-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "agente"
                  ? "bg-brand-charcoal text-white shadow-xs"
                  : "text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              <Sparkles className="w-3 h-3 text-brand-accent animate-pulse" /> [ 03. CONSULTOR IA (MEMBRESÍA) ]
            </button>
          </div>
        </div>

        {activeTab === "diagnostico" ? (
          /* SECTION 1: INTERACTIVE SCENARIOS DIAGNOSTIC */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch animate-fadeIn">
            
            {/* Question List (Left Column 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-start gap-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted font-bold block mb-1">
                ¿CUÁL ES EL PROBLEMA PRINCIPAL DE TU NEGOCIO?
              </span>

              {INTERACTIVE_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  id={`scen-selector-${scenario.id}`}
                  onClick={() => setSelectedScenarioId(scenario.id)}
                  className={`w-full text-left p-5 rounded-sm border transition-all duration-300 flex items-start gap-4 cursor-pointer relative ${
                    selectedScenarioId === scenario.id
                      ? "bg-brand-charcoal text-[#fbfbf9] border-brand-charcoal shadow-lg"
                      : "bg-white text-stone-800 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  {/* Active arrow */}
                  {selectedScenarioId === scenario.id && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-3 h-3 bg-brand-charcoal rotate-45 hidden lg:block" />
                  )}

                  <div className="shrink-0 mt-1">
                    <HelpCircle className={`w-5 h-5 ${
                      selectedScenarioId === scenario.id ? "text-brand-accent-light" : "text-brand-accent"
                    }`} />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-sans text-xs leading-relaxed font-semibold">
                      {scenario.businessNeed}
                    </p>
                  </div>
                </button>
              ))}

              <div className="bg-brand-accent-light/40 border border-brand-accent/10 p-5 rounded-xs mt-4">
                <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider block font-bold mb-1">
                  ¿Tienes un problema diferente?
                </span>
                <p className="font-sans text-xs text-brand-muted">
                  Agenda una sesión exploratoria gratuita de 20 minutos y mapeemos el flujo inicial juntos. No te venderé código vacío.
                </p>
              </div>
            </div>

            {/* Solutions display board (Right Column 7 cols) */}
            <div className="lg:col-span-7 bg-white border border-stone-200 rounded-sm shadow-xl p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">
              
              {/* Ambient indicator */}
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Activity className="w-48 h-48 text-brand-accent" />
              </div>

              <div className="space-y-6 relative z-10 animate-fadeIn">
                
                {/* Solution title */}
                <div className="border-b border-stone-100 pb-5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand-accent-light text-brand-accent text-[9px] font-mono rounded-full font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-2.5 h-2.5" /> RECOMENDACIÓN DIGITAL
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-brand-charcoal">
                    {activeScenario.solutionTitle}
                  </h3>
                </div>

                {/* Proposal approach description */}
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] text-brand-muted uppercase tracking-wider font-extrabold block">
                    CÓMO ABORDARÍAMOS EL RETO:
                  </h4>
                  <p className="font-sans text-sm text-stone-700 leading-relaxed font-medium">
                    {activeScenario.approachText}
                  </p>
                </div>

                {/* Skill Synergy Breakdown */}
                <div className="space-y-4 pt-4">
                  <h4 className="font-mono text-[10px] text-brand-muted uppercase tracking-wider font-extrabold block">
                    LA SINERGIA DE MIS CAPACIDADES EN ACCIÓN:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeScenario.appliedSkills.map((sk, index) => (
                      <div key={index} className="bg-brand-gray-light p-4 rounded-xs border border-stone-200/50 space-y-1">
                        <span className="font-mono text-[9px] text-brand-accent font-bold uppercase tracking-wider block">
                          {sk.category}
                        </span>
                        <p className="font-sans text-[11px] text-brand-muted leading-relaxed">
                          {sk.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Impact block */}
              <div className="bg-brand-charcoal text-[#fbfbf9] p-5 rounded-sm mt-8 relative z-10">
                <span className="font-mono text-[8px] tracking-wider text-brand-accent-light uppercase font-bold block mb-1">
                  FILOSOFÍA DE RETORNO (ROI):
                </span>
                <p className="font-sans text-xs italic m-0 font-medium">
                  {activeScenario.impactQuote}
                </p>
              </div>

            </div>

          </div>
        ) : activeTab === "roi" ? (
          /* SECTION 2: INTERACTIVE ROI SIMULATOR WORKSHEET */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch animate-fadeIn">
            
            {/* Simulation Sliders (Left Column 5 cols) */}
            <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-sm shadow-sm space-y-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent font-extrabold block mb-4 border-b border-stone-150 pb-2">
                  PARÁMETROS DE TU OPERACIÓN MANUAL
                </span>

                {/* Slider 1: Tasks / Orders per week */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-semibold text-brand-charcoal">Tareas o pedidos manuales a la semana:</span>
                    <span className="font-mono font-bold text-brand-accent bg-brand-accent-light px-2 py-0.5 rounded-sm">
                      {ordersPerWeek} unidades
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={ordersPerWeek}
                    onChange={(e) => setOrdersPerWeek(Number(e.target.value))}
                    className="w-full accent-brand-accent cursor-pointer"
                  />
                  <p className="font-sans text-[10px] text-brand-muted italic leading-tight">
                    Ej. Pedidos de moldes, sincronización manual de catálogos, registros manuales.
                  </p>
                </div>

                {/* Slider 2: Manual wasted minutes per task */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-semibold text-brand-charcoal">Tiempo desperdiciado por tarea:</span>
                    <span className="font-mono font-bold text-brand-accent bg-brand-accent-light px-2 py-0.5 rounded-sm">
                      {minutesPerOrder} minutos
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={minutesPerOrder}
                    onChange={(e) => setMinutesPerOrder(Number(e.target.value))}
                    className="w-full accent-brand-accent cursor-pointer"
                  />
                  <p className="font-sans text-[10px] text-brand-muted italic leading-tight">
                    💡 <strong className="text-brand-charcoal">Nota Histórica:</strong> En Moldes Fácil promediábamos <strong>25 min</strong> adaptando cada plano técnico antes de automatizarlo.
                  </p>
                </div>

                {/* Slider 3: Hourly opportunity Cost */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-semibold text-brand-charcoal">Costo hora estimado del operario (o tu tiempo):</span>
                    <span className="font-mono font-bold text-brand-accent bg-brand-accent-light px-2 py-0.5 rounded-sm">
                      ${hourlyCost} USD / hr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="150"
                    step="2"
                    value={hourlyCost}
                    onChange={(e) => setHourlyCost(Number(e.target.value))}
                    className="w-full accent-brand-accent cursor-pointer"
                  />
                  <p className="font-sans text-[10px] text-brand-muted italic leading-tight">
                    Considera tanto el salario del tallerista como el costo de oportunidad de tu tiempo perdido.
                  </p>
                </div>
              </div>

              {/* Informative advice */}
              <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-xs mt-4">
                <span className="font-mono text-[9px] text-[#2c3e50] uppercase tracking-wider block font-black mb-1">
                  💡 LA PREMISA INDUSTRIAL
                </span>
                <p className="font-sans text-[11px] text-[#555] leading-relaxed">
                  Las pérdidas hormiga son las más peligrosas para los talleres y e-commerce. Automatizar la manipulación de datos repetitivos genera retornos inmediatos y libera capacidad para escalar tus ventas un 3x.
                </p>
              </div>
            </div>

            {/* Simulation Results (Right Column 7 cols) */}
            <div className="lg:col-span-7 bg-brand-charcoal border border-stone-850 text-white rounded-sm shadow-xl p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">
              
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Activity className="w-48 h-48 text-brand-accent-light" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="border-b border-stone-800 pb-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand-accent/20 border border-brand-accent/25 text-brand-accent text-[9px] font-mono rounded-full font-bold uppercase tracking-wider mb-2">
                    <Clock className="w-2.5 h-2.5" /> REPORTE DE INEFICIENCIA ACTIVA
                  </span>
                  <h3 className="font-display text-2xl font-black tracking-tight text-[#fbfbf9]">
                    Diagnóstico de Pérdidas por Fricción Manual
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Monthly Wasted Hours */}
                  <div className="bg-stone-900 border border-stone-800 p-5 rounded-xs space-y-1">
                    <span className="text-stone-450 font-mono text-[9px] uppercase tracking-widest block font-bold">
                      HORAS PERDIDAS AL MES
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-3xl font-extrabold text-[#fbfbf9] tracking-tight">{hoursWastedPerMonth}</span>
                      <span className="text-stone-400 text-xs font-mono">horas / mes</span>
                    </div>
                    <p className="font-sans text-[10px] text-stone-400 pt-1 border-t border-stone-800/40">
                      Equivale a regalar aproximadamente <strong className="text-brand-accent">{workWeeksWastedPerYear} semanas completas</strong> de trabajo puro al año en tareas repetitivas de oficina.
                    </p>
                  </div>

                  {/* Yearly Financial Waste */}
                  <div className="bg-stone-900 border border-stone-800 p-5 rounded-xs space-y-1">
                    <span className="text-stone-450 font-mono text-[9px] uppercase tracking-widest block font-bold">
                      CAPITAL ANUAL DESPERDICIADO
                    </span>
                    <div className="flex items-baseline gap-1 text-brand-accent">
                      <span className="font-display text-3xl font-extrabold tracking-tight">${moneyWastedPerYear.toLocaleString()}</span>
                      <span className="text-stone-400 text-xs font-mono">USD / año</span>
                    </div>
                    <p className="font-sans text-[10px] text-stone-400 pt-1 border-t border-stone-800/40">
                      Dinero perdido en clics redundantes, formateos manuales y correcciones de errores que un software automatizado a medida ejecuta a costo marginal cero.
                    </p>
                  </div>
                </div>

                {/* Automation Promise */}
                <div className="bg-stone-900/60 border border-stone-800 p-5 rounded-xs space-y-2 mt-4">
                  <span className="font-mono text-[9px] text-brand-accent uppercase tracking-widest block font-extrabold">
                    PROPUESTA OPERATIVA EN DIGITAL PRODUCT
                  </span>
                  <p className="font-sans text-xs text-stone-300 leading-relaxed">
                    Al igual que la <strong className="text-[#fbfbf9]">APP Printer en Moldes Fácil</strong>, estructuramos un sistema que procese los CSVs de tu catálogo, asocie imágenes en la nube de forma autónoma y reduzca el tiempo administrativo a <strong>segundos por orden de taller (MES)</strong>. El retorno de inversión de este desarrollo ronda los <strong>3 meses o menos</strong>.
                  </p>
                </div>
              </div>

              {/* Dynamic Call to Action */}
              <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs">
                  <span className="font-mono text-brand-accent font-bold uppercase tracking-wider block text-[9.5px]">¿Listo para automatizar esta brecha?</span>
                  <p className="text-stone-450 font-sans text-[11px]">Diseñemos tu software a medida con este análisis de ROI incrustado.</p>
                </div>
                <button
                  onClick={handleScrollToContact}
                  className="bg-brand-accent text-white hover:bg-[#ff8f59] px-4 py-2.5 rounded-xs text-[10px] font-mono uppercase tracking-wider font-extrabold transition-all duration-300 flex items-center gap-1.5 shadow-md hover:shadow-brand-accent/20 cursor-pointer text-center"
                >
                  [ RECUPERAR MIS HORAS ] <ArrowUpRight className="w-3.5 h-3.5 animate-pulse" />
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* SECTION 3: AGENTE CONSULTOR IA (MEMBRESÍA) */
          <div className="space-y-12 animate-fadeIn">
            {/* Top informational / unlock row */}
            <div className="bg-white border border-stone-250 p-6 rounded-sm shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1 max-w-xl">
                <span className="font-mono text-[9px] text-brand-accent uppercase tracking-widest font-black flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-brand-accent" /> PANEL DE AUDITORÍA PREMIUM
                </span>
                <p className="font-sans text-xs text-brand-muted leading-relaxed">
                  Para conectar tus flujos reales (ClickUp, ERPs, APIs) e integrar un Agente IA configurado a medida de tu equipo, activa tu membresía de consultoría. Introduce tu clave privada o prueba libremente el <strong className="text-brand-charcoal">modo sandbox demostrativo</strong> para diseñar tu arquitectura operativa To-Be al instante.
                </p>
              </div>

              {/* Password entrance */}
              <div className="w-full md:w-auto shrink-0 flex flex-col gap-1.5 self-stretch sm:self-auto">
                <label className="font-mono text-[9px] text-[#444] uppercase font-bold">INTRODUCIR CLAVE DE SOCIO:</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Ej. SOCIOIA"
                    value={membershipCode}
                    onChange={(e) => setMembershipCode(e.target.value)}
                    className="bg-brand-gray-light border border-stone-250 text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal w-32 focus:border-brand-accent placeholder:text-stone-400 font-mono"
                  />
                  <button
                    onClick={handleVerifyAccessCode}
                    className="bg-brand-charcoal text-white hover:bg-brand-accent px-4 py-2 text-[10px] font-mono tracking-wider transition-colors uppercase font-extrabold cursor-pointer rounded-xs"
                  >
                    VALIDAR
                  </button>
                </div>
                {unlockMessage && (
                  <p className="font-sans text-[10px] text-brand-accent max-w-xs leading-tight animate-pulse">
                    {unlockMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Main Interactive Sandbox Board */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Form Input block (Left 5 Cols) */}
              <div className="lg:col-span-12 xl:col-span-5 bg-white border border-stone-200 p-6 rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-5">
                  <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#2c3e50] font-black block border-b border-stone-150 pb-2 border-dashed">
                    📋 DATOS DEL PROBLEMA OPERATIVO
                  </span>

                  {/* Field 1: Company Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-semibold text-brand-charcoal">Nombre de tu Empresa / Marca:</label>
                    <input
                      type="text"
                      placeholder="Ej. Taller Metalúrgico González"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full bg-brand-gray-light border border-stone-250 text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal focus:border-brand-accent placeholder:text-stone-400"
                    />
                  </div>

                  {/* Field 2: Business Type Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-semibold text-brand-charcoal font-medium">Tipo de Operación:</label>
                    <select
                      value={clientBizType}
                      onChange={(e) => setClientBizType(e.target.value)}
                      className="w-full bg-brand-gray-light border border-stone-250 text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal focus:border-brand-accent"
                    >
                      <option value="ecommerce">E-commerce / Ventas Masivas</option>
                      <option value="taller">Taller Físico o Manufactura bajo demanda</option>
                      <option value="agencia">Agencia de Servicios / Consultoría</option>
                      <option value="otro">Otro Flujo de Trabajo</option>
                    </select>
                  </div>

                  {/* Field 3: Bottleneck Text Area */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-sans font-semibold text-brand-charcoal">¿Cuál es la ineficiencia manual recurrente?</label>
                      <span className="font-mono text-[8px] text-brand-accent uppercase font-bold">[ DOLOR CLAVE ]</span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Ej. 'Un operario tarda 25 minutos repaginando PDFs pesados de planos y cambiándole el tamaño de escala a mano para que la impresora doméstica pueda asimilarlos.'"
                      value={clientBottleneck}
                      onChange={(e) => setClientBottleneck(e.target.value)}
                      className="w-full bg-brand-gray-light border border-stone-250 text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal focus:border-brand-accent placeholder:text-stone-400 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Field 4: Sliders for Wasted Hours weekly */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans font-semibold text-brand-charcoal">Horas perdidas a la semana por operarios:</span>
                      <span className="font-mono font-bold text-brand-accent bg-brand-accent-light px-2 py-0.5 rounded-sm">
                        {clientWastedHours} hr / sem
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="80"
                      step="2"
                      value={clientWastedHours}
                      onChange={(e) => setClientWastedHours(Number(e.target.value))}
                      className="w-full accent-brand-accent cursor-pointer"
                    />
                  </div>

                  {/* Field 5: Current Tools utilized */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-semibold text-brand-charcoal">Herramientas o planillas actuales:</label>
                    <input
                      type="text"
                      placeholder="Ej. Excel, WhatsApp, Google Drive, Shopify"
                      value={clientTools}
                      onChange={(e) => setClientTools(e.target.value)}
                      className="w-full bg-brand-gray-light border border-stone-250 text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal focus:border-brand-accent placeholder:text-stone-400"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-150 mt-6 space-y-3">
                  <button
                    onClick={triggerAuditRun}
                    disabled={isGenerating || !clientBottleneck}
                    className="w-full bg-brand-accent hover:bg-[#ff8f59] disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs font-mono uppercase tracking-wider font-extrabold py-3 px-4 rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {!isUnlocked && <Lock className="w-3.5 h-3.5" />}
                    [ {isGenerating ? "PROCESANDO MAPEO..." : isUnlocked ? "GENERAR CONEXIÓN IA DIRECTA" : "PROBAR DEMO DEL AGENTE" } ]
                  </button>

                  <p className="font-sans text-[10px] text-[#777] text-center italic">
                    {isUnlocked 
                      ? "⚡ Licencia de Membresía Activa: Conectando vía API con directivas de Ingeniería de Prompt completas."
                      : "💡 Modo de demostración Sandbox activo: Heurísticas reales de automatización configuradas."}
                  </p>
                </div>
              </div>

              {/* Loader or Custom Audit Document Board (Right 7 Cols) */}
              <div className="lg:col-span-12 xl:col-span-7 bg-brand-charcoal border border-stone-850 text-white rounded-sm shadow-xl p-6 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
                
                {/* Background ambient mesh */}
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Terminal className="w-56 h-56 text-brand-accent-light" />
                </div>

                {isGenerating ? (
                  /* LOADER WORKSPACE */
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6 animate-pulse">
                    <div className="w-16 h-16 rounded-full border-4 border-brand-accent border-t-transparent animate-spin flex items-center justify-center">
                      <Terminal className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono text-brand-accent text-xs tracking-widest font-black uppercase">
                        [ ESCANEANDO SISTEMAS DE INFORMACIÓN ]
                      </span>
                      <p className="font-sans text-xs text-stone-300 max-w-sm">
                        {generationStep === 0 && "Mapeando fricciones operativas detectadas..."}
                        {generationStep === 1 && "Correlacionando con soluciones del catálogo industrial..."}
                        {generationStep === 2 && "Estructurando arquitectura relacional y flujo To-Be..."}
                        {generationStep === 3 && "Compilando reporte de mentoría..."}
                      </p>
                    </div>
                    {/* Retro progress bar */}
                    <div className="w-full max-w-xs bg-stone-900 h-2 rounded-full overflow-hidden border border-stone-800">
                      <div 
                        className="bg-brand-accent h-full transition-all duration-300"
                        style={{ width: `${(generationStep + 1) * 25}%` }}
                      ></div>
                    </div>
                  </div>
                ) : auditResult ? (
                  /* GENERATED EXECUTIVE AUDIT REPORT DOCUMENT */
                  <div className="flex-1 flex flex-col justify-between space-y-6 animate-fadeIn">
                    <div className="space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-stone-800 pb-4">
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand-accent/20 border border-brand-accent/25 text-brand-accent text-[9px] font-mono rounded-full font-bold uppercase tracking-wider mb-2">
                            <ShieldCheck className="w-3 h-3" /> AUDITORÍA PRE-SISTEMA COMPLETADA
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl font-black text-[#fbfbf9] tracking-tight">
                            Reporte Estratégico: {auditResult.company}
                          </h3>
                        </div>
                        <div className="font-mono text-[9.5px] bg-stone-900 border border-stone-800 text-stone-400 px-3.5 py-2 rounded-sm text-center">
                          Ahorro Estimado<br/>
                          <strong className="text-brand-accent text-xs">${auditResult.savings.toLocaleString()} USD/año</strong>
                        </div>
                      </div>

                      {/* Cognitive Trained Agent Core Analysis */}
                      <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs space-y-2 mt-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-[9.5px] font-mono uppercase text-stone-400">
                          <span className="flex items-center gap-1 text-brand-accent font-bold">🧠 MODELO COGNITIVO ACTIVADO</span>
                          <span className="text-stone-300 font-semibold">{agentName}</span>
                        </div>
                        <p className="font-sans text-[11.5px] text-stone-300 leading-relaxed">
                          La simulación ha asimilado las directrices operativas definidas en la personalidad: <strong className="text-[#fbfbf9]">"{agentTone}"</strong>.
                        </p>
                        {agentSkills && agentSkills.length > 0 && (
                          <div className="pt-2 border-t border-stone-800/60 space-y-1.5">
                            <span className="text-[9px] font-mono text-brand-accent uppercase block tracking-wider font-bold">
                              [ COMPETENCIAS RELEVANTES APLICADAS DESDE TU CSV ]
                            </span>
                            <div className="flex flex-col gap-1">
                              {agentSkills.slice(0, 3).map((skill: any, idx: number) => {
                                const skillName = skill.Habilidad || skill.Competencia || skill.habilidad || (typeof skill === 'object' ? Object.values(skill)[0] : '');
                                const category = skill.Categoría || skill.Categoria || skill.categoria || (typeof skill === 'object' ? Object.values(skill)[1] : '');
                                const impact = skill.Impacto || skill.impacto || (typeof skill === 'object' ? Object.values(skill)[2] : '');
                                return (
                                  <div key={idx} className="bg-stone-950 p-2 rounded-xs border border-stone-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                                    <div className="space-y-0.5">
                                      <span className="text-[10px] font-mono font-bold text-[#fbfbf9] block">⚙️ {String(skillName)}</span>
                                      {category && <span className="text-[8.5px] font-mono text-stone-500 uppercase block">{String(category)}</span>}
                                    </div>
                                    {impact && <span className="text-[9.5px] font-sans text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-sm border border-brand-accent/15">{String(impact)}</span>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {agentInstructions && (
                          <div className="pt-2 border-t border-stone-800/60">
                            <span className="text-[8.5px] font-mono text-stone-500 uppercase block tracking-wider mb-1">[ DIRECTRICES ADICIONALES DE PERSONALIDAD ]</span>
                            <p className="text-[10.5px] font-sans text-stone-400 italic line-clamp-2 leading-relaxed">"{agentInstructions}"</p>
                          </div>
                        )}
                      </div>

                      {/* Architecture Block */}
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] uppercase text-stone-450 font-extrabold tracking-widest block">
                          [ ARQUITECTURA DIGITAL TO-BE RECOMENDADA ]
                        </span>
                        <p className="font-sans text-xs text-stone-200 leading-relaxed font-semibold">
                          {auditResult.architecture}
                        </p>
                      </div>

                      {/* Process Plan Phases */}
                      <div className="space-y-3 pt-2">
                        <span className="font-mono text-[9px] uppercase text-stone-450 font-extrabold tracking-widest block">
                          [ PLAN INTEGRAL DE TRASPASO EN 3 FASES ]
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {auditResult.fases.map((f: any, idx: number) => (
                            <div key={idx} className="bg-stone-900/80 border border-stone-800 p-3 rounded-xs space-y-1.5">
                              <span className="font-mono text-[8.5px] text-brand-accent font-black tracking-wider block uppercase">
                                {f.title}
                              </span>
                              <p className="font-sans text-[10px] text-stone-300 leading-relaxed">
                                {f.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mentorship Integration block */}
                      <div className="bg-stone-900/60 border border-brand-accent/15 rounded-xs p-4 space-y-1.5">
                        <span className="font-mono text-[8.5px] text-brand-accent font-black tracking-widest block uppercase">
                          🧩 LA SINERGIA CLAVE DE LA MEMBRESÍA + MENTORÍA
                        </span>
                        <p className="font-sans text-[11px] text-stone-300 leading-relaxed italic">
                          "La IA proporciona la lógica base del software, pero el éxito real del taller radica en el acompañamiento. En mi membresía, yo actúo como tu enlace técnico: validamos la subida de datos por CSV, capacitamos a tu operario estrella para usar el panel en tabletas y refinamos el flujo visual hasta recortar el 100% de la carga administrativa. Esa mentoría humana de campo es el verdadero diferenciador comercial."
                        </p>
                      </div>
                    </div>

                    {/* Report action trigger */}
                    <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <div className="text-xs">
                        <span className="font-mono text-brand-accent text-[9.5px] font-bold uppercase tracking-wider block">¿Listo para ejecutar esta sinergia de taller con un experto?</span>
                        <p className="text-stone-400 font-sans text-[10.5px]">Podemos agendar una llamada operativa y detallarla de extremo a extremo.</p>
                      </div>
                      <button
                        onClick={handleScrollToContact}
                        className="bg-brand-accent hover:bg-[#ff8f59] text-white font-mono text-[9.5px] font-bold uppercase tracking-wider py-2.5 px-4.5 rounded-xs transition-colors cursor-pointer text-center"
                      >
                        [ AGENDAR SESIÓN OPERATIVA ]
                      </button>
                    </div>

                  </div>
                ) : (
                  /* EMPTY INITIAL PORTAL VIEW */
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-5 animate-fadeIn">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20 animate-pulse">
                      <Terminal className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div className="space-y-1.5 text-center">
                      <h4 className="font-display text-sm text-[#fbfbf9] font-bold uppercase tracking-tight">
                        Consola: {agentName}
                      </h4>
                      <p className="font-sans text-stone-400 max-w-xs leading-relaxed mx-auto text-[11px]">
                        Entrenado con directrices de personalidad <strong>"{agentTone}"</strong>. Completa los datos a la izquierda para simular mejoras operativas en tiempo real.
                      </p>
                    </div>
                    <div className="text-[9px] font-mono bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xs text-brand-accent inline-block uppercase tracking-wider">
                      🔒 STATUS: {agentSkills && agentSkills.length ? `${agentSkills.length} Habilidades` : "Matriz de Directivas"} cargadas desde el CSV
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
