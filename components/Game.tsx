'use client';

import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Sky } from '@react-three/drei';
import World from './World';
import Player from './Player';
import HUD from './HUD';
import Inventory from './Inventory';
import CraftingMenu from './CraftingMenu';
import { useGameStore } from '@/store/gameStore';
import { useEffect } from 'react';

export default function Game() {
  const showCrafting = useGameStore(state => state.showCrafting);
  const toggleCrafting = useGameStore(state => state.toggleCrafting);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'c' || e.key === 'C') {
        toggleCrafting();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleCrafting]);

  // Prevent right-click context menu
  useEffect(() => {
    const preventContext = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', preventContext);
    return () => document.removeEventListener('contextmenu', preventContext);
  }, []);

  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[50, 50, 25]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <World />
        <Player />
        <PointerLockControls />
      </Canvas>
      <HUD />
      <Inventory />
      {showCrafting && <CraftingMenu />}
      
      {/* Instructions overlay */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-lg text-sm">
        <p className="text-center">
          Click to lock cursor | WASD - Move | Space - Jump | Left Click - Break | E - Place | F - Open/Close Door | C - Craft
        </p>
      </div>
    </div>
  );
}


