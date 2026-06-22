var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getAi() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("La variable GEMINI_API_KEY no est\xE1 configurada. Por favor, a\xF1\xE1dela en la configuraci\xF3n de Secrets.");
    }
    aiClient = new import_genai.GoogleGenAI({ apiKey });
  }
  return aiClient;
}
app.post("/api/generate-diagnostic", async (req, res) => {
  try {
    const {
      clientCompany,
      clientBizType,
      clientBottleneck,
      clientWastedHours,
      clientTools,
      diagnosticoHourlyCost,
      isUnlocked,
      agentName,
      agentTone,
      agentInstructions,
      agentSkills
    } = req.body;
    const ai = getAi();
    const formattedSkills = Array.isArray(agentSkills) ? agentSkills.map((s) => `- Habilidad: ${s.Habilidad || s.skill || ""} | Categor\xEDa: ${s.Categoria || s.category || ""} | Impacto: ${s.Impacto || s.impact || ""}`).join("\n") : "No se cargaron habilidades adicionales de especializaci\xF3n.";
    const systemPrompt = `Eres un Arquitecto de Soluciones de IA y Consultor de Inteligencia Organizacional.
Tu t\xEDtulo profesional es: "${agentName || "Director de Inteligencia Organizacional"}".
Tu tono de voz y personalidad: "${agentTone || "Anal\xEDtico, de taller, enfocado en resolver fricciones operativas y acelerar el retorno de inversi\xF3n"}".
Tus lineamientos y directivas de entrenamiento adicionales: "${agentInstructions || "Optimizar procesos manuales, automatizar flujos con scripts interconectados y dashboards a medida."}".
Tus habilidades clave cargadas para este diagn\xF3stico son:
${formattedSkills}

Tu misi\xF3n es realizar un an\xE1lisis estrat\xE9gico personalizado bas\xE1ndote en los datos reportados por el cliente de forma detallada, anal\xEDtica e inteligente (sin generalidades clich\xE9s corporativas). Debes entregar:
1. Una arquitectura tecnol\xF3gica recomendada detallada, interactiva y robusta (de unas 2 o 3 oraciones, redactada de forma directa y elegante en espa\xF1ol), que mencione al cliente por su nombre ("${clientCompany || "tu proyecto"}") y resuelva de ra\xEDz su cuello de botella o fricci\xF3n manual expresada: "${clientBottleneck || "ineficiencias operativas"}". Prop\xF3n herramientas concretas o integraciones t\xE9cnicas como scripts, automatizaci\xF3n de bases de datos, webhooks, almacenamiento en la nube o plantillas a medida seg\xFAn tu cat\xE1logo de habilidades.
2. Un plan de acci\xF3n estructurado de 3 fases (Fase 1, Fase 2, Fase 3) que defina la secuencia \xF3ptima para pasar del caos manual al orden automatizado, alineado con las herramientas actuales del cliente: "${clientTools || "registros tradicionales"}" y su modelo de negocio: "${clientBizType}".

Datos provistos para el an\xE1lisis:
- Empresa/Proyecto: "${clientCompany || "tu negocio"}"
- Modelo de Operaci\xF3n: "${clientBizType}"
- Costo operario o de hora: $${diagnosticoHourlyCost || 25} USD/h
- Horas desperdiciadas semanalmente: ${clientWastedHours || 15} hrs/sem
- Principal Cuello de Botella / Fricci\xF3n: "${clientBottleneck || "Procesos manuales ruidosos"}"
- Herramientas usadas actualmente: "${clientTools || "Excel, cuadernos y chats"}"

Debes responder \xDANICAMENTE con un objeto JSON v\xE1lido que encaje perfectamente con este esquema:
{
  "architecture": "Redacci\xF3n de la propuesta de arquitectura tecnol\xF3gica y flujos integrados a medida en espa\xF1ol.",
  "fases": [
    {
      "title": "Fase 01: [T\xEDtulo descriptivo personalizado en espa\xF1ol]",
      "desc": "Descripci\xF3n detallada de las acciones iniciales de depuraci\xF3n estructural."
    },
    {
      "title": "Fase 02: [T\xEDtulo descriptivo personalizado en espa\xF1ol]",
      "desc": "Descripci\xF3n detallada del desarrollo del motor de automatizaci\xF3n sincr\xF3nico o m\xF3dulo principal."
    },
    {
      "title": "Fase 03: [T\xEDtulo descriptivo personalizado en espa\xF1ol]",
      "desc": "Descripci\xF3n detallada del despliegue final, controles visuales en vivo y reportes de rentabilidad."
    }
  ]
}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: "Genera el diagn\xF3stico estrat\xE9gico inteligente para mi empresa seg\xFAn tus habilidades aplicables." }] }
      ],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.75
      }
    });
    const parsedOutput = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      data: parsedOutput
    });
  } catch (error) {
    console.error("Gemini API Diagnostic Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error al generar el diagn\xF3stico inteligente."
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running fully backend integrated on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
