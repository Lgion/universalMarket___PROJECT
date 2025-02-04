import React, { useEffect } from 'react';
import { useStore } from '../store';

const Controls = () => {
  const { moveForward, moveBackward, turnLeft, turnRight, resetRotation } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveForward(true);
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveBackward(true);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          turnLeft();
          break;
        case 'ArrowRight':
        case 'KeyD':
          turnRight();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveForward(false);
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveBackward(false);
          break;
        case 'ArrowLeft':
        case 'KeyA':
        case 'ArrowRight':
        case 'KeyD':
          resetRotation();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [moveForward, moveBackward, turnLeft, turnRight, resetRotation]);

  return null;
}

export default Controls;