import { Play } from '../types/tactics';

export const DEFAULT_TACTICAL_PRESETS: Play[] = [
  {
    id: 'preset-31-pivo-infiltracao',
    title: 'Sistema 3-1: Apoio do Pivô e Finalização na 2ª Trave',
    category: 'Sistema 3-1',
    description: 'Jogada clássica de futsal em 3-1. O fixo encontra o pivô de costas para a marcação, os alas arrancam em velocidade e o pivô escora para o ala que entra livre na segunda trave.',
    coachingPoints: [
      'O pivô deve usar o corpo (antebraço e quadril) para proteger a bola sem fazer falta.',
      'O ala oposto (ALA-E) precisa iniciar a corrida no exato momento que a bola sai do pé do fixo.',
      'O passe do pivô deve ser suave e rasante, já projetado para o chute de primeira.'
    ],
    courtType: 'blue',
    courtView: 'full',
    tags: ['Ataque Posicional', 'Pivô de Referência', 'Finalização', '3-1'],
    createdAt: '2026-03-01T10:00:00Z',
    isPreset: true,
    frames: [
      {
        id: 'f1',
        label: 'Passo 1: Construção e Posicionamento Inicial',
        durationMs: 2500,
        coachNote: 'Fixo com a posse central, alas abertos pisando na linha lateral para gerar amplitude máxima e pivô sustentando a marcação do fixo adversário.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 6, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'Rodrigo', role: 'FIX', x: 28, y: 50, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'Leandro', role: 'ALA', x: 42, y: 82, angle: 0 },
          { id: 'h4', team: 'home', number: 10, name: 'Falcão', role: 'ALA', x: 42, y: 18, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'Ferrão', role: 'PIV', x: 74, y: 50, angle: 180 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 94, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'FIX', role: 'FIX', x: 76, y: 50, angle: 180 },
          { id: 'a3', team: 'away', number: 5, name: 'ALA', role: 'ALA', x: 55, y: 72, angle: 180 },
          { id: 'a4', team: 'away', number: 8, name: 'ALA', role: 'ALA', x: 55, y: 28, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'PIV', role: 'PIV', x: 40, y: 50, angle: 180 }
        ],
        ball: { x: 28, y: 50 },
        equipments: [],
        arrows: [
          { id: 'a-f1-1', type: 'pass', startX: 28, startY: 50, endX: 74, endY: 50, color: '#f59e0b', label: 'Passe vertical no Pivô' },
          { id: 'a-f1-2', type: 'move', startX: 42, startY: 18, endX: 75, endY: 28, color: '#38bdf8', label: 'Infiltração rápida' }
        ],
        drawings: [],
        zones: [
          { id: 'z1', x: 68, y: 35, width: 22, height: 30, color: '#10b981', shape: 'rect', label: 'Zona do Pivô' }
        ],
        notes: [{ id: 'n1', x: 30, y: 35, text: 'Fixo inicia a jogada', color: '#ffffff' }]
      },
      {
        id: 'f2',
        label: 'Passo 2: Sustentação do Pivô e Ataque às Costas',
        durationMs: 2500,
        coachNote: 'Pivô domina girando o corpo para proteger do fixo. Ala Esquerdo ataca o espaço vazio em velocidade máxima.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 10, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'Rodrigo', role: 'FIX', x: 38, y: 45, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'Leandro', role: 'ALA', x: 55, y: 80, angle: 0 },
          { id: 'h4', team: 'home', number: 10, name: 'Falcão', role: 'ALA', x: 72, y: 28, angle: 25 },
          { id: 'h5', team: 'home', number: 9, name: 'Ferrão', role: 'PIV', x: 74, y: 54, angle: 140 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 93, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'FIX', role: 'FIX', x: 77, y: 54, angle: 180 },
          { id: 'a3', team: 'away', number: 5, name: 'ALA', role: 'ALA', x: 60, y: 72, angle: 180 },
          { id: 'a4', team: 'away', number: 8, name: 'ALA', role: 'ALA', x: 62, y: 34, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'PIV', role: 'PIV', x: 42, y: 46, angle: 180 }
        ],
        ball: { x: 74, y: 54 },
        equipments: [],
        arrows: [
          { id: 'a-f2-1', type: 'pass', startX: 74, startY: 54, endX: 86, endY: 34, color: '#f59e0b', label: 'Escorada diagonal' },
          { id: 'a-f2-2', type: 'move', startX: 72, startY: 28, endX: 86, endY: 34, color: '#38bdf8', label: 'Ataque à 2ª trave' }
        ],
        drawings: [],
        zones: [],
        notes: [{ id: 'n2', x: 72, y: 15, text: 'Quebra de linha nas costas', color: '#38bdf8' }]
      },
      {
        id: 'f3',
        label: 'Passo 3: Finalização de Primeira na Segunda Trave',
        durationMs: 2500,
        coachNote: 'Ala chapa de primeira no contrapé do goleiro. Ala Direito fecha o rebote na trave oposta.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 12, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'Rodrigo', role: 'FIX', x: 44, y: 48, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'Leandro', role: 'ALA', x: 78, y: 72, angle: 0 },
          { id: 'h4', team: 'home', number: 10, name: 'Falcão', role: 'ALA', x: 88, y: 35, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'Ferrão', role: 'PIV', x: 76, y: 58, angle: 0 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 91, y: 42, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'FIX', role: 'FIX', x: 78, y: 56, angle: 180 },
          { id: 'a3', team: 'away', number: 5, name: 'ALA', role: 'ALA', x: 68, y: 68, angle: 180 },
          { id: 'a4', team: 'away', number: 8, name: 'ALA', role: 'ALA', x: 75, y: 40, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'PIV', role: 'PIV', x: 46, y: 48, angle: 180 }
        ],
        ball: { x: 88, y: 35 },
        equipments: [],
        arrows: [
          { id: 'a-f3-1', type: 'pass', startX: 88, startY: 35, endX: 96, endY: 48, color: '#ef4444', label: 'Gol no canto!' }
        ],
        drawings: [],
        zones: [
          { id: 'z-f3', x: 84, y: 30, width: 14, height: 40, color: '#f59e0b', shape: 'rect', label: 'Área de Chute Fatal' }
        ],
        notes: [{ id: 'n3', x: 80, y: 20, text: 'Chute de chapa cruzado', color: '#10b981' }]
      }
    ]
  },
  {
    id: 'preset-40-rotacao-oito',
    title: 'Sistema 4-0: Rotação em Oito e Passe na Paralela',
    category: 'Sistema 4-0',
    description: 'Movimentação em linha (sem pivô fixo) para desgastar e abrir a marcação sob pressão. Baseado em rotação contínua ("em 8") e quebra com passe na paralela.',
    coachingPoints: [
      'Após o passe, o jogador DEVE dar o pique em direção ao fundo e trocar de lado.',
      'A bola deve circular com no máximo 2 toques por atleta.',
      'O passe na paralela deve ser antecipado pelo companheiro, atacando o espaço livre.'
    ],
    courtType: 'wood',
    courtView: 'full',
    tags: ['4-0', 'Sem Pivô', 'Rotação em 8', 'Passe e Vai'],
    createdAt: '2026-03-01T10:00:00Z',
    isPreset: true,
    frames: [
      {
        id: 'f1',
        label: 'Passo 1: Linha de 4 na Meia-Quadra',
        durationMs: 2500,
        coachNote: 'Quatro jogadores em linha horizontal atraem a primeira linha adversária.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 8, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 35, y: 65, angle: 0 },
          { id: 'h3', team: 'home', number: 5, name: 'ALA-D', role: 'ALA', x: 38, y: 85, angle: 0 },
          { id: 'h4', team: 'home', number: 8, name: 'ALA-E', role: 'ALA', x: 38, y: 15, angle: 0 },
          { id: 'h5', team: 'home', number: 10, name: 'FIX-2', role: 'FIX', x: 35, y: 35, angle: 0 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 94, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'MARC', role: 'FIX', x: 60, y: 65, angle: 180 },
          { id: 'a3', team: 'away', number: 4, name: 'MARC', role: 'ALA', x: 55, y: 82, angle: 180 },
          { id: 'a4', team: 'away', number: 7, name: 'MARC', role: 'ALA', x: 55, y: 18, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'MARC', role: 'PIV', x: 58, y: 35, angle: 180 }
        ],
        ball: { x: 35, y: 65 },
        equipments: [],
        arrows: [
          { id: 'a1', type: 'pass', startX: 35, startY: 65, endX: 38, endY: 85, color: '#f59e0b', label: 'Toca na ala' },
          { id: 'a2', type: 'move', startX: 35, startY: 65, endX: 68, endY: 68, color: '#38bdf8', label: 'Arranca nas costas' }
        ],
        drawings: [],
        zones: [],
        notes: [{ id: 'n1', x: 26, y: 68, text: 'Inicia a rotação em 8', color: '#ffffff' }]
      },
      {
        id: 'f2',
        label: 'Passo 2: Passe na Paralela e Deslocamento em Diagonal',
        durationMs: 2500,
        coachNote: 'Ala Direito recebe e desfere o passe na paralela para o atleta que infiltrou em velocidade.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 12, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 72, y: 78, angle: 0 },
          { id: 'h3', team: 'home', number: 5, name: 'ALA-D', role: 'ALA', x: 48, y: 88, angle: 0 },
          { id: 'h4', team: 'home', number: 8, name: 'ALA-E', role: 'ALA', x: 50, y: 20, angle: 15 },
          { id: 'h5', team: 'home', number: 10, name: 'FIX-2', role: 'FIX', x: 38, y: 48, angle: 0 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 92, y: 55, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'MARC', role: 'FIX', x: 68, y: 70, angle: 180 },
          { id: 'a3', team: 'away', number: 4, name: 'MARC', role: 'ALA', x: 52, y: 84, angle: 180 },
          { id: 'a4', team: 'away', number: 7, name: 'MARC', role: 'ALA', x: 52, y: 24, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'MARC', role: 'PIV', x: 44, y: 45, angle: 180 }
        ],
        ball: { x: 72, y: 78 },
        equipments: [],
        arrows: [
          { id: 'a3', type: 'pass', startX: 72, startY: 78, endX: 82, endY: 30, color: '#f59e0b', label: 'Passe cruzado fatal' },
          { id: 'a4', type: 'move', startX: 50, startY: 20, endX: 82, endY: 30, color: '#38bdf8', label: 'Diagonal de fechamento' }
        ],
        drawings: [],
        zones: [
          { id: 'z1', x: 65, y: 70, width: 25, height: 25, color: '#38bdf8', shape: 'circle', label: 'Linha paralela ganha' }
        ],
        notes: [{ id: 'n2', x: 70, y: 62, text: 'Passe perfeito na paralela', color: '#10b981' }]
      },
      {
        id: 'f3',
        label: 'Passo 3: Finalização na Segunda Trave',
        durationMs: 2500,
        coachNote: 'Ala oposto entra completando para as redes, com apoio de trás do segundo fixo.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 15, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 82, y: 82, angle: 0 },
          { id: 'h3', team: 'home', number: 5, name: 'ALA-D', role: 'ALA', x: 58, y: 85, angle: 0 },
          { id: 'h4', team: 'home', number: 8, name: 'ALA-E', role: 'ALA', x: 88, y: 32, angle: 0 },
          { id: 'h5', team: 'home', number: 10, name: 'FIX-2', role: 'FIX', x: 60, y: 50, angle: 0 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 91, y: 46, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'MARC', role: 'FIX', x: 80, y: 68, angle: 180 },
          { id: 'a3', team: 'away', number: 4, name: 'MARC', role: 'ALA', x: 68, y: 82, angle: 180 },
          { id: 'a4', team: 'away', number: 7, name: 'MARC', role: 'ALA', x: 78, y: 35, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'MARC', role: 'PIV', x: 55, y: 48, angle: 180 }
        ],
        ball: { x: 88, y: 32 },
        equipments: [],
        arrows: [
          { id: 'a5', type: 'pass', startX: 88, startY: 32, endX: 96, endY: 45, color: '#ef4444', label: 'Gol de primeira' }
        ],
        drawings: [],
        zones: [],
        notes: [{ id: 'n3', x: 82, y: 18, text: 'Gol! Superioridade na 2ª trave', color: '#10b981' }]
      }
    ]
  },
  {
    id: 'preset-5x4-goleiro-linha',
    title: 'Goleiro-Linha (5x4): Circulação em U e Passe Diagonal',
    category: 'Goleiro-Linha (5x4)',
    description: 'Armação de 5 contra 4 em superioridade numérica. Formação em "U" (2 na base e 3 no fundo). Circulação rápida para desencaixar o losango ou quadrado defensivo.',
    coachingPoints: [
      'Paciência na posse: não force passe arriscado pelo meio até o defensor balançar.',
      'Goleiro-linha deve chutar se o marcador não subir, forçando a dúvida.',
      'Ataque sempre a segunda trave no momento do passe final.'
    ],
    courtType: 'dark',
    courtView: 'half_attack',
    tags: ['Goleiro-Linha', '5x4', 'Superioridade', 'Pressão Final'],
    createdAt: '2026-03-01T10:00:00Z',
    isPreset: true,
    frames: [
      {
        id: 'f1',
        label: 'Passo 1: Formação em U no Campo de Ataque',
        durationMs: 2500,
        coachNote: 'GL e Fixo na linha de 12 metros, dois alas bem abertos e pivô centralizado na área de 6m.',
        players: [
          { id: 'h1', team: 'home', number: 12, name: 'G-LINHA', role: 'GL', x: 62, y: 72, angle: 0, isLineGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 62, y: 28, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 84, y: 88, angle: 0 },
          { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 84, y: 12, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 82, y: 50, angle: 180 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 94, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'DEF', role: 'FIX', x: 85, y: 58, angle: 180 },
          { id: 'a3', team: 'away', number: 4, name: 'DEF', role: 'FIX', x: 85, y: 42, angle: 180 },
          { id: 'a4', team: 'away', number: 7, name: 'DEF', role: 'ALA', x: 74, y: 62, angle: 180 },
          { id: 'a5', team: 'away', number: 8, name: 'DEF', role: 'ALA', x: 74, y: 38, angle: 180 }
        ],
        ball: { x: 62, y: 72 },
        equipments: [],
        arrows: [
          { id: 'a1', type: 'pass', startX: 62, startY: 72, endX: 84, endY: 88, color: '#f59e0b', label: 'Bola no fundo' }
        ],
        drawings: [],
        zones: [
          { id: 'z1', x: 58, y: 10, width: 38, height: 80, color: '#f59e0b', shape: 'rect', label: 'Disposição em U (5x4)' }
        ],
        notes: [{ id: 'n1', x: 55, y: 80, text: 'Goleiro-Linha conduz na base', color: '#ffffff' }]
      },
      {
        id: 'f2',
        label: 'Passo 2: Atração do Bloco e Passe no Meio do Box',
        durationMs: 2500,
        coachNote: 'Ala atrai o defensor do canto, pivô desce um metro oferecendo apoio e desestabiliza a caixa.',
        players: [
          { id: 'h1', team: 'home', number: 12, name: 'G-LINHA', role: 'GL', x: 68, y: 65, angle: 0, isLineGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 65, y: 25, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 88, y: 88, angle: 0 },
          { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 86, y: 15, angle: 10 },
          { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 78, y: 52, angle: 140 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 93, y: 55, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'DEF', role: 'FIX', x: 88, y: 68, angle: 180 },
          { id: 'a3', team: 'away', number: 4, name: 'DEF', role: 'FIX', x: 84, y: 40, angle: 180 },
          { id: 'a4', team: 'away', number: 7, name: 'DEF', role: 'ALA', x: 78, y: 72, angle: 180 },
          { id: 'a5', team: 'away', number: 8, name: 'DEF', role: 'ALA', x: 72, y: 35, angle: 180 }
        ],
        ball: { x: 88, y: 88 },
        equipments: [],
        arrows: [
          { id: 'a2', type: 'pass', startX: 88, startY: 88, endX: 78, endY: 52, color: '#f59e0b', label: 'Passe no Pivô' },
          { id: 'a3', type: 'move', startX: 86, startY: 15, endX: 90, endY: 35, color: '#38bdf8', label: 'Corte nas costas' }
        ],
        drawings: [],
        zones: [],
        notes: [{ id: 'n2', x: 80, y: 92, text: 'Defesa obrigada a abrir', color: '#10b981' }]
      },
      {
        id: 'f3',
        label: 'Passo 3: Chapa de Primeira na Segunda Trave',
        durationMs: 2500,
        coachNote: 'Pivô apenas esvia a bola de primeira para a infiltração mortal do ala esquerdo.',
        players: [
          { id: 'h1', team: 'home', number: 12, name: 'G-LINHA', role: 'GL', x: 72, y: 62, angle: 0, isLineGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 68, y: 25, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 86, y: 82, angle: 0 },
          { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 91, y: 36, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 82, y: 52, angle: 0 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 92, y: 48, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'DEF', role: 'FIX', x: 88, y: 66, angle: 180 },
          { id: 'a3', team: 'away', number: 4, name: 'DEF', role: 'FIX', x: 85, y: 45, angle: 180 },
          { id: 'a4', team: 'away', number: 7, name: 'DEF', role: 'ALA', x: 79, y: 68, angle: 180 },
          { id: 'a5', team: 'away', number: 8, name: 'DEF', role: 'ALA', x: 76, y: 38, angle: 180 }
        ],
        ball: { x: 91, y: 36 },
        equipments: [],
        arrows: [
          { id: 'a4', type: 'pass', startX: 91, startY: 36, endX: 96, endY: 48, color: '#ef4444', label: 'Gol no canto!' }
        ],
        drawings: [],
        zones: [
          { id: 'z2', x: 88, y: 30, width: 8, height: 16, color: '#ef4444', shape: 'rect', label: 'Zona Livre' }
        ],
        notes: [{ id: 'n3', x: 78, y: 20, text: 'Defesa totalmente desarticulada', color: '#10b981' }]
      }
    ]
  },
  {
    id: 'preset-escanteio-bloqueio',
    title: 'Escanteio Ensaiado: Corta-Luz e Chute do Fixo',
    category: 'Bolas Paradas',
    description: 'Jogada de bola parada altamente eficaz contra marcação individual. O pivô simula ir para a trave mas bloqueia o marcador do fixo, liberando o chute forte da entrada da área.',
    coachingPoints: [
      'O corta-luz deve ser firme com os pés fixos no chão para não configurar falta ofensiva.',
      'O batedor do escanteio deve fingir que vai cruzar para dentro antes de rolar para trás.',
      'O fixo precisa bater na bola subindo o corpo para não isolar por cima.'
    ],
    courtType: 'green',
    courtView: 'half_attack',
    tags: ['Escanteio', 'Bola Parada', 'Corta-Luz', 'Finalização de Longe'],
    createdAt: '2026-03-01T10:00:00Z',
    isPreset: true,
    frames: [
      {
        id: 'f1',
        label: 'Passo 1: Posicionamento Inicial no Escanteio',
        durationMs: 2500,
        coachNote: 'Ala no escanteio, dois jogadores na área atraindo a defesa e Fixo aguardando na intermediária.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 20, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'Rodrigo', role: 'FIX', x: 64, y: 50, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 99, y: 99, angle: 220 },
          { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 88, y: 20, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 82, y: 62, angle: 180 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 94, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'DEF-1', role: 'FIX', x: 72, y: 50, angle: 180 },
          { id: 'a3', team: 'away', number: 4, name: 'DEF-2', role: 'ALA', x: 92, y: 88, angle: 180 },
          { id: 'a4', team: 'away', number: 5, name: 'DEF-3', role: 'ALA', x: 85, y: 30, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'DEF-4', role: 'PIV', x: 84, y: 64, angle: 180 }
        ],
        ball: { x: 99, y: 99 },
        equipments: [],
        arrows: [
          { id: 'a1', type: 'block', startX: 82, startY: 62, endX: 72, endY: 53, color: '#ef4444', label: 'Corta-Luz no marcador do Fixo' },
          { id: 'a2', type: 'move', startX: 64, startY: 50, endX: 74, endY: 55, color: '#38bdf8', label: 'Avanço para o chute' }
        ],
        drawings: [],
        zones: [
          { id: 'z1', x: 70, y: 40, width: 14, height: 25, color: '#f59e0b', shape: 'rect', label: 'Zona do Chute Limpo' }
        ],
        notes: [{ id: 'n1', x: 85, y: 92, text: 'Sinal com a mão levantada', color: '#ffffff' }]
      },
      {
        id: 'f2',
        label: 'Passo 2: Execução do Bloqueio e Passe Flutuado',
        durationMs: 2500,
        coachNote: 'Pivô trava o marcador adversário. Ala passa rasteiro para trás na direção do fixo.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 22, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'Rodrigo', role: 'FIX', x: 74, y: 56, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 96, y: 94, angle: 220 },
          { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 90, y: 28, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 76, y: 52, angle: 180 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 93, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'DEF-1', role: 'FIX', x: 77, y: 50, angle: 180 },
          { id: 'a3', team: 'away', number: 4, name: 'DEF-2', role: 'ALA', x: 90, y: 82, angle: 180 },
          { id: 'a4', team: 'away', number: 5, name: 'DEF-3', role: 'ALA', x: 88, y: 35, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'DEF-4', role: 'PIV', x: 82, y: 65, angle: 180 }
        ],
        ball: { x: 75, y: 57 },
        equipments: [],
        arrows: [
          { id: 'a3', type: 'pass', startX: 75, startY: 57, endX: 96, endY: 50, color: '#ef4444', label: 'Bomba de primeira' }
        ],
        drawings: [],
        zones: [],
        notes: [{ id: 'n2', x: 68, y: 44, text: 'Bloqueio perfeito! Fixo livre', color: '#10b981' }]
      },
      {
        id: 'f3',
        label: 'Passo 3: Voleio Fatal e Fechamento de Rebote',
        durationMs: 2500,
        coachNote: 'Fixo solta a bomba no ângulo. Ala Esquerdo fecha a segunda trave para garantir o rebote.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 25, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'Rodrigo', role: 'FIX', x: 76, y: 56, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 92, y: 88, angle: 0 },
          { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 92, y: 38, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 80, y: 54, angle: 0 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 92, y: 52, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'DEF-1', role: 'FIX', x: 78, y: 50, angle: 180 },
          { id: 'a3', team: 'away', number: 4, name: 'DEF-2', role: 'ALA', x: 86, y: 76, angle: 180 },
          { id: 'a4', team: 'away', number: 5, name: 'DEF-3', role: 'ALA', x: 88, y: 40, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'DEF-4', role: 'PIV', x: 82, y: 62, angle: 180 }
        ],
        ball: { x: 96, y: 48 },
        equipments: [],
        arrows: [],
        drawings: [],
        zones: [
          { id: 'z3', x: 95, y: 42, width: 4, height: 16, color: '#10b981', shape: 'rect', label: 'Gol no ângulo!' }
        ],
        notes: [{ id: 'n3', x: 74, y: 70, text: 'Golaço de voleio!', color: '#10b981' }]
      }
    ]
  },
  {
    id: 'preset-saida-pressao-diagonal',
    title: 'Saída de Pressão Alta: Tabela na Paralela e Quebra com Goleiro',
    category: 'Saídas de Pressão',
    description: 'Estratégia para escapar da marcação homem-a-homem na primeira linha defensiva. O goleiro atua como elemento surpresa gerando superioridade 5x4 na saída.',
    coachingPoints: [
      'Goleiro deve pisar firme na bola para atrair o marcador antes de soltar o passe.',
      'Ala deve conduzir em diagonal para forçar o recuo da cobertura.',
      'Se a marcação dobrar, passe longo imediato no pivô desmarcado.'
    ],
    courtType: 'blue',
    courtView: 'full',
    tags: ['Saída de Pressão', 'Goleiro Linha de Passe', 'Transição', 'Marcação Alta'],
    createdAt: '2026-03-01T10:00:00Z',
    isPreset: true,
    frames: [
      {
        id: 'f1',
        label: 'Passo 1: Adversário Pressiona em Linha Alta',
        durationMs: 2500,
        coachNote: 'Adversário sobe as 4 linhas de marcação. Goleiro sai da meta para receber com os pés.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 12, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 18, y: 78, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 32, y: 88, angle: 0 },
          { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 22, y: 15, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 65, y: 50, angle: 180 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 94, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'FIX', role: 'FIX', x: 67, y: 50, angle: 180 },
          { id: 'a3', team: 'away', number: 5, name: 'ALA', role: 'ALA', x: 28, y: 76, angle: 180 },
          { id: 'a4', team: 'away', number: 8, name: 'ALA', role: 'ALA', x: 24, y: 22, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'PIV', role: 'PIV', x: 18, y: 50, angle: 180 }
        ],
        ball: { x: 12, y: 50 },
        equipments: [],
        arrows: [
          { id: 'a1', type: 'pass', startX: 12, startY: 50, endX: 18, endY: 78, color: '#f59e0b', label: 'Passe no fixo' },
          { id: 'a2', type: 'move', startX: 12, startY: 50, endX: 20, endY: 42, color: '#38bdf8', label: 'Goleiro avança apoiando' }
        ],
        drawings: [],
        zones: [
          { id: 'z1', x: 10, y: 10, width: 25, height: 80, color: '#ef4444', shape: 'rect', label: 'Zona de Pressão Máxima' }
        ],
        notes: [{ id: 'n1', x: 10, y: 35, text: 'Goleiro gera homem livre', color: '#ffffff' }]
      },
      {
        id: 'f2',
        label: 'Passo 2: Tabela Rápida Goleiro-Fixo e Passe no Meio',
        durationMs: 2500,
        coachNote: 'Fixo devolve no goleiro e o goleiro conecta de primeira no pivô livre na quadra de ataque.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 22, y: 44, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 26, y: 80, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 45, y: 85, angle: 0 },
          { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 38, y: 15, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 62, y: 45, angle: 180 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 92, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'FIX', role: 'FIX', x: 66, y: 48, angle: 180 },
          { id: 'a3', team: 'away', number: 5, name: 'ALA', role: 'ALA', x: 32, y: 78, angle: 180 },
          { id: 'a4', team: 'away', number: 8, name: 'ALA', role: 'ALA', x: 30, y: 25, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'PIV', role: 'PIV', x: 24, y: 54, angle: 180 }
        ],
        ball: { x: 22, y: 44 },
        equipments: [],
        arrows: [
          { id: 'a3', type: 'pass', startX: 22, startY: 44, endX: 62, endY: 45, color: '#f59e0b', label: 'Passe vertical no Pivô' },
          { id: 'a4', type: 'move', startX: 45, startY: 85, endX: 70, endY: 80, color: '#38bdf8', label: 'Transição veloz' }
        ],
        drawings: [],
        zones: [],
        notes: [{ id: 'n2', x: 40, y: 55, text: 'Linha adversária quebrada!', color: '#10b981' }]
      },
      {
        id: 'f3',
        label: 'Passo 3: Transição 3x1 em Velocidade',
        durationMs: 2500,
        coachNote: 'Pivô domina e desdobra para o contra-ataque em superioridade flagrante 3x1.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 18, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 4, name: 'FIX', role: 'FIX', x: 35, y: 75, angle: 0 },
          { id: 'h3', team: 'home', number: 7, name: 'ALA-D', role: 'ALA', x: 75, y: 78, angle: 0 },
          { id: 'h4', team: 'home', number: 10, name: 'ALA-E', role: 'ALA', x: 74, y: 24, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'PIV', role: 'PIV', x: 68, y: 48, angle: 0 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 90, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 3, name: 'FIX', role: 'FIX', x: 78, y: 50, angle: 180 },
          { id: 'a3', team: 'away', number: 5, name: 'ALA', role: 'ALA', x: 50, y: 74, angle: 180 },
          { id: 'a4', team: 'away', number: 8, name: 'ALA', role: 'ALA', x: 48, y: 28, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'PIV', role: 'PIV', x: 35, y: 52, angle: 180 }
        ],
        ball: { x: 68, y: 48 },
        equipments: [],
        arrows: [
          { id: 'a5', type: 'pass', startX: 68, startY: 48, endX: 75, endY: 78, color: '#f59e0b', label: 'Abre no Ala' }
        ],
        drawings: [],
        zones: [
          { id: 'z2', x: 65, y: 20, width: 30, height: 65, color: '#10b981', shape: 'rect', label: 'Contra-Ataque Letal (3x1)' }
        ],
        notes: [{ id: 'n3', x: 65, y: 15, text: 'Superioridade numérica garantida', color: '#10b981' }]
      }
    ]
  },
  {
    id: 'preset-defesa-losango-121',
    title: 'Defesa em Losango (1-2-1): Flutuação e Indução para a Lateral',
    category: 'Defesa',
    description: 'Sistema clássico de defesa zonal mista. O primeiro defensor induz o portador para uma das alas, onde o ala defensor dobra e o fixo cobre o fundo.',
    coachingPoints: [
      'O homem da frente NUNCA pode tomar o drible pelo meio.',
      'A indução deve ser clara: fechar a perna boa do adversário e forçar o passe lateral.',
      'Fixo defende a área e comanda a comunicação do bloco.'
    ],
    courtType: 'dark',
    courtView: 'full',
    tags: ['Defesa', 'Losango', '1-2-1', 'Indução', 'Zonal'],
    createdAt: '2026-03-01T10:00:00Z',
    isPreset: true,
    frames: [
      {
        id: 'f1',
        label: 'Passo 1: Bloco Médio em Losango Compacto',
        durationMs: 2500,
        coachNote: 'Formato diamante: 1 na frente, 2 nas alas e 1 fixo no fundo, distantes no máximo 8 metros entre si.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 8, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 3, name: 'FIX', role: 'FIX', x: 20, y: 50, angle: 0 },
          { id: 'h3', team: 'home', number: 5, name: 'ALA-D', role: 'ALA', x: 30, y: 70, angle: 0 },
          { id: 'h4', team: 'home', number: 8, name: 'ALA-E', role: 'ALA', x: 30, y: 30, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'MARC', role: 'PIV', x: 42, y: 50, angle: 0 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 94, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 4, name: 'FIX', role: 'FIX', x: 55, y: 50, angle: 180 },
          { id: 'a3', team: 'away', number: 7, name: 'ALA', role: 'ALA', x: 52, y: 82, angle: 180 },
          { id: 'a4', team: 'away', number: 10, name: 'ALA', role: 'ALA', x: 52, y: 18, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'PIV', role: 'PIV', x: 28, y: 50, angle: 180 }
        ],
        ball: { x: 55, y: 50 },
        equipments: [],
        arrows: [
          { id: 'a1', type: 'move', startX: 42, startY: 50, endX: 48, endY: 53, color: '#ef4444', label: 'Induz para a ala direita' }
        ],
        drawings: [],
        zones: [
          { id: 'z1', x: 18, y: 25, width: 28, height: 50, color: '#38bdf8', shape: 'circle', label: 'Losango Defensivo' }
        ],
        notes: [{ id: 'n1', x: 32, y: 15, text: 'Compactação total pelo centro', color: '#38bdf8' }]
      },
      {
        id: 'f2',
        label: 'Passo 2: Basculamento e Dobra de Marcação na Linha Lateral',
        durationMs: 2500,
        coachNote: 'Quando o passe vai na ala, o Ala defensivo pressiona de frente e o homem da frente fecha a linha de passe para trás.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 10, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 3, name: 'FIX', role: 'FIX', x: 22, y: 60, angle: 0 },
          { id: 'h3', team: 'home', number: 5, name: 'ALA-D', role: 'ALA', x: 48, y: 80, angle: 0 },
          { id: 'h4', team: 'home', number: 8, name: 'ALA-E', role: 'ALA', x: 28, y: 42, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'MARC', role: 'PIV', x: 50, y: 68, angle: 0 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 94, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 4, name: 'FIX', role: 'FIX', x: 58, y: 52, angle: 180 },
          { id: 'a3', team: 'away', number: 7, name: 'ALA', role: 'ALA', x: 52, y: 85, angle: 180 },
          { id: 'a4', team: 'away', number: 10, name: 'ALA', role: 'ALA', x: 55, y: 18, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'PIV', role: 'PIV', x: 26, y: 62, angle: 180 }
        ],
        ball: { x: 52, y: 85 },
        equipments: [],
        arrows: [
          { id: 'a2', type: 'move', startX: 48, startY: 80, endX: 51, endY: 83, color: '#ef4444', label: 'Bote firme' },
          { id: 'a3', type: 'block', startX: 50, startY: 68, endX: 54, endY: 62, color: '#f59e0b', label: 'Corta passe de retorno' }
        ],
        drawings: [],
        zones: [
          { id: 'z2', x: 44, y: 65, width: 14, height: 26, color: '#ef4444', shape: 'rect', label: 'Armadilha Tática (Gaiola)' }
        ],
        notes: [{ id: 'n2', x: 42, y: 92, text: 'Adversário encurralado na lateral', color: '#10b981' }]
      },
      {
        id: 'f3',
        label: 'Passo 3: Desarme e Arrancada para o Contra-Golpe',
        durationMs: 2500,
        coachNote: 'Recuperação de posse limpa na meia quadra e contra-ataque rápido 2x1.',
        players: [
          { id: 'h1', team: 'home', number: 1, name: 'GOL', role: 'GOL', x: 12, y: 50, angle: 0, isGoalkeeper: true },
          { id: 'h2', team: 'home', number: 3, name: 'FIX', role: 'FIX', x: 24, y: 55, angle: 0 },
          { id: 'h3', team: 'home', number: 5, name: 'ALA-D', role: 'ALA', x: 58, y: 82, angle: 0 },
          { id: 'h4', team: 'home', number: 8, name: 'ALA-E', role: 'ALA', x: 45, y: 35, angle: 0 },
          { id: 'h5', team: 'home', number: 9, name: 'MARC', role: 'PIV', x: 62, y: 55, angle: 0 },
          { id: 'a1', team: 'away', number: 1, name: 'GOL', role: 'GOL', x: 92, y: 50, angle: 180, isGoalkeeper: true },
          { id: 'a2', team: 'away', number: 4, name: 'FIX', role: 'FIX', x: 65, y: 52, angle: 180 },
          { id: 'a3', team: 'away', number: 7, name: 'ALA', role: 'ALA', x: 50, y: 88, angle: 180 },
          { id: 'a4', team: 'away', number: 10, name: 'ALA', role: 'ALA', x: 55, y: 22, angle: 180 },
          { id: 'a5', team: 'away', number: 9, name: 'PIV', role: 'PIV', x: 30, y: 64, angle: 180 }
        ],
        ball: { x: 58, y: 82 },
        equipments: [],
        arrows: [
          { id: 'a4', type: 'dribble', startX: 58, startY: 82, endX: 78, endY: 75, color: '#f59e0b', label: 'Condução rápida' }
        ],
        drawings: [],
        zones: [],
        notes: [{ id: 'n3', x: 56, y: 70, text: 'Bola recuperada! Transição veloz', color: '#10b981' }]
      }
    ]
  }
];

