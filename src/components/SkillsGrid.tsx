import { SKILL_CATEGORIES } from "../data";
import { Layers, Megaphone, Cpu, ShoppingBag, Check } from "lucide-react";

const getIcon = (name: string) => {
  switch (name) {
    case "Layers":
      return <Layers className="w-5 h-5 text-brand-accent" />;
    case "Megaphone":
      return <Megaphone className="w-5 h-5 text-brand-accent" />;
    case "Cpu":
      return <Cpu className="w-5 h-5 text-brand-accent" />;
    case "ShoppingBag":
      return <ShoppingBag className="w-5 h-5 text-brand-accent" />;
    default:
      return <Check className="w-5 h-5 text-brand-accent" />;
  }
};

export default function SkillsGrid() {
  return (
    <section id="habilidades" className="py-20 bg-brand-gray-light border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-semibold block mb-2">
              MI CAJA DE HERRAMIENTAS
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-brand-charcoal">
              La combinación de un perfil híbrido <span className="font-light italic text-stone-600">multi-disciplinar</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-sm text-brand-muted leading-relaxed">
              No compito con desarrolladores de algoritmos teorizados de laboratorio científico. Compito con soluciones orientadas a procesos que simplifican el día a día operativo y aceleran el valor de cara al cliente.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.title}
              id={`skills-bento-${idx}`}
              className="bg-white border border-stone-200 p-6 md:p-8 rounded-sm hover:shadow-xl hover:border-brand-accent/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                
                {/* Header Icon & Title */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-brand-accent-light/50 border border-brand-accent/10 rounded-sm group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                    {getIcon(cat.iconName)}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted font-bold">
                    CAPACIDAD {idx + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-md font-extrabold text-brand-charcoal group-hover:text-brand-accent transition-colors duration-200">
                    {cat.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-muted leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Sublist */}
                <div className="pt-4 border-t border-stone-100 space-y-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted block font-extrabold">
                    FORTALEZAS CLAVES:
                  </span>
                  <ul className="space-y-2">
                    {cat.skills.map((skill) => (
                      <li key={skill} className="flex gap-2 items-start text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                        <span className="font-sans font-medium">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Bottom contextual badge */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-brand-muted group-hover:text-brand-accent transition-colors duration-300">
                <span className="font-mono text-[9px] uppercase tracking-widest font-semibold">
                  Alineación Estratégica
                </span>
                <span className="font-sans text-xs font-semibold">→</span>
              </div>

            </div>
          ))}
        </div>

        {/* Humility & Transparency statement box */}
        <div className="mt-12 bg-white/70 border border-stone-200 rounded-xs p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-4 items-start max-w-3xl">
            <div className="p-2.5 bg-brand-accent-light text-brand-accent rounded-full shrink-0 font-display font-black text-sm">
              !?
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-brand-charcoal">
                ¿Qué NO ofrezco para no engañar a tu negocio?
              </h4>
              <p className="font-sans text-xs text-brand-muted mt-1 leading-relaxed">
                No realizo codificación profunda de bajo nivel (como optimizaciones C++, compiladores nativos o machine learning matemático). No vendo mentiras académicas. Todo desarrollo complejo que requiera código de extrema especialización matemática lo coordino guiando y liderando talentos específicos que traduzco para cuidar tu capital y paz de equipo.
              </p>
            </div>
          </div>
          <div className="shrink-0 bg-brand-charcoal hover:bg-brand-accent p-3 text-[#fbfbf9] rounded-xs font-mono text-[10px] tracking-wider uppercase font-semibold text-center select-none">
            Visión Honesta de Resultados
          </div>
        </div>

      </div>
    </section>
  );
}
