import React, { useState } from 'react';
import {
  MousePointer,
  ArrowRight,
  Split,
  Activity,
  Minus,
  PenTool,
  Square,
  Type,
  Eraser,
  RotateCcw,
  Plus,
  Layers,
  Settings2,
  Sparkles,
  BookOpen,
  Save,
  Download,
  Trash2,
  Eye,
  Shield,
  CircleDot
} from 'lucide-react';
import { ToolMode, CourtType, CourtView, BoardSettings, PlayerRole } from '../types/tactics';

interface ToolbarProps {
  toolMode: ToolMode;
  onSelectTool: (mode: ToolMode) => void;
  activeColor: string;
  onSelectColor: (color: string) => void;
  settings: BoardSettings;
  onUpdateSettings: (settings: Partial<BoardSettings>) => void;
  onAddPlayer: (team: 'home' | 'away', role: PlayerRole, isGoalkeeper?: boolean, isLineGoalkeeper?: boolean) => void;
  onAddEquipment: (type: 'cone' | 'barrier' | 'mini_goal') => void;
  onClearAnnotations: () => void;
  onResetPositions: () => void;
  onOpenTacticsLibrary: () => void;
  onOpenAIAssistant: () => void;
  onOpenPlaybook: () => void;
  onExportPNG: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  toolMode,
  onSelectTool,
  activeColor,
  onSelectColor,
  settings,
  onUpdateSettings,
  onAddPlayer,
  onAddEquipment,
  onClearAnnotations,
  onResetPositions,
  onOpenTacticsLibrary,
  onOpenAIAssistant,
  onOpenPlaybook,
  onExportPNG,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const colors = [
    { name: 'Amarelo', hex: '#f59e0b' },
    { name: 'Azul Claro', hex: '#38bdf8' },
    { name: 'Branco', hex: '#ffffff' },
    { name: 'Vermelho', hex: '#ef4444' },
    { name: 'Verde', hex: '#10b981' },
    { name: 'Roxo', hex: '#a855f7' },
  ];

