import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import SkillsGrid from "./components/SkillsGrid";
import InteractiveDiagnostic from "./components/InteractiveDiagnostic";
import CotizadorPro from "./components/CotizadorPro";
import ContactForm from "./components/ContactForm";
import AdminPanel from "./components/AdminPanel";
import ClientPortal from "./components/ClientPortal";
import SubscriptionPlans from "./components/SubscriptionPlans";
import OfertaArranque from "./components/OfertaArranque";
import { Project } from "./types";
import { PROJECTS as DEFAULT_PROJECTS } from "./data";
import { Download, Sparkles, FileText, Award, Heart, CheckCircle2, Settings } from "lucide-react";

export default function App() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  
  // Custom interactive quote presets
  const [presetMessage, setPresetMessage] = useState("");
  const [presetCategory, setPresetCategory] = useState("");

  const handleApplyQuoteToForm = (message: string, category: string) => {
    setPresetMessage(message);
    setPresetCategory(category);
  };
  
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("portfolio_pmsolutions_custom_projects");
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch (e) {
      return DEFAULT_PROJECTS;
    }
  });

  const handleUpdateProjects = (updated: Project[]) => {
    setProjects(updated);
    try {
      localStorage.setItem("portfolio_pmsolutions_custom_projects", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hanslavinmusic@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="bg-[#fbfbf9] text-[#121314] min-h-screen selection:bg-brand-accent selection:text-white antialiased">
      {/* Sticky Premium Header */}
      <Header 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        onOpenClientPortal={() => setIsClientPortalOpen(true)} 
      />

      <main className="w-full">
        {/* Editorial Introductory Section */}
        <Hero />

        {/* Dynamic Timeline Section (Nonlinear trajectory) */}
        <Timeline />

        {/* Flagship Projects Cases studies block */}
        <Projects projects={projects} onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* Double Column Strategy Panel (Resume Download Simulation + Direct Value Proposition) */}
        <section className="py-16 bg-[#fbfbf9] border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-stone-200 rounded-sm p-6 md:p-12 shadow-sm">
              
              {/* Branding credentials Column Left (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-1.5 text-xs text-brand-accent font-semibold font-mono uppercase bg-brand-accent-light px-2.5 py-0.5 rounded-full select-none">
                  <Award className="w-3.5 h-3.5" /> CURRÍCULUM ESTRATÉGICO
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-brand-charcoal">
                  La síntesis de mis competencias listada para contratación
                </h3>
                <p className="font-sans text-sm text-brand-muted leading-relaxed">
                  ¿Necesitas compartir mi perfil con algún socio o departamento de recursos humanos? He sintetizado el análisis de ChatGPT y mis logros operativos en una tarjeta profesional elegante de presentación funcional.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex gap-2.5 items-start text-xs text-brand-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                    <span><strong>10 Años en Trincheras</strong>: Del arte de percusión independiente a sistemas MES de automatización.</span>
                  </div>
                  <div className="flex gap-2.5 items-start text-xs text-brand-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                    <span><strong>Traductor Técnico</strong>: Integro inteligencias artificiales para programar y acelerar flujos operativos.</span>
                  </div>
                  <div className="flex gap-2.5 items-start text-xs text-brand-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                    <span><strong>Valores Claras</strong>: No tolero ambientes conflictivos; priorizo la energía positiva grupal.</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    id="copy-email-btn"
                    onClick={handleCopyEmail}
                    className="px-5 py-3 bg-brand-charcoal text-[#fbfbf9] text-xs font-mono uppercase tracking-wider font-bold rounded-xs transition-colors duration-200 hover:bg-brand-accent cursor-pointer text-center"
                  >
                    {copiedEmail ? "[ Copiado a Papelera ]" : "Copiar: hanslavinmusic@gmail.com"}
                  </button>
                  <a
                    id="print-cv-trigger"
                    href="javascript:window.print();"
                    className="px-5 py-3 border border-stone-300 text-brand-charcoal hover:bg-stone-50 text-xs font-mono uppercase tracking-wider font-bold rounded-xs transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Imprimir / Guardar Portafolio
                  </a>
                </div>
              </div>

              {/* Simulated Elegant Physical Strategic Card (5 Cols) */}
              <div className="lg:col-span-5 bg-brand-gray-light p-6 md:p-8 rounded-sm border border-stone-200" id="tactical-resume-card">
                <div className="space-y-6">
                  <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                    <div>
                      <h4 className="font-display font-black text-md tracking-tight uppercase text-brand-charcoal">
                        Estrategia &amp; PM
                      </h4>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-brand-accent font-semibold">
                        Socio Digital Autónomo
                      </p>
                    </div>
                    <Sparkles className="w-5 h-5 text-brand-accent" />
                  </div>

                  {/* Core Value Statement */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#a8a89f] font-bold block">
                      PROPUESTA DE VALOR:
                    </span>
                    <p className="font-sans text-xs italic text-brand-charcoal font-medium leading-relaxed">
                      “Planifico procesos comerciales, diseño flujos e-commerce de alto volumen y utilizo Inteligencia Artificial para programar herramientas útiles en tiempo récord. No vendo líneas de código teóricas, vendo márgenes de liquidación.”
                    </p>
                  </div>

                  {/* Quick Skill Cloud */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#a8a89f] font-bold block">
                      FOCOS DE EXPERIENCIA:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      <span className="font-mono text-[9px] bg-white px-2 py-0.5 rounded-full border border-stone-200 text-brand-charcoal">
                        Project Management SENCE
                      </span>
                      <span className="font-mono text-[9px] bg-white px-2 py-0.5 rounded-full border border-stone-200 text-brand-charcoal">
                        E-commerce a Medida + CSV
                      </span>
                      <span className="font-mono text-[9px] bg-white px-2 py-0.5 rounded-full border border-stone-200 text-brand-charcoal">
                        Estrategia de Marketing
                      </span>
                      <span className="font-mono text-[9px] bg-white px-2 py-0.5 rounded-full border border-stone-200 text-brand-charcoal">
                        Soluciones con IA Generativa
                      </span>
                    </div>
                  </div>

                  {/* Footer Card */}
                  <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-[10px] text-brand-muted font-mono">
                    <span>VÍA CHATGPT &amp; SENCE</span>
                    <span className="text-brand-accent font-bold">10 DE LA RESILIENCIA</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Bento grid skills showcase */}
        <SkillsGrid />

        {/* Entry Offer - Kickstart Sprint */}
        <OfertaArranque />

        {/* Subscription plans and alliances segment */}
        <SubscriptionPlans onSelectPlan={(planName) => { setIsClientPortalOpen(true); }} />

        {/* Synergy tool and diagnostic playground */}
        <InteractiveDiagnostic />

        {/* Dynamic Project Quote Builder - Cotizador Pro */}
        <CotizadorPro onApplyQuoteToForm={handleApplyQuoteToForm} />

        {/* Secure vibe limits and interactive lead registry */}
        <ContactForm presetMessage={presetMessage} presetCategory={presetCategory} />
      </main>

      {/* Minimalism Fine Print Footer */}
      <footer id="main-footer" className="bg-[#121314] text-stone-500 border-t border-stone-850 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <span className="font-display font-black text-sm tracking-widest text-[#fbfbf9]">
              HANS LAVIN · Estratega Digital &amp; IA
            </span>
            <p className="font-sans text-[11px] text-stone-400">
              Transformando ideas complejas en sistemas tangibles sin moldes académicos tradicionales.
            </p>
          </div>
          
          <div className="text-center md:text-right space-y-1.5">
            <p className="font-mono text-[10px] uppercase text-stone-400">
              Santiago de Chile · Remoto Global
            </p>
            <p className="font-mono text-[10px]">
              &copy; {new Date().getFullYear()} · Hecho con orgullo e Inteligencia Artificial
            </p>
            <div>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-[10px] text-brand-accent hover:underline font-mono inline-flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer"
              >
                <Settings className="w-2.5 h-2.5" /> [ Consola de Administración ]
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Personal Admin Quick Access Button */}
      <div className="fixed bottom-6 right-6 z-[999] animate-fadeIn">
        <button
          id="floating-admin-trigger"
          onClick={() => setIsAdminOpen(true)}
          className="bg-brand-accent hover:bg-brand-charcoal text-[#fbfbf9] px-4 py-3 rounded-full flex items-center gap-2 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-mono text-[10.5px] font-bold tracking-wider uppercase border border-white/20 select-none"
          title="Consola de Administración de Datos (Solo Autorizado)"
        >
          <Settings className="w-4 h-4 animate-pulse" />
          <span>[ Consola Admin ]</span>
        </button>
      </div>

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        projects={projects}
        onUpdateProjects={handleUpdateProjects}
      />

      <ClientPortal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
      />
    </div>
  );
}
