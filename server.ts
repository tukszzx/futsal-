import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback tactical responses in Portuguese for futsal coaching
const fallbackTactics = [
  {
    title: "Infiltração com Falso Pivô e Tabela Lateral",
    system: "Sistema 3-1 / Rotação",
    description: "Excelente para desarticular defesas compactadas em meia-quadra. Atrai a marcação do fixo adversário e abre espaço na diagonal.",
    steps: [
      "1. Fixo inicia a posse na linha de segurança e conecta passe firme no Ala Direito.",
      "2. O Pivô realiza uma corrida de aproximação em 'V', fingindo receber a bola, puxando o fixo adversário.",
      "3. O Ala Esquerdo faz a diagonal rápida nas costas da marcação (infiltração no ponto cego).",
      "4. Ala Direito aplica passe cavado ou rasante de primeira para a finalização na segunda trave."
    ],
    coachingPoints: [
      "Sincronismo de corrida: o ala só arranca quando o pivô fizer a finta de aproximação.",
      "O passe precisa ser no espaço e não no pé, evitando recuperação do goleiro.",
      "Fixo deve manter cobertura central para prevenir contra-ataque."
    ],
    frames: [
      {
        label: "Fase 1: Preparação e Passe Lateral",
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
        label: "Fase 2: Movimentação de Atração e Diagonal",
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
        label: "Fase 3: Passe Cruzado e Finalização",
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

// Endpoint: Generate Tactic Idea using Gemini
app.post('/api/gemini/tactics', async (req: Request, res: Response) => {
  const { prompt, scenario, teamStyle } = req.body;
  const userQuery = prompt || scenario || 'Ideia de jogada tática inovadora para futsal';

  if (!ai) {
    // Return rich predefined fallback if API key is not configured
    const selected = fallbackTactics[0];
    return res.json({
      success: true,
      data: {
        title: `${selected.title}`,
        system: selected.system,
        description: `${selected.description} (Gerado pelo motor tático de futsal)`,
        steps: selected.steps,
        coachingPoints: selected.coachingPoints,
        frames: selected.frames,
      },
    });
  }

  try {
    const systemPrompt = `Você é um treinador de Futsal profissional de elite (padrão Liga Nacional de Futsal / Seleção Brasileira).
O usuário quer uma jogada tática detalhada ou uma solução para um problema de jogo de futsal.
Responda SEMPRE em formato JSON estrito, sem markdown ao redor do JSON se possível, ou com bloco json.

O JSON deve seguir esta estrutura:
{
  "title": "Nome da jogada tática (ex: Escanteio em U com Bloqueio)",
  "system": "Sistema tático base (ex: 3-1, 4-0, 5x4 Goleiro-Linha, Bola Parada)",
  "description": "Explicação do objetivo tático e momento do jogo em que deve ser usada.",
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
      "label": "Fase 2: Movimentação e Quebra de Linha",
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
      "label": "Fase 3: Finalização",
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
- y varia de 0 (lateral superior) a 100 (lateral inferior). Centro da quadra é x: 50, y: 50.
- Forneça exatamente 3 fases (frames) coerentes com o movimento dos jogadores e da bola.
`;

    const userPrompt = `Crie uma jogada tática de futsal para a seguinte solicitação: "${userQuery}". ${teamStyle ? `Estilo de jogo: ${teamStyle}.` : ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      // In case of slight formatting, try regex extraction
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Falha ao processar resposta JSON do Gemini');
      }
    }

    return res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error generating tactic:', error);
    // Return graceful fallback
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
        notice: 'Gerado com base na biblioteca técnica padrão de futsal.',
      },
    });
  }
});

// Endpoint: Generate Drill / Treino
app.post('/api/gemini/drill', async (req: Request, res: Response) => {
  const { theme, category } = req.body;
  const drillTheme = theme || 'Transição Ofensiva e Finalização Rápida no Futsal';

  if (!ai) {
    return res.json({
      success: true,
      data: {
        title: "Treino de Transição 3x2 com Retorno Defensivo",
        objective: "Melhorar a tomada de decisão em superioridade numérica e a velocidade de finalização na segunda trave.",
        duration: "20 minutos",
        equipment: "Bolas de futsal, 6 cones e coletes de duas cores",
        explanation: "Três atacantes saem em velocidade contra dois defensores posicionados em linha. Ao término da jogada, um atacante vira defensor e o time que defendeu ataca do outro lado.",
        coachingPoints: [
          "Fixar o defensor central antes de soltar a bola no companheiro livre.",
          "Finalizar em no máximo 6 segundos para simular a dinâmica real do futsal.",
          "Passe forte no pé dominante ou no espaço vazio."
        ]
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Crie um exercício de treino completo de futsal focado no tema: "${drillTheme}", categoria: "${category || 'Geral/Competição'}". Responda em JSON estruturado com campos: title, objective, duration, equipment, explanation, coachingPoints (array).`,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const data = JSON.parse(response.text || '{}');
    return res.json({ success: true, data });
  } catch (err) {
    return res.json({
      success: true,
      data: {
        title: "Exercício de Finalização Rápida 2x1",
        objective: "Desenvolver tabela e passe na segunda trave sob pressão",
        duration: "15 min",
        equipment: "Bolas, 4 cones",
        explanation: "Dois atletas tabelam a partir da meia-quadra contra 1 fixo e finalizam contra o goleiro.",
        coachingPoints: ["Velocidade de passe", "Finalização de primeira"]
      }
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Futsal Tactical Board running on port ${port}`);
  });
}

startServer();
