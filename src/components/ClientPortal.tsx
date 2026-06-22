import React, { useState, useEffect } from "react";
import { 
  X, User, Mail, ShieldAlert, Key, LogIn, Lock, Check,
  BookOpen, Video, FileText, Sparkles, LogOut, CheckCircle, CreditCard,
  UserCheck, ArrowRight, Play, Info
} from "lucide-react";

interface ClientPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ClientSession {
  email: string;
  name: string;
  company: string;
  phone: string;
  plan: string;
}

export default function ClientPortal({ isOpen, onClose }: ClientPortalProps) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  
  const [clientSession, setClientSession] = useState<ClientSession | null>(() => {
    try {
      const saved = localStorage.getItem("client_active_session");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<"tutorials" | "profile" | "subscription">("tutorials");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{title: string; url: string; steps: string[]} | null>(null);

  // Default credentials for checking
  const defaultClient = {
    email: "cliente@ejemplo.com",
    password: "clave123",
    name: "Juan Pérez",
    company: "Moldes S.A.",
    phone: "+56 9 1234 5678",
    plan: "Plan Estrategia CIO Pro"
  };

  useEffect(() => {
    if (clientSession) {
      localStorage.setItem("client_active_session", JSON.stringify(clientSession));
    } else {
      localStorage.removeItem("client_active_session");
    }
  }, [clientSession]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim().toLowerCase() === defaultClient.email && passwordInput === defaultClient.password) {
      setClientSession({
        email: defaultClient.email,
        name: defaultClient.name,
        company: defaultClient.company,
        phone: defaultClient.phone,
        plan: defaultClient.plan
      });
      setErrorMessage(null);
      setSuccessMessage("Sesión iniciada correctamente.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      // Allow dynamic sign in simulated for any registered accounts
      try {
        const registeredStr = localStorage.getItem("registered_clients_db") || "[]";
        const registered = JSON.parse(registeredStr);
        const user = registered.find((u: any) => u.email.trim().toLowerCase() === emailInput.trim().toLowerCase() && u.password === passwordInput);
        
        if (user) {
          setClientSession({
            email: user.email,
            name: user.name,
            company: user.company || "Autónomo / Particular",
            phone: user.phone || "No especificado",
            plan: user.plan || "Acceso Gratuito inicial"
          });
          setErrorMessage(null);
          setSuccessMessage(`¡Bienvenido de vuelta, ${user.name}!`);
          setTimeout(() => setSuccessMessage(null), 3000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
      setErrorMessage("Correo o contraseña incorrectos. Utiliza el correo demo 'cliente@ejemplo.com' y clave 'clave123' o regístrate como cliente nuevo.");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput || !nameInput) {
      setErrorMessage("Por favor ingresa Nombre, Correo y Contraseña.");
      return;
    }

    const newClientObj = {
      email: emailInput.toLowerCase().trim(),
      password: passwordInput,
      name: nameInput,
      company: companyInput || "Particular",
      phone: phoneInput || "No especificado",
      plan: "Acceso Gratuito Inicial"
    };

    try {
      const registeredStr = localStorage.getItem("registered_clients_db") || "[]";
      const registered = JSON.parse(registeredStr);
      
      if (registered.some((u: any) => u.email === newClientObj.email) || newClientObj.email === defaultClient.email) {
        setErrorMessage("Este correo ya está registrado.");
        return;
      }

      registered.push(newClientObj);
      localStorage.setItem("registered_clients_db", JSON.stringify(registered));
      
      // Auto-log in
      setClientSession({
        email: newClientObj.email,
        name: newClientObj.name,
        company: newClientObj.company,
        phone: newClientObj.phone,
        plan: newClientObj.plan
      });
      setErrorMessage(null);
      setSuccessMessage("¡Cuenta creada con éxito! Bienvenido al portal.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setErrorMessage("Error al guardar registro en navegador local.");
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientSession) return;
    
    // Propose update
    setSuccessMessage("Tus datos personales fueron actualizados localmente con éxito.");
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleLogout = () => {
    setClientSession(null);
    setEmailInput("");
    setPasswordInput("");
    setSuccessMessage("Sesión cerrada.");
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  const tutorials = [
    {
      id: "tut-1",
      title: "Introducción al Termoformado Eficiente & Moldes de Vacío",
      duration: "14:20 min",
      category: "Fabricación",
      desc: "Aprende los parámetros de temperatura de calentamiento, mermas de plástico y ciclos rápidos de enfriamiento para moldes de resina.",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Rickroll as standard safe non-tracking/demo link
      steps: [
        "1. Calibración del termo: Ajustar resistencias de infrarrojo entre 160°C y 180°C según el grosor del poliestireno (HIPS).",
        "2. Preparación del molde: Perforar orificios de succión micrométricos de 1mm en los valles o esquinas para evitar burbujas de aire.",
        "3. Aplicación de desmoldante ligero de silico-moly para un desmolde instantáneo sin fisuras."
      ]
    },
    {
      id: "tut-2",
      title: "Cómo Estructurar la Tabla CSV de Stock de Moldes",
      duration: "8:45 min",
      category: "Automatización",
      desc: "Guía paso a paso para poblar tus SKU de inventario de moldes y darlos de alta en Shopify/WooCommerce sin duplicar clicks manuables.",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      steps: [
        "1. Asegúrate de respetar los encabezados estrictos del formato internacional: SKU, Stock_Taller, Material_Molde y Precio.",
        "2. Convierte tu Excel a formato UTF-8 para evitar caracteres rústicos o símbolos corruptos.",
        "3. Sube la planilla en el cargador por lotes o expórtala directamente con el extractor interactivo."
      ]
    },
    {
      id: "tut-3",
      title: "Sintonía Fina en las Consultas del Agente CIO de IA",
      duration: "11:10 min",
      category: "Mapeo Estratégico",
      desc: "Configura el núcleo cognitivo de tu consultor de inteligencia organizacional. Diseña y prioriza flujos para ahorrar hasta un 80% de tiempos administrativos.",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      steps: [
        "1. Especifica los dolores reales en el chatbot interactivo (cuántas planillas duplicas a la semana).",
        "2. Haz preguntas de optimización utilizando el filtro 'Directores Técnicos'.",
        "3. Genera el script de correo automatizado o de macro Excel listo para copiar en tus tareas diarias."
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-brand-charcoal w-full max-w-4xl rounded-sm shadow-2xl border border-stone-250 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Portal Header */}
        <div className="bg-brand-charcoal text-[#fbfbf9] px-6 py-4 flex justify-between items-center shrink-0 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-brand-accent" />
            <div>
              <h2 className="font-display font-black text-sm uppercase tracking-wider text-[#fbfbf9]">
                Portal Privado de Clientes
              </h2>
              <p className="font-mono text-[9px] text-stone-400 uppercase tracking-widest leading-none">
                Soporte operacional, tutoriales rápidos y suscripciones
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar portal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Inner Layout */}
        {!clientSession ? (
          /* GUEST / LOGIN / SIGNUP VIEW */
          <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-lg mx-auto w-full animate-fadeIn">
            
            {/* Success notification */}
            {successMessage && (
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xs text-xs text-emerald-850 mb-4 flex items-center gap-1.5 font-sans font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <div className="text-center space-y-2 mb-8">
              <span className="font-mono text-[9px] text-[#a7a79a] uppercase tracking-widest font-bold bg-[#faf9f5] px-2.5 py-1 rounded-sm border border-stone-200">
                [ PORTAL DE SOCIOS ACTIVO ]
              </span>
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-charcoal uppercase leading-tight">
                {isLoginView ? "Bienvenido de vuelta" : "Regístrate en la Red"}
              </h3>
              <p className="font-sans text-xs text-brand-muted max-w-sm mx-auto leading-relaxed">
                Ingresa tus credenciales exclusivas de cliente de consultoría industrial o crea una cuenta beta para ver tutoriales de termoformado y estado de planes.
              </p>
            </div>

            {/* Selector de Vistas */}
            <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-sm mb-6 border border-stone-200">
              <button
                type="button"
                onClick={() => { setIsLoginView(true); setErrorMessage(null); }}
                className={`py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-all ${
                  isLoginView ? "bg-white text-brand-charcoal shadow-xs" : "text-stone-500 hover:text-brand-charcoal"
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => { setIsLoginView(false); setErrorMessage(null); }}
                className={`py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-all ${
                  !isLoginView ? "bg-white text-brand-charcoal shadow-xs" : "text-stone-500 hover:text-brand-charcoal"
                }`}
              >
                Nuevo Registro
              </button>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 p-3.5 rounded-xs text-xs text-red-700 font-sans leading-relaxed mb-5">
                {errorMessage}
              </div>
            )}

            {isLoginView ? (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="p-3 bg-brand-accent-light border border-brand-accent/20 rounded-xs text-[11px] text-[#6d432e] leading-relaxed mb-4">
                  <strong>Acceso de Demostración:</strong> Puedes usar estos datos para explorar el panel del cliente de forma inmediata:
                  <div className="mt-1.5 pt-1 font-mono text-[10px] space-y-0.5 border-t border-brand-accent/10">
                    <div><strong>Correo:</strong> cliente@ejemplo.com</div>
                    <div><strong>Clave:</strong> clave123</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block font-bold">
                    Correo de Cliente registrado:
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full bg-white border border-stone-250 focus:border-brand-accent text-xs pl-10 pr-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block font-bold">
                    Contraseña:
                  </label>
                  <div className="relative flex items-center">
                    <Key className="absolute left-3 w-4 h-4 text-stone-400" />
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Coloca tu clave"
                      className="w-full bg-white border border-stone-250 focus:border-brand-accent text-xs pl-10 pr-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-charcoal hover:bg-brand-accent text-[#fbfbf9] text-xs font-mono uppercase tracking-wider font-extrabold rounded-xs transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Ingresar al Portal de Clientes</span>
                </button>
              </form>
            ) : (
              /* SIGNUP FORM */
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block font-bold">
                      Nombre Completo:
                    </label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-white border border-stone-250 focus:border-brand-accent text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block font-bold">
                      Empresa / Taller (Opcional):
                    </label>
                    <input
                      type="text"
                      value={companyInput}
                      onChange={(e) => setCompanyInput(e.target.value)}
                      placeholder="Ej. Moldes Fácil"
                      className="w-full bg-white border border-stone-250 focus:border-brand-accent text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block font-bold">
                      Correo Electrónico:
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-white border border-stone-250 focus:border-brand-accent text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block font-bold">
                      Celular / Teléfono:
                    </label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="Ej. +569..."
                      className="w-full bg-white border border-stone-250 focus:border-brand-accent text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-brand-muted uppercase tracking-wider block font-bold">
                    Contraseña de Acceso:
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Escribe una contraseña segura"
                    className="w-full bg-white border border-stone-250 focus:border-brand-accent text-xs px-3 py-2.5 rounded-xs focus:outline-hidden text-brand-charcoal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-accent hover:bg-brand-charcoal text-[#fbfbf9] text-xs font-mono uppercase tracking-wider font-extrabold rounded-xs transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Registrar Cuenta &amp; Ingresar</span>
                </button>
              </form>
            )}
          </div>
        ) : (
          /* AUTHENTICATED REAL CLIENT PANEL */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* PORTAL NAVIGATION SIDEBAR (LEFT) */}
            <div className="w-full md:w-64 bg-stone-100 border-r border-stone-200 flex flex-col justify-between p-4 shrink-0">
              <div className="space-y-6">
                
                {/* User badge */}
                <div className="bg-white border border-stone-200 p-3.5 rounded-xs space-y-1">
                  <div className="text-[9.5px] font-mono font-bold text-brand-accent uppercase tracking-wider">
                    SESIÓN DE SOCIO
                  </div>
                  <div className="text-xs font-sans font-black text-brand-charcoal leading-tight truncate">
                    {clientSession.name}
                  </div>
                  <div className="text-[10px] font-mono text-brand-muted truncate block">
                    {clientSession.company}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => { setActiveTab("tutorials"); setSelectedVideo(null); }}
                    className={`text-left px-3.5 py-3 rounded-xs font-mono text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                      activeTab === "tutorials" 
                        ? "bg-brand-charcoal text-[#fbfbf9] shadow-xs" 
                        : "bg-white border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-brand-charcoal"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-brand-accent" />
                      1. Tutoriales Clave
                    </span>
                    <span className="text-[9px] bg-brand-accent text-[#fbfbf9] px-1.5 py-0.5 rounded-full font-bold">
                      {tutorials.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setActiveTab("profile"); setSelectedVideo(null); }}
                    className={`text-left px-3.5 py-3 rounded-xs font-mono text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === "profile" 
                        ? "bg-brand-charcoal text-[#fbfbf9] shadow-xs" 
                        : "bg-white border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-brand-charcoal"
                    }`}
                  >
                    <User className="w-4 h-4 text-brand-accent" />
                    <span>2. Datos Personales</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab("subscription"); setSelectedVideo(null); }}
                    className={`text-left px-3.5 py-3 rounded-xs font-mono text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === "subscription" 
                        ? "bg-brand-charcoal text-[#fbfbf9] shadow-xs" 
                        : "bg-white border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-brand-charcoal"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-brand-accent" />
                    <span>3. Info de tu Plan</span>
                  </button>
                </div>
              </div>

              {/* Sidebar Footer Logout */}
              <div className="pt-4 border-t border-stone-200">
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2.5 bg-white border border-red-250 text-xs font-mono font-bold uppercase tracking-wider text-red-650 rounded-xs hover:bg-red-50 hover:text-red-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {/* TAB CONTENT VIEWPORT (RIGHT) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white min-h-[350px]">
              
              {/* Success notifier */}
              {successMessage && (
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-sm text-xs text-emerald-800 mb-6 flex items-center gap-1.5 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* TAB 1: TUTORIALS */}
              {activeTab === "tutorials" && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Detailed Interactive Video Player Simulation */}
                  {selectedVideo ? (
                    <div className="border border-stone-250 rounded-sm overflow-hidden bg-brand-gray-light p-4 space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                        <span className="font-mono text-[9px] text-brand-accent uppercase tracking-widest font-black flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 animate-bounce" /> Reproductor de Tutoriales de Moldes e IA
                        </span>
                        <button
                          onClick={() => setSelectedVideo(null)}
                          className="text-[10px] font-mono uppercase bg-white border border-stone-300 hover:bg-stone-100 px-2 py-1 rounded-sm cursor-pointer"
                        >
                          &larr; Volver a la Lista
                        </button>
                      </div>

                      <h4 className="font-display font-extrabold text-sm uppercase text-brand-charcoal">
                        {selectedVideo.title}
                      </h4>

                      {/* Video Simulated Sandbox Frame */}
                      <div className="relative bg-brand-charcoal aspect-video w-full rounded-xs flex flex-col items-center justify-center p-6 text-center border overflow-hidden group">
                        <div className="absolute inset-0 bg-radial from-brand-accent/20 to-black/80 z-0"></div>
                        {/* Simulation Interface */}
                        <div className="space-y-3 z-10 max-w-sm">
                          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent hover:bg-brand-accent/90 text-white shadow-lg animate-pulse cursor-pointer mx-auto transition-transform group-hover:scale-105">
                            <Play className="w-6 h-6 fill-white ml-1" />
                          </div>
                          <p className="font-sans text-xs text-[#faf9f5]">
                            Simulación de Tutorial Exclusivo de Miembros
                          </p>
                          <p className="font-mono text-[9px] text-stone-400">
                            Enlace simulado seguro: {selectedVideo.url}
                          </p>
                          <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex gap-1 text-[10px] font-mono uppercase text-brand-accent hover:underline"
                          >
                            Abrir en YouTube Real &rarr;
                          </a>
                        </div>
                      </div>

                      {/* Technical Blueprint Guidance steps */}
                      <div className="space-y-2 mt-2">
                        <span className="font-mono text-[9.5px] uppercase tracking-wider text-brand-muted block font-black border-b border-stone-200 pb-1">
                          Pasos Metodológicos del Tutorial:
                        </span>
                        <div className="space-y-2 text-xs font-sans text-brand-charcoal leading-relaxed pl-1">
                          {selectedVideo.steps.map((step, idx) => (
                            <p key={idx}>{step}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* GRID OF ACCESSIBLE TUTORIALS COVERS */
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <h3 className="font-display font-black text-[#121314] uppercase tracking-tight text-xs flex items-center gap-1.5 border-b border-stone-200 pb-2">
                          <Video className="w-4 h-4 text-brand-accent" /> Videos Formativos e Instructivos de Moldes
                        </h3>
                        <p className="font-sans text-xs text-[#555] leading-relaxed">
                          Accede a las instrucciones exactas para operar tu maquinaria de taller, estructurar bases de datos y sincronizar la consultoría del CIO.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {tutorials.map((tut) => (
                          <div 
                            key={tut.id}
                            className="bg-brand-gray-light border border-stone-200 hover:border-brand-accent rounded-sm p-4 hover:shadow-sm transition-all flex flex-col justify-between"
                          >
                            <div className="space-y-2.5">
                              <div className="flex justify-between items-center text-[9px] font-mono">
                                <span className="bg-[#fff3ec] text-brand-accent font-bold px-2 py-0.5 rounded-xs">
                                  {tut.category}
                                </span>
                                <span className="text-stone-400 font-bold">{tut.duration}</span>
                              </div>
                              <h4 className="font-display text-[12px] font-extrabold text-[#121314] uppercase leading-tight">
                                {tut.title}
                              </h4>
                              <p className="font-sans text-[11px] text-[#555] leading-normal line-clamp-3">
                                {tut.desc}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => setSelectedVideo(tut)}
                              className="w-full mt-4 py-2 bg-white hover:bg-brand-charcoal hover:text-[#fbfbf9] text-brand-charcoal border border-stone-300 text-[10px] font-mono uppercase font-black tracking-wider transition-all cursor-pointer rounded-xs flex items-center justify-center gap-1.5"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              Ver Tutorial Paso a Paso
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: DATOS PERSONALES */}
              {activeTab === "profile" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1.5 border-b border-stone-200 pb-2.5">
                    <h3 className="font-display font-black text-[#121314] uppercase tracking-tight text-xs flex items-center gap-1.5">
                      <User className="w-4 h-4 text-brand-accent" /> Datos de Registro de Solicitante
                    </h3>
                    <p className="font-sans text-xs text-[#555] leading-relaxed">
                      Estructura tu información de contacto para que el Agente CIO de IA y tu socio consultor la tengan a disposición durante las auditorías de procesos.
                    </p>
                  </div>

                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="font-mono text-[9.5px] text-brand-muted uppercase tracking-wider block font-bold">
                          Tu Nombre de Contacto:
                        </label>
                        <input
                          type="text"
                          required
                          value={clientSession.name}
                          onChange={(e) => setClientSession({...clientSession, name: e.target.value})}
                          className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-2.5 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[9.5px] text-brand-muted uppercase tracking-wider block font-bold">
                          Nombre de tu Empresa / Fábrica:
                        </label>
                        <input
                          type="text"
                          value={clientSession.company}
                          onChange={(e) => setClientSession({...clientSession, company: e.target.value})}
                          className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-2.5 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="font-mono text-[9.5px] text-brand-muted uppercase tracking-wider block font-bold">
                          Correo Electrónico (No modificable):
                        </label>
                        <input
                          type="email"
                          disabled
                          value={clientSession.email}
                          className="w-full bg-stone-100 text-stone-500 border border-stone-250 text-xs px-2.5 py-2 rounded-xs focus:outline-hidden cursor-not-allowed font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[9.5px] text-brand-muted uppercase tracking-wider block font-bold">
                          Celular / Teléfono de Contacto:
                        </label>
                        <input
                          type="tel"
                          value={clientSession.phone}
                          onChange={(e) => setClientSession({...clientSession, phone: e.target.value})}
                          className="w-full bg-brand-gray-light border border-stone-250 focus:border-brand-accent text-xs px-2.5 py-2 rounded-xs focus:outline-hidden text-brand-charcoal"
                        />
                      </div>

                    </div>

                    <div className="p-3 bg-stone-55 rounded-xs border border-stone-200">
                      <span className="font-mono text-[8.5px] uppercase font-bold text-stone-500 block mb-1">
                        MAQUINARIA INDUSTRIAL DISPONIBLE EN DEPOSITO:
                      </span>
                      <select 
                        className="w-full bg-white border border-stone-250 text-xs px-2.5 py-2 rounded-xs focus:outline-hidden text-brand-charcoal font-sans"
                        defaultValue="termo_digital"
                      >
                        <option value="termo_digital">Termoformadora al Vacío Digital (FácilMoldes v1)</option>
                        <option value="termo_manual">Línea de Termoformado Manual o Semiautomático</option>
                        <option value="impresora_3d">Impresoras 3D FDM / Resina para Moldes</option>
                        <option value="ninguna">Solo Servicio de Distribución de Planillas E-commerce</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-3 bg-brand-accent hover:bg-brand-charcoal text-[#fbfbf9] text-xs font-mono uppercase tracking-wider font-extrabold rounded-xs cursor-pointer transition-all duration-200"
                    >
                      [ GUARDAR FICHA DE SOCIO ]
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: SUBSCRIPTION PLAN */}
              {activeTab === "subscription" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1.5 border-b border-stone-200 pb-2.5">
                    <h3 className="font-display font-black text-[#121314] uppercase tracking-tight text-xs flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-brand-accent" /> Estado de la Suscripción & Acceso
                    </h3>
                    <p className="font-sans text-xs text-[#555] leading-relaxed">
                      Revisa tu plan activo, los beneficios vigentes en tu cuenta corporativa y solicita actualizaciones de licencia para un mayor margen de ROI.
                    </p>
                  </div>

                  <div className="bg-brand-gray-light border border-stone-250 rounded-sm p-6 space-y-5">
                    
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-200 pb-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-bold text-brand-accent uppercase tracking-wider block">
                          [ LICENCIA AUTODIDACTA ACTIVA ]
                        </span>
                        <h4 className="font-display text-lg font-black text-brand-charcoal leading-none uppercase">
                          {clientSession.plan}
                        </h4>
                      </div>
                      <span className="sm:self-center px-3.5 py-1.5 bg-emerald-100 text-emerald-850 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full border border-emerald-350 shrink-0 self-start">
                        ● ACTIVO &amp; VINCULADO
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      <div className="bg-white border p-3 rounded-xs space-y-1 shadow-2xs">
                        <div className="text-[8.5px] font-mono text-stone-400 font-bold uppercase">FACTURACIÓN ACTUAL</div>
                        <div className="text-[11.5px] font-sans font-black text-brand-charcoal">$0.00 CLP / Mes</div>
                        <div className="text-[9px] font-mono text-brand-accent">Establecido sin costo</div>
                      </div>

                      <div className="bg-white border p-3 rounded-xs space-y-1 shadow-2xs">
                        <div className="text-[8.5px] font-mono text-stone-400 font-bold uppercase">PRÓXIMO COBRO</div>
                        <div className="text-[11.5px] font-sans font-black text-brand-charcoal">22 de Julio, 2026</div>
                        <div className="text-[9px] font-mono text-stone-500">Renovación automática</div>
                      </div>

                      <div className="bg-white border p-3 rounded-xs space-y-1 shadow-2xs">
                        <div className="text-[8.5px] font-mono text-stone-400 font-bold uppercase">AUDITORÍAS CIO DE IA</div>
                        <div className="text-[11.5px] font-sans font-black text-brand-charcoal">Ilimatadas en Beta</div>
                        <div className="text-[9px] font-mono text-brand-accent">Sintonía 4 system prompts</div>
                      </div>

                    </div>

                    {/* Features list */}
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#a7a79a] block font-black border-b border-stone-200/60 pb-1">
                        Servicios y Recursos Habilitados en tu Membresía:
                      </span>
                      <ul className="text-xs font-sans text-brand-charcoal/90 space-y-2.5 pl-1.5 pt-1">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                          <span><strong>Mapeo de Sinergia CIO</strong>: Acceso interactivo ilimitado para hacer consultas diagnósticas del ROI de tu taller.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                          <span><strong>Módulo Educativo de Moldes</strong>: 3 videos tutoriales especializados de fabricación y carga automática de CSV de stock.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                          <span><strong>Membresía Humana</strong> (Propuesta futura): Acompañamiento uno a uno para triplicar tus márgenes de ganancia.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Simulation Info trigger */}
                    <div className="p-3 bg-brand-accent-light border border-brand-accent/20 rounded-xs flex gap-2 items-start">
                      <Info className="w-4 h-4 text-[#6d432e] shrink-0 mt-0.5" />
                      <p className="font-sans text-[11px] text-[#6d432e] leading-relaxed">
                        ¿Quieres cambiar o mejorar tu nivel de suscripción? Como los precios comerciales no están completamente definidos, puedes solicitar una cotización personalizada o registrar interés mediante el <strong>módulo de Suscripciones</strong> de la página web.
                      </p>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
