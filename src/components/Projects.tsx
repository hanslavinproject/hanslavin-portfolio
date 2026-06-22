import { useState } from "react";
import { Project } from "../types";
import { Cpu, ArrowRight, Laptop, CheckCircle2, ChevronRight, FileText, Database, Settings, Video, Image as ImageIcon, Play, X } from "lucide-react";

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

interface ProjectsProps {
  projects: Project[];
  onOpenAdmin: () => void;
}

export default function Projects({ projects, onOpenAdmin }: ProjectsProps) {
  const [activeProj, setActiveProj] = useState<string>(projects[0]?.id || "molde-facil");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const selectedProj = projects.find((p) => p.id === activeProj) || projects[0] || null;

  if (!selectedProj) {
    return (
      <section id="proyectos" className="py-20 bg-[#fbfbf9]">
        <div className="max-w-7xl mx-auto px-6 text-center py-12">
          <p className="text-brand-muted">No hay proyectos para mostrar. Abre el Panel Admin para agregar uno.</p>
          <button
            onClick={onOpenAdmin}
            className="mt-4 px-4 py-2 bg-brand-charcoal text-white hover:bg-brand-accent text-xs font-mono uppercase tracking-wider font-bold rounded-xs cursor-pointer"
          >
            Abrir Panel Admin
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="proyectos" className="py-20 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-semibold block mb-2">
              CASOS DE ÉXITO REALES
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-brand-charcoal">
              Soluciones que resuelven <span className="font-light italic text-stone-600">verdaderos dolores de cabeza</span>
            </h2>
            <p className="font-sans text-sm text-brand-muted mt-3 max-w-xl">
              Detrás de cada proyecto hay una empresa real con cuellos de botella de tiempo, conversión o logística. Aquí puedes ver cómo apliqué tecnología, datos y estrategia.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-accent-light hover:bg-brand-accent hover:text-white text-brand-accent border border-brand-accent/25 rounded-xs text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 animate-spin-slow" />
              Panel de Control (Admin)
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-stone-200 mb-12 overflow-x-auto gap-4 scrollbar-hidden">
          {projects.map((proj) => (
            <button
              key={proj.id}
              type="button"
              id={`tab-project-${proj.id}`}
              onClick={() => {
                setActiveProj(proj.id);
                setIsPlaying(false);
              }}
              className={`pb-4 text-left font-display font-bold text-md tracking-tight border-b-2 transition-all duration-300 shrink-0 cursor-pointer ${
                activeProj === proj.id
                  ? "border-brand-accent text-brand-charcoal"
                  : "border-transparent text-brand-muted hover:text-brand-charcoal hover:border-stone-300"
              }`}
            >
              {proj.title}
              <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-accent font-medium mt-0.5">
                {proj.badge || "Proyecto"}
              </span>
            </button>
          ))}
        </div>

        {/* Project Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Context Breakdown (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 animate-fadeIn">
            
            {/* Visual Case Block: Real images/videos dynamic high-performance play block */}
            <div className="w-full h-64 sm:h-96 rounded-xs overflow-hidden border border-stone-200/80 bg-stone-950 shadow-md relative group">
              {isPlaying && getYouTubeId(selectedProj.videoUrl) ? (
                <div className="w-full h-full relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedProj.videoUrl)}?autoplay=1&rel=0`}
                    title={`Video ${selectedProj.title}`}
                    className="w-full h-full absolute inset-0 rounded-xs border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 z-10 p-2 bg-brand-charcoal/90 text-white rounded-full hover:bg-brand-accent hover:scale-105 transition-all cursor-pointer flex items-center justify-center shadow-lg border border-stone-700"
                    title="Cerrar video"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  {selectedProj.imageUrl ? (
                    <img
                      src={selectedProj.imageUrl}
                      alt={selectedProj.title}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : getYouTubeId(selectedProj.videoUrl) ? (
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeId(selectedProj.videoUrl)}/hqdefault.jpg`}
                      alt={selectedProj.title}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center text-center p-6 text-brand-muted gap-2">
                      <ImageIcon className="w-8 h-8 stroke-[1.5] text-stone-400" />
                      <p className="font-sans text-xs">Este proyecto no tiene cargada una imagen de portada.</p>
                      <button
                        onClick={onOpenAdmin}
                        className="font-mono text-[10px] text-brand-accent font-bold hover:underline"
                      >
                        Asignar una en el Panel Admin
                      </button>
                    </div>
                  )}

                  {getYouTubeId(selectedProj.videoUrl) ? (
                    <div className="absolute inset-0 bg-brand-charcoal/35 flex flex-col items-center justify-center p-4 transition-all group-hover:bg-brand-charcoal/45">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="w-16 h-16 rounded-full bg-brand-accent text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                        title="Ver Video Demostración"
                      >
                        <Play className="w-7 h-7 fill-white translate-x-0.5" />
                      </button>
                      <span className="mt-3 font-mono text-[10px] text-white uppercase tracking-widest bg-brand-charcoal/85 px-3 py-1 rounded-full backdrop-blur-xs font-bold border border-white/10">
                        Reproducir Demo de App 🎥
                      </span>
                    </div>
                  ) : (
                    selectedProj.imageUrl && (
                      <div className="absolute bottom-4 left-4 bg-brand-charcoal/80 text-white font-mono text-[9px] uppercase tracking-wide px-3 py-1.5 rounded-sm backdrop-blur-xs flex items-center gap-1.5">
                        <ImageIcon className="w-3 h-3 text-brand-accent" />
                        Imagen real / Visual del Proyecto
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Video preview embed info line if present */}
            {selectedProj.videoUrl && (
              <div className="bg-brand-accent-light/40 border border-brand-accent/20 p-4 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-brand-accent shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold block text-brand-charcoal">Optimización de Velocidad Activa:</span>
                    <span className="text-brand-muted">
                      {getYouTubeId(selectedProj.videoUrl) 
                        ? "Este video de YouTube se precarga a pedido para no penalizar el rendimiento web del sitio."
                        : "Enlace externo de soporte comercial disponible para este caso."}
                    </span>
                  </div>
                </div>
                <a
                  href={selectedProj.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 font-mono text-[9px] uppercase font-bold text-white bg-brand-charcoal hover:bg-brand-accent px-3.5 py-2 rounded-xs transition-colors self-start sm:self-auto text-center"
                >
                  {getYouTubeId(selectedProj.videoUrl) ? "Ver en YouTube ↗" : "Navegar al Video ↗"}
                </a>
              </div>
            )}

            <div>
              <div className="inline-block px-2.5 py-0.5 bg-brand-accent-light text-brand-accent text-[11px] font-mono rounded-xs font-semibold uppercase tracking-wider mb-2">
                {selectedProj.badge || "Caso Activo"}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-brand-charcoal">
                {selectedProj.title}
              </h3>
              <p className="font-sans text-sm text-brand-accent italic mt-1 font-semibold uppercase tracking-widest text-[10px]">
                {selectedProj.type}
              </p>
            </div>

            <p className="font-sans text-stone-700 leading-relaxed text-sm">
              {selectedProj.description}
            </p>

            <div className="bg-white border border-stone-200 rounded-sm p-6 space-y-4">
              <h4 className="font-display text-sm font-bold text-brand-charcoal border-b border-stone-100 pb-2">
                La Arquitectura Operativa Implementada
              </h4>
              <p className="font-sans text-xs text-brand-muted leading-relaxed">
                {selectedProj.longDescription}
              </p>
            </div>

            {/* Timeline process flow inside project if Moldes Fácil */}
            {selectedProj.id === "molde-facil" && (
              <div className="bg-brand-gray-light p-5 border border-stone-200/60 rounded-xs space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent font-bold block">
                  FLUJO CRÍTICO DEL CONVERSOR DE ARCHIVOS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-brand-accent">01. Pedido Web</span>
                    <p className="font-sans text-[10px] text-brand-muted">El cliente final compra un molde digital en la tienda a medida moldesfacil.com.</p>
                  </div>
                  <div className="space-y-1 border-stone-200 sm:border-l sm:pl-3">
                    <span className="font-mono text-xs font-bold text-brand-accent">02. APP Printer</span>
                    <p className="font-sans text-[10px] text-brand-muted">La App Printer integrada procesa masivamente los datos del catálogo vía CSV.</p>
                  </div>
                  <div className="space-y-1 border-stone-200 sm:border-l sm:pl-3">
                    <span className="font-mono text-xs font-bold text-brand-accent">03. Repaginado</span>
                    <p className="font-sans text-[10px] text-brand-muted">Conversor inteligente divide el trazo de Plotter a hojas A4.</p>
                  </div>
                  <div className="space-y-1 border-stone-200 sm:border-l sm:pl-3">
                    <span className="font-mono text-xs font-bold text-brand-accent">04. MES Taller</span>
                    <p className="font-sans text-[10px] text-brand-muted">El operario textil imprime y empaca con cero manipulación.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bullet achievements */}
            <div className="space-y-3">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-muted font-bold block">
                LOGROS DIRECTOS DEL PROYECTO:
              </h4>
              <ul className="grid grid-cols-1 gap-2.5">
                {selectedProj.achievements.map((ach, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs text-brand-charcoal font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Project Side Summary Sheet (5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-sm p-6 md:p-8 shadow-md space-y-6">
            
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">
                MI ROL EN EL PROYECTO
              </span>
              <p className="font-display text-md font-bold text-brand-charcoal">
                {selectedProj.role}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-100">
              <span className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">
                TECNOLOGÍAS &amp; ENFOQUE APLICADO
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProj.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2.5 py-1 bg-brand-gray-light text-brand-charcoal border border-stone-200/50 rounded-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-brand-accent/[0.03] border border-brand-accent/15 rounded-xs p-4 pt-4 border-t border-stone-100 space-y-2">
              <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider font-bold block">
                RESULTADO DEL NEGOCIO (IMPACTO)
              </span>
              <p className="font-sans text-xs text-brand-muted leading-relaxed font-semibold text-brand-charcoal">
                {selectedProj.outcomes}
              </p>
            </div>

            {/* Quote of wisdom */}
            <div className="pt-4 border-t border-stone-100 italic font-sans text-xs text-brand-muted">
              {selectedProj.id === "molde-facil" ? (
                "“La transformación digital no es programar un sistema millonario. Es sentarse, entender la limitación técnica de tu operario doméstico y traducir su dolor en un botón de un solo clic.”"
              ) : selectedProj.id === "miami-luxury" ? (
                "“En ventas de lujo, el desorden se paga caro. Una buena planificación establecida en ClickUp vale más que diez campañas de urgencia que desaniman al equipo.”"
              ) : (
                "“El principal error al encarar un proyecto técnico es querer automatizar lo que no se ha validado a mano todavía.”"
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