export const TACTICAL_THEORY_GUIDES = [
  {
    title: 'Fundamentos do Sistema 3-1 no Futsal',
    badge: 'Sistema Clássico',
    summary: 'A base do futsal moderno com fixo centralizador, alas de alta intensidade e pivô de referência.',
    advantages: [
      'Excelente profundidade e capacidade de quebrar defesas agressivas com passe longo no pivô.',
      'Segurança defensiva natural proporcionada pelo fixo de ofício.',
      'Facilidade de criar situações de 1 contra 1 para alas habilidosos.'
    ],
    drawbacks: [
      'Se o pivô for neutralizado individualmente pelo fixo adversário, o time perde a principal válvula de escape.',
      'Exige alas com alta capacidade aeróbica para recomposição defensiva constante.'
    ],
    keyRules: [
      'O passe no pivô deve ser preferencialmente no pé dominante ou no espaço de proteção corporal.',
      'Alas nunca devem ficar estáticos nas mesmas linhas de passe.'
    ]
  },
  {
    title: 'Dinâmica e Rotação do Sistema 4-0',
    badge: 'Alta Mobilidade',
    summary: 'Sistema sem pivô posicional estático. Todos os 4 atletas atuam na linha média trocando de posições em velocidade.',
    advantages: [
      'Gera desgaste físico e confusão mental extrema na marcação individual adversária.',
      'Abre as alas com passes na paralela para finalização nas costas do marcador.',
      'Ideal contra equipes com fixos pesados e lentos na recuperação.'
    ],
    drawbacks: [
      'Exige condicionamento físico no ápice e grande entrosamento coletivo.',
      'Risco maior de contra-ataque rápido se houver perda de posse no meio-campo.'
    ],
    keyRules: [
      'Passe e vai obrigatório: quem passa a bola ataca o espaço vazio sem hesitação.',
      'Limitar a posse individual a no máximo 2 ou 3 toques rápidos.'
    ]
  },
  {
    title: 'Manual de Execução do Goleiro-Linha (5x4)',
    badge: 'Poder Ofensivo',
    summary: 'Superioridade numérica para buscar o placar nos minutos finais ou controlar a posse de bola.',
    advantages: [
      'Sempre haverá pelo menos um jogador livre de marcação se a bola circular com rapidez.',
      'Permite criar finalizações claras de segunda trave ou chutes da intermediária com goleiro encoberto.'
    ],
    drawbacks: [
      'A meta fica totalmente desprotegida; qualquer passe interceptado é quase gol certo do adversário.',
      'Exige frieza absoluta e pouca margem para passes precipitados.'
    ],
    keyRules: [
      'A bola deve circular em "U" nas extremidades antes de tentar a penetração no coração da defesa.',
      'O batedor do chute deve finalizar de chapa ou rasante, nunca por cima da trave.'
    ]
  },
  {
    title: 'Princípios da Marcação por Zona vs. Individual',
    badge: 'Organização Defensiva',
    summary: 'Comparativo essencial para escolher o modelo de marcação ideal contra cada tipo de adversário.',
    advantages: [
      'Marcação Individual: Asfixia equipes que dependem de jogadores lentos ou com pouca habilidade de drible.',
      'Marcação por Zona (Losango/Quadrado): Economiza energia, fecha o meio da quadra e protege a meta contra bolas nas costas.'
    ],
    drawbacks: [
      'Individual cede facilmente a jogadas de corta-luz e bloqueios.',
      'Zona requer sincronia perfeita de basculamento para não ceder chutes livres de média distância.'
    ],
    keyRules: [
      'Na dúvida entre dar o bote ou conter, contenha e induza o atacante para a linha lateral.',
      'O goleiro é o maestro da defesa: oriente os companheiros sobre quem é o homem livre.'
    ]
  }
];
