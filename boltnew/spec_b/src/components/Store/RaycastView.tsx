import React, { useEffect, useRef, useState } from 'react';
import { RaycastEngine, calculateWallHeight } from '../../utils/raycasting';

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;

interface RaycastViewProps {
  active: boolean;
}

const RaycastView: React.FC<RaycastViewProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<RaycastEngine | null>(null);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  useEffect(() => {
    engineRef.current = new RaycastEngine();
  }, []);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      setKeysPressed(prev => new Set(prev).add(e.key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const next = new Set(prev);
        next.delete(e.key);
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [active]);

  useEffect(() => {
    if (!active || !engineRef.current) return;

    const engine = engineRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Handle movement
      if (keysPressed.has('ArrowUp')) engine.movePlayer(true);
      if (keysPressed.has('ArrowDown')) engine.movePlayer(false);
      if (keysPressed.has('ArrowLeft')) engine.rotatePlayer(false);
      if (keysPressed.has('ArrowRight')) engine.rotatePlayer(true);

      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw ceiling
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT / 2);

      // Draw floor
      ctx.fillStyle = '#1F2937';
      ctx.fillRect(0, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2);

      // Cast rays and draw walls
      const rays = engine.castRays();
      rays.forEach((ray, x) => {
        const wallHeight = calculateWallHeight(ray.distance);
        const wallTop = (CANVAS_HEIGHT - wallHeight) / 2;

        // Draw wall slice
        ctx.fillStyle = `rgba(255, 255, 255, ${1 / (ray.distance * 0.3)})`;
        ctx.fillRect(x, wallTop, 1, wallHeight);
      });

      requestAnimationFrame(render);
    };

    const animationFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrame);
  }, [active, keysPressed]);

  if (!active) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="rounded-lg shadow-lg"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/75 text-sm">
        Use arrow keys to move and rotate
      </div>
    </div>
  );
}

export default RaycastView;