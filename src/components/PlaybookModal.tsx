import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  FolderOpen,
  Download,
  Upload,
  Trash2,
  Play,
  FileText,
  Calendar,
  Layers,
  Check
} from 'lucide-react';
import { Play as PlayType } from '../types/tactics';

interface PlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlay: PlayType;
  onSaveCurrentPlay: (title: string, category: PlayType['category'], description: string) => void;
  onLoadSavedPlay: (play: PlayType) => void;
  savedPlays: PlayType[];
  onDeleteSavedPlay: (id: string) => void;
  onExportJSON: () => void;
  onImportJSON: (jsonString: string) => void;
}

export const PlaybookModal: React.FC<PlaybookModalProps> = ({
  isOpen,
  onClose,
  currentPlay,
  onSaveCurrentPlay,
  onLoadSavedPlay,
  savedPlays,
  onDeleteSavedPlay,
  onExportJSON,
  onImportJSON,
}) => {
  const [title, setTitle] = useState(currentPlay.title || 'Minha Jogada Ensaiada');
  const [category, setCategory] = useState<PlayType['category']>(currentPlay.category || 'Personalizada');
  const [description, setDescription] = useState(currentPlay.description || '');
  const [activeTab, setActiveTab] = useState<'save' | 'browse'>('browse');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setTitle(currentPlay.title || 'Minha Jogada Ensaiada');
    setCategory(currentPlay.category || 'Personalizada');
    setDescription(currentPlay.description || '');
  }, [currentPlay]);

  if (!isOpen) return null;

  const categories: PlayType['category'][] = [
    'Personalizada',
    'Sistema 3-1',
    'Sistema 4-0',
    'Sistema 2-2',
    'Goleiro-Linha (5x4)',
    'Bolas Paradas',
    'Saídas de Pressão',
    'Defesa',
    'Exercícios e Treinos',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSaveCurrentPlay(title.trim(), category, description.trim());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveTab('browse');
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImportJSON(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Caderno Tático de Jogadas (Playbook)</h2>
              <p className="text-xs text-slate-400">
                Salve, organize, exporte e carregue suas jogadas ensaiadas
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'browse'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Jogadas Salvas ({savedPlays.length})
            </button>
            <button
              onClick={() => setActiveTab('save')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'save'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Salvar Jogada Atual
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'save' ? (
            <form onSubmit={handleSave} className="space-y-4 max-w-xl mx-auto">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Título da Jogada</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Escanteio com Corta-Luz e Voleio..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Categoria Tática</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PlayType['category'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Instruções e Observações do Treinador (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva quando usar essa jogada, gatilhos de passe ou orientações para a equipe..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>
                    Esta jogada contém <strong>{currentPlay.frames.length} passo(s) animado(s)</strong>.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={saveSuccess}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Jogada Salva com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Salvar no Meu Playbook</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Top bar with Export / Import options */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="text-slate-400">
                  {savedPlays.length} jogada(s) armazenada(s) localmente
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onExportJSON}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar JSON</span>
                  </button>

                  <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer transition-colors border border-slate-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Importar JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Plays Grid */}
              {savedPlays.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <FileText className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-sm font-semibold text-slate-400">
                    Nenhuma jogada personalizada salva ainda.
                  </p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Desenhe sua jogada na prancheta tática e use a aba &quot;Salvar Jogada Atual&quot; para guardá-la no seu playbook.
                  </p>
                  <button
                    onClick={() => setActiveTab('save')}
                    className="mt-2 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs inline-flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Salvar Jogada Atual
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {savedPlays.map((play) => (
                    <div
                      key={play.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            {play.category}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {play.frames.length} Fase(s)
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{play.title}</h4>
                        {play.description && (
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                            {play.description}
                          </p>
                        )}
                      </div>

                      <div className="border-t border-slate-800/80 mt-3 pt-3 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(play.createdAt).toLocaleDateString('pt-BR')}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              onLoadSavedPlay(play);
                              onClose();
                            }}
                            className="flex items-center gap-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Carregar</span>
                          </button>
                          <button
                            onClick={() => onDeleteSavedPlay(play.id)}
                            title="Excluir Jogada"
                            className="p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
