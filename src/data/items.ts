import { ItemType } from '../types';

export interface ItemConfig {
  type: ItemType;
  label: string;
  points: number;
  isHarmful: boolean;
  color: string;
  glowColor: string;
  spawnWeight: number; // Probability weight
  minScoreToAppear: number;
}

export const ITEM_CONFIGS: Record<ItemType, ItemConfig> = {
  apple: {
    type: 'apple',
    label: 'Apel Merah',
    points: 1,
    isHarmful: false,
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    spawnWeight: 35,
    minScoreToAppear: 0,
  },
  orange: {
    type: 'orange',
    label: 'Jeruk Manis',
    points: 1,
    isHarmful: false,
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    spawnWeight: 30,
    minScoreToAppear: 0,
  },
  banana: {
    type: 'banana',
    label: 'Pisang',
    points: 1,
    isHarmful: false,
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    spawnWeight: 25,
    minScoreToAppear: 5,
  },
  strawberry: {
    type: 'strawberry',
    label: 'Stroberi',
    points: 2,
    isHarmful: false,
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    spawnWeight: 18,
    minScoreToAppear: 10,
  },
  grape: {
    type: 'grape',
    label: 'Anggur',
    points: 2,
    isHarmful: false,
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    spawnWeight: 14,
    minScoreToAppear: 15,
  },
  watermelon: {
    type: 'watermelon',
    label: 'Semangka',
    points: 3,
    isHarmful: false,
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    spawnWeight: 10,
    minScoreToAppear: 25,
  },
  golden_apple: {
    type: 'golden_apple',
    label: 'Apel Emas',
    points: 5,
    isHarmful: false,
    color: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    spawnWeight: 4,
    minScoreToAppear: 20,
  },
  rotten_fruit: {
    type: 'rotten_fruit',
    label: 'Buah Busuk',
    points: 0,
    isHarmful: true,
    color: '#4d7c0f',
    glowColor: 'rgba(77, 124, 15, 0.5)',
    spawnWeight: 18,
    minScoreToAppear: 4, // starts appearing after initial 4 points
  },
  bomb: {
    type: 'bomb',
    label: 'Bom Hitam',
    points: 0,
    isHarmful: true,
    color: '#334155',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    spawnWeight: 15,
    minScoreToAppear: 12, // bomb appears after score reaches 12
  },
};

export const getRandomItemType = (currentScore: number): ItemType => {
  // Filter available items based on score
  const available = Object.values(ITEM_CONFIGS).filter(
    (item) => currentScore >= item.minScoreToAppear
  );

  const totalWeight = available.reduce((sum, item) => sum + item.spawnWeight, 0);
  let random = Math.random() * totalWeight;

  for (const item of available) {
    if (random < item.spawnWeight) {
      return item.type;
    }
    random -= item.spawnWeight;
  }

  return 'apple';
};
