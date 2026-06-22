import React, { useState, useRef } from "react";
import { Project } from "../types";
import { 
  X, Plus, Trash2, Edit2, RotateCcw, Check, Sparkles, AlertCircle, 
  HelpCircle, HardDrive, Info, FileSpreadsheet, Settings, RefreshCw, 
  Upload, Terminal, Sliders, Clipboard, Play, Cpu, Lock, LogOut
} from "lucide-react";
import { PROJECTS as DEFAULT_PROJECTS } from "../data";

const AGENT_COGNITIVE_PRESETS = [
  {
    id: "estrategia_cio",
    label: "Director de Estrategia Sinergia (Margen 3X)",
    name: "Agente CIO de IA & Director de Inteligencia Organizacional",
    tone: "Ejecutivo experto de taller o corporativo, analítico de fricciones de margen, proactivo y sumamente orientado a resultados",
    instructions: "Eres el CIO IA y Director de Inteligencia Organizacional principal. Tu misión es analizar fricciones operativas de margen comercial. Enfócate en diseñar flujos relacionales To-Be que eliminen burocracia, recortes del 80% en pérdidas mediante automatizaciones ligeras de escritorio, y traza hojas de ruta claras para capacitar al equipo humano en un paradigma de cero papel y empoderamiento digital.",
    desc: "Optimización global del negocio, cultura integral de cero papel, estructuración de equipos operacionales y planificación del ROI.",
    skills: "Todas las competencias principales"
  },
  {
    id: "automatizacion_datos",
    label: "Ingeniero de Flujos CSV y Datos",
    name: "Especialista en Automatización de Datos & Flujos Operativos",
    tone: "Ingeniero de campo ágil, pragmático, enfocado en solucionar silos de información y cuellos de botella mediante scripts",
    instructions: "Eres el Especialista en Automatización de Datos & Flujos Operativos. Tu enfoque prioritario es soldar flujos de información inconexos y manuales. Identifica transcripciones manuales de planillas de ventas o stock, actualización duplicada de bases de datos de inventario y pedidos manuales. Recomienda adaptadores de planillas CSV, cargadores automáticos por lotes en Shopify o clickup, y scripts sencillos de parseo de archivos.",
    desc: "Evita transcripción manual, ineficiencias de datos duplicados en Shopify, hojas de cálculo de administración y planillas.",
    skills: "Automatización Operativa Avanzada de Datos"
  },
  {
    id: "sistemas_mes",
    label: "Especialista de Taller y Gestión MES",
    name: "Director de Sistemas MES & Control Visual de Piso",
    tone: "Especialista práctico de taller de producción, resolutivo de fricciones físicas de empaquetado, órdenes y logística de despacho",
    instructions: "Eres el Director de Sistemas MES (Manufacturing Execution System) y Control de Piso. Tu foco es resolver el embudo de producción física de taller: materiales desorganizados, mermas de tiempo en empaquetado y despacho, operarios buscando planos a mano. Diseña el control visual de stock con tabletas sencillas de taller, entregas organizadas en tiempo real y flujos dinámicos.",
    desc: "Digitaliza el piso de fabricación con tabletas interactivas, reduciendo tiempos de despacho y agilizando entrega física.",
    skills: "Diseño de Sistemas MES y Flujos de Información"
  },
  {
    id: "soluciones_ia",
    label: "Arquitecto IA y Modelado Cognitivo",
    name: "Arquitecto de Soluciones de IA & Modelamiento Inteligente",
    tone: "Ingeniero visionario tecnológico enfocado en automatización digital express, modelado geométrico y plantillas avanzadas",
    instructions: "Eres el Arquitecto de Soluciones de IA y Modelamiento. Tu misión es inyectar IA generativa avanzada en las tareas creativas, redacción y de ingeniería de la empresa: modelado 3D rápido, generación rápida de comandos de planoCAD, prompts avanzados para copys de catálogo automáticos y agentes de soporte pre-entrenados para resolver en un 80% el tiempo de diseño previo.",
    desc: "Modelados 3D acelerados, prompts creativos, catálogos express y reducciones masivas de tiempos de diseño geométrico.",
    skills: "Arquitectura de Soluciones con Modelos de IA"
  }
];

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onUpdateProjects: (updated: Project[]) => void;
}

