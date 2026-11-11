import React, { useRef, useState, useEffect } from 'react';
import {
  Player,
  Ball,
  Equipment,
  TacticalArrow,
  FreeDrawing,
  TacticalZone,
  TextNote,
  ToolMode,
  CourtType,
  CourtView,
  BoardSettings
} from '../types/tactics';

interface CourtProps {
  players: Player[];
  ball: Ball;
  equipments: Equipment[];
  arrows: TacticalArrow[];
  drawings: FreeDrawing[];
  zones: TacticalZone[];
  notes: TextNote[];
  toolMode: ToolMode;
  settings: BoardSettings;
  activeColor: string;
  onUpdatePlayers: (players: Player[]) => void;
  onUpdateBall: (ball: Ball) => void;
  onUpdateEquipments: (equipments: Equipment[]) => void;
  onAddArrow: (arrow: TacticalArrow) => void;
  onAddDrawing: (drawing: FreeDrawing) => void;
  onAddZone: (zone: TacticalZone) => void;
  onAddNote: (note: TextNote) => void;
  onRemoveArrow?: (id: string) => void;
  onRemoveDrawing?: (id: string) => void;
  onRemoveZone?: (id: string) => void;
  onRemoveNote?: (id: string) => void;
  onSelectPlayer?: (player: Player | null) => void;
  selectedPlayerId?: string | null;
}

