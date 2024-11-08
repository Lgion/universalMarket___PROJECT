// Constants for raycasting
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;
const FOV = Math.PI / 3; // 60 degrees
const WALL_HEIGHT = 64;
const PLAYER_HEIGHT = 32;

export interface Point {
  x: number;
  y: number;
}

export interface Ray {
  angle: number;
  distance: number;
  hitPoint: Point;
}

export class RaycastEngine {
  private map: number[][];
  private playerPos: Point;
  private playerAngle: number;

  constructor() {
    // Sample map (0 = empty, 1 = wall)
    this.map = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    this.playerPos = { x: 1.5, y: 1.5 };
    this.playerAngle = 0;
  }

  castRay(angle: number): Ray {
    // Simplified DDA (Digital Differential Analysis) algorithm
    const rayDir = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    let mapPos = {
      x: Math.floor(this.playerPos.x),
      y: Math.floor(this.playerPos.y),
    };

    const deltaDist = {
      x: Math.abs(1 / rayDir.x),
      y: Math.abs(1 / rayDir.y),
    };

    const step = {
      x: rayDir.x >= 0 ? 1 : -1,
      y: rayDir.y >= 0 ? 1 : -1,
    };

    const sideDist = {
      x: (rayDir.x >= 0 ? (mapPos.x + 1 - this.playerPos.x) : (this.playerPos.x - mapPos.x)) * deltaDist.x,
      y: (rayDir.y >= 0 ? (mapPos.y + 1 - this.playerPos.y) : (this.playerPos.y - mapPos.y)) * deltaDist.y,
    };

    let hit = false;
    let distance = 0;
    let side = 0;

    while (!hit) {
      if (sideDist.x < sideDist.y) {
        sideDist.x += deltaDist.x;
        mapPos.x += step.x;
        side = 0;
      } else {
        sideDist.y += deltaDist.y;
        mapPos.y += step.y;
        side = 1;
      }

      if (this.map[mapPos.y]?.[mapPos.x] === 1) {
        hit = true;
      }
    }

    if (side === 0) {
      distance = (mapPos.x - this.playerPos.x + (1 - step.x) / 2) / rayDir.x;
    } else {
      distance = (mapPos.y - this.playerPos.y + (1 - step.y) / 2) / rayDir.y;
    }

    return {
      angle,
      distance,
      hitPoint: { x: mapPos.x, y: mapPos.y },
    };
  }

  castRays(): Ray[] {
    const rays: Ray[] = [];
    const rayCount = SCREEN_WIDTH;
    const angleStep = FOV / rayCount;

    for (let i = 0; i < rayCount; i++) {
      const rayAngle = this.playerAngle - FOV / 2 + angleStep * i;
      rays.push(this.castRay(rayAngle));
    }

    return rays;
  }

  movePlayer(forward: boolean) {
    const moveSpeed = 0.1;
    const newPos = {
      x: this.playerPos.x + (forward ? Math.cos(this.playerAngle) : -Math.cos(this.playerAngle)) * moveSpeed,
      y: this.playerPos.y + (forward ? Math.sin(this.playerAngle) : -Math.sin(this.playerAngle)) * moveSpeed,
    };

    if (this.map[Math.floor(newPos.y)]?.[Math.floor(newPos.x)] === 0) {
      this.playerPos = newPos;
    }
  }

  rotatePlayer(clockwise: boolean) {
    const rotSpeed = 0.1;
    this.playerAngle += clockwise ? rotSpeed : -rotSpeed;
  }

  getPlayerPosition(): Point {
    return { ...this.playerPos };
  }

  getPlayerAngle(): number {
    return this.playerAngle;
  }
}

export const calculateWallHeight = (distance: number): number => {
  return Math.floor((SCREEN_HEIGHT * WALL_HEIGHT) / (distance * SCREEN_WIDTH));
};