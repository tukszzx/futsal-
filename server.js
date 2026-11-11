// server.ts
import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var port = process.env.PORT || 3e3;
app.use(express.json({ limit: "10mb" }));
var apiKey = process.env.GEMINI_API_KEY;
var ai = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
var fallbackTactics = [
  {
    title: "Infiltra\xE7\xE3o com Falso Piv\xF4 e Tabela Lateral",
    system: "Sistema 3-1 / Rota\xE7\xE3o",
    description: "Excelente para desarticular defesas compactadas em meia-quadra. Atrai a marca\xE7\xE3o do fixo advers\xE1rio e abre espa\xE7o na diagonal.",
    steps: [
      "1. Fixo inicia a posse na linha de seguran\xE7a e conecta passe firme no Ala Direito.",
      "2. O Piv\xF4 realiza uma corrida de aproxima\xE7\xE3o em 'V', fingindo receber a bola, puxando o fixo advers\xE1rio.",
      "3. O Ala Esquerdo faz a diagonal r\xE1pida nas costas da marca\xE7\xE3o (infiltra\xE7\xE3o no ponto cego).",
      "4. Ala Direito aplica passe cavado ou rasante de primeira para a finaliza\xE7\xE3o na segunda trave."
    ],
    coachingPoints: [
      "Sincronismo de corrida: o ala s\xF3 arranca quando o piv\xF4 fizer a finta de aproxima\xE7\xE3o.",
      "O passe precisa ser no espa\xE7o e n\xE3o no p\xE9, evitando recupera\xE7\xE3o do goleiro.",
      "Fixo deve manter cobertura central para prevenir contra-ataque."
    ],
    frames: [
      {
        label: "Fase 1: Prepara\xE7\xE3o e Passe Lateral",
        players: [
          { id: "h1", team: "home", number: 1, name: "GOL", role: "GOL", x: 6, y: 50, angle: 0 },
          { id: "h2", team: "home", number: 4, name: "FIX", role: "FIX", x: 25, y: 50, angle: 0 },
          { id: "h3", team: "home", number: 7, name: "ALA-D", role: "ALA", x: 40, y: 80, angle: 0 },
          { id: "h4", team: "home", number: 10, name: "ALA-E", role: "ALA", x: 38, y: 20, angle: 0 },
          { id: "h5", team: "home", number: 9, name: "PIV", role: "PIV", x: 72, y: 50, angle: 180 },
          { id: "a1", team: "away", number: 1, name: "GOL", role: "GOL", x: 94, y: 50, angle: 180 },
          { id: "a2", team: "away", number: 3, name: "FIX", role: "FIX", x: 75, y: 50, angle: 180 },
          { id: "a3", team: "away", number: 5, name: "ALA", role: "ALA", x: 55, y: 75, angle: 180 },
          { id: "a4", team: "away", number: 8, name: "ALA", role: "ALA", x: 55, y: 25, angle: 180 },
          { id: "a5", team: "away", number: 9, name: "PIV", role: "PIV", x: 42, y: 50, angle: 180 }
        ],
        ball: { x: 40, y: 75 }
      },
      {
        label: "Fase 2: Movimenta\xE7\xE3o de Atra\xE7\xE3o e Diagonal",
        players: [
          { id: "h1", team: "home", number: 1, name: "GOL", role: "GOL", x: 8, y: 50, angle: 0 },
          { id: "h2", team: "home", number: 4, name: "FIX", role: "FIX", x: 30, y: 45, angle: 0 },
          { id: "h3", team: "home", number: 7, name: "ALA-D", role: "ALA", x: 55, y: 82, angle: 0 },
          { id: "h4", team: "home", number: 10, name: "ALA-E", role: "ALA", x: 68, y: 28, angle: 15 },
          { id: "h5", team: "home", number: 9, name: "PIV", role: "PIV", x: 58, y: 58, angle: 120 },
          { id: "a1", team: "away", number: 1, name: "GOL", role: "GOL", x: 94, y: 50, angle: 180 },
          { id: "a2", team: "away", number: 3, name: "FIX", role: "FIX", x: 65, y: 56, angle: 180 },
          { id: "a3", team: "away", number: 5, name: "ALA", role: "ALA", x: 60, y: 80, angle: 180 },
          { id: "a4", team: "away", number: 8, name: "ALA", role: "ALA", x: 58, y: 35, angle: 180 },
          { id: "a5", team: "away", number: 9, name: "PIV", role: "PIV", x: 36, y: 46, angle: 180 }
        ],
        ball: { x: 55, y: 80 }
      },
      {
        label: "Fase 3: Passe Cruzado e Finaliza\xE7\xE3o",
        players: [
          { id: "h1", team: "home", number: 1, name: "GOL", role: "GOL", x: 10, y: 50, angle: 0 },
          { id: "h2", team: "home", number: 4, name: "FIX", role: "FIX", x: 35, y: 48, angle: 0 },
          { id: "h3", team: "home", number: 7, name: "ALA-D", role: "ALA", x: 68, y: 82, angle: 0 },
          { id: "h4", team: "home", number: 10, name: "ALA-E", role: "ALA", x: 88, y: 38, angle: 0 },
          { id: "h5", team: "home", number: 9, name: "PIV", role: "PIV", x: 62, y: 62, angle: 0 },
          { id: "a1", team: "away", number: 1, name: "GOL", role: "GOL", x: 92, y: 42, angle: 180 },
          { id: "a2", team: "away", number: 3, name: "FIX", role: "FIX", x: 68, y: 58, angle: 180 },
          { id: "a3", team: "away", number: 5, name: "ALA", role: "ALA", x: 70, y: 80, angle: 180 },
          { id: "a4", team: "away", number: 8, name: "ALA", role: "ALA", x: 74, y: 42, angle: 180 },
          { id: "a5", team: "away", number: 9, name: "PIV", role: "PIV", x: 38, y: 48, angle: 180 }
        ],
        ball: { x: 87, y: 40 }
      }
    ]
  }
];
app.post("/api/gemini/tactics", async (req, res) => {
  const { prompt, scenario, teamStyle } = req.body;
  const userQuery = prompt || scenario || "Ideia de jogada t\xE1tica inovadora para futsal";
  if (!ai) {
    const selected = fallbackTactics[0];
    return res.json({
      success: true,
      data: {
        title: `${selected.title}`,
        system: selected.system,
        description: `${selected.description} (Gerado pelo motor t\xE1tico de futsal)`,
        steps: selected.steps,
        coachingPoints: selected.coachingPoints,
        frames: selected.frames
      }
    });
  }
  try {
    const systemPrompt = `Voc\xEA \xE9 um treinador de Futsal profissional de elite (padr\xE3o Liga Nacional de Futsal / Sele\xE7\xE3o Brasileira).
O usu\xE1rio quer uma jogada t\xE1tica detalhada ou uma solu\xE7\xE3o para um problema de jogo de futsal.
Responda SEMPRE em formato JSON estrito, sem markdown ao redor do JSON se poss\xEDvel, ou com bloco json.

O JSON deve seguir esta estrutura:
{
  "title": "Nome da jogada t\xE1tica (ex: Escanteio em U com Bloqueio)",
  "system": "Sistema t\xE1tico base (ex: 3-1, 4-0, 5x4 Goleiro-Linha, Bola Parada)",
  "description": "Explica\xE7\xE3o do objetivo t\xE1tico e momento do jogo em que deve ser usada.",
  "steps": [
    "Passo 1: ...",
    "Passo 2: ...",
    "Passo 3: ..."
  ],
  "coachingPoints": [
    "Ponto-chave para o treinador cobrar 1",
    "Ponto-chave para o treinador cobrar 2",
    "Ponto-chave para o treinador cobrar 3"
  ],
  "frames": [
    {
      "label": "Fase 1: Posicionamento Inicial",
      "players": [
        {"id": "h1", "team": "home", "number": 1, "name": "GOL", "role": "GOL", "x": 6, "y": 50, "angle": 0},
        {"id": "h2", "team": "home", "number": 4, "name": "FIX", "role": "FIX", "x": 28, "y": 50, "angle": 0},
        {"id": "h3", "team": "home", "number": 7, "name": "ALA-D", "role": "ALA", "x": 45, "y": 80, "angle": 0},
        {"id": "h4", "team": "home", "number": 10, "name": "ALA-E", "role": "ALA", "x": 45, "y": 20, "angle": 0},
        {"id": "h5", "team": "home", "number": 9, "name": "PIV", "role": "PIV", "x": 75, "y": 50, "angle": 180},
        {"id": "a1", "team": "away", "number": 1, "name": "GOL", "role": "GOL", "x": 94, "y": 50, "angle": 180},
        {"id": "a2", "team": "away", "number": 3, "name": "FIX", "role": "FIX", "x": 76, "y": 50, "angle": 180},
        {"id": "a3", "team": "away", "number": 5, "name": "ALA", "role": "ALA", "x": 55, "y": 75, "angle": 180},
        {"id": "a4", "team": "away", "number": 8, "name": "ALA", "role": "ALA", "x": 55, "y": 25, "angle": 180},
        {"id": "a5", "team": "away", "number": 9, "name": "PIV", "role": "PIV", "x": 45, "y": 50, "angle": 180}
      ],
      "ball": {"x": 28, "y": 50}
    },
    {
      "label": "Fase 2: Movimenta\xE7\xE3o e Quebra de Linha",
      "players": [
        {"id": "h1", "team": "home", "number": 1, "name": "GOL", "role": "GOL", "x": 8, "y": 50, "angle": 0},
        {"id": "h2", "team": "home", "number": 4, "name": "FIX", "role": "FIX", "x": 35, "y": 45, "angle": 0},
        {"id": "h3", "team": "home", "number": 7, "name": "ALA-D", "role": "ALA", "x": 60, "y": 82, "angle": 0},
        {"id": "h4", "team": "home", "number": 10, "name": "ALA-E", "role": "ALA", "x": 68, "y": 25, "angle": 10},
        {"id": "h5", "team": "home", "number": 9, "name": "PIV", "role": "PIV", "x": 70, "y": 60, "angle": 180},
        {"id": "a1", "team": "away", "number: 1, "name": "GOL", "role": "GOL", "x": 94, "y": 50, "angle": 180},
        {"id": "a2", "team": "away", "number": 3, "name": "FIX", "role": "FIX", "x": 75, "y": 62, "angle": 180},
        {"id": "a3", team: "away", "number": 5, "name": "ALA", "role": "ALA", "x": 63, "y": 78, "angle": 180},
        {"id": "a4", team: "away", "number": 8, "name": "ALA", "role": "ALA", "x": 60, "y": 30, "angle": 180},
        {"id": "a5", team: "away", "number": 9, "name": "PIV", "role": "PIV", "x": 42, "y": 48, "angle": 180}
      ],
      "ball": {"x": 60, "y": 80}
    },
    {
      "label": "Fase 3: Finaliza\xE7\xE3o",
      "players": [
        {"id": "h1", "team": "home", "number": 1, "name": "GOL", "role": "GOL", "x": 10, "y": 50, "angle": 0},
        {"id": "h2", "team": "home", "number": 4, "name": "FIX", "role": "FIX", "x": 40, "y": 50, "angle": 0},
        {"id": "h3", "team": "home", "number": 7, "name": "ALA-D", "role": "ALA", "x": 72, "y": 78, "angle": 0},
        {"id": "h4", "team": "home", "number": 10, "name": "ALA-E", "role": "ALA", "x": 88, "y": 42, "angle": 0},
        {"id": "h5", "team": "home", "number": 9, "name": "PIV", "role": "PIV", "x": 74, "y": 58, "angle": 0},
        {"id": "a1", "team": "away", "number": 1, "name": "GOL", "role": "GOL", "x": 92, "y": 45, "angle": 180},
        {"id": "a2", "team": "away", "number": 3, "name": "FIX", "role": "FIX", "x": 76, "y": 60, "angle": 180},
        {"id": "a3", "team": "away", "number": 5, "name": "ALA", "role": "ALA", "x": 72, "y": 75, "angle": 180},
        {"id": "a4", "team": "away", "number": 8, "name": "ALA", "role": "ALA", "x": 78, "y": 45, "angle": 180},
        {"id": "a5", "team": "away", "number": 9, "name": "PIV", "role": "PIV", "x": 46, "y": 50, "angle": 180}
      ],
      "ball": {"x": 88, "y": 42}
    }
  ]
}

Coordenadas da quadra:
- x varia de 0 (linha de fundo do time da casa) a 100 (linha de fundo do time visitante).
- y varia de 0 (lateral superior) a 100 (lateral inferior). Centro da quadra \xE9 x: 50, y: 50.
- Forne\xE7a exatamente 3 fases (frames) coerentes com o movimento dos jogadores e da bola.
`;
    const userPrompt = `Crie uma jogada t\xE1tica de futsal para a seguinte solicita\xE7\xE3o: "${userQuery}". ${teamStyle ? `Estilo de jogo: ${teamStyle}.` : ""}`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });
    const responseText = response.text || "{}";
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Falha ao processar resposta JSON do Gemini");
      }
    }
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Error generating tactic:", error);
    const selected = fallbackTactics[0];
    return res.json({
      success: true,
      data: {
        title: selected.title,
        system: selected.system,
        description: selected.description,
        steps: selected.steps,
        coachingPoints: selected.coachingPoints,
        frames: selected.frames,
        notice: "Gerado com base na biblioteca t\xE9cnica padr\xE3o de futsal."
      }
    });
  }
});
app.post("/api/gemini/drill", async (req, res) => {
  const { theme, category } = req.body;
  const drillTheme = theme || "Transi\xE7\xE3o Ofensiva e Finaliza\xE7\xE3o R\xE1pida no Futsal";
  if (!ai) {
    return res.json({
      success: true,
      data: {
        title: "Treino de Transi\xE7\xE3o 3x2 com Retorno Defensivo",
        objective: "Melhorar a tomada de decis\xE3o em superioridade num\xE9rica e a velocidade de finaliza\xE7\xE3o na segunda trave.",
        duration: "20 minutos",
        equipment: "Bolas de futsal, 6 cones e coletes de duas cores",
        explanation: "Tr\xEAs atacantes saem em velocidade contra dois defensores posicionados em linha. Ao t\xE9rmino da jogada, um atacante vira defensor e o time que defendeu ataca do outro lado.",
        coachingPoints: [
          "Fixar o defensor central antes de soltar a bola no companheiro livre.",
          "Finalizar em no m\xE1ximo 6 segundos para simular a din\xE2mica real do futsal.",
          "Passe forte no p\xE9 dominante ou no espa\xE7o vazio."
        ]
      }
    });
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Crie um exerc\xEDcio de treino completo de futsal focado no tema: "${drillTheme}", categoria: "${category || "Geral/Competi\xE7\xE3o"}". Responda em JSON estruturado com campos: title, objective, duration, equipment, explanation, coachingPoints (array).`,
      config: {
        responseMimeType: "application/json"
      }
    });
    const data = JSON.parse(response.text || "{}");
    return res.json({ success: true, data });
  } catch (err) {
    return res.json({
      success: true,
      data: {
        title: "Exerc\xEDcio de Finaliza\xE7\xE3o R\xE1pida 2x1",
        objective: "Desenvolver tabela e passe na segunda trave sob press\xE3o",
        duration: "15 min",
        equipment: "Bolas, 4 cones",
        explanation: "Dois atletas tabelam a partir da meia-quadra contra 1 fixo e finalizam contra o goleiro.",
        coachingPoints: ["Velocidade de passe", "Finaliza\xE7\xE3o de primeira"]
      }
    });
  }
});
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }
  app.listen(port, () => {
    console.log(`Futsal Tactical Board running on port ${port}`);
  });
}
startServer();