export const Court: React.FC<CourtProps> = ({
  players,
  ball,
  equipments,
  arrows,
  drawings,
  zones,
  notes,
  toolMode,
  settings,
  activeColor,
  onUpdatePlayers,
  onUpdateBall,
  onUpdateEquipments,
  onAddArrow,
  onAddDrawing,
  onAddZone,
  onAddNote,
  onRemoveArrow,
  onRemoveDrawing,
  onRemoveZone,
  onRemoveNote,
  onSelectPlayer,
  selectedPlayerId,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Dragging state
  const [draggingEntity, setDraggingEntity] = useState<{
    type: 'player' | 'ball' | 'equipment' | 'note' | 'rotate_player';
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  // Arrow creation state
  const [arrowDraft, setArrowDraft] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  } | null>(null);

  // Zone creation state
  const [zoneDraft, setZoneDraft] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  } | null>(null);

  // Freehand drawing state
  const [drawingPoints, setDrawingPoints] = useState<{ x: number; y: number }[]>([]);

  // Coordinate conversion helper: client mouse pos to SVG (0..1000, 0..500)
  const getSVGCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!svgRef.current) return { x: 0, y: 0, pctX: 0, pctY: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    let svgX = (relX / rect.width) * 1000;
    let svgY = (relY / rect.height) * 500;

    // Constrain to court boundaries
    svgX = Math.max(0, Math.min(1000, svgX));
    svgY = Math.max(0, Math.min(500, svgY));

    return {
      x: svgX,
      y: svgY,
      pctX: (svgX / 1000) * 100,
      pctY: (svgY / 500) * 100,
    };
  };

  // Handle pointer down on background (for drawing, arrows, zones, notes)
  const handleCourtPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    // If clicking directly on an entity, that entity's onPointerDown handles it
    if ((e.target as HTMLElement).closest('.tactical-entity')) {
      return;
    }

    const coords = getSVGCoordinates(e);

    if (toolMode.startsWith('arrow_')) {
      setArrowDraft({
        startX: coords.pctX,
        startY: coords.pctY,
        currentX: coords.pctX,
        currentY: coords.pctY,
      });
    } else if (toolMode === 'pen') {
      setDrawingPoints([{ x: coords.pctX, y: coords.pctY }]);
    } else if (toolMode === 'zone') {
      setZoneDraft({
        startX: coords.pctX,
        startY: coords.pctY,
        currentX: coords.pctX,
        currentY: coords.pctY,
      });
    } else if (toolMode === 'text') {
      const text = prompt('Digite o texto ou anotação tática:', 'Atenção');
      if (text && text.trim()) {
        onAddNote({
          id: `note-${Date.now()}`,
          x: coords.pctX,
          y: coords.pctY,
          text: text.trim(),
          color: activeColor || '#ffffff',
        });
      }
    } else if (toolMode === 'select') {
      if (onSelectPlayer) {
        onSelectPlayer(null);
      }
    }
  };

  // Pointer move handler
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const coords = getSVGCoordinates(e);

    // If dragging an entity
    if (draggingEntity) {
      if (draggingEntity.type === 'player') {
        const updated = players.map((p) => {
          if (p.id === draggingEntity.id) {
            return {
              ...p,
              x: Math.max(2, Math.min(98, coords.pctX)),
              y: Math.max(2, Math.min(98, coords.pctY)),
            };
          }
          return p;
        });
        onUpdatePlayers(updated);
      } else if (draggingEntity.type === 'rotate_player') {
        const player = players.find((p) => p.id === draggingEntity.id);
        if (player) {
          const dx = (coords.pctX - player.x) * 10;
          const dy = (coords.pctY - player.y) * 5;
          const angle = Math.round((Math.atan2(dy, dx) * 180) / Math.PI);
          const updated = players.map((p) => (p.id === player.id ? { ...p, angle } : p));
          onUpdatePlayers(updated);
        }
      } else if (draggingEntity.type === 'ball') {
        onUpdateBall({
          x: Math.max(1, Math.min(99, coords.pctX)),
          y: Math.max(1, Math.min(99, coords.pctY)),
        });
      } else if (draggingEntity.type === 'equipment') {
        const updated = equipments.map((eq) => {
          if (eq.id === draggingEntity.id) {
            return {
              ...eq,
              x: Math.max(2, Math.min(98, coords.pctX)),
              y: Math.max(2, Math.min(98, coords.pctY)),
            };
          }
          return eq;
        });
        onUpdateEquipments(updated);
      }
      return;
    }

    // If drawing an arrow
    if (arrowDraft) {
      setArrowDraft((prev) =>
        prev
          ? {
              ...prev,
              currentX: coords.pctX,
              currentY: coords.pctY,
            }
          : null
      );
      return;
    }

    // If drawing freehand
    if (drawingPoints.length > 0) {
      setDrawingPoints((prev) => [...prev, { x: coords.pctX, y: coords.pctY }]);
      return;
    }

    // If creating zone
    if (zoneDraft) {
      setZoneDraft((prev) =>
        prev
          ? {
              ...prev,
              currentX: coords.pctX,
              currentY: coords.pctY,
            }
          : null
      );
      return;
    }
  };

  // Pointer up handler
  const handlePointerUp = () => {
    // Finish drag
    if (draggingEntity) {
      setDraggingEntity(null);
    }

    // Finish arrow
    if (arrowDraft) {
      const dist = Math.hypot(
        arrowDraft.currentX - arrowDraft.startX,
        arrowDraft.currentY - arrowDraft.startY
      );
      if (dist > 2) {
        let arrowType: 'move' | 'pass' | 'dribble' | 'block' = 'move';
        if (toolMode === 'arrow_pass') arrowType = 'pass';
        else if (toolMode === 'arrow_dribble') arrowType = 'dribble';
        else if (toolMode === 'arrow_block') arrowType = 'block';

        onAddArrow({
          id: `arrow-${Date.now()}`,
          type: arrowType,
          startX: arrowDraft.startX,
          startY: arrowDraft.startY,
          endX: arrowDraft.currentX,
          endY: arrowDraft.currentY,
          color: activeColor,
        });
      }
      setArrowDraft(null);
    }

    // Finish freehand
    if (drawingPoints.length > 1) {
      onAddDrawing({
        id: `draw-${Date.now()}`,
        points: drawingPoints,
        color: activeColor,
        width: 3,
      });
      setDrawingPoints([]);
    } else {
      setDrawingPoints([]);
    }

    // Finish zone
    if (zoneDraft) {
      const minX = Math.min(zoneDraft.startX, zoneDraft.currentX);
      const minY = Math.min(zoneDraft.startY, zoneDraft.currentY);
      const width = Math.abs(zoneDraft.currentX - zoneDraft.startX);
      const height = Math.abs(zoneDraft.currentY - zoneDraft.startY);

      if (width > 2 && height > 2) {
        onAddZone({
          id: `zone-${Date.now()}`,
          x: minX,
          y: minY,
          width,
          height,
          color: activeColor,
          shape: 'rect',
        });
      }
      setZoneDraft(null);
    }
  };

  // ViewBox based on CourtView
  let viewBox = '0 0 1000 500';
  if (settings.courtView === 'half_attack') {
    viewBox = '480 0 520 500';
  } else if (settings.courtView === 'half_defense') {
    viewBox = '0 0 520 500';
  }

  // Visual court colors & textures
  const courtStyles: Record<
    CourtType,
    {
      courtBg: string;
      surroundBg: string;
      lineColor: string;
      areaFill: string;
      gridPattern?: boolean;
    }
  > = {
    blue: {
      courtBg: '#0284c7', // Sky-blue / LNFS vibrant blue
      surroundBg: '#075985', // Darker blue surround
      lineColor: '#ffffff',
      areaFill: 'rgba(255, 255, 255, 0.04)',
    },
    wood: {
      courtBg: '#c28340', // Golden parquet wood
      surroundBg: '#854d0e',
      lineColor: '#ffffff',
      areaFill: 'rgba(255, 255, 255, 0.05)',
      gridPattern: true,
    },
    green: {
      courtBg: '#059669', // Emerald futsal
      surroundBg: '#064e3b',
      lineColor: '#ffffff',
      areaFill: 'rgba(255, 255, 255, 0.04)',
    },
    dark: {
      courtBg: '#0f172a', // Midnight slate chalkboard
      surroundBg: '#020617',
      lineColor: '#38bdf8',
      areaFill: 'rgba(56, 189, 248, 0.05)',
    },
  };

  const currentCourtStyle = courtStyles[settings.courtType] || courtStyles.blue;

  // Render Arrow SVG path helper
  const renderArrow = (
    arrow: {
      id?: string;
      type: 'move' | 'pass' | 'dribble' | 'block';
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      color: string;
      label?: string;
    },
    isDraft = false
  ) => {
    const sx = (arrow.startX / 100) * 1000;
    const sy = (arrow.startY / 100) * 500;
    const ex = (arrow.endX / 100) * 1000;
    const ey = (arrow.endY / 100) * 500;

    const dx = ex - sx;
    const dy = ey - sy;
    const angle = Math.atan2(dy, dx);
    const length = Math.hypot(dx, dy);

    if (length < 10) return null;

    // Arrowhead calculations
    const headLength = 16;
    const headAngle = Math.PI / 6;

    let pathD = `M ${sx} ${sy} L ${ex} ${ey}`;
    let strokeDasharray = 'none';

    if (arrow.type === 'pass') {
      strokeDasharray = '8,6';
    } else if (arrow.type === 'dribble') {
      // Wavy sine curve
      const segments = Math.max(4, Math.floor(length / 20));
      const perpAngle = angle + Math.PI / 2;
      const amplitude = 8;
      const points: string[] = [`M ${sx} ${sy}`];

      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const curX = sx + dx * t;
        const curY = sy + dy * t;
        const wave = Math.sin(t * Math.PI * 4) * (i === segments ? 0 : amplitude);
        const waveX = curX + Math.cos(perpAngle) * wave;
        const waveY = curY + Math.sin(perpAngle) * wave;
        points.push(`L ${waveX.toFixed(1)} ${waveY.toFixed(1)}`);
      }
      pathD = points.join(' ');
    }

    // Arrowhead or Block bar
    const x1 = ex - headLength * Math.cos(angle - headAngle);
    const y1 = ey - headLength * Math.sin(angle - headAngle);
    const x2 = ex - headLength * Math.cos(angle + headAngle);
    const y2 = ey - headLength * Math.sin(angle + headAngle);

    // Block bar (perpendicular crossbar 'T')
    const barLength = 18;
    const bx1 = ex + (barLength / 2) * Math.cos(angle + Math.PI / 2);
    const by1 = ey + (barLength / 2) * Math.sin(angle + Math.PI / 2);
    const bx2 = ex - (barLength / 2) * Math.cos(angle + Math.PI / 2);
    const by2 = ey - (barLength / 2) * Math.sin(angle + Math.PI / 2);

    return (
      <g
        key={arrow.id || 'draft'}
        className={`transition-opacity ${isDraft ? 'opacity-80 pointer-events-none' : 'cursor-pointer hover:opacity-80'}`}
        onClick={() => {
          if (toolMode === 'eraser' && arrow.id && onRemoveArrow) {
            onRemoveArrow(arrow.id);
          }
        }}
      >
        {/* Main Arrow Shaft */}
        <path
          d={pathD}
          fill="none"
          stroke={arrow.color}
          strokeWidth="3.5"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Head: Arrow or Block */}
        {arrow.type === 'block' ? (
          <line
            x1={bx1}
            y1={by1}
            x2={bx2}
            y2={by2}
            stroke={arrow.color}
            strokeWidth="5"
            strokeLinecap="round"
          />
        ) : (
          <path
            d={`M ${x1} ${y1} L ${ex} ${ey} L ${x2} ${y2}`}
            fill="none"
            stroke={arrow.color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Optional text label along arrow */}
        {arrow.label && (
          <text
            x={(sx + ex) / 2}
            y={(sy + ey) / 2 - 8}
            fill="#ffffff"
            fontSize="12"
            fontWeight="600"
            textAnchor="middle"
            className="select-none filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          >
            {arrow.label}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden touch-none p-2 md:p-4">
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="w-full h-auto max-h-[82vh] rounded-2xl shadow-2xl border-2 border-slate-700/60 transition-all duration-300"
        style={{ aspectRatio: '2 / 1', backgroundColor: currentCourtStyle.surroundBg }}
        onPointerDown={handleCourtPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <defs>
          {/* Wood parquet plank pattern */}
          {currentCourtStyle.gridPattern && (
            <pattern id="wood-pattern" width="80" height="20" patternUnits="userSpaceOnUse">
              <rect width="80" height="20" fill="#b45309" />
              <rect x="0" y="0" width="79" height="19" fill="#c28340" />
              <line x1="0" y1="20" x2="80" y2="20" stroke="#78350f" strokeWidth="0.8" opacity="0.6" />
              <line x1="80" y1="0" x2="80" y2="20" stroke="#78350f" strokeWidth="0.8" opacity="0.6" />
            </pattern>
          )}

          {/* Goal net pattern */}
          <pattern id="goal-net" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 8 8 M 8 0 L 0 8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          </pattern>

          {/* Player shadow drop filter */}
          <filter id="entity-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* ============================================================== */}
        {/* OFFICIAL FUTSAL COURT MARKINGS (Normas FIFA / CBFS)              */}
        {/* Dimensions: 40m x 20m (Scale 1m = 25px -> 1000px x 500px)     */}
        {/* ============================================================== */}

        {/* Court Playing Surface */}
        <rect
          x="0"
          y="0"
          width="1000"
          height="500"
          fill={currentCourtStyle.gridPattern ? 'url(#wood-pattern)' : currentCourtStyle.courtBg}
          rx="12"
        />

        {/* Goal Area fills (subtle contrast) */}
        {/* Left Area (6m) */}
        <path
          d="M 0 100 A 150 150 0 0 1 150 212.5 L 150 287.5 A 150 150 0 0 1 0 400 Z"
          fill={currentCourtStyle.areaFill}
        />
        {/* Right Area (6m) */}
        <path
          d="M 1000 100 A 150 150 0 0 0 850 212.5 L 850 287.5 A 150 150 0 0 0 1000 400 Z"
          fill={currentCourtStyle.areaFill}
        />

        {/* Court Perimeter Lines (8cm official width represented as 4px) */}
        <rect
          x="10"
          y="10"
          width="980"
          height="480"
          fill="none"
          stroke={currentCourtStyle.lineColor}
          strokeWidth="3.5"
          opacity="0.95"
        />

        {/* Center Halfway Line */}
        <line
          x1="500"
          y1="10"
          x2="500"
          y2="490"
          stroke={currentCourtStyle.lineColor}
          strokeWidth="3.5"
          opacity="0.95"
        />

        {/* Center Circle (Radius 3m = 75px) */}
        <circle
          cx="500"
          cy="250"
          r="75"
          fill="none"
          stroke={currentCourtStyle.lineColor}
          strokeWidth="3.5"
          opacity="0.95"
        />

        {/* Center Spot */}
        <circle cx="500" cy="250" r="4.5" fill={currentCourtStyle.lineColor} />

        {/* Left Penalty Area (Área de Meta 6 metros) */}
        {/* Semicircles with 6m (150px) radius from posts (y=212.5 and y=287.5), connected by straight 3m line at x=150 */}
        <path
          d="M 10 100 A 150 150 0 0 1 150 212.5 L 150 287.5 A 150 150 0 0 1 10 400"
          fill="none"
          stroke={currentCourtStyle.lineColor}
          strokeWidth="3.5"
          opacity="0.95"
        />

        {/* Left 6m Penalty Spot (Tiro de Penalidade) */}
        <circle cx="150" cy="250" r="4.5" fill={currentCourtStyle.lineColor} />

        {/* Left 10m Second Penalty Spot (Tiro Livre Direto dos 10m) */}
        <circle cx="250" cy="250" r="4.5" fill={currentCourtStyle.lineColor} />
        {/* 10m area marks (5m distance from 10m spot: 5m left and right) */}
        <line x1="250" y1="125" x2="250" y2="135" stroke={currentCourtStyle.lineColor} strokeWidth="2.5" />
        <line x1="250" y1="365" x2="250" y2="375" stroke={currentCourtStyle.lineColor} strokeWidth="2.5" />

        {/* Right Penalty Area (Área de Meta 6 metros) */}
        <path
          d="M 990 100 A 150 150 0 0 0 850 212.5 L 850 287.5 A 150 150 0 0 0 990 400"
          fill="none"
          stroke={currentCourtStyle.lineColor}
          strokeWidth="3.5"
          opacity="0.95"
        />

        {/* Right 6m Penalty Spot */}
        <circle cx="850" cy="250" r="4.5" fill={currentCourtStyle.lineColor} />

        {/* Right 10m Second Penalty Spot */}
        <circle cx="750" cy="250" r="4.5" fill={currentCourtStyle.lineColor} />
        {/* 10m area marks */}
        <line x1="750" y1="125" x2="750" y2="135" stroke={currentCourtStyle.lineColor} strokeWidth="2.5" />
        <line x1="750" y1="365" x2="750" y2="375" stroke={currentCourtStyle.lineColor} strokeWidth="2.5" />

        {/* Corner Arcs (Raio 25cm = 6.25px) */}
        <path d="M 10 25 A 15 15 0 0 1 25 10" fill="none" stroke={currentCourtStyle.lineColor} strokeWidth="3" />
        <path d="M 10 475 A 15 15 0 0 0 25 490" fill="none" stroke={currentCourtStyle.lineColor} strokeWidth="3" />
        <path d="M 990 25 A 15 15 0 0 0 975 10" fill="none" stroke={currentCourtStyle.lineColor} strokeWidth="3" />
        <path d="M 990 475 A 15 15 0 0 1 975 490" fill="none" stroke={currentCourtStyle.lineColor} strokeWidth="3" />

        {/* Substitution Zones (5m long, 5m from center line along technical bench sideline at y=10) */}
        <line x1="375" y1="4" x2="375" y2="16" stroke="#f59e0b" strokeWidth="3.5" />
        <line x1="250" y1="4" x2="250" y2="16" stroke="#f59e0b" strokeWidth="3.5" />
        <text x="312.5" y="24" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">
          ZONA SUB (5m)
        </text>

        <line x1="625" y1="4" x2="625" y2="16" stroke="#f59e0b" strokeWidth="3.5" />
        <line x1="750" y1="4" x2="750" y2="16" stroke="#f59e0b" strokeWidth="3.5" />
        <text x="687.5" y="24" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">
          ZONA SUB (5m)
        </text>

        {/* Goal Posts & Nets (3m width = 75px, 1m depth = 25px) */}
        {/* Left Goal */}
        <g opacity="0.9">
          <rect x="-18" y="212.5" width="28" height="75" fill="url(#goal-net)" stroke="#ffffff" strokeWidth="2" rx="2" />
          {/* Goal Line & White Posts */}
          <circle cx="10" cy="212.5" r="4" fill="#ffffff" stroke="#ef4444" strokeWidth="1" />
          <circle cx="10" cy="287.5" r="4" fill="#ffffff" stroke="#ef4444" strokeWidth="1" />
          <line x1="10" y1="212.5" x2="10" y2="287.5" stroke="#ffffff" strokeWidth="3.5" />
        </g>

        {/* Right Goal */}
        <g opacity="0.9">
          <rect x="990" y="212.5" width="28" height="75" fill="url(#goal-net)" stroke="#ffffff" strokeWidth="2" rx="2" />
          {/* Goal Line & White Posts */}
          <circle cx="990" cy="212.5" r="4" fill="#ffffff" stroke="#ef4444" strokeWidth="1" />
          <circle cx="990" cy="287.5" r="4" fill="#ffffff" stroke="#ef4444" strokeWidth="1" />
          <line x1="990" y1="212.5" x2="990" y2="287.5" stroke="#ffffff" strokeWidth="3.5" />
        </g>

        {/* ============================================================== */}
        {/* TACTICAL OVERLAYS: ZONES & ANNOTATIONS                         */}
        {/* ============================================================== */}

        {/* Render Saved Zones */}
        {zones.map((zone) => {
          const zx = (zone.x / 100) * 1000;
          const zy = (zone.y / 100) * 500;
          const zw = (zone.width / 100) * 1000;
          const zh = (zone.height / 100) * 500;

          return (
            <g
              key={zone.id}
              className="cursor-pointer hover:opacity-80"
              onClick={() => {
                if (toolMode === 'eraser' && onRemoveZone) {
                  onRemoveZone(zone.id);
                }
              }}
            >
              {zone.shape === 'circle' ? (
                <ellipse
                  cx={zx + zw / 2}
                  cy={zy + zh / 2}
                  rx={zw / 2}
                  ry={zh / 2}
                  fill={zone.color}
                  fillOpacity="0.22"
                  stroke={zone.color}
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
              ) : (
                <rect
                  x={zx}
                  y={zy}
                  width={zw}
                  height={zh}
                  rx="8"
                  fill={zone.color}
                  fillOpacity="0.22"
                  stroke={zone.color}
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
              )}
              {zone.label && (
                <text
                  x={zx + zw / 2}
                  y={zy + zh / 2 + 4}
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  className="select-none filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                >
                  {zone.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Zone draft preview */}
        {zoneDraft && (
          <rect
            x={Math.min(zoneDraft.startX, zoneDraft.currentX) * 10}
            y={Math.min(zoneDraft.startY, zoneDraft.currentY) * 5}
            width={Math.abs(zoneDraft.currentX - zoneDraft.startX) * 10}
            height={Math.abs(zoneDraft.currentY - zoneDraft.startY) * 5}
            rx="8"
            fill={activeColor}
            fillOpacity="0.2"
            stroke={activeColor}
            strokeWidth="2"
            strokeDasharray="4,4"
          />
        )}

        {/* Render Freehand Drawings */}
        {drawings.map((draw) => {
          if (draw.points.length < 2) return null;
          const pathPoints = draw.points
            .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${(p.x / 100) * 1000} ${(p.y / 100) * 500}`)
            .join(' ');
          return (
            <path
              key={draw.id}
              d={pathPoints}
              fill="none"
              stroke={draw.color}
              strokeWidth={draw.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer hover:opacity-60"
              onClick={() => {
                if (toolMode === 'eraser' && onRemoveDrawing) {
                  onRemoveDrawing(draw.id);
                }
              }}
            />
          );
        })}

        {/* Freehand draft preview */}
        {drawingPoints.length > 1 && (
          <path
            d={drawingPoints
              .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${(p.x / 100) * 1000} ${(p.y / 100) * 500}`)
              .join(' ')}
            fill="none"
            stroke={activeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Render Arrows */}
        {arrows.map((arr) => renderArrow(arr))}
        {arrowDraft &&
          renderArrow(
            {
              type:
                toolMode === 'arrow_pass'
                  ? 'pass'
                  : toolMode === 'arrow_dribble'
                  ? 'dribble'
                  : toolMode === 'arrow_block'
                  ? 'block'
                  : 'move',
              startX: arrowDraft.startX,
              startY: arrowDraft.startY,
              endX: arrowDraft.currentX,
              endY: arrowDraft.currentY,
              color: activeColor,
            },
            true
          )}

        {/* Render Equipments (Cones, Barriers, Mini Goals) */}
        {equipments.map((eq) => {
          const eqX = (eq.x / 100) * 1000;
          const eqY = (eq.y / 100) * 500;

          return (
            <g
              key={eq.id}
              className="tactical-entity cursor-move"
              transform={`translate(${eqX}, ${eqY})`}
              onPointerDown={(e) => {
                e.stopPropagation();
                if (toolMode === 'eraser') {
                  onUpdateEquipments(equipments.filter((item) => item.id !== eq.id));
                } else {
                  setDraggingEntity({ type: 'equipment', id: eq.id, offsetX: 0, offsetY: 0 });
                }
              }}
            >
              {eq.type === 'cone' && (
                <g filter="url(#entity-shadow)">
                  {/* Futsal Training Cone */}
                  <polygon points="0,-16 12,12 -12,12" fill="#ea580c" stroke="#fff" strokeWidth="1.5" />
                  <ellipse cx="0" cy="12" rx="14" ry="4" fill="#c2410c" />
                </g>
              )}
              {eq.type === 'barrier' && (
                <g filter="url(#entity-shadow)">
                  {/* Defensive Barrier Silhouette */}
                  <rect x="-14" y="-20" width="28" height="40" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="0" cy="-12" r="6" fill="#cbd5e1" />
                  <line x1="-10" y1="2" x2="10" y2="2" stroke="#cbd5e1" strokeWidth="2" />
                </g>
              )}
              {eq.type === 'mini_goal' && (
                <g filter="url(#entity-shadow)">
                  <rect x="-20" y="-10" width="40" height="20" fill="none" stroke="#e2e8f0" strokeWidth="3" rx="2" />
                  <line x1="-20" y1="0" x2="20" y2="0" stroke="rgba(255,255,255,0.4)" strokeDasharray="2,2" />
                </g>
              )}
            </g>
          );
        })}

        {/* ============================================================== */}
        {/* PLAYERS RENDERING                                              */}
        {/* ============================================================== */}
        {players.map((player) => {
          const px = (player.x / 100) * 1000;
          const py = (player.y / 100) * 500;
          const isSelected = selectedPlayerId === player.id;
          const isHome = player.team === 'home';

          // Player jersey colors
          let playerBg = isHome ? settings.homeColor : settings.awayColor;
          if (player.isLineGoalkeeper) {
            // Line Goalkeeper special high-visibility jersey (e.g. Neon Yellow / Pink)
            playerBg = '#facc15';
          } else if (player.isGoalkeeper) {
            // Traditional GK jersey
            playerBg = isHome ? '#10b981' : '#f97316';
          }

          const textColor = player.isLineGoalkeeper ? '#000000' : '#ffffff';

          // Orientation pointer
          const pointerDist = 26;
          const rad = (player.angle * Math.PI) / 180;
          const pointerX = px + Math.cos(rad) * pointerDist;
          const pointerY = py + Math.sin(rad) * pointerDist;

          return (
            <g
              key={player.id}
              className="tactical-entity cursor-grab active:cursor-grabbing group"
              filter="url(#entity-shadow)"
              onPointerDown={(e) => {
                e.stopPropagation();
                if (toolMode === 'eraser') {
                  onUpdatePlayers(players.filter((p) => p.id !== player.id));
                } else {
                  if (onSelectPlayer) {
                    onSelectPlayer(player);
                  }
                  setDraggingEntity({
                    type: 'player',
                    id: player.id,
                    offsetX: 0,
                    offsetY: 0,
                  });
                }
              }}
            >
              {/* Facing Orientation Indicator */}
              <line
                x1={px}
                y1={py}
                x2={pointerX}
                y2={pointerY}
                stroke={isSelected ? '#38bdf8' : 'rgba(255,255,255,0.7)'}
                strokeWidth={isSelected ? '3.5' : '2.5'}
                strokeLinecap="round"
              />
              <circle
                cx={pointerX}
                cy={pointerY}
                r="4.5"
                fill={isSelected ? '#38bdf8' : 'rgba(255,255,255,0.9)'}
                className="cursor-pointer hover:scale-125 transition-transform"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setDraggingEntity({
                    type: 'rotate_player',
                    id: player.id,
                    offsetX: 0,
                    offsetY: 0,
                  });
                }}
              />

              {/* Selection Halo */}
              {isSelected && (
                <circle
                  cx={px}
                  cy={py}
                  r="26"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="4,4"
                  className="animate-spin"
                  style={{ transformOrigin: `${px}px ${py}px`, animationDuration: '8s' }}
                />
              )}

              {/* Player Token (Circle with Jersey Color) */}
              <circle
                cx={px}
                cy={py}
                r="19"
                fill={playerBg}
                stroke={isHome ? '#ffffff' : '#0f172a'}
                strokeWidth="2.5"
                className="transition-colors"
              />

              {/* Player Number or Role */}
              <text
                x={px}
                y={py + 5}
                fill={textColor}
                fontSize="13"
                fontWeight="800"
                textAnchor="middle"
                className="select-none font-mono"
              >
                {settings.showPlayerNumbers ? player.number : player.role}
              </text>

              {/* Player Name / Tag below token */}
              {settings.showPlayerNames && player.name && (
                <g>
                  <rect
                    x={px - 34}
                    y={py + 23}
                    width="68"
                    height="17"
                    rx="4"
                    fill="rgba(15, 23, 42, 0.85)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="0.8"
                  />
                  <text
                    x={px}
                    y={py + 35}
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="600"
                    textAnchor="middle"
                    className="select-none"
                  >
                    {player.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* ============================================================== */}
        {/* FUTSAL BALL                                                    */}
        {/* ============================================================== */}
        {ball && (
          <g
            className="tactical-entity cursor-grab active:cursor-grabbing"
            filter="url(#entity-shadow)"
            transform={`translate(${(ball.x / 100) * 1000}, ${(ball.y / 100) * 500})`}
            onPointerDown={(e) => {
              e.stopPropagation();
              setDraggingEntity({
                type: 'ball',
                id: 'main-ball',
                offsetX: 0,
                offsetY: 0,
              });
            }}
          >
            {/* White outer sphere */}
            <circle cx="0" cy="0" r="10.5" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
            {/* Futsal pentagon pattern */}
            <polygon points="0,-4 3.8,-1.2 2.3,3.2 -2.3,3.2 -3.8,-1.2" fill="#0f172a" />
            {/* Subtle highlight ring */}
            <circle cx="-3" cy="-3" r="2.5" fill="rgba(255,255,255,0.7)" />
          </g>
        )}

        {/* ============================================================== */}
        {/* TEXT NOTES ON COURT                                            */}
        {/* ============================================================== */}
        {notes.map((note) => {
          const nx = (note.x / 100) * 1000;
          const ny = (note.y / 100) * 500;
          return (
            <g
              key={note.id}
              className="tactical-entity cursor-pointer hover:scale-105 transition-transform"
              transform={`translate(${nx}, ${ny})`}
              onClick={() => {
                if (toolMode === 'eraser' && onRemoveNote) {
                  onRemoveNote(note.id);
                }
              }}
            >
              <rect
                x="-12"
                y="-18"
                width={note.text.length * 8 + 24}
                height="26"
                rx="6"
                fill="rgba(15, 23, 42, 0.9)"
                stroke={note.color}
                strokeWidth="1.5"
              />
              <text
                x={(note.text.length * 8) / 2}
                y="0"
                fill={note.color}
                fontSize="12"
                fontWeight="700"
                textAnchor="middle"
                className="select-none"
              >
                {note.text}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
