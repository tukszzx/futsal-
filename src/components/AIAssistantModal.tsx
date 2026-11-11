import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Play,
  Send,
  Loader2,
  Lightbulb,
  CheckCircle2,
  Dumbbell,
  Compass,
  AlertCircle
} from 'lucide-react';
import { Play as PlayType, Frame, Player } from '../types/tactics';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGeneratedPlay: (play: PlayType) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplyGeneratedPlay,
}) => {
  const [activeTab, setActiveTab] = useState<'tactics' | 'drill'>('tactics');
  const [promptInput, setPromptInput] = useState('');
  const [teamStyle, setTeamStyle] = useState('Ofensivo com pivô de referência');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Generated tactic state
  const [generatedTactic, setGeneratedTactic] = useState<{
    title: string;
    system: string;
    description: string;
    steps: string[];
    coachingPoints: string[];
    frames?: any[];
  } | null>(null);

  // Generated drill state
  const [generatedDrill, setGeneratedDrill] = useState<{
    title: string;
    objective: string;
    duration: string;
    equipment: string;
    explanation: string;
    coachingPoints: string[];
  } | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    'Como furar uma defesa em losango 1-2-1 bem recuada?',
    'Jogada de escanteio surpresa com bloqueio e chute de primeira',
    'Goleiro-Linha (5x4) para virar jogo nos minutos finais',
    'Saída de pressão rápida quando o adversário marca homem-a-homem',
    'Jogada ensaiada de falta frontal com toque curto e finalização cruzada',
    'Ataque 4-0 contra fixo adversário pesado e lento',
  ];

  const quickDrillThemes = [
    'Transição ofensiva 3x2 e retorno defensivo',
    'Finalização rápida na segunda trave sob pressão',
    'Treino de 1x1 na ala com pivô de apoio',
    'Tomada de decisão rápida em superioridade numérica',
    'Cobertura defensiva e dobra de marcação na lateral',
  ];

  const handleGenerateTactic = async (queryText?: string) => {
    const q = queryText || promptInput;
    if (!q.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/tactics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q, teamStyle }),
      });

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        setGeneratedTactic(resJson.data);
      } else {
        setErrorMsg('Não foi possível gerar a tática no momento. Tente novamente.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Erro de conexão ao gerar tática. O sistema utilizou o motor padrão.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateDrill = async (themeText?: string) => {
    const t = themeText || promptInput;
    if (!t.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: t }),
      });

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        setGeneratedDrill(resJson.data);
      } else {
        setErrorMsg('Não foi possível gerar o exercício no momento.');
      }
    } catch (err) {
      setErrorMsg('Erro de conexão ao gerar treino.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToBoard = () => {
    if (!generatedTactic) return;

    // Build playable Play object from AI frames or default fallback frames
    const frames: Frame[] = (generatedTactic.frames && generatedTactic.frames.length > 0
      ? generatedTactic.frames
      : [
          {
            label: 'Passo 1: Posicionamento Inicial',
            players: [
              { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 8, y: 50, angle: 0, isGoalkeeper: true },
              { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 28, y: 50, angle: 0 },
              { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 45, y: 80, angle: 0 },
              { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 45, y: 20, angle: 0 },
              { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 75, y: 50, angle: 180 },
              { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 94, y: 50, angle: 180, isGoalkeeper: true },
              { id: 'a2', team: 'away', number: 3, name: 'DEF', role: 'FIX', x: 76, y: 50, angle: 180 },
              { id: 'a3', team: 'away', number: 5, name: 'DEF', role: 'ALA', x: 55, y: 75, angle: 180 },
              { id: 'a4', team: 'away', number: 8, name: 'DEF', role: 'ALA', x: 55, y: 25, angle: 180 },
              { id: 'a5', team: 'away', number: 9, name: 'DEF', role: 'PIV', x: 45, y: 50, angle: 180 }
            ],
            ball: { x: 28, y: 50 },
          },
          {
            label: 'Passo 2: Movimentação de Quebra',
            players: [
              { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 10, y: 50, angle: 0, isGoalkeeper: true },
              { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 38, y: 45, angle: 0 },
              { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 65, y: 80, angle: 0 },
              { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 70, y: 25, angle: 15 },
              { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 72, y: 58, angle: 140 },
              { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 93, y: 50, angle: 180, isGoalkeeper: true },
              { id: 'a2', team: 'away', number: 3, name: 'DEF', role: 'FIX', x: 76, y: 60, angle: 180 },
              { id: 'a3', team: 'away', number: 5, name: 'DEF', role: 'ALA', x: 65, y: 76, angle: 180 },
              { id: 'a4', team: 'away', number: 8, name: 'DEF', role: 'ALA', x: 62, y: 32, angle: 180 },
              { id: 'a5', team: 'away', number: 9, name: 'DEF', role: 'PIV', x: 44, y: 48, angle: 180 }
            ],
            ball: { x: 65, y: 80 },
          },
          {
            label: 'Passo 3: Finalização na 2ª Trave',
            players: [
              { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 12, y: 50, angle: 0, isGoalkeeper: true },
              { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 42, y: 48, angle: 0 },
              { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 78, y: 78, angle: 0 },
              { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 88, y: 36, angle: 0 },
              { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 75, y: 56, angle: 0 },
              { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 91, y: 44, angle: 180, isGoalkeeper: true },
              { id: 'a2', team: 'away', number: 3, name: 'DEF', role: 'FIX', x: 78, y: 58, angle: 180 },
              { id: 'a3', team: 'away', number: 5, name: 'DEF', role: 'ALA', x: 72, y: 72, angle: 180 },
              { id: 'a4', team: 'away', number: 8, name: 'DEF', role: 'ALA', x: 76, y: 42, angle: 180 },
              { id: 'a5', team: 'away', number: 9, name: 'DEF', role: 'PIV', x: 48, y: 50, angle: 180 }
            ],
            ball: { x: 88, y: 36 },
          }
        ]
    ).map((f: any, idx: number) => ({
      id: `ai-frame-${idx}-${Date.now()}`,
      label: f.label || `Passo ${idx + 1}`,
      durationMs: 2500,
      coachNote: generatedTactic.steps[idx] || f.coachNote || 'Executar em sincronia',
      players: f.players.map((p: any) => ({
        ...p,
        isGoalkeeper: p.role === 'GOL',
        isLineGoalkeeper: p.role === 'GL',
      })),
      ball: f.ball || { x: 50, y: 50 },
      equipments: [],
      arrows: [],
      drawings: [],
      zones: [],
      notes: [],
    }));

    const newPlay: PlayType = {
      id: `ai-play-${Date.now()}`,
      title: generatedTactic.title,
      category: 'Personalizada',
      description: generatedTactic.description,
      coachingPoints: generatedTactic.coachingPoints,
      courtType: 'blue',
      courtView: 'full',
      frames,
      tags: ['IA', generatedTactic.system, 'Jogada Especial'],
      createdAt: new Date().toISOString(),
    };

    onApplyGeneratedPlay(newPlay);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Assistente Tático de Futsal com IA
              </h2>
              <p className="text-xs text-slate-400">
                Gere jogadas ensaiadas personalizadas, soluções táticas e treinos para a sua equipe
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('tactics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'tactics'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Criar Tática</span>
            </button>
            <button
              onClick={() => setActiveTab('drill')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'drill'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Gerar Treino</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Prompt Input Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>
                  {activeTab === 'tactics'
                    ? 'Descreva o cenário ou jogada que você deseja criar:'
                    : 'Qual o tema ou foco do exercício de treino?'}
                </span>
              </label>

              {activeTab === 'tactics' && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Estilo:</span>
                  <select
                    value={teamStyle}
                    onChange={(e) => setTeamStyle(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-300 text-xs focus:outline-none"
                  >
                    <option value="Ofensivo com pivô de referência">Sistema 3-1 com Pivô</option>
                    <option value="Linha de 4 com rotação constante">Sistema 4-0 sem Pivô</option>
                    <option value="Superioridade 5x4 Goleiro-Linha">Goleiro-Linha (5x4)</option>
                    <option value="Marcação Alta e Transição Rápida">Pressão Alta</option>
                    <option value="Bola Parada Ensaiada">Bola Parada</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={
                  activeTab === 'tactics'
                    ? 'Ex: Como furar defesa compacta em losango com passe na paralela...'
                    : 'Ex: Treino de finalização rápida 2x1 com retorno do fixo...'
                }
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (activeTab === 'tactics') handleGenerateTactic();
                    else handleGenerateDrill();
                  }
                }}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => {
                  if (activeTab === 'tactics') handleGenerateTactic();
                  else handleGenerateDrill();
                }}
                disabled={isLoading || !promptInput.trim()}
                className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl shadow-md transition-all shrink-0"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Gerar com IA</span>
              </button>
            </div>

            {/* Quick Prompts Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-slate-400">Sugestões rápidas de táticas:</span>
              <div className="flex flex-wrap gap-1.5">
                {(activeTab === 'tactics' ? quickPrompts : quickDrillThemes).map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPromptInput(qp);
                      if (activeTab === 'tactics') handleGenerateTactic(qp);
                      else handleGenerateDrill(qp);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60 text-left"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error notice if any */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Results: Generated Tactic Display */}
          {activeTab === 'tactics' && generatedTactic && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-5 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    {generatedTactic.system}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{generatedTactic.title}</h3>
                </div>

                <button
                  onClick={handleApplyToBoard}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition-transform hover:scale-105 shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Carregar na Mesa Tática</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white block mb-1">Conceito Tático:</span>
                {generatedTactic.description}
              </div>

              {/* Step by step */}
              <div>
                <h4 className="text-xs font-bold uppercase text-amber-400 mb-2.5">
                  Movimentação dos Atletas Passo a Passo:
                </h4>
                <div className="space-y-2">
                  {generatedTactic.steps.map((st, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <div className="leading-relaxed">{st}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coaching Keys */}
              {generatedTactic.coachingPoints && generatedTactic.coachingPoints.length > 0 && (
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50">
                  <h4 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pontos de Atenção para o Treinador:</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {generatedTactic.coachingPoints.map((cp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{cp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Results: Generated Drill Display */}
          {activeTab === 'drill' && generatedDrill && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-5 animate-in fade-in duration-300">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Exercício de Futsal
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Duração: {generatedDrill.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{generatedDrill.title}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-slate-400 block mb-1">Objetivo do Treino:</span>
                  <span className="text-slate-200">{generatedDrill.objective}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-slate-400 block mb-1">Materiais Necessários:</span>
                  <span className="text-slate-200">{generatedDrill.equipment}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white block mb-1">Como Executar na Quadra:</span>
                {generatedDrill.explanation}
              </div>

              {generatedDrill.coachingPoints && generatedDrill.coachingPoints.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50">
                  <h4 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Correções Táticas e Feedback do Treinador:</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {generatedDrill.coachingPoints.map((cp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{cp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
