import React, { useState, useEffect } from "react";
import { Mail, Phone, Calendar, HeartHandshake, Sparkles, Send, Inbox, ShieldAlert, CheckCircle } from "lucide-react";

interface SavedMessage {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  teamVibe: string;
  date: string;
}

interface ContactFormProps {
  presetMessage?: string;
  presetCategory?: string;
}

export default function ContactForm({ presetMessage, presetCategory }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("ecommerce");
  const [message, setMessage] = useState("");
  const [teamVibe, setTeamVibe] = useState("cooperative");
  const [submittedMessages, setSubmittedMessages] = useState<SavedMessage[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync presets when updated
  useEffect(() => {
    if (presetMessage) {
      setMessage(presetMessage);
    }
    if (presetCategory) {
      setCategory(presetCategory);
    }
  }, [presetMessage, presetCategory]);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_pmsolutions_leads");
      if (stored) {
        setSubmittedMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Por favor rellena los campos críticos (Nombre, Email y Mensaje).");
      return;
    }

    const newLead: SavedMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      category,
      message,
      teamVibe,
      date: new Date().toLocaleDateString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
    };

    const updated = [newLead, ...submittedMessages];
    setSubmittedMessages(updated);
    try {
      localStorage.setItem("portfolio_pmsolutions_leads", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    // Clear form
    setName("");
    setEmail("");
    setMessage("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 8000);
  };

  const handleDeleteMessage = (id: string) => {
    const updated = submittedMessages.filter((m) => m.id !== id);
    setSubmittedMessages(updated);
    try {
      localStorage.setItem("portfolio_pmsolutions_leads", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-brand-charcoal text-[#fbfbf9] relative overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Energy, values and cultural alignment (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#925c43] font-bold block">
                ALINEACIÓN CULTURAL
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                La energía se cuida; <span className="font-light italic text-stone-300 block">el valor se multiplica</span>
              </h2>
              <p className="font-sans text-sm text-stone-400 leading-relaxed">
                He estado en ambientes de alta fricción. Por eso protejo mi motivación y la de mis colegas. Rindo al 300% en proyectos sanos donde impera el respeto mutuo.
              </p>
            </div>

            {/* Vibe Rules Row */}
            <div className="space-y-4">
              <h4 className="font-mono text-[9px] uppercase tracking-widest text-brand-accent-light/70 font-extrabold block">
                CUALIDADES DE MI ENTORNO IDEAL:
              </h4>

              <div className="space-y-3.5">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3d2417] flex items-center justify-center shrink-0 text-brand-accent-light text-xs font-semibold">1</div>
                  <div>
                    <h5 className="font-sans text-xs font-bold text-white">Equipos Pequeños &amp; Colaborativos</h5>
                    <p className="font-sans text-[11px] text-stone-400">Prefiero la comunicación directa sin intermediarios burocráticos ni jerarquías vacías.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3d2417] flex items-center justify-center shrink-0 text-brand-accent-light text-xs font-semibold">2</div>
                  <div>
                    <h5 className="font-sans text-xs font-bold text-white">Cero Toxicidad ("Mala leche")</h5>
                    <p className="font-sans text-[11px] text-stone-400">La buena onda no es un lujo decorativo; es el combustible real de un taller o de una línea de código limpia.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3d2417] flex items-center justify-center shrink-0 text-brand-accent-light text-xs font-semibold">3</div>
                  <div>
                    <h5 className="font-sans text-xs font-bold text-white">Respeto a la Autonomía</h5>
                    <p className="font-sans text-[11px] text-stone-400">Dime qué resultado comercial necesitas destrabar y déjame libre de horarios para diseñar la ruta.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect Details */}
            <div className="space-y-3 pt-6 border-t border-stone-800">
              <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 block">
                CONTACTO DIRECTO (SANTIAGO DE CHILE)
              </span>
              <div className="space-y-2 text-xs text-stone-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-accent" />
                  <span className="font-mono">hanslavinmusic@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-accent" />
                  <span>América Latina &amp; Remoto Global</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Contact Lead Form (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-sm p-6 md:p-8 space-y-6">
            
            <div className="border-b border-stone-850 pb-4">
              <h3 className="font-display text-lg font-bold text-white">
                Cuéntame sobre tu proyecto
              </h3>
              <p className="font-sans text-xs text-stone-400">
                Rellena el formulario interactivo para registrar tu consulta.
              </p>
            </div>

            {/* Success message banner */}
            {showSuccess && (
              <div className="bg-brand-accent/20 border border-brand-accent/30 p-4 rounded-xs text-xs text-brand-accent-light flex gap-3 items-start animate-fadeIn">
                <CheckCircle className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">¡Consulta recibida con éxito!</span>
                  Te contactaré en un plazo de 24 horas hábiles para coordinar los siguientes pasos.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Rodrigo Silva"
                    className="w-full bg-stone-850 border border-stone-800 focus:border-brand-accent text-white px-4 py-2.5 rounded-xs text-xs transition-colors focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">
                    Tu Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej. rodrigo@empresa.com"
                    className="w-full bg-stone-850 border border-stone-800 focus:border-brand-accent text-white px-4 py-2.5 rounded-xs text-xs transition-colors focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">
                    Área del Proyecto
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-800 focus:border-brand-accent text-white px-3 py-2.5 rounded-xs text-xs focus:outline-hidden"
                  >
                    <option value="ecommerce">E-commerce Masivo &amp; Soluciones a Medida</option>
                    <option value="automations">Automatización de Procesos (IA)</option>
                    <option value="pm">Project Management &amp; Agile</option>
                    <option value="luxury">Estratégico / Consultoría</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">
                    Vibe de tu Equipo
                  </label>
                  <select
                    value={teamVibe}
                    onChange={(e) => setTeamVibe(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-800 focus:border-brand-accent text-white px-3 py-2.5 rounded-xs text-xs focus:outline-hidden"
                  >
                    <option value="cooperative">Colaborativo, buena vibra, respetuoso</option>
                    <option value="autonomous">Total autonomía (Trabajo solo)</option>
                    <option value="fast">Rápido pero respetando límites</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">
                  Descripción del Desafío *
                </label>
                <textarea
                  required
                  id="contact-message-input"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explícame qué cuello de botella quieres destrabar. No escatimes en detalles técnicos de tu taller, catálogo o pauta publicitaria."
                  className="w-full bg-stone-850 border border-stone-800 focus:border-brand-accent text-white px-4 py-2.5 rounded-xs text-xs transition-colors focus:outline-hidden resize-none"
                />
              </div>

              <button
                type="submit"
                id="submit-contact"
                className="w-full bg-[#121314] hover:bg-brand-accent text-white font-mono text-[10px] uppercase font-bold tracking-widest py-3.5 rounded-xs border border-stone-800 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Enviar Consulta Estratégica
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Simulating a real CRM input registry using localStorage */}
            <div className="pt-6 border-t border-stone-800 space-y-3 hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-brand-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                    Bandeja de Entrada Soluciones Lead (Local)
                  </span>
                </div>
                <span className="font-mono text-[9px] bg-[#3d2417] text-brand-accent-light px-2 py-0.5 rounded-full font-bold">
                  {submittedMessages.length} Registrados
                </span>
              </div>

              {submittedMessages.length === 0 ? (
                <div className="bg-stone-850 p-4 rounded-xs border border-stone-800 text-center text-stone-500 text-xs italic">
                  No hay consultas registradas en este navegador aún. Envía una para probar el registrador operativo.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[180px] overflow-y-auto">
                  {submittedMessages.map((msg) => (
                    <div key={msg.id} className="bg-stone-850/80 p-3.5 rounded-xs border border-stone-800/60 flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{msg.name}</span>
                          <span className="font-mono text-[8px] bg-stone-800 px-1.5 py-0.5 rounded-xs text-stone-400">
                            {msg.category === "ecommerce" ? "E-commerce" : msg.category === "automations" ? "Automatización" : msg.category === "pm" ? "Agile PM" : "Lux Consultoría"}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 leading-relaxed font-sans mt-1">
                          {msg.message}
                        </p>
                        <div className="flex items-center gap-2 text-[9px] font-mono text-stone-500">
                          <span>Registrado: {msg.date}</span>
                          <span>·</span>
                          <span className="text-brand-accent shrink-0">Clima: {msg.teamVibe === "cooperative" ? "Cooperativo" : msg.teamVibe === "autonomous" ? "Autónomo" : "Foco Veloz"}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-stone-600 hover:text-red-400 font-mono text-[11px] px-1 focus:outline-hidden"
                        title="Archivar"
                      >
                        [Borrar]
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
