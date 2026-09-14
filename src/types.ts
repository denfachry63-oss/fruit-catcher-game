export type GameState = 'menu' | 'playing' | 'paused' | 'gameover' | 'victory';

export type ItemType = 
  | 'apple' 
  | 'orange' 
  | 'banana' 
  | 'strawberry' 
  | 'grape' 
  | 'watermelon' 
  | 'golden_apple'
  | 'rotten_fruit' 
  | 'bomb';

export interface FallingItem {
  id: string;
  type: ItemType;
  x: number;          // Horizontal position percentage (0 to 100) or pixel
  y: number;          // Vertical position in percentage (0 to 100)
  speed: number;      // Falling speed delta per tick
  size: number;       // Size in pixels
  points: number;     // Points gained (positive) or 0
  isHarmful: boolean; // True for rotten_fruit or bomb
  rotation: number;   // Current rotation in degrees
  rotationSpeed: number; // Angular speed
  label: string;
  emoji: string;
  color: string;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  isHarmful: boolean;
}

export interface GameStats {
  score: number;
  highScore: number;
  strikes: number; // Max 3
  fruitsCaught: number;
  itemsMissed: number;
  targetScore: number; // 50
  level: number;
  combo: number;
  maxCombo: number;
}