export default function AdminPanel({ isOpen, onClose, projects, onUpdateProjects }: AdminPanelProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<"projects" | "cio_agent">("projects");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Admin Authentication State
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_portfolio_authorized") === "true";
  });
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail.trim().toLowerCase() === "hanslavinmusic@gmail.com" && adminPassword === "admin123") {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("admin_portfolio_authorized", "true");
      setLoginError(null);
    } else {
      setLoginError("Credenciales de administración incorrectas. Acceso denegado.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("admin_portfolio_authorized");
    setAdminEmail("");
    setAdminPassword("");
  };

  // CIO Agent Parameters
  const [agentName, setAgentName] = useState(() => localStorage.getItem("cio_agent_name") || "Agente CIO de IA & Director de Inteligencia Organizacional");
  const [agentTone, setAgentTone] = useState(() => localStorage.getItem("cio_agent_tone") || "Ejecutivo de taller, analítico de fricciones manuales, proactivo y muy enfocado a resultados de negocio");
  const [agentInstructions, setAgentInstructions] = useState(() => localStorage.getItem("cio_agent_instructions") || "Analiza rigurosamente ineficiencias de tiempo operativas. Propone automatizaciones livianas listas para usar (usando scripts programados con IA, adaptadores CSV manuales y tableros sencillos). Sincroniza al propietario con la mentoría humana paso a paso para triplicar los márgenes.");
  
  // CSV load states
  const [csvUploadError, setCsvUploadError] = useState<string | null>(null);
  const [csvSuccessMessage, setCsvSuccessMessage] = useState<string | null>(null);
  const [skillsCsvData, setSkillsCsvData] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("cio_agent_skills_csv");
      return saved ? JSON.parse(saved) : [
        { Habilidad: "Arquitectura de Soluciones con Modelos de IA", Categoria: "Sistemas Inteligentes", Impacto: "Recorte del 80% de tiempos de edición de planos." },
        { Habilidad: "Diseño de Sistemas MES y Flujos de Información", Categoria: "Operación de Taller", Impacto: "Control visual de stock y entregas fluidas en tabletas." },
        { Habilidad: "Automatización Operativa Avanzada de Datos", Categoria: "Manipulación de Datos", Impacto: "Suelda flujos inconexos mediante parseo dinámico de planillas y carga automatizada." }
      ];
    } catch {
      return [];
    }
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [type, setType] = useState("");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [role, setRole] = useState("");
  const [achievements, setAchievements] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [validationError, setValidationError] = useState<string | null>(null);

  // CSV File reader handler
  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) {
          setCsvUploadError("El archivo CSV está vacío.");
          return;
        }

        // Simple and robust client-side CSV parser
        const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
        if (lines.length < 2) {
          setCsvUploadError("Estructura de CSV inválida. Debe incluir una fila de cabecera y filas de datos.");
          return;
        }

        // Detect delimiters (, or ;)
        const firstLine = lines[0];
        const delimiter = firstLine.includes(";") ? ";" : ",";
        
        // Helper to parse CSV row correctly handling quotes
        const parseRow = (rowStr: string) => {
          const result = [];
          let current = "";
          let inQuotes = false;
          for (let i = 0; i < rowStr.length; i++) {
            const char = rowStr[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === delimiter && !inQuotes) {
              result.push(current.trim());
              current = "";
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result.map(val => val.replace(/^"|"$/g, ''));
        };

        const headers = parseRow(lines[0]);
        const parsedRows = [];

        for (let i = 1; i < lines.length; i++) {
          const values = parseRow(lines[i]);
          const rowObject: any = {};
          
          headers.forEach((header, index) => {
            const cleanHeader = header || `Columna_${index}`;
            rowObject[cleanHeader] = values[index] !== undefined ? values[index] : "";
          });
          parsedRows.push(rowObject);
        }

        setSkillsCsvData(parsedRows);
        localStorage.setItem("cio_agent_skills_csv", JSON.stringify(parsedRows));
        setCsvSuccessMessage(`¡Archivo CSV cargado con éxito! Se han detectado ${parsedRows.length} habilidades y estrategias de la matriz de Inteligencia Organizacional.`);
        setCsvUploadError(null);
        setTimeout(() => setCsvSuccessMessage(null), 5000);
      } catch (err: any) {
        setCsvUploadError(`Error de formato al procesar CSV: ${err.message || err}`);
        setCsvSuccessMessage(null);
      }
    };
    reader.onerror = () => {
      setCsvUploadError("Error de lectura del archivo.");
    };
    reader.readAsText(file);
  };

  // Agent parameters save handlers
  const handleSaveAgentConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("cio_agent_name", agentName);
    localStorage.setItem("cio_agent_tone", agentTone);
    localStorage.setItem("cio_agent_instructions", agentInstructions);
    setCsvSuccessMessage("¡Parámetros del Agente CIO aplicados, guardados y entrenados con éxito!");
    
    // Dispatch custom event to notify InteractiveDiagnostic component instantly!
    window.dispatchEvent(new Event("cio_agent_updated"));

    setTimeout(() => setCsvSuccessMessage(null), 4000);
  };

  const handleResetAgentConfig = () => {
    if (confirm("¿Deseas restaurar la configuración original de demostración del agente CIO?")) {
      localStorage.removeItem("cio_agent_name");
      localStorage.removeItem("cio_agent_tone");
      localStorage.removeItem("cio_agent_instructions");
      localStorage.removeItem("cio_agent_skills_csv");
      setAgentName("Agente CIO de IA & Director de Inteligencia Organizacional");
      setAgentTone("Ejecutivo de taller, analítico de fricciones manuales, proactivo y muy enfocado a resultados de negocio");
      setAgentInstructions("Analiza rigurosamente ineficiencias de tiempo operativas. Propone automatizaciones livianas listas para usar (usando scripts programados con IA, adaptadores CSV manuales y tableros sencillos). Sincroniza al propietario con la mentoría humana paso a paso para triplicar los márgenes.");
      setSkillsCsvData([
        { Habilidad: "Arquitectura de Soluciones con Modelos de IA", Categoria: "Sistemas Inteligentes", Impacto: "Recorte del 80% de tiempos de edición de planos." },
        { Habilidad: "Diseño de Sistemas MES y Flujos de Información", Categoria: "Operación de Taller", Impacto: "Control visual de stock y entregas fluidas en tabletas." },
        { Habilidad: "Automatización Operativa Avanzada de Datos", Categoria: "Manipulación de Datos", Impacto: "Suelda flujos inconexos mediante parseo dinámico de planillas y carga automatizada." }
      ]);
      setCsvSuccessMessage("Configuración inicial reestablecida.");
      window.dispatchEvent(new Event("cio_agent_updated"));
      setTimeout(() => setCsvSuccessMessage(null), 3000);
    }
  };

  if (!isOpen) return null;

  const handleResetForm = () => {
    setEditingId(null);
    setTitle("");
    setSubtitle("");
    setType("");
    setBadge("");
    setDescription("");
    setLongDescription("");
    setRole("");
    setAchievements("");
    setTechnologies("");
    setOutcomes("");
    setImageUrl("");
    setVideoUrl("");
    setValidationError(null);
  };

  const startEdit = (proj: Project) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setSubtitle(proj.subtitle);
    setType(proj.type);
    setBadge(proj.badge || "");
    setDescription(proj.description);
    setLongDescription(proj.longDescription);
    setRole(proj.role);
    setAchievements(proj.achievements.join("\n"));
    setTechnologies(proj.technologies.join(", "));
    setOutcomes(proj.outcomes);
    setImageUrl(proj.imageUrl || "");
    setVideoUrl(proj.videoUrl || "");
    setValidationError(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !role || !outcomes) {
      setValidationError("Por favor, rellena los campos principales: Título, Descripción corta, Mi Rol e Impacto.");
      return;
    }

    const processedAchievements = achievements
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const processedTech = technologies
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const matchImg = imageUrl.trim() || undefined;
    const matchVid = videoUrl.trim() || undefined;

    if (editingId) {
      // Edit existing
      const updated = projects.map((p) => {
        if (p.id === editingId) {
          return {
            ...p,
            title,
            subtitle,
            type,
            badge: badge || undefined,
            description,
            longDescription,
            role,
            achievements: processedAchievements,
            technologies: processedTech,
            outcomes,
            imageUrl: matchImg,
            videoUrl: matchVid
          };
        }
        return p;
      });
      onUpdateProjects(updated);
    } else {
      // Add new
      const newProjId = "proj-" + Math.random().toString(36).substring(2, 9);
      const newProj: Project = {
        id: newProjId,
        title,
        subtitle,
        type,
        badge: badge || "Nuevo Proyecto",
        description,
        longDescription,
        role,
        achievements: processedAchievements.length > 0 ? processedAchievements : ["Implementación estratégica de procesos."],
        technologies: processedTech.length > 0 ? processedTech : ["IA Aplicada", "Project Management"],
        outcomes,
        imageUrl: matchImg || "https://picsum.photos/seed/" + newProjId + "/800/600",
        videoUrl: matchVid
      };
      onUpdateProjects([...projects, newProj]);
    }

    handleResetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este caso de éxito?")) {
      const filtered = projects.filter((p) => p.id !== id);
      onUpdateProjects(filtered);
      if (editingId === id) {
        handleResetForm();
      }
    }
  };

  const handleRestoreDefaults = () => {
    if (confirm("¿Deseas restaurar los casos de éxito de demostración iniciales (Moldes Fácil y Miami)? Esto borrará tus cambios actuales.")) {
      onUpdateProjects(DEFAULT_PROJECTS);
      localStorage.removeItem("portfolio_pmsolutions_custom_projects");
      handleResetForm();
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
        <div className="bg-[#fbfbf9] text-brand-charcoal w-full max-w-sm rounded-sm shadow-2xl border border-stone-250 overflow-hidden flex flex-col p-6 animate-fadeIn">
          
          <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-accent animate-pulse" />
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-charcoal">
                  Consola de Administración
                </h3>
                <p className="font-mono text-[8px] uppercase text-brand-muted tracking-widest">
                  Acceso exclusivo propietario
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-stone-450 hover:text-brand-accent transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="p-3 bg-brand-accent-light border border-brand-accent/20 rounded-xs text-[10px] text-[#6d432e] leading-relaxed">
              <strong>Control de Identidad:</strong> Consola interna privada de la plataforma para calibrar el portafolio y afinar al Agente CIO de IA.
              <div className="mt-2 pt-1.5 border-t border-brand-accent/10 font-mono text-[9px]">
                <span className="font-bold">Usuario:</span> hanslavinmusic@gmail.com
                <br />
                <span className="font-bold">Contraseña:</span> admin123
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 p-2.5 rounded-sm text-[11px] text-red-700 font-sans font-medium">
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="font-mono text-[9.5px] text-brand-muted uppercase tracking-wider block font-bold">
                Correo Electrónico:
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="hanslavinmusic@gmail.com"
                className="w-full bg-white border border-stone-250 focus:border-brand-accent text-xs px-2.5 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[9.5px] text-brand-muted uppercase tracking-wider block font-bold">
                Contraseña Administrativa:
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Ingresar contraseña"
                className="w-full bg-white border border-stone-250 focus:border-brand-accent text-xs px-2.5 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 bg-brand-accent hover:bg-brand-charcoal text-[#fbfbf9] text-xs font-mono uppercase tracking-wider font-extrabold rounded-xs transition-colors cursor-pointer text-center"
            >
              [ VALIDAR CREDENCIALES ]
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-brand-charcoal w-full max-w-5xl rounded-sm shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Panel Header */}
        <div className="bg-brand-charcoal text-[#fbfbf9] px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />
            <div>
              <h2 className="font-display font-bold text-base tracking-tight uppercase">
                Panel de Control de Proyectos (Consola de Gestión)
              </h2>
              <p className="font-mono text-[9px] text-stone-400 uppercase tracking-widest leading-none">
                Añade, edita y gestiona tus verdaderos casos de éxito
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAdminLogout}
              className="px-2 py-1 bg-[#232425] hover:bg-brand-accent text-xs font-mono rounded-sm transition-colors text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer"
              title="Cerrar Sesión de Administrador"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>[ Salir ]</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-brand-accent transition-colors cursor-pointer"
              aria-label="Cerrar panel"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Category switcher tabs */}
        <div className="bg-stone-100 px-6 py-2.5 border-b border-stone-200 flex flex-wrap gap-4 items-center justify-between shrink-0">
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setActiveAdminTab("projects")}
              className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-black tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeAdminTab === "projects"
                  ? "bg-brand-charcoal text-[#fbfbf9] shadow-xs"
                  : "bg-white text-stone-500 hover:text-brand-charcoal border border-stone-250"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> [ 01. CASOS Y PORTAFOLIO ]
            </button>
            <button
              type="button"
              onClick={() => setActiveAdminTab("cio_agent")}
              className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-black tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeAdminTab === "cio_agent"
                  ? "bg-brand-charcoal text-[#fbfbf9] shadow-xs"
                  : "bg-white text-stone-500 hover:text-brand-charcoal border border-stone-250"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-brand-accent" /> [ 02. ENTRENAR AGENTE CIO (CSV & PROMPT) ]
            </button>
          </div>
          <span className="text-[9px] text-brand-accent bg-[#fff3ec] border border-[#ffdcd2] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono">
            {activeAdminTab === "projects" ? "Sujeto: Casos de Éxito" : "Sujeto: Inteligencia Organizacional"}
          </span>
        </div>

        {activeAdminTab === "projects" ? (
          /* Content Body: Two columns layout inside (Proyectos) */
          <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            
            {/* Projects Control Center List (Left: 4 Cols) */}
            <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-stone-200 lg:pr-6">
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-sm text-brand-charcoal uppercase">
                  Tus Casos Activos
                </h3>
                <p className="font-sans text-[11px] text-brand-muted leading-relaxed">
                  Estos proyectos se verán reflejados inmediatamente en la sección de "Casos de Éxito Reales".
                </p>
              </div>

              <div className="space-y-2 max-h-[300px] lg:max-h-[50vh] overflow-y-auto pr-1">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className={`p-3.5 border rounded-xs flex items-center justify-between gap-3 text-left transition-all ${
                      editingId === proj.id
                        ? "bg-brand-accent-light border-brand-accent"
                        : "bg-brand-gray-light border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <div className="space-y-0.5 overflow-hidden">
                      <span className="font-mono text-[8px] bg-white px-2 py-0.5 border border-stone-200 uppercase rounded-xs font-semibold text-brand-accent">
                        {proj.badge || "Proyecto"}
                      </span>
                      <h4 className="font-display font-bold text-xs text-brand-charcoal truncate mt-1">
                        {proj.title}
                      </h4>
                      <p className="font-sans text-[10px] text-brand-muted truncate">
                        {proj.role}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => startEdit(proj)}
                        className="p-1 bg-white border border-stone-200 hover:border-brand-accent text-[#121314] rounded-xs cursor-pointer"
                        title="Editar Proyecto"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(proj.id)}
                        className="p-1 bg-white border border-stone-200 hover:border-red-600 hover:text-red-600 text-stone-500 rounded-xs cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Helper tips & restore defaults */}
              <div className="bg-brand-gray-light p-4 rounded-xs border border-stone-250 space-y-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#a1a195] font-bold block">
                  CONSEJO ESTRATÉGICO DE IMÁGENES:
                </span>
                <p className="font-sans text-[11px] text-stone-600 leading-relaxed">
                  Para añadir capturas reales de tus pantallas de ClickUp, tu e-commerce o tu sistema MES, puedes cargarlas en algún alojamiento público gratuito e introducir el enlace web directo en el campo <strong>URL Imagen</strong>. También puedes poner links de Youtube o loom de demostración!
                </p>

                <button
                  type="button"
                  onClick={handleRestoreDefaults}
                  className="w-full bg-white border border-stone-300 hover:border-brand-accent hover:text-brand-accent text-brand-charcoal font-mono text-[9px] uppercase font-bold py-2 rounded-xs transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restaurar Demos Iniciales
                </button>
              </div>
            </div>

            {/* Form to Add/Edit (Right: 8 Cols) */}
            <form onSubmit={handleSave} className="lg:col-span-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                  <h3 className="font-display font-extrabold text-sm text-brand-charcoal uppercase">
                    {editingId ? "Editar Caso de Éxito" : "Nuevo Caso de Éxito"}
                  </h3>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="font-mono text-[10px] text-brand-accent hover:underline uppercase"
                    >
                      Crear nuevo en su lugar
                    </button>
                  )}
                </div>

                {validationError && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-xs text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Grid Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">Título del Negocio *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ej. Taller Sastrería París"
                      className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">Subtítulo Resumen</label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Ej. E-commerce & automatización de órdenes"
                      className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">Tipo de Desarrollo</label>
                    <input
                      type="text"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      placeholder="Ej. E-commerce & Logística MES"
                      className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">Etiqueta/Badge</label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="Ej. Logística & Ventas"
                      className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">Mi Rol Específico *</label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ej. Product Manager & Arquitecto IA"
                      className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">Descripción Corta (Resumen en Tarjeta) *</label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explica qué sincronizaste o solucionaste de forma veloz para que lo entienda un cliente comercial."
                    className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">Arquitectura Operativa Detallada (Cómo lo hiciste y por qué)</label>
                  <textarea
                    rows={2}
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    placeholder="Describe la lógica aplicada, dolor inicial de los operarios u organización, y cómo la estructuración resolvió el embudo."
                    className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal resize-none"
                  />
                </div>

                {/* Achievements & Technologies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">
                      Logros Claves (Uno por línea)
                    </label>
                    <textarea
                      rows={3}
                      value={achievements}
                      onChange={(e) => setAchievements(e.target.value)}
                      placeholder="Ej:&#10;Automatización de inventario con la APP Printer.&#10;Ahorro de un 80% en tiempo de despacho."
                      className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">
                      Tecnologías usadas (Separadas por comas)
                    </label>
                    <textarea
                      rows={3}
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      placeholder="Custom E-commerce, CSV Automations, ClickUp, Meta Leads, Prompts Avanzados"
                      className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal resize-none"
                    />
                  </div>
                </div>

                {/* Media URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">URL de la Imagen (Captura o Render)</label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Ej: https://images.unsplash.com/... o un link público"
                      className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">URL Video (Loom, Youtube, etc)</label>
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Ej: https://www.youtube.com/watch?v=..."
                      className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                </div>

                {/* Outcome business impact */}
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block">Resultado de Negocios Real / ROI *</label>
                  <input
                    type="text"
                    required
                    value={outcomes}
                    onChange={(e) => setOutcomes(e.target.value)}
                    placeholder="Ej. Reducción completa de errores de empaque, incrementando utilidad en 24% mes a mes."
                    className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                  />
                </div>

              </div>

              {/* Actions for Form */}
              <div className="pt-4 border-t border-stone-100 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-brand-charcoal text-xs font-mono uppercase tracking-wider font-bold rounded-xs cursor-pointer"
                >
                  Limpiar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-accent hover:bg-[#7a4831] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4" />
                  {editingId ? "Actualizar Proyecto" : "Agregar Nuevo Portafolio"}
                </button>
              </div>
            </form>

          </div>
        ) : (
          /* SECTION 2: ENTRENAMIENTO DEL AGENTE CIO */
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 animate-fadeIn flex flex-col">
            
            {/* TOP DECK: PRESETS COGNITIVOS DE ENTRENAMIENTO (MÚLTIPLES SYSTEM PROMPTS) */}
            <div className="bg-[#fcfcfb] border border-stone-250 p-6 rounded-xs space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4.5 h-4.5 text-brand-accent animate-pulse" />
                  <h3 className="font-display text-xs text-[#121314] font-bold uppercase tracking-wider">
                    Módulos Cognitivos & Roles de Especialidad del CIO de IA
                  </h3>
                </div>
                <span className="text-[8.5px] font-mono text-[#a7a79a] uppercase font-bold tracking-widest bg-stone-100 px-2 py-1 rounded-sm">
                  [ 4 PERFILES ENTRENADOS ]
                </span>
              </div>
              
              <p className="font-sans text-[11px] text-[#555] leading-relaxed">
                Selecciona la misión estratégica del <strong>Director de Inteligencia Organizacional</strong>. AI-clickear un módulo, su matriz de System Prompt, nombre técnico y tono de personalidad se cargarán instantáneamente en tu simulador interactivo de consultoría:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                {AGENT_COGNITIVE_PRESETS.map((preset) => {
                  const isActive = agentInstructions.trim().substring(0, 45) === preset.instructions.substring(0, 45);
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setAgentName(preset.name);
                        setAgentTone(preset.tone);
                        setAgentInstructions(preset.instructions);
                        setCsvSuccessMessage(`Módulo "${preset.label}" cargado en el editor. ¡Presiona "Aplicar Identidad" para guardarlo permanentemente!`);
                        setTimeout(() => setCsvSuccessMessage(null), 5000);
                      }}
                      className={`text-left p-4 rounded-xs border transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer select-none group h-full relative ${
                        isActive
                          ? "bg-[#faf9f5] border-brand-accent/70 shadow-xs"
                          : "bg-white border-stone-200 hover:border-brand-accent/40 hover:bg-stone-50"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-[#fbfbf9] text-[7.5px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full border border-[#fbfbf9] shadow-xs">
                          activo
                        </span>
                      )}
                      
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className={`font-mono text-[8px] font-black uppercase tracking-wider ${isActive ? 'text-brand-accent' : 'text-stone-400'}`}>
                            {preset.id === "estrategia_cio" && "🧠 ESTRATEGIA"}
                            {preset.id === "automatizacion_datos" && "⚡ DATOS & ERP"}
                            {preset.id === "sistemas_mes" && "⚙️ TALLER MES"}
                            {preset.id === "soluciones_ia" && "🔮 MODELADO IA"}
                          </span>
                        </div>
                        <h4 className="font-display text-[11px] font-extrabold text-[#121314] uppercase tracking-tight group-hover:text-brand-accent transition-colors">
                          {preset.label}
                        </h4>
                        <p className="font-sans text-[10px] text-[#666] leading-normal line-clamp-3">
                          {preset.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-200/40 flex justify-between items-center text-[7.5px] font-mono uppercase text-[#888]">
                        <span>Atributo CSV:</span>
                        <span className="text-brand-accent font-bold truncate max-w-[125px]" title={preset.skills}>
                          {preset.skills}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BOTTOM DECK: FORM & CSV IN TWO COLS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT SIDE: Identity & Instructions (5 Cols) */}
              <form onSubmit={handleSaveAgentConfig} className="lg:col-span-5 space-y-6 lg:border-r lg:border-stone-200 lg:pr-6 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-[#a7a79a] uppercase tracking-widest font-black block">
                      [ PERSONALIZACIÓN DEL NÚCLEO COGNITIVO ]
                    </span>
                    <p className="font-sans text-xs text-brand-muted">
                      Modifica libremente el prompt de abajo o utiliza los presets superiores para calibrar la lógica del agente.
                    </p>
                  </div>

                  {/* Successful saved notification */}
                  {csvSuccessMessage && (
                    <div className="bg-[#eefcf3] border border-[#bcdcb8] p-3 rounded-xs text-xs text-[#2e6d30] font-sans flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#37943d] shrink-0" />
                      <span>{csvSuccessMessage}</span>
                    </div>
                  )}

                  {/* Agent Name input */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block font-bold">
                      Nombre Técnico del Agente:
                    </label>
                    <input
                      type="text"
                      required
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="Ej. Agente CIO & Director Sinergia"
                      className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>

                  {/* Tone input */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block font-bold">
                      Personalidad y Tono de la Consultoría:
                    </label>
                    <input
                      type="text"
                      required
                      value={agentTone}
                      onChange={(e) => setAgentTone(e.target.value)}
                      placeholder="Ej. Analista industrial, directo, pragmático y ágil"
                      className="w-full bg-[#fafbf9] border border-stone-250 focus:border-brand-accent text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>

                  {/* Custom system instructions */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block font-bold">
                        Instrucciones del Sistema (System Prompt Activo):
                      </label>
                      <span className="text-[8px] font-mono font-black text-brand-accent uppercase bg-[#fff3ec] px-1.5 py-0.5 rounded-xs">
                        [ SYSTEM PROMPT ]
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      required
                      value={agentInstructions}
                      onChange={(e) => setAgentInstructions(e.target.value)}
                      className="w-full bg-[#fafbf9] border border-stone-250 focus:border-brand-accent text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal resize-none leading-relaxed font-mono text-[11px]"
                      placeholder="Escribe las directivas que regulan sus soluciones..."
                    />
                    <p className="font-sans text-[10px] text-stone-500 leading-tight">
                      Este System Prompt guía las sugerencias del simulador interactivo para diseñar tableros, integrar planillas y capacitar operarios.
                    </p>
                  </div>
                </div>

                {/* Identity Save Actions */}
                <div className="pt-6 border-t border-stone-150 mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={handleResetAgentConfig}
                    className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-brand-charcoal text-xs font-mono uppercase tracking-wider font-bold rounded-xs cursor-pointer flex-1 text-center"
                  >
                    [ RESTAURAR ]
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-brand-accent hover:bg-[#865139] text-white text-xs font-mono uppercase tracking-wider font-extrabold rounded-xs cursor-pointer flex-2 text-center"
                  >
                    [ APLICAR IDENTIDAD ]
                  </button>
                </div>
              </form>

              {/* RIGHT SIDE: CSV Spreadsheet cognitive Uploader & Table Viewer (7 Cols) */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-[#a7a79a] uppercase tracking-widest font-black block">
                      [ BASE DE CONOCIMIENTO (UP LOAD CSV DE HABILIDADES) ]
                    </span>
                    <p className="font-sans text-xs text-brand-muted">
                      Sube el archivo Excel / CSV que contiene tu matriz técnica de habilidades del "Director de Inteligencia Organizacional" para entrenar al consultor.
                    </p>
                  </div>

                  {/* Warnings / Alerts */}
                  {csvUploadError && (
                    <div className="bg-red-50 border border-red-200 p-3.5 rounded-sm text-xs text-red-700 flex items-start gap-2.5 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Error de Carga:</strong>
                        <span>{csvUploadError}</span>
                      </div>
                    </div>
                  )}

                  {/* CSV File Input Drag and Drop simulator card */}
                  <div 
                    className="bg-brand-gray-light border-2 border-dashed border-stone-300 hover:border-brand-accent hover:bg-stone-50 transition-all rounded-xs p-6 md:p-8 text-center cursor-pointer relative"
                    onClick={() => fileInputRef.current?.click()}
                  >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleCsvFileUpload}
                    accept=".csv"
                    className="hidden"
                  />
                  <FileSpreadsheet className="w-10 h-10 text-brand-accent mx-auto mb-3 stroke-[1.25]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-brand-charcoal font-bold block mb-1">
                    [ SELECCIONAR MATRIZ DE COMPETENCIAS (.CSV) ]
                  </span>
                  <p className="font-sans text-[11px] text-[#666] leading-relaxed max-w-sm mx-auto">
                    Presiona para buscar en tus carpetas locales el archivo CSV. El sistema parseará inmediatamente los encabezados de columnas como un set de directivas.
                  </p>
                </div>

                {/* Display current parsed CSV content inside terminal table */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-[9.5px] uppercase text-stone-500 font-bold tracking-wider">
                      Vista previa de la Matriz Cargada ({skillsCsvData.length} ítems):
                    </span>
                    <span className="text-[8.5px] font-mono text-brand-accent uppercase font-bold">
                      [ ESTRUCTURA ACTIVA LOCAL ]
                    </span>
                  </div>

                  <div className="bg-brand-charcoal text-stone-300 rounded-sm border border-stone-850 p-4 font-mono text-[10.5px] max-h-[220px] overflow-auto">
                    {skillsCsvData.length > 0 ? (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-stone-800 text-[#ecece1] text-[9.5px] uppercase tracking-wide">
                            {Object.keys(skillsCsvData[0]).map((hKey, idx) => (
                              <th key={idx} className="pb-2 pr-3 font-black text-brand-accent">
                                {hKey}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {skillsCsvData.slice(0, 5).map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-stone-900 hover:bg-stone-900/60 transition-colors">
                              {Object.values(row).map((val: any, cIdx) => (
                                <td key={cIdx} className="py-2.5 pr-3 text-stone-200 truncate max-w-[150px]">
                                  {val}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-6 text-stone-500 italic">
                        No se ha pre-cargado ninguna fila estructurada. Sube un CSV arriba.
                      </div>
                    )}
                    {skillsCsvData.length > 5 && (
                      <div className="text-center text-[9px] text-[#848472] pt-2 border-t border-stone-900 uppercase">
                        + {skillsCsvData.length - 5} estrategias cargadas adicionales en el buffer.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Informational Guidance */}
              <div className="bg-[#f0f4f8] border border-[#d3dfeb] p-4 rounded-sm flex items-start gap-3">
                <Info className="w-4 h-4 text-[#355f8c] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#2c3e50] uppercase font-bold tracking-wider block">
                    ¿CÓMO SE DIFUNDE ESTO AL CLIENTE?
                  </span>
                  <span className="font-sans text-[10.5px] text-[#425061] leading-relaxed block">
                    Cuando tu cliente plantee una dificultad en la pestaña <strong>"Consultor IA (Membresía)"</strong>, el simulador del agente correlacionará sus directivas (System Prompt) y la matriz CSV de arriba para proponerle una arquitectura optimizadora y recomendar tu membresía + mentoría paso a paso.
                  </span>
                </div>
              </div>
            </div>

            </div> {/* Closes BOTTOM DECK grid wrapping div */}

          </div>
        )}

        {/* Footer info banner */}
        <div className="bg-brand-gray-light border-t border-stone-200 px-6 py-2.5 flex items-center justify-between text-[11px] text-brand-muted shrink-0 font-sans">
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-brand-accent" />
            Los datos se almacenan de manera persistente en el navegador (Local Storage).
          </span>
          <span className="font-mono text-[10px]">VERSIÓN 1.2 · LISTO</span>
        </div>

      </div>
    </div>
  );
}
