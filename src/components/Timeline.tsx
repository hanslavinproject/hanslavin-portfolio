import { useState } from "react";
import { TIMELINE } from "../data";
import { Music, Briefcase, Award, Cpu, ChevronRight, Zap } from "lucide-react";

const getIcon = (name: string) => {
  switch (name) {
    case "Music":
      return <Music className="w-5 h-5 text-brand-accent" />;
    case "Briefcase":
      return <Briefcase className="w-5 h-5 text-brand-accent" />;
    case "Award":
      return <Award className="w-5 h-5 text-brand-accent" />;
    case "Cpu":
      return <Cpu className="w-5 h-5 text-brand-accent" />;
    default:
      return <ChevronRight className="w-5 h-5 text-brand-accent" />;
  }
};

export default function Timeline() {
  const [activeStage, setActiveStage] = useState<number>(3); // Set current stage (IA stage) as default active

  return (
    <section id="trayectoria" className="py-20 bg-brand-gray-light border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-semibold block mb-2">
              SÍNDROME DEL IMPOSTOR: ADIÓS
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-brand-charcoal">
              La Ruta Autodidacta: <span className="font-light italic text-stone-600 block sm:inline">Del Ritmo al Código</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-sm text-brand-muted leading-relaxed">
              La universidad enseña a seguir manuales preestablecidos. El emprendimiento salvaje enseña a escribir las reglas del juego mientras resuelves fugas de caja. Conócelas a fondo haciendo clic en cada era.
            </p>
          </div>
        </div>

        {/* Timeline Desktop & Mobile Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Milestone List (Left 6 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            {TIMELINE.map((event, index) => (
              <button
                key={event.year}
                type="button"
                id={`timeline-btn-${index}`}
                onClick={() => setActiveStage(index)}
                className={`w-full text-left p-5 rounded-sm border transition-all duration-300 flex gap-4 cursor-pointer relative items-start ${
                  activeStage === index
                    ? "bg-white border-brand-accent/50 shadow-md translate-x-2"
                    : "bg-stone-50 border-stone-200 hover:border-stone-300 hover:bg-stone-100/50"
                }`}
              >
                {/* Active marker left border Accent */}
                {activeStage === index && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-brand-accent rounded-l-xs" />
                )}

                <div className="p-3.5 bg-brand-beige border border-stone-200/60 rounded-xs shrink-0">
                  {getIcon(event.iconName)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold tracking-widest text-brand-accent uppercase bg-brand-accent-light/60 px-1.5 py-0.5 rounded-xs">
                      {event.year}
                    </span>
                  </div>
                  <h3 className="font-display text-md font-bold text-brand-charcoal">
                    {event.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-muted">
                    {event.label}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Deep-Dive Details Canvas (Right 7 columns) */}
          <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-sm p-6 md:p-10 shadow-lg min-h-[420px] flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header inside details */}
              <div className="border-b border-stone-100 pb-5">
                <span className="font-mono text-[10px] text-brand-accent font-semibold tracking-widest block uppercase mb-1">
                  DETALLES DE LA ERA · {TIMELINE[activeStage].year}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-brand-charcoal">
                  {TIMELINE[activeStage].title}
                </h3>
                <p className="font-sans text-sm text-brand-accent italic mt-1 font-medium">
                  "{TIMELINE[activeStage].label}"
                </p>
              </div>

              {/* Description */}
              <p className="font-sans text-sm md:text-base text-brand-charcoal/85 leading-relaxed">
                {TIMELINE[activeStage].description}
              </p>

              {/* Bullets */}
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-brand-muted font-bold block">
                  Logros, Aprendizajes &amp; Fortalezas Claves:
                </h4>
                <ul className="grid grid-cols-1 gap-2.5">
                  {TIMELINE[activeStage].details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex gap-2.5 items-start text-xs text-brand-muted leading-relaxed">
                      <Zap className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5 mt-1" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Strategic takeaway */}
            <div className="bg-brand-gray-light p-4 border border-stone-200 rounded-xs mt-8">
              <span className="font-mono text-[9px] font-bold text-brand-charcoal uppercase block mb-1">
                La Conexión con mi servicio actual:
              </span>
              <p className="font-sans text-xs text-brand-muted italic m-0">
                {activeStage === 0 && "Tolerancia a la frustración extrema y capacidad de captar la atención de audiencias, aplicadas al marketing digital y copywriting persuasivo."}
                {activeStage === 1 && "Entiendo el dolor de cabeza de la facturación, ventas y deudas. No creo tecnología bonita que no resuelva un cuello de botella logístico."}
                {activeStage === 2 && "Mezclé la experiencia empírica con metodologías estructuradas (ClickUp, flujos, Agile). Planifico con precisión matemática antes de disparar campañas."}
                {activeStage === 3 && "Evolucioné. Apalanco software e Inteligencia Artificial para construir prototipos y robustecer tiendas en horas lo que antes costaba meses."}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
