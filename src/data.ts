import { Project, TimelineEvent, SkillCategory, InteractiveScenario } from "./types";
// @ts-ignore
import moldsFacilImg from "./assets/images/molds_facil_preview_1782060241091.jpg";
// @ts-ignore
import miamiLuxuryImg from "./assets/images/miami_luxury_preview_1782060256721.jpg";

export const PROJECTS: Project[] = [
  {
    id: "molde-facil",
    title: "Moldes Fácil",
    subtitle: "E-commerce de Manufactura & Sistema MES a Medida",
    type: "Solución Integral E-commerce y Software de Taller",
    description: "Conecté las ventas online de un e-commerce a medida con un taller de producción de moldes físicos. Implementé la APP Printer para moldesfacil.com, que incluye importador por CSV de alto volumen y conversión automatizada de planos industriales a formato imprimibles domésticos.",
    longDescription: "Bajo mi rol de Director de Producto y Project Manager, lideré la evolución operativa del negocio familiar. Detecté que los operarios perdían horas editando manualmente planos de corte industrial (diseñados para plotter) a tamaños domésticos imprimibles (A4 y Carta comercial). Coordiné la creación de la APP Printer en la web a medida, un procesador automatizado basado en CSVs que reduce el tiempo de adaptación en un 80% y habilita el control de fabricación (MES) directo en el taller, transformando la firma en un e-commerce altamente ágil y de despachos instantáneos.",
    role: "Arquitecto Funcional y Director de Proyecto",
    achievements: [
      "Diseño de la lógica del conversor gráfico de archivos CNC/Plotter a archivos PDF paginados estándar (A4/Carta) dentro de la APP Printer.",
      "Migración del prototipo inicial a un desarrollo full-stack 100% personalizado para moldesfacil.com, eliminando comisiones de plataformas y habilitando reglas avanzadas.",
      "Carga y actualización masiva de inventarios compuestos por miles de referencias dinámicas vía CSV directamente en nuestra base de datos.",
      "Implementación de flujos de control visual estilo tablero Kanban para las órdenes activas en el taller (flujo MES) embebido."
    ],
    technologies: ["Custom E-commerce Engine", "TypeScript", "Next.js", "PostgreSQL", "CSV Mass Handling", "PDF Formatting Automation", "Estructuración Base de Datos"],
    outcomes: "Automatización absoluta del taller físico, permitiendo que moldes complejos se procesen y despachen digitalmente en segundos con la APP Printer integrada.",
    badge: "Caso de Éxito Familiar",
    imageUrl: moldsFacilImg
  },
  {
    id: "miami-luxury",
    title: "Miami Luxury Homes Engine",
    subtitle: "Flujo Preventivo del Negocio de Propiedades Premium",
    type: "CRM, Automatización de Leads y Consultoría de Procesos",
    description: "Creé un sistema técnico funcional de calificación de leads y gestión automatizada de clientes de alto valor adaptado al sector inmobiliario premium de Miami.",
    longDescription: "Contratado por una firma inmobiliaria de lujo para estructurar el desorden interno en su captación de inversores internacionales. Diseñé un ecosistema integrado donde los leads provenientes de pauta (Meta Ads) entraban a filtros interactivos de perfil financiero antes de agendar llamadas. Aunque la organización interna del cliente interrumpió el plan estratégico por buscar ventas inmediatas improvisadas, se diseñó todo un blueprint replicable de procesos de negocios, control de tareas tácticas con ClickUp y manual de ventas premium documentado.",
    role: "Project Manager y Consultor de Negocio",
    achievements: [
      "Estructuración de procesos comerciales y diagramación del viaje del usuario premium.",
      "Automatización de embudos de conversión integrando plataformas publicitarias con ClickUp como centro de mando.",
      "Capacitación del equipo comercial primario sobre gestión ordenada del embudo de ingresos de alto valor."
    ],
    technologies: ["ClickUp Automation", "Meta Ads Lead Gen", "CRM Architecture", "Copywriting Persuasivo", "Consultoría Operativa"],
    outcomes: "Blueprint listo de procesos transaccionales que demostró la importancia de la planificación predictiva frente al desorden de urgencias inmediatas.",
    badge: "Estructura & Procesos",
    imageUrl: miamiLuxuryImg
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2008 - 2016",
    title: "Músico Profesional & Viajes por Europa",
    label: "El Gen Creativo e Improvisación Activa",
    description: "Mi primera gran escuela no estuvo en un aula, sino viajando gracias a la música. Como percusionista de ritmos africanos y estudiante de teatro físico, aprendí a valorar la disciplina, la adaptabilidad multicultural y la resiliencia pura.",
    details: [
      "Giras independientes internacionales con logística compleja y recursos limitados.",
      "Un año completo entrenando teatro: perfeccionando el lenguaje, la empatía y la comunicación frente a públicos impredecibles.",
      "Desarrollo de resiliencia extrema frente a disrupciones de última hora en el extranjero (la base de mi agilidad actual)."
    ],
    iconName: "Music"
  },
  {
    year: "2016 - 2021",
    title: "El Choque con la Realidad Comercial",
    label: "Emprendimiento Real, Caídas y Reinicios",
    description: "Me enfoqué completamente al mundo de los negocios. Creé mis propios emprendimientos y gestioné tiendas del negocio familiar. Viví en mi propia piel lo que es el flujo de caja, la quiebra financiera y la resiliencia absoluta.",
    details: [
      "Fundé y colideré proyectos comerciales tradicionales y creativos.",
      "Me enfrenté a severas crisis económicas que me obligaron a aprender operaciones desde el suelo físico del negocio.",
      "Descubrí en el marketing digital y las automatizaciones la única llave real para escalar con costos controlables."
    ],
    iconName: "Briefcase"
  },
  {
    year: "2021 - 2023",
    title: "Asentamiento Teórico Aplicado",
    label: "Certificaciones Estratégicas SENCE & Movistar",
    description: "Invertí tiempo formalizando mis conocimientos basados en la práctica. Cursé especializaciones orientadas a resultados concretos en gestión y marketing.",
    details: [
      "Diplomado Técnico en Gestión de Proyectos en el SENCE (19 horas intensivas orientadas a metodologías adaptables).",
      "Especialización avanzada en Estrategia de Marketing Digital dictada por la Fundación Movistar.",
      "Dominio de herramientas de optimización cooperativa como ClickUp, aplicándolas en talleres de manufactura."
    ],
    iconName: "Award"
  },
  {
    year: "2023 - Presente",
    title: "Soluciones de Negocio Potenciadas por IA",
    label: "Arquitecto de MVPs e Integrador Inteligente",
    description: "Uní mi bagaje creativo con las herramientas de inteligencia artificial y tecnología moderna para solucionar problemas de forma veloz. Me convertí en el puente ideal entre el código puro y la viabilidad del negocio.",
    details: [
      "Coordinación de programadores senior sin requerir un lenguaje académico, traduciendo requerimientos puros de venta en instrucciones técnicas limpias.",
      "Creación de convertidores gráficos, sistemas para inventarios masivos y automatizaciones operativas complejas.",
      "Empoderamiento mediante Inteligencia Artificial para acelerar implementaciones, ahorrando presupuestos millonarios a mis proyectos y clientes."
    ],
    iconName: "Cpu"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Project Management & Procesos",
    description: "Planificación realista y control del caos operativo para garantizar un ambiente saludable, ágil y enfocado.",
    skills: [
      "Metodologías Ágiles (Scrum/Kanban)",
      "Gestión de Tareas con ClickUp/Jira",
      "Mapeo de Flujos de Negocio (As-Is / To-Be)",
      "Control de Metas y OKRs",
      "Comunicación Saludable de Equipos"
    ],
    iconName: "Layers"
  },
  {
    title: "Estrategia de Crecimiento & Marketing",
    description: "Conexión integral de marketing y ventas sin gastar de más, enfocada en la fidelización y el retorno de inversión.",
    skills: [
      "Configuración avanzada de Meta Ads",
      "Construcción de Embudos de Venta (Funnels)",
      "Email Marketing Automatizado (Klaviyo/ActiveCampaign)",
      "Branding con Enfoque Comercial",
      "Storytelling Persuasivo y Copywriting"
    ],
    iconName: "Megaphone"
  },
  {
    title: "Arquitectura Digital con IA",
    description: "Creación de soluciones eficientes utilizando Inteligencia Artificial para estructurar, optimizar y automatizar tareas organizacionales de extremo a extremo.",
    skills: [
      "Estructuración de Prompts Avanzados",
      "Desarrollo de Aplicaciones & Modelos de IA",
      "Traducción de Negocios a Terminología Técnica",
      "Automatización de Tareas Repetitivas",
      "Diseño de Soluciones y Testeo de Sistemas"
    ],
    iconName: "Cpu"
  },
  {
    title: "Operaciones E-commerce & Datos",
    description: "Sistemas industriales adaptados al e-commerce moderno con manejo dinámico de grandes bases de datos.",
    skills: [
      "Desarrollo de E-commerce a Medida",
      "Sincronización Masiva vía Catálogos CSV",
      "Gestión de Sistemas MES de Manufactura",
      "Optimización de Logística y Despachos",
      "Integraciones con Pasarelas Financieras"
    ],
    iconName: "ShoppingBag"
  }
];

