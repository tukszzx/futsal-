import React from 'react';
import { X, Trash2, RotateCw, User, ShieldCheck } from 'lucide-react';
import { Player, PlayerRole } from '../types/tactics';

interface PlayerEditorModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlayer: (updated: Player) => void;
  onDeletePlayer: (id: string) => void;
}

export const PlayerEditorModal: React.FC<PlayerEditorModalProps> = ({
  player,
  isOpen,
  onClose,
  onUpdatePlayer,
  onDeletePlayer,
}) => {
  if (!isOpen || !player) return null;

  const roles: { id: PlayerRole; label: string }[] = [
    { id: 'GOL', label: 'Goleiro' },
    { id: 'FIX', label: 'Fixo' },
    { id: 'ALA', label: 'Ala' },
    { id: 'PIV', label: 'Pivô' },
    { id: 'GL', label: 'Goleiro-Linha' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-2xl shadow-2xl p-5 text-slate-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
              style={{
                backgroundColor:
                  player.team === 'home'
                    ? player.isLineGoalkeeper
                      ? '#facc15'
                      : '#0284c7'
                    : '#e11d48',
                color: player.isLineGoalkeeper ? '#000000' : '#ffffff',
              }}
            >
              {player.number}
            </div>
            <h3 className="text-sm font-bold text-white">Editar Jogador</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Player Name */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Nome / Apelido do Jogador</label>
          <input
            type="text"
            value={player.name}
            onChange={(e) => onUpdatePlayer({ ...player, name: e.target.value })}
            placeholder="Ex: Falcão, Ferrão, Rodrigo..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Player Number */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Número da Camisa</label>
          <input
            type="number"
            min="1"
            max="99"
            value={player.number}
            onChange={(e) =>
              onUpdatePlayer({ ...player, number: parseInt(e.target.value) || player.number })
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
          />
        </div>

        {/* Role Selection */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Posição Tática</label>
          <div className="grid grid-cols-3 gap-1.5">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  const isGL = r.id === 'GL';
                  const isGK = r.id === 'GOL';
                  onUpdatePlayer({
                    ...player,
                    role: r.id,
                    isLineGoalkeeper: isGL,
                    isGoalkeeper: isGK,
                  });
                }}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors ${
                  player.role === r.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Team Selection */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Equipe</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onUpdatePlayer({ ...player, team: 'home' })}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                player.team === 'home'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-950 border border-slate-800 text-slate-400'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span>Mandante (Casa)</span>
            </button>
            <button
              onClick={() => onUpdatePlayer({ ...player, team: 'away' })}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                player.team === 'away'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-slate-950 border border-slate-800 text-slate-400'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span>Visitante</span>
            </button>
          </div>
        </div>

        {/* Facing Angle Orientation */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Direção do Olhar (Orientação):</span>
            <span className="font-mono text-amber-400 font-bold">{player.angle}°</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="15"
            value={player.angle}
            onChange={(e) => onUpdatePlayer({ ...player, angle: parseInt(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Esquerda (-180°)</span>
            <span>Frente (0°)</span>
            <span>Direita (180°)</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
          <button
            onClick={() => {
              onDeletePlayer(player.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-white hover:bg-rose-600/30 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remover Atleta</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
