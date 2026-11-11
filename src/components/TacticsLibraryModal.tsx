import React, { useState } from 'react';
import { X, Play, BookOpen, Shield, Zap, Sparkles, Target, Compass, CheckCircle2 } from 'lucide-react';
import { Play as PlayType } from '../types/tactics';
import { DEFAULT_TACTICAL_PRESETS, TACTICAL_THEORY_GUIDES } from '../data/tacticalPresets';

interface TacticsLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadPlay: (play: PlayType) => void;
}

export const TacticsLibraryModal: React.FC<TacticsLibraryModalProps> = ({
  isOpen,
  onClose,
  onLoadPlay,
}) => {
  const [activeTab, setActiveTab] = useState<'plays' | 'theory'>('plays');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedPlay, setSelectedPlay] = useState<PlayType>(DEFAULT_TACTICAL_PRESETS[0]);

  if (!isOpen) return null;

  const categories = [
    'Todos',
    'Sistema 3-1',
    'Sistema 4-0',
    'Goleiro-Linha (5x4)',
    'Bolas Paradas',
    'Saídas de Pressão',
    'Defesa',
  ];

  const filteredPlays =
    selectedCategory === 'Todos'
      ? DEFAULT_TACTICAL_PRESETS
      : DEFAULT_TACTICAL_PRESETS.filter((p) => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Biblioteca de Táticas & Jogadas de Futsal</h2>
              <p className="text-xs text-slate-400">
                Sistemas consagrados, jogadas ensaiadas e conceitos táticos prontos para a prancheta
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('plays')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'plays'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Jogadas Prontas ({DEFAULT_TACTICAL_PRESETS.length})
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'theory'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Manual dos Sistemas
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
        {activeTab === 'plays' ? (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            {/* Left Column: Categories and Play List */}
            <div className="md:col-span-5 border-r border-slate-800 flex flex-col overflow-hidden bg-slate-950/40">
              {/* Category Pills */}
              <div className="p-3 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Plays List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredPlays.map((play) => {
                  const isSelected = selectedPlay.id === play.id;
                  return (
                    <div
                      key={play.id}
                      onClick={() => setSelectedPlay(play)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-800/90 border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                          : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-semibold text-amber-400">
                          {play.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {play.frames.length} Passos
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{play.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {play.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Detailed Play View & Load Button */}
            <div className="md:col-span-7 flex flex-col p-6 overflow-y-auto space-y-5 bg-slate-900/50">
              {selectedPlay && (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {selectedPlay.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {selectedPlay.frames.length} Fases Animadas
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white">{selectedPlay.title}</h3>
                    </div>

                    <button
                      onClick={() => {
                        onLoadPlay(selectedPlay);
                        onClose();
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 shrink-0"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Carregar na Mesa</span>
                    </button>
                  </div>

                  {/* Play Description */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <p className="font-semibold text-slate-200 mb-1">Conceito e Objetivo da Jogada:</p>
                    <p>{selectedPlay.description}</p>
                  </div>

                  {/* Step-by-Step Breakdown */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                      <Compass className="w-4 h-4" />
                      <span>Desenvolvimento Passo a Passo:</span>
                    </h4>
                    <div className="space-y-2.5">
                      {selectedPlay.frames.map((frame, idx) => (
                        <div
                          key={frame.id || idx}
                          className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{frame.label}</div>
                            <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                              {frame.coachNote || 'Movimentação tática de quebra de linhas.'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coaching Keys */}
                  {selectedPlay.coachingPoints && selectedPlay.coachingPoints.length > 0 && (
                    <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50">
                      <h4 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Orientações Essenciais para o Treinador:</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {selectedPlay.coachingPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-400 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedPlay.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Theory Tab: Guides on Systems */
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TACTICAL_THEORY_GUIDES.map((guide, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {guide.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{guide.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{guide.summary}</p>

                  <div className="border-t border-slate-800/80 pt-3 space-y-2">
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Pontos Fortes / Vantagens:
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                      {guide.advantages.map((adv, i) => (
                        <li key={i}>{adv}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-slate-800/80 pt-3 space-y-2">
                    <div className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" /> Atenção / Cuidados:
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                      {guide.drawbacks.map((drw, i) => (
                        <li key={i}>{drw}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