export const INTERACTIVE_SCENARIOS: InteractiveScenario[] = [
  {
    id: "scen-1",
    businessNeed: "Tengo miles de productos en mi tienda y actualizarlos a mano nos cuesta semanas de trabajo de varios operarios.",
    solutionTitle: "Carga Autónoma Inteligente vía CSV en Web a Medida",
    approachText: "Implementamos una arquitectura donde transformamos el inventario desordenado en un archivo CSV estructurado. Mediante una lógica de depuración de datos, el sistema lee los productos masivos, asocia imágenes alojadas automáticamente en la nube, y actualiza descripciones y precios en la base de datos de la web a medida en menos de un minuto.",
    appliedSkills: [
      { category: "Operaciones E-commerce", explanation: "Tratamiento de bases de datos masivas mapeadas para actualización veloz." },
      { category: "Digital Solutions", explanation: "Lógica de scripting para evitar intervención humana repetitiva." }
    ],
    impactQuote: "“Dejamos de ser esclavos de la carga manual para convertirnos en estrategas de nuestro inventario.”"
  },
  {
    id: "scen-2",
    businessNeed: "Quiero lanzar un nuevo servicio o software automatizado pero no tengo presupuesto para contratar un equipo de desarrollo de 5 mil dólares al mes.",
    solutionTitle: "Coordinación Ágil con IA y Prototipado Veloz (MVP)",
    approachText: "Diseñamos un flujo de requerimientos de negocios claro y, utilizando inteligencia artificial avanzada como coproductora, armamos la primera versión del sistema operativo en tiempo récord. El software se expone al público para facturar en semanas, validando la demanda antes de gastar recursos de programación profunda.",
    appliedSkills: [
      { category: "Project Management", explanation: "Control estricto del alcance funcional para evitar sobre-costos de programación." },
      { category: "IA Aplicada", explanation: "Utilización de transformadores y generadores de código automatizados para lanzar en tiempo récord." }
    ],
    impactQuote: "“El mercado no valida intenciones o títulos, el mercado valida soluciones reales puestas en marcha.”"
  },
  {
    id: "scen-3",
    businessNeed: "Mis ventas de pauta digital no coinciden con las metas de entrega u operaciones y el equipo interno está en completo conflicto por el desorden.",
    solutionTitle: "Consolidación de Canales de Adquisición con Blueprint de Control",
    approachText: "Se realiza una auditoría completa del viaje del cliente. Sincronizamos las campañas publicitarias con tableros de ClickUp automáticos que guían la producción real, fijando estándares claros de comunicación de equipo para cuidar la energía laboral.",
    appliedSkills: [
      { category: "Estrategia Digital", explanation: "Funnels estructurados donde las promesas de marketing calzan con la capacidad." },
      { category: "Gestión Operativa", explanation: "Entornos de trabajo saludables organizados por prioridades claras y respetuosas." }
    ],
    impactQuote: "“Cuando el equipo sabe qué tiene que hacer, la energía se canaliza en crear valor, no en resolver malentendidos.”"
  }
];
