import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, GameStats, FallingItem, Particle, FloatingText } from './types';
import { ITEM_CONFIGS, getRandomItemType } from './data/items';
import {
  playCatchSound,
  playRottenSound,
  playBombSound,
  playWinSound,
  playLoseSound,
  playClickSound,
  setMuted,
  getMuted,
} from './utils/audio';
import { GardenBackground } from './components/GardenBackground';
import { HeaderHUD } from './components/HeaderHUD';
import { Basket } from './components/Basket';
import { FallingItemComponent } from './components/FallingItemItem';
import { ParticlesLayer } from './components/ParticlesLayer';
import { ControlsOverlay } from './components/ControlsOverlay';
import { StartScreen } from './components/StartScreen';
import { GameOverModal } from './components/GameOverModal';
import { VictoryModal } from './components/VictoryModal';
import { PauseModal } from './components/PauseModal';

const HIGH_SCORE_KEY = 'fruit_catcher_high_score_v1';
const WIN_TARGET_SCORE = 50;
const BASKET_WIDTH_PX = 105;
const BASKET_WIDTH_PERCENT = 14; // Approximate collision width %

export default function App() {
  // Game states
  const [gameState, setGameState] = useState<GameState>('menu');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(() => {
    return localStorage.getItem('fruit_catcher_muted') === 'true';
  });

  const [stats, setStats] = useState<GameStats>(() => {
    const savedHighScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10);
    return {
      score: 0,
      highScore: isNaN(savedHighScore) ? 0 : savedHighScore,
      strikes: 0,
      fruitsCaught: 0,
      itemsMissed: 0,
      targetScore: WIN_TARGET_SCORE,
      level: 1,
      combo: 0,
      maxCombo: 0,
    };
  });

  // Dynamic game board entities
  const [basketX, setBasketX] = useState<number>(50); // percentage 10% to 90%
  const [basketTilt, setBasketTilt] = useState<number>(0);
  const [isCatching, setIsCatching] = useState<boolean>(false);
  const [isHitHarmful, setIsHitHarmful] = useState<boolean>(false);

  const [items, setItems] = useState<FallingItem[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  // Refs for animation and loop stability without closure staleness
  const keysPressed = useRef<Set<string>>(new Set());
  const basketXRef = useRef<number>(50);
  const itemsRef = useRef<FallingItem[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const statsRef = useRef<GameStats>(stats);
  const gameStateRef = useRef<GameState>(gameState);
  const lastSpawnTime = useRef<number>(0);
  const animFrameId = useRef<number>(0);
  const boardRef = useRef<HTMLDivElement>(null);

  // Keep refs in sync
  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    setMuted(isAudioMuted);
    localStorage.setItem('fruit_catcher_muted', isAudioMuted ? 'true' : 'false');
  }, [isAudioMuted]);

  // Handle Audio Mute toggle
  const handleToggleMute = useCallback(() => {
    setIsAudioMuted((prev) => !prev);
    playClickSound();
  }, []);

  // Spawn visual splash particles
  const spawnSplash = (x: number, y: number, color: string, count: number = 8) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 0.6 + 0.3;
      newParticles.push({
        id: `p-${Date.now()}-${Math.random()}`,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4, // initial upward burst
        color,
        size: Math.random() * 8 + 4,
        alpha: 1,
        maxLife: 24,
        life: 24,
      });
    }
    particlesRef.current.push(...newParticles);
  };

  // Spawn floating text (+1, -1 Nyawa!)
  const spawnFloatingText = (x: number, y: number, text: string, color: string, isHarmful: boolean = false) => {
    floatingTextsRef.current.push({
      id: `ft-${Date.now()}-${Math.random()}`,
      x,
      y: y - 2,
      text,
      color,
      alpha: 1,
      isHarmful,
    });
  };

  // Start / Reset Game
  const startGame = useCallback(() => {
    playClickSound();
    const savedHighScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10);
    const initialStats: GameStats = {
      score: 0,
      highScore: isNaN(savedHighScore) ? 0 : savedHighScore,
      strikes: 0,
      fruitsCaught: 0,
      itemsMissed: 0,
      targetScore: WIN_TARGET_SCORE,
      level: 1,
      combo: 0,
      maxCombo: 0,
    };

    // 1. Reset stats & statsRef to zero
    statsRef.current = initialStats;
    setStats(initialStats);

    // 2. Reset basket position, tilt and clear pressed keys
    basketXRef.current = 50;
    setBasketX(50);
    setBasketTilt(0);
    setIsCatching(false);
    setIsHitHarmful(false);
    keysPressed.current.clear();

    // 3. Clear all active falling items, particles and floating texts
    itemsRef.current = [];
    setItems([]);
    particlesRef.current = [];
    setParticles([]);
    floatingTextsRef.current = [];
    setFloatingTexts([]);

    // 4. Reset spawn timer so first fruit spawns quickly (~400ms)
    lastSpawnTime.current = performance.now() - 600;

    // 5. Reset game state to playing
    gameStateRef.current = 'playing';
    setGameState('playing');
  }, []);

  // Pause / Resume Toggle
  const togglePause = useCallback(() => {
    playClickSound();
    setGameState((prev) => {
      const next = prev === 'playing' ? 'paused' : prev === 'paused' ? 'playing' : prev;
      gameStateRef.current = next;
      return next;
    });
  }, []);

  // Return to Menu
  const goToMenu = useCallback(() => {
    playClickSound();
    itemsRef.current = [];
    setItems([]);
    particlesRef.current = [];
    setParticles([]);
    floatingTextsRef.current = [];
    setFloatingTexts([]);
    keysPressed.current.clear();
    gameStateRef.current = 'menu';
    setGameState('menu');
  }, []);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keysPressed.current.add('left');
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keysPressed.current.add('right');
      }

      // Space key for pause/resume when in-game
      if (e.code === 'Space') {
        if (gameStateRef.current === 'playing' || gameStateRef.current === 'paused') {
          e.preventDefault();
          togglePause();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keysPressed.current.delete('left');
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keysPressed.current.delete('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [togglePause]);

  // Touch/Mouse drag movement on board
  const handleBoardPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gameStateRef.current !== 'playing' || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    const clampedX = Math.max(8, Math.min(92, relativeX));
    basketXRef.current = clampedX;
    setBasketX(clampedX);
  };

  // Main Game Loop using requestAnimationFrame
  useEffect(() => {
    let lastTickTime = performance.now();

    const gameLoop = (currentTime: number) => {
      const delta = Math.min(currentTime - lastTickTime, 64); // prevent huge jumps on tab switch
      lastTickTime = currentTime;

      if (gameStateRef.current === 'playing') {
        // 1. Move Basket based on keys pressed
        const moveSpeed = 1.15; // percent per frame
        let currentTilt = 0;

        if (keysPressed.current.has('left') && !keysPressed.current.has('right')) {
          basketXRef.current = Math.max(8, basketXRef.current - moveSpeed);
          currentTilt = -9;
        } else if (keysPressed.current.has('right') && !keysPressed.current.has('left')) {
          basketXRef.current = Math.min(92, basketXRef.current + moveSpeed);
          currentTilt = 9;
        }

        setBasketX(basketXRef.current);
        setBasketTilt(currentTilt);

        // 2. Spawn Items periodically
        const currentScore = statsRef.current.score;
        // Spawn rate scales gently with score
        const spawnInterval = Math.max(700, 1250 - (currentScore / WIN_TARGET_SCORE) * 550);

        if (currentTime - lastSpawnTime.current > spawnInterval) {
          lastSpawnTime.current = currentTime;
          const itemType = getRandomItemType(currentScore);
          const config = ITEM_CONFIGS[itemType];

          // Progressive falling speed:
          // Pelan di awal (0.33 %/frame) and increases gently towards ~0.58 %/frame at 50 points
          const baseSpeed = 0.33;
          const speedMultiplier = 1 + (currentScore / WIN_TARGET_SCORE) * 0.75;
          const itemSpeed = baseSpeed * speedMultiplier * (0.95 + Math.random() * 0.1);

          // Random horizontal location
          const spawnX = Math.random() * 76 + 12; // 12% to 88%

          itemsRef.current.push({
            id: `item-${currentTime}-${Math.random()}`,
            type: itemType,
            x: spawnX,
            y: -8, // starts slightly above screen
            speed: itemSpeed,
            size: itemType === 'watermelon' ? 58 : itemType === 'golden_apple' ? 56 : 50,
            points: config.points,
            isHarmful: config.isHarmful,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 2.8,
            label: config.label,
            emoji: '',
            color: config.color,
          });
        }

        // 3. Update falling items & check catch collision
        const currentBasketX = basketXRef.current;
        const basketYMin = 83; // top boundary of basket catch zone
        const basketYMax = 92; // bottom boundary of basket catch zone
        const remainingItems: FallingItem[] = [];

        let scoreDelta = 0;
        let strikesDelta = 0;
        let fruitsCaughtDelta = 0;
        let didCatch = false;
        let didHitHarmful = false;

        for (const item of itemsRef.current) {
          item.y += item.speed;
          item.rotation += item.rotationSpeed;

          // Check if item enters basket catch zone
          const inYZone = item.y >= basketYMin && item.y <= basketYMax;
          const xDist = Math.abs(item.x - currentBasketX);
          const inXZone = xDist <= BASKET_WIDTH_PERCENT / 2 + 3;

          if (inYZone && inXZone) {
            // Caught!
            if (!item.isHarmful) {
              didCatch = true;
              scoreDelta += item.points;
              fruitsCaughtDelta += 1;
              const newCombo = statsRef.current.combo + 1;
              statsRef.current.combo = newCombo;
              if (newCombo > statsRef.current.maxCombo) {
                statsRef.current.maxCombo = newCombo;
              }

              playCatchSound(newCombo);
              spawnSplash(item.x, item.y, item.color, 9);
              spawnFloatingText(item.x, item.y, `+${item.points}`, item.color);
            } else {
              didHitHarmful = true;
              strikesDelta += 1;
              statsRef.current.combo = 0; // reset combo on bad item

              if (item.type === 'bomb') {
                playBombSound();
                spawnSplash(item.x, item.y, '#ef4444', 14);
                spawnFloatingText(item.x, item.y, 'BOM! -1 Nyawa', '#ef4444', true);
              } else {
                playRottenSound();
                spawnSplash(item.x, item.y, '#65a30d', 10);
                spawnFloatingText(item.x, item.y, 'BUSUK! -1 Nyawa', '#84cc16', true);
              }
            }
            // Do not keep caught item
            continue;
          }

          // Check if item fell out of screen
          if (item.y > 105) {
            // Item missed
            continue;
          }

          remainingItems.push(item);
        }

        itemsRef.current = remainingItems;
        setItems([...remainingItems]);

        if (didCatch) {
          setIsCatching(true);
          setTimeout(() => setIsCatching(false), 140);
        }
        if (didHitHarmful) {
          setIsHitHarmful(true);
          setTimeout(() => setIsHitHarmful(false), 240);
        }

        // Apply score and strikes update
        if (scoreDelta > 0 || strikesDelta > 0 || fruitsCaughtDelta > 0) {
          const newScore = statsRef.current.score + scoreDelta;
          const newStrikes = statsRef.current.strikes + strikesDelta;
          const newFruitsCaught = statsRef.current.fruitsCaught + fruitsCaughtDelta;

          // Determine current level/speed
          const newLevel = newScore < 15 ? 1 : newScore < 30 ? 2 : newScore < 45 ? 3 : 4;
          const newHighScore = Math.max(statsRef.current.highScore, newScore);

          if (newHighScore > statsRef.current.highScore) {
            localStorage.setItem(HIGH_SCORE_KEY, newHighScore.toString());
          }

          const updatedStats: GameStats = {
            ...statsRef.current,
            score: newScore,
            strikes: newStrikes,
            fruitsCaught: newFruitsCaught,
            highScore: newHighScore,
            level: newLevel,
          };

          statsRef.current = updatedStats;
          setStats({ ...updatedStats });

          // Check WIN condition: score reaches 50 points
          if (newScore >= WIN_TARGET_SCORE) {
            playWinSound();
            gameStateRef.current = 'victory';
            setGameState('victory');
            itemsRef.current = [];
            setItems([]);
          } else if (newStrikes >= 3) {
            // Check LOSE condition: 3 strikes (caught 3 rotten fruits / bombs)
            playLoseSound();
            gameStateRef.current = 'gameover';
            setGameState('gameover');
            itemsRef.current = [];
            setItems([]);
          }
        }

        // 4. Update particles
        const nextParticles: Particle[] = [];
        for (const p of particlesRef.current) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.035; // gravity
          p.life -= 1;
          p.alpha = Math.max(0, p.life / p.maxLife);
          if (p.life > 0) {
            nextParticles.push(p);
          }
        }
        particlesRef.current = nextParticles;
        setParticles([...nextParticles]);

        // 5. Update floating texts
        const nextFloating: FloatingText[] = [];
        for (const ft of floatingTextsRef.current) {
          ft.y -= 0.45; // float upward
          ft.alpha -= 0.03;
          if (ft.alpha > 0) {
            nextFloating.push(ft);
          }
        }
        floatingTextsRef.current = nextFloating;
        setFloatingTexts([...nextFloating]);
      }

      animFrameId.current = requestAnimationFrame(gameLoop);
    };

    animFrameId.current = requestAnimationFrame(gameLoop);
    return () => {
      cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Controls for on-screen buttons
  const handleMoveLeftStart = useCallback(() => {
    keysPressed.current.add('left');
  }, []);
  const handleMoveLeftEnd = useCallback(() => {
    keysPressed.current.delete('left');
  }, []);
  const handleMoveRightStart = useCallback(() => {
    keysPressed.current.add('right');
  }, []);
  const handleMoveRightEnd = useCallback(() => {
    keysPressed.current.delete('right');
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col bg-slate-900 select-none">
      {/* Garden Game Arena Container */}
      <div
        ref={boardRef}
        onPointerMove={handleBoardPointerMove}
        className="relative flex-1 w-full max-w-5xl mx-auto h-full flex flex-col overflow-hidden shadow-2xl border-x-4 border-amber-900/40 cursor-default"
      >
        {/* Scenic Garden Background */}
        <GardenBackground />

        {/* Top HUD (Score, Lives, Progress, Controls) */}
        {gameState !== 'menu' && (
          <HeaderHUD
            stats={stats}
            isPaused={gameState === 'paused'}
            isMuted={isAudioMuted}
            onTogglePause={togglePause}
            onToggleMute={handleToggleMute}
            onRestart={startGame}
          />
        )}

        {/* Main Play Area */}
        <div className="relative flex-1 w-full h-full overflow-hidden">
          {/* Active Falling Items */}
          {gameState !== 'menu' &&
            items.map((item) => (
              <FallingItemComponent key={item.id} item={item} />
            ))}

          {/* Fruit Basket Playable Character */}
          {gameState !== 'menu' && (
            <Basket
              x={basketX}
              tilt={basketTilt}
              isCatching={isCatching}
              isHitHarmful={isHitHarmful}
              basketWidth={BASKET_WIDTH_PX}
            />
          )}

          {/* Particles & Floating Score Text Layer */}
          <ParticlesLayer
            particles={particles}
            floatingTexts={floatingTexts}
          />

          {/* Controls hint / Touch buttons */}
          {gameState === 'playing' && (
            <ControlsOverlay
              onMoveLeftStart={handleMoveLeftStart}
              onMoveLeftEnd={handleMoveLeftEnd}
              onMoveRightStart={handleMoveRightStart}
              onMoveRightEnd={handleMoveRightEnd}
            />
          )}
        </div>

        {/* Modals & Screens */}
        {gameState === 'menu' && (
          <StartScreen
            highScore={stats.highScore}
            isMuted={isAudioMuted}
            onToggleMute={handleToggleMute}
            onStart={startGame}
          />
        )}

        {gameState === 'paused' && (
          <PauseModal
            onResume={togglePause}
            onRestart={startGame}
            onHome={goToMenu}
          />
        )}

        {gameState === 'gameover' && (
          <GameOverModal
            stats={stats}
            onRestart={startGame}
            onHome={goToMenu}
          />
        )}

        {gameState === 'victory' && (
          <VictoryModal
            stats={stats}
            onRestart={startGame}
            onHome={goToMenu}
          />
        )}
      </div>
    </main>
  );
}
