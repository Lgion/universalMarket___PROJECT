import { create } from 'zustand';

interface StoreState {
  position: { x: number; z: number };
  rotation: number;
  moveForward: (active: boolean) => void;
  moveBackward: (active: boolean) => void;
  turnLeft: () => void;
  turnRight: () => void;
  resetRotation: () => void;
}

export const useStore = create<StoreState>((set) => ({
  position: { x: 0, z: 0 },
  rotation: 0,
  moveForward: (active) =>
    set((state) => {
      if (!active) return state;
      const angle = state.rotation;
      return {
        position: {
          x: state.position.x + Math.sin(angle) * 0.1,
          z: state.position.z + Math.cos(angle) * 0.1,
        },
      };
    }),
  moveBackward: (active) =>
    set((state) => {
      if (!active) return state;
      const angle = state.rotation;
      return {
        position: {
          x: state.position.x - Math.sin(angle) * 0.1,
          z: state.position.z - Math.cos(angle) * 0.1,
        },
      };
    }),
  turnLeft: () =>
    set((state) => ({
      rotation: Math.max(state.rotation - 0.1, -Math.PI / 2),
    })),
  turnRight: () =>
    set((state) => ({
      rotation: Math.min(state.rotation + 0.1, Math.PI / 2),
    })),
  resetRotation: () =>
    set((state) => ({
      rotation: state.rotation * 0.9,
    })),
}));