/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Court } from './components/Court';
import { Toolbar } from './components/Toolbar';
import { AnimationTimeline } from './components/AnimationTimeline';
import { TacticsLibraryModal } from './components/TacticsLibraryModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { PlaybookModal } from './components/PlaybookModal';
import { PlayerEditorModal } from './components/PlayerEditorModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import {
  Play as PlayType,
  Frame,
  Player,
  Ball,
  Equipment,
  TacticalArrow,
  FreeDrawing,
  TacticalZone,
  TextNote,
  ToolMode,
  BoardSettings,
  PlayerRole,
  CourtType,
  CourtView,
} from './types/tactics';
import { DEFAULT_TACTICAL_PRESETS } from './data/tacticalPresets';
import { Sparkles, BookOpen, Plus, Download, Shield } from 'lucide-react';

export default function App() {
  // Initial default play (Sistema 3-1 Clássico)
  const [currentPlay, setCurrentPlay] = useState<PlayType>(DEFAULT_TACTICAL_PRESETS[0]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);

  // Playback animation state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [loopAnimation, setLoopAnimation] = useState<boolean>(true);

  // Selected player for editing
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Tool mode & drawing color
  const [toolMode, setToolMode] = useState<ToolMode>('select');
  const [activeColor, setActiveColor] = useState<string>('#f59e0b');

  // Board settings
  const [settings, setSettings] = useState<BoardSettings>({
    courtType: 'blue',
    courtView: 'full',
    showPlayerNames: true,
    showPlayerNumbers: true,
    showPlayerRoles: false,
    homeColor: '#0284c7',
    awayColor: '#e11d48',
    ballSpeed: 1,
    loopAnimation: true,
  });

  // Modals state
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false);
  const [isPlayerEditorOpen, setIsPlayerEditorOpen] = useState(false);

  // Saved plays in LocalStorage
  const [savedPlays, setSavedPlays] = useState<PlayType[]>(() => {
    try {
      const stored = localStorage.getItem('futsal_saved_plays');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Current frame reference
  const currentFrame = currentPlay.frames[currentFrameIndex] || currentPlay.frames[0];

  // Animation player effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying) {
      const duration = (currentFrame?.durationMs || 2500) / playbackSpeed;
      timer = setTimeout(() => {
        setCurrentFrameIndex((prevIndex) => {
          if (prevIndex < currentPlay.frames.length - 1) {
            return prevIndex + 1;
          } else {
            if (loopAnimation) {
              return 0;
            } else {
              setIsPlaying(false);
              return prevIndex;
            }
          }
        });
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentFrameIndex, currentPlay.frames, playbackSpeed, loopAnimation, currentFrame]);

  // Frame manipulation helpers
  const updateCurrentFrame = (updater: (frame: Frame) => Frame) => {
    setCurrentPlay((prev) => {
      const updatedFrames = prev.frames.map((f, idx) => {
        if (idx === currentFrameIndex) {
          return updater(f);
        }
        return f;
      });
      return { ...prev, frames: updatedFrames };
    });
  };

  // Add a new empty step/frame
  const handleAddFrame = () => {
    const newFrameId = `frame-${Date.now()}`;
    const prevFrame = currentFrame;

    // Clone players and ball from current frame, but clear annotations
    const newFrame: Frame = {
      id: newFrameId,
      label: `Passo ${currentPlay.frames.length + 1}`,
      durationMs: 2500,
      coachNote: '',
      players: JSON.parse(JSON.stringify(prevFrame.players)),
      ball: JSON.parse(JSON.stringify(prevFrame.ball)),
      equipments: JSON.parse(JSON.stringify(prevFrame.equipments)),
      arrows: [],
      drawings: [],
      zones: [],
      notes: [],
    };

    setCurrentPlay((prev) => ({
      ...prev,
      frames: [...prev.frames, newFrame],
    }));
    setCurrentFrameIndex(currentPlay.frames.length);
  };

  // Duplicate current frame
  const handleDuplicateFrame = () => {
    const newFrameId = `frame-${Date.now()}`;
    const duplicated: Frame = {
      ...JSON.parse(JSON.stringify(currentFrame)),
      id: newFrameId,
      label: `${currentFrame.label} (Cópia)`,
    };

    const newFrames = [...currentPlay.frames];
    newFrames.splice(currentFrameIndex + 1, 0, duplicated);

    setCurrentPlay((prev) => ({ ...prev, frames: newFrames }));
    setCurrentFrameIndex(currentFrameIndex + 1);
  };

  // Delete frame
  const handleDeleteFrame = (indexToDelete: number) => {
    if (currentPlay.frames.length <= 1) return;
    const newFrames = currentPlay.frames.filter((_, idx) => idx !== indexToDelete);
    setCurrentPlay((prev) => ({ ...prev, frames: newFrames }));
    setCurrentFrameIndex(Math.max(0, Math.min(indexToDelete, newFrames.length - 1)));
  };

  // Add player to current frame
  const handleAddPlayer = (
    team: 'home' | 'away',
    role: PlayerRole,
    isGoalkeeper = false,
    isLineGoalkeeper = false
  ) => {
    const defaultX = team === 'home' ? 30 : 70;
    const defaultY = 50;
    const countTeam = currentFrame.players.filter((p) => p.team === team).length;
    const defaultNumber = countTeam + 1;

    const newPlayer: Player = {
      id: `p-${Date.now()}`,
      team,
      number: defaultNumber,
      name: isLineGoalkeeper ? 'G-LINHA' : isGoalkeeper ? 'GOL' : `Atleta ${defaultNumber}`,
      role,
      x: defaultX,
      y: defaultY,
      angle: team === 'home' ? 0 : 180,
      isGoalkeeper,
      isLineGoalkeeper,
    };

    updateCurrentFrame((f) => ({
      ...f,
      players: [...f.players, newPlayer],
    }));
  };

  // Add equipment
  const handleAddEquipment = (type: 'cone' | 'barrier' | 'mini_goal') => {
    const newEq: Equipment = {
      id: `eq-${Date.now()}`,
      type,
      x: 50,
      y: 50,
    };
    updateCurrentFrame((f) => ({
      ...f,
      equipments: [...f.equipments, newEq],
    }));
  };

  // Clear annotations on current frame
  const handleClearAnnotations = () => {
    updateCurrentFrame((f) => ({
      ...f,
      arrows: [],
      drawings: [],
      zones: [],
      notes: [],
    }));
  };

  // Reset standard 5x5 futsal lineup
  const handleResetPositions = () => {
    const defaultHome: Player[] = [
      { id: 'h1', team: 'home', number: 1, name: 'Goleiro', role: 'GOL', x: 8, y: 50, angle: 0, isGoalkeeper: true },
      { id: 'h2', team: 'home', number: 4, name: 'Fixo', role: 'FIX', x: 28, y: 50, angle: 0 },
      { id: 'h3', team: 'home', number: 7, name: 'Ala D.', role: 'ALA', x: 42, y: 82, angle: 0 },
      { id: 'h4', team: 'home', number: 10, name: 'Ala E.', role: 'ALA', x: 42, y: 18, angle: 0 },
      { id: 'h5', team: 'home', number: 9, name: 'Pivô', role: 'PIV', x: 70, y: 50, angle: 180 },
    ];

    const defaultAway: Player[] = [
      { id: 'a1', team: 'away', number: 1, name: 'Goleiro', role: 'GOL', x: 92, y: 50, angle: 180, isGoalkeeper: true },
      { id: 'a2', team: 'away', number: 3, name: 'Fixo', role: 'FIX', x: 74, y: 50, angle: 180 },
      { id: 'a3', team: 'away', number: 5, name: 'Ala D.', role: 'ALA', x: 58, y: 75, angle: 180 },
      { id: 'a4', team: 'away', number: 8, name: 'Ala E.', role: 'ALA', x: 58, y: 25, angle: 180 },
      { id: 'a5', team: 'away', number: 9, name: 'Pivô', role: 'PIV', x: 45, y: 50, angle: 180 },
    ];

    updateCurrentFrame((f) => ({
      ...f,
      players: [...defaultHome, ...defaultAway],
      ball: { x: 28, y: 50 },
      equipments: [],
      arrows: [],
      drawings: [],
      zones: [],
      notes: [],
    }));
  };

  // Create clean new play from scratch
  const handleNewPlay = () => {
    const newPlay: PlayType = {
      id: `play-${Date.now()}`,
      title: 'Nova Jogada de Futsal',
      category: 'Personalizada',
      description: 'Criação de jogada tática livre.',
      courtType: settings.courtType,
      courtView: settings.courtView,
      frames: [
        {
          id: `f-${Date.now()}`,
          label: 'Passo 1: Posicionamento Inicial',
          durationMs: 2500,
          coachNote: '',
          players: [
            { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 8, y: 50, angle: 0, isGoalkeeper: true },
            { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 28, y: 50, angle: 0 },
            { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 42, y: 82, angle: 0 },
            { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 42, y: 18, angle: 0 },
            { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 72, y: 50, angle: 180 },
            { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 92, y: 50, angle: 180, isGoalkeeper: true },
            { id: 'a2', team: 'away', number: 3, name: 'FIX', role: 'FIX', x: 74, y: 50, angle: 180 },
            { id: 'a3', team: 'away', number: 5, name: 'ALA', role: 'ALA', x: 58, y: 75, angle: 180 },
            { id: 'a4', team: 'away', number: 8, name: 'ALA', role: 'ALA', x: 58, y: 25, angle: 180 },
            { id: 'a5', team: 'away', number: 9, name: 'PIV', role: 'PIV', x: 45, y: 50, angle: 180 },
          ],
          ball: { x: 28, y: 50 },
          equipments: [],
          arrows: [],
          drawings: [],
          zones: [],
          notes: [],
        },
      ],
      tags: ['Personalizada'],
      createdAt: new Date().toISOString(),
    };

    setCurrentPlay(newPlay);
    setCurrentFrameIndex(0);
    setIsPlaying(false);
  };

  // Save play to LocalStorage
  const handleSavePlay = (title: string, category: PlayType['category'], description: string) => {
    const updatedPlay: PlayType = {
      ...currentPlay,
      title,
      category,
      description,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [
      updatedPlay,
      ...savedPlays.filter((p) => p.id !== updatedPlay.id),
    ];
    setSavedPlays(updatedList);
    try {
      localStorage.setItem('futsal_saved_plays', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
    setCurrentPlay(updatedPlay);
  };

  // Delete saved play
  const handleDeleteSavedPlay = (id: string) => {
    const updatedList = savedPlays.filter((p) => p.id !== id);
    setSavedPlays(updatedList);
    try {
      localStorage.setItem('futsal_saved_plays', JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }
  };

  // Export current play as PNG graphic
  const handleExportPNG = () => {
    const svgElem = document.querySelector('svg');
    if (!svgElem) return;

    const svgData = new XMLSerializer().serializeToString(svgElem);
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData))));

    img.onload = () => {
      // Background fill
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw SVG Court
      ctx.drawImage(img, 0, 0, 1600, 800);

      // Header watermark with Play Title and Step
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(20, 20, 480, 70);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, 480, 70);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(currentPlay.title, 36, 50);

      ctx.fillStyle = '#f59e0b';
      ctx.font = '600 14px sans-serif';
      ctx.fillText(
        `${currentFrame.label} • FutsalTactics Pro`,
        36,
        74
      );

      // Trigger download
      const a = document.createElement('a');
      a.download = `${currentPlay.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-passo-${currentFrameIndex + 1}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  };

  // Export Playbook JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedPlays, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `futsal-tactics-playbook-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import Playbook JSON
  const handleImportJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        setSavedPlays((prev) => [...parsed, ...prev]);
        localStorage.setItem('futsal_saved_plays', JSON.stringify([...parsed, ...savedPlays]));
        alert('Jogadas importadas com sucesso!');
      } else {
        alert('Formato de arquivo JSON inválido.');
      }
    } catch {
      alert('Erro ao carregar o arquivo JSON.');
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* ============================================================== */}
      {/* TOP BAR CONTRACT: 3 Zones: Brand - Nav Links - Primary CTA    */}
      {/* ============================================================== */}
      <header className="flex items-center justify-between gap-8 px-5 py-3 border-b border-slate-800 bg-slate-950/90 shrink-0 z-30 backdrop-blur-md">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
            FT
          </div>
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            FutsalTactics Pro
          </span>
        </div>

        {/* Zone 2: 4-5 Clean single-line text links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => setIsLibraryOpen(true)}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Biblioteca de Táticas</span>
          </button>
          <button
            onClick={() => setIsAIOpen(true)}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Gerador IA de Táticas</span>
          </button>
          <button
            onClick={() => setIsPlaybookOpen(true)}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Meus Playbooks ({savedPlays.length})</span>
          </button>
          <button
            onClick={handleExportPNG}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar PNG</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Install App + Nova Jogada) */}
        <div className="flex items-center gap-2 shrink-0">
          <PWAInstallButton />
          <button
            onClick={handleNewPlay}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nova Jogada</span>
          </button>
        </div>
      </header>

      {/* Interactive Tactical Toolbar */}
      <Toolbar
        toolMode={toolMode}
        onSelectTool={setToolMode}
        activeColor={activeColor}
        onSelectColor={setActiveColor}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings((prev) => ({ ...prev, ...newSettings }))}
        onAddPlayer={handleAddPlayer}
        onAddEquipment={handleAddEquipment}
        onClearAnnotations={handleClearAnnotations}
        onResetPositions={handleResetPositions}
        onOpenTacticsLibrary={() => setIsLibraryOpen(true)}
        onOpenAIAssistant={() => setIsAIOpen(true)}
        onOpenPlaybook={() => setIsPlaybookOpen(true)}
        onExportPNG={handleExportPNG}
      />

      {/* Main Tactical Court Workspace */}
      <main className="flex-1 relative flex items-center justify-center p-1 md:p-3 overflow-hidden bg-slate-950">
        {/* Active Play Banner / Header Info */}
        <div className="absolute top-2 left-4 z-10 hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs shadow-lg">
          <span className="font-bold text-amber-400">{currentPlay.category}:</span>
          <span className="font-semibold text-white">{currentPlay.title}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 font-mono">
            {currentFrame?.label || `Passo ${currentFrameIndex + 1}`}
          </span>
        </div>

        {/* Tactical Court Viewport */}
        <Court
          players={currentFrame.players}
          ball={currentFrame.ball}
          equipments={currentFrame.equipments}
          arrows={currentFrame.arrows}
          drawings={currentFrame.drawings}
          zones={currentFrame.zones}
          notes={currentFrame.notes}
          toolMode={toolMode}
          settings={settings}
          activeColor={activeColor}
          onUpdatePlayers={(players) => updateCurrentFrame((f) => ({ ...f, players }))}
          onUpdateBall={(ball) => updateCurrentFrame((f) => ({ ...f, ball }))}
          onUpdateEquipments={(equipments) => updateCurrentFrame((f) => ({ ...f, equipments }))}
          onAddArrow={(arrow) => updateCurrentFrame((f) => ({ ...f, arrows: [...f.arrows, arrow] }))}
          onAddDrawing={(drawing) =>
            updateCurrentFrame((f) => ({ ...f, drawings: [...f.drawings, drawing] }))
          }
          onAddZone={(zone) => updateCurrentFrame((f) => ({ ...f, zones: [...f.zones, zone] }))}
          onAddNote={(note) => updateCurrentFrame((f) => ({ ...f, notes: [...f.notes, note] }))}
          onRemoveArrow={(id) =>
            updateCurrentFrame((f) => ({ ...f, arrows: f.arrows.filter((a) => a.id !== id) }))
          }
          onRemoveDrawing={(id) =>
            updateCurrentFrame((f) => ({ ...f, drawings: f.drawings.filter((d) => d.id !== id) }))
          }
          onRemoveZone={(id) =>
            updateCurrentFrame((f) => ({ ...f, zones: f.zones.filter((z) => z.id !== id) }))
          }
          onRemoveNote={(id) =>
            updateCurrentFrame((f) => ({ ...f, notes: f.notes.filter((n) => n.id !== id) }))
          }
          onSelectPlayer={(p) => {
            setSelectedPlayer(p);
            if (p) {
              setIsPlayerEditorOpen(true);
            }
          }}
          selectedPlayerId={selectedPlayer?.id}
        />
      </main>

      {/* Multi-Step Animation Timeline & Coach Notes */}
      <AnimationTimeline
        frames={currentPlay.frames}
        currentFrameIndex={currentFrameIndex}
        onSelectFrame={setCurrentFrameIndex}
        onAddFrame={handleAddFrame}
        onDuplicateFrame={handleDuplicateFrame}
        onDeleteFrame={handleDeleteFrame}
        onUpdateFrameNote={(note) => updateCurrentFrame((f) => ({ ...f, coachNote: note }))}
        onUpdateFrameLabel={(label) => updateCurrentFrame((f) => ({ ...f, label }))}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        playbackSpeed={playbackSpeed}
        onChangeSpeed={setPlaybackSpeed}
        loop={loopAnimation}
        onToggleLoop={() => setLoopAnimation(!loopAnimation)}
      />

      {/* Modals */}
      <TacticsLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onLoadPlay={(play) => {
          setCurrentPlay(play);
          setCurrentFrameIndex(0);
          setIsPlaying(false);
          setSettings((prev) => ({
            ...prev,
            courtType: play.courtType,
            courtView: play.courtView,
          }));
        }}
      />

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onApplyGeneratedPlay={(play) => {
          setCurrentPlay(play);
          setCurrentFrameIndex(0);
          setIsPlaying(false);
        }}
      />

      <PlaybookModal
        isOpen={isPlaybookOpen}
        onClose={() => setIsPlaybookOpen(false)}
        currentPlay={currentPlay}
        onSaveCurrentPlay={handleSavePlay}
        onLoadSavedPlay={(play) => {
          setCurrentPlay(play);
          setCurrentFrameIndex(0);
          setIsPlaying(false);
        }}
        savedPlays={savedPlays}
        onDeleteSavedPlay={handleDeleteSavedPlay}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
      />

      <PlayerEditorModal
        player={selectedPlayer}
        isOpen={isPlayerEditorOpen}
        onClose={() => {
          setIsPlayerEditorOpen(false);
          setSelectedPlayer(null);
        }}
        onUpdatePlayer={(updated) => {
          setSelectedPlayer(updated);
          updateCurrentFrame((f) => ({
            ...f,
            players: f.players.map((p) => (p.id === updated.id ? updated : p)),
          }));
        }}
        onDeletePlayer={(id) => {
          updateCurrentFrame((f) => ({
            ...f,
            players: f.players.filter((p) => p.id !== id),
          }));
        }}
      />
    </div>
  );
}