  const tools: { id: ToolMode; label: string; icon: React.ReactNode; tooltip: string }[] = [
    { id: 'select', label: 'Mover', icon: <MousePointer className="w-4 h-4" />, tooltip: 'Selecionar e mover jogadores ou bola' },
    { id: 'arrow_move', label: 'Corrida', icon: <ArrowRight className="w-4 h-4" />, tooltip: 'Seta de movimentação ou corrida do atleta' },
    { id: 'arrow_pass', label: 'Passe/Chute', icon: <Split className="w-4 h-4" />, tooltip: 'Linha tracejada de passe ou finalização' },
    { id: 'arrow_dribble', label: 'Condução', icon: <Activity className="w-4 h-4" />, tooltip: 'Linha ondulada de drible ou condução de bola' },
    { id: 'arrow_block', label: 'Corta-Luz', icon: <Minus className="w-4 h-4 rotate-90" />, tooltip: 'Bloqueio tático / Corta-luz (barra T)' },
    { id: 'pen', label: 'Caneta', icon: <PenTool className="w-4 h-4" />, tooltip: 'Desenho livre à mão sobre a quadra' },
    { id: 'zone', label: 'Zona', icon: <Square className="w-4 h-4" />, tooltip: 'Destacar área ou zona tática' },
    { id: 'text', label: 'Nota', icon: <Type className="w-4 h-4" />, tooltip: 'Inserir texto explicativo na quadra' },
    { id: 'eraser', label: 'Borracha', icon: <Eraser className="w-4 h-4" />, tooltip: 'Apagar setas ou desenhos com um clique' },
  ];

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800 px-3 py-2 flex flex-wrap items-center justify-between gap-3 text-sm select-none backdrop-blur-md">
      {/* Left: Tools Segmented Control */}
      <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
          {tools.map((t) => {
            const isActive = toolMode === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTool(t.id)}
                title={t.tooltip}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1 ml-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
          {colors.map((c) => (
            <button
              key={c.hex}
              onClick={() => onSelectColor(c.hex)}
              title={c.name}
              className={`w-5 h-5 rounded-full transition-transform ${
                activeColor === c.hex ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-slate-900' : 'hover:scale-110 opacity-80'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Right: Actions, Add Menu, Tactical Ideas & AI */}
      <div className="flex items-center gap-2">
        {/* Add Entity Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-700"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Adicionar</span>
          </button>

          {showAddMenu && (
            <div
              className="absolute right-0 top-full mt-1.5 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 p-2 space-y-1"
              onMouseLeave={() => setShowAddMenu(false)}
            >
              <div className="text-[11px] font-semibold text-slate-400 px-2 py-1">Time Mandante (Azul)</div>
              <button
                onClick={() => {
                  onAddPlayer('home', 'ALA');
                  setShowAddMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between"
              >
                <span>Jogador de Linha</span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              </button>
              <button
                onClick={() => {
                  onAddPlayer('home', 'GOL', true);
                  setShowAddMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between"
              >
                <span>Goleiro Mandante</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </button>
              <button
                onClick={() => {
                  onAddPlayer('home', 'GL', false, true);
                  setShowAddMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between"
              >
                <span>Goleiro-Linha (Colete)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              </button>

              <div className="border-t border-slate-800 my-1 pt-1 text-[11px] font-semibold text-slate-400 px-2 py-1">
                Time Adversário (Vermelho)
              </div>
              <button
                onClick={() => {
                  onAddPlayer('away', 'ALA');
                  setShowAddMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between"
              >
                <span>Jogador Adversário</span>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              </button>

              <div className="border-t border-slate-800 my-1 pt-1 text-[11px] font-semibold text-slate-400 px-2 py-1">
                Acessórios de Treino
              </div>
              <button
                onClick={() => {
                  onAddEquipment('cone');
                  setShowAddMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
              >
                <span className="text-amber-500">▲</span> Cone de Agilidade
              </button>
              <button
                onClick={() => {
                  onAddEquipment('barrier');
                  setShowAddMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-slate-400" /> Barreira Defensiva
              </button>
              <button
                onClick={() => {
                  onAddEquipment('mini_goal');
                  setShowAddMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
              >
                <Square className="w-3.5 h-3.5 text-slate-400" /> Mini Gol / Alvo
              </button>
            </div>
          )}
        </div>

        {/* Tactical Ideas Library Button */}
        <button
          onClick={onOpenTacticsLibrary}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ideias de Táticas</span>
        </button>

        {/* AI Assistant Button */}
        <button
          onClick={onOpenAIAssistant}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs shadow-md transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>IA Tática</span>
        </button>

        {/* Playbook / Save / Export */}
        <button
          onClick={onOpenPlaybook}
          title="Minhas Jogadas Salvas"
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
        >
          <Save className="w-4 h-4" />
        </button>

        {/* Export Image */}
        <button
          onClick={onExportPNG}
          title="Exportar Prancheta em Imagem PNG"
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Clear Annotations */}
        <button
          onClick={onClearAnnotations}
          title="Limpar Setas e Desenhos"
          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Reset Positions */}
        <button
          onClick={onResetPositions}
          title="Reiniciar Posicionamento Base"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Board Settings & Court Theme Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            title="Configurações da Quadra"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {showSettingsMenu && (
            <div
              className="absolute right-0 top-full mt-1.5 w-60 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 p-3 space-y-3 text-xs"
              onMouseLeave={() => setShowSettingsMenu(false)}
            >
              <div>
                <div className="font-semibold text-slate-300 mb-1.5">Piso da Quadra</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'blue', label: 'Azul LNFS' },
                    { id: 'wood', label: 'Madeira Parquet' },
                    { id: 'green', label: 'Verde Clássico' },
                    { id: 'dark', label: 'Prancheta Negra' },
                  ].map((ct) => (
                    <button
                      key={ct.id}
                      onClick={() => onUpdateSettings({ courtType: ct.id as CourtType })}
                      className={`px-2 py-1 rounded text-center transition-colors ${
                        settings.courtType === ct.id
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-2">
                <div className="font-semibold text-slate-300 mb-1.5">Enquadramento</div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'full', label: 'Completa' },
                    { id: 'half_attack', label: 'Ataque' },
                    { id: 'half_defense', label: 'Defesa' },
                  ].map((cv) => (
                    <button
                      key={cv.id}
                      onClick={() => onUpdateSettings({ courtView: cv.id as CourtView })}
                      className={`px-1.5 py-1 rounded text-center transition-colors text-[11px] ${
                        settings.courtView === cv.id
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {cv.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-2 space-y-1.5">
                <div className="font-semibold text-slate-300">Exibição de Jogadores</div>
                <label className="flex items-center justify-between cursor-pointer text-slate-300">
                  <span>Exibir Nomes</span>
                  <input
                    type="checkbox"
                    checked={settings.showPlayerNames}
                    onChange={(e) => onUpdateSettings({ showPlayerNames: e.target.checked })}
                    className="accent-amber-500"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer text-slate-300">
                  <span>Exibir Números (ou Função)</span>
                  <input
                    type="checkbox"
                    checked={settings.showPlayerNumbers}
                    onChange={(e) => onUpdateSettings({ showPlayerNumbers: e.target.checked })}
                    className="accent-amber-500"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
