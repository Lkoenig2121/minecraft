import { useGameStore } from '@/store/gameStore';

export default function StartScreen() {
  const startGame = useGameStore(state => state.startGame);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-400 to-green-600">
      <div className="text-center space-y-8 p-8 bg-black/30 rounded-2xl backdrop-blur-sm">
        <h1 className="text-7xl font-bold text-white mb-4 tracking-wider" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
          MINECRAFT
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Mine blocks, craft items, and build your world!
        </p>
        <button
          onClick={startGame}
          className="px-12 py-4 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Start New World
        </button>
        <div className="mt-8 text-white/80 text-sm space-y-2">
          <p><strong>Controls:</strong></p>
          <p>WASD - Move | Mouse - Look around</p>
          <p>Space - Jump | Shift - Crouch</p>
          <p>Left Click - Break | E - Place | F - Open/Close Door</p>
          <p>C - Open crafting | 1-5 - Select block</p>
        </div>
      </div>
    </div>
  );
}

