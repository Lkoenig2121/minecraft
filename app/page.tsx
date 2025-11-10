'use client';

import dynamic from 'next/dynamic';
import StartScreen from '@/components/StartScreen';
import { useGameStore } from '@/store/gameStore';

const Game = dynamic(() => import('@/components/Game'), { ssr: false });

export default function Home() {
  const gameStarted = useGameStore(state => state.gameStarted);

  return (
    <main className="w-full h-screen">
      {!gameStarted ? <StartScreen /> : <Game />}
    </main>
  );
}

