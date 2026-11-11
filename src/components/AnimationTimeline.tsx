import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Plus,
  Copy,
  Trash2,
  Repeat,
  Gauge,
  MessageSquare,
  Edit2
} from 'lucide-react';
import { Frame, Player, Ball } from '../types/tactics';

interface AnimationTimelineProps {
  frames: Frame[];
  currentFrameIndex: number;
  onSelectFrame: (index: number) => void;
  onAddFrame: () => void;
  onDuplicateFrame: () => void;
  onDeleteFrame: (index: number) => void;
  onUpdateFrameNote: (note: string) => void;
  onUpdateFrameLabel: (label: string) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  loop: boolean;
  onToggleLoop: () => void;
}

export const AnimationTimeline: React.FC<AnimationTimelineProps> = ({
  frames,
  currentFrameIndex,
  onSelectFrame,
  onAddFrame,
  onDuplicateFrame,
  onDeleteFrame,
  onUpdateFrameNote,
  onUpdateFrameLabel,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onChangeSpeed,
  loop,
  onToggleLoop,
}) => {
  const currentFrame = frames[currentFrameIndex] || frames[0];
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [labelDraft, setLabelDraft] = useState('');

  const speeds = [0.5, 1, 1.5, 2];

  useEffect(() => {
    if (currentFrame) {
      setLabelDraft(currentFrame.label || `Passo ${currentFrameIndex + 1}`);
    }
  }, [currentFrameIndex, currentFrame]);

  return (
    <div className="w-full bg-slate-900 border-t border-slate-800 p-2.5 md:p-3 select-none">
      {/* Top row: Frames sequence, navigation and coach notes */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Playback Controls & Frame Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {/* Main Play / Pause Button */}
          <button
            onClick={onTogglePlay}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Animar Jogada</span>
              </>
            )}
          </button>

          {/* Previous / Next Frame */}
          <div className="flex items-center bg-slate-950 rounded-xl p-0.5 border border-slate-800">
            <button
              onClick={() => onSelectFrame(Math.max(0, currentFrameIndex - 1))}
              disabled={currentFrameIndex === 0 || isPlaying}
              title="Passo Anterior"
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-300 px-2">
              {currentFrameIndex + 1} / {frames.length}
            </span>
            <button
              onClick={() => onSelectFrame(Math.min(frames.length - 1, currentFrameIndex + 1))}
              disabled={currentFrameIndex === frames.length - 1 || isPlaying}
              title="Próximo Passo"
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Step Badges List */}
          <div className="flex items-center gap-1.5 ml-2">
            {frames.map((frame, idx) => {
              const isActive = idx === currentFrameIndex;
              return (
                <button
                  key={frame.id || idx}
                  onClick={() => onSelectFrame(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm ring-1 ring-amber-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span>Passo {idx + 1}</span>
                  {isActive && frames.length > 1 && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFrame(idx);
                      }}
                      title="Excluir este passo"
                      className="ml-1 text-slate-900 hover:text-rose-900 font-bold"
                    >
                      ×
                    </span>
                  )}
                </button>
              );
            })}

            {/* Add New Step */}
            <button
              onClick={onAddFrame}
              title="Adicionar Novo Passo à Jogada"
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-medium border border-dashed border-amber-500/40 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Passo</span>
            </button>

            {/* Duplicate Step */}
            <button
              onClick={onDuplicateFrame}
              title="Duplicar Posições do Passo Atual"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Speed, Loop and Frame Instructions */}
        <div className="flex items-center gap-3">
          {/* Loop toggle */}
          <button
            onClick={onToggleLoop}
            title={loop ? 'Repetição Contínua Ativa' : 'Repetição Desativada'}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
              loop
                ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                : 'border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Loop</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <Gauge className="w-3.5 h-3.5 text-slate-400 ml-1" />
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => onChangeSpeed(s)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold transition-colors ${
                  playbackSpeed === s
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Coach's Instructions for Current Step */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          {isEditingLabel ? (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={labelDraft}
                onChange={(e) => setLabelDraft(e.target.value)}
                onBlur={() => {
                  onUpdateFrameLabel(labelDraft);
                  setIsEditingLabel(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onUpdateFrameLabel(labelDraft);
                    setIsEditingLabel(false);
                  }
                }}
                autoFocus
                className="bg-slate-950 border border-amber-500 text-white rounded px-2 py-0.5 text-xs font-semibold"
              />
              <button
                onClick={() => {
                  onUpdateFrameLabel(labelDraft);
                  setIsEditingLabel(false);
                }}
                className="text-amber-400 hover:text-white text-[11px]"
              >
                Salvar
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsEditingLabel(true)}
              className="font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer hover:text-amber-400 transition-colors"
              title="Clique para renomear este passo"
            >
              <span>{currentFrame?.label || `Passo ${currentFrameIndex + 1}`}</span>
              <Edit2 className="w-3 h-3 text-slate-500" />
            </div>
          )}
        </div>

        {/* Coach Step Note Input */}
        <div className="w-full sm:flex-1 sm:max-w-xl">
          <input
            type="text"
            placeholder="Orientação tática para este passo (ex: Pivô apoia de costas e ala arranca na 2ª trave)..."
            value={currentFrame?.coachNote || ''}
            onChange={(e) => onUpdateFrameNote(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
