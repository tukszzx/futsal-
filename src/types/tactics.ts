export type CourtType = 'blue' | 'wood' | 'green' | 'dark';
export type CourtView = 'full' | 'half_attack' | 'half_defense';

export type PlayerRole = 'GOL' | 'FIX' | 'ALA' | 'PIV' | 'GL';

export interface Player {
  id: string;
  team: 'home' | 'away';
  number: number;
  name: string;
  role: PlayerRole;
  x: number; // 0 to 100% of court width
  y: number; // 0 to 100% of court height
  angle: number; // facing angle in degrees (0 = facing right, 180 = facing left)
  isGoalkeeper?: boolean;
  isLineGoalkeeper?: boolean;
  color?: string;
  textColor?: string;
}

export interface Ball {
  x: number;
  y: number;
  height?: number; // 0 for ground, > 0 for lob/cavada
}

export interface Equipment {
  id: string;
  type: 'cone' | 'barrier' | 'mini_goal' | 'target';
  x: number;
  y: number;
  label?: string;
}

export type ArrowType = 'move' | 'pass' | 'dribble' | 'block';

export interface TacticalArrow {
  id: string;
  type: ArrowType;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  label?: string;
}

export interface DrawingPoint {
  x: number;
  y: number;
}

export interface FreeDrawing {
  id: string;
  points: DrawingPoint[];
  color: string;
  width: number;
}

export interface TacticalZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label?: string;
  shape: 'rect' | 'circle';
}

export interface TextNote {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
}

export interface Frame {
  id: string;
  label: string;
  players: Player[];
  ball: Ball;
  equipments: Equipment[];
  arrows: TacticalArrow[];
  drawings: FreeDrawing[];
  zones: TacticalZone[];
  notes: TextNote[];
  durationMs: number;
  coachNote?: string;
}

export interface Play {
  id: string;
  title: string;
  category: 'Sistema 3-1' | 'Sistema 4-0' | 'Sistema 2-2' | 'Goleiro-Linha (5x4)' | 'Bolas Paradas' | 'Saídas de Pressão' | 'Defesa' | 'Exercícios e Treinos' | 'Personalizada';
  description: string;
  coachingPoints?: string[];
  courtType: CourtType;
  courtView: CourtView;
  frames: Frame[];
  tags: string[];
  createdAt: string;
  isPreset?: boolean;
}

export type ToolMode =
  | 'select'
  | 'arrow_move'
  | 'arrow_pass'
  | 'arrow_dribble'
  | 'arrow_block'
  | 'pen'
  | 'zone'
  | 'text'
  | 'eraser';

export interface BoardSettings {
  courtType: CourtType;
  courtView: CourtView;
  showPlayerNames: boolean;
  showPlayerNumbers: boolean;
  showPlayerRoles: boolean;
  homeColor: string;
  awayColor: string;
  ballSpeed: number; // playback animation speed: 0.5, 1, 1.5, 2
  loopAnimation: boolean;
}
