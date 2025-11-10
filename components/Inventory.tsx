import { useGameStore, BlockType } from '@/store/gameStore';
import { useEffect } from 'react';

const blockColors: Record<BlockType, string> = {
  grass: 'bg-green-600',
  wood: 'bg-yellow-900',
  planks: 'bg-yellow-700',
  leaves: 'bg-green-800',
  door: 'bg-amber-800',
};

const blockNames: Record<BlockType, string> = {
  grass: 'Grass',
  wood: 'Wood',
  planks: 'Planks',
  leaves: 'Leaves',
  door: 'Door',
};

export default function Inventory() {
  const inventory = useGameStore(state => state.inventory);
  const selectedBlock = useGameStore(state => state.selectedBlock);
  const selectBlock = useGameStore(state => state.selectBlock);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 5) {
        if (inventory[num - 1]) {
          selectBlock(inventory[num - 1].type);
          console.log('✅ Selected:', inventory[num - 1].type);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inventory, selectBlock]);
  
  // Log inventory changes
  useEffect(() => {
    console.log('📦 Inventory updated:', inventory, 'Selected:', selectedBlock);
  }, [inventory, selectedBlock]);

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none flex flex-col items-center gap-2">
      {/* Selected block indicator */}
      {selectedBlock && (
        <div className="text-center text-white text-sm bg-black/60 px-4 py-1 rounded-lg">
          Selected: <strong>{blockNames[selectedBlock]}</strong> - Press E to place
        </div>
      )}
      
      <div className="flex gap-2 bg-black/50 p-3 rounded-lg backdrop-blur-sm pointer-events-auto">
        {inventory.slice(0, 5).map((item, index) => (
          <div
            key={item.type}
            onClick={() => {
              selectBlock(item.type);
              console.log('✅ Clicked to select:', item.type);
            }}
            className={`w-16 h-16 rounded border-2 cursor-pointer transition-all ${
              selectedBlock === item.type
                ? 'border-yellow-400 scale-110 shadow-lg shadow-yellow-400/50 bg-yellow-400/20'
                : 'border-gray-600 hover:border-gray-400'
            } ${blockColors[item.type]} flex flex-col items-center justify-center relative`}
          >
            <span className="text-white text-xs font-bold">{blockNames[item.type]}</span>
            <span className="absolute bottom-1 right-1 text-white text-xs font-bold bg-black/50 px-1 rounded">
              {item.count}
            </span>
            <span className="absolute top-0 left-1 text-white text-xs font-bold">
              {index + 1}
            </span>
          </div>
        ))}
        {inventory.length === 0 && (
          <div className="text-white text-sm py-4 px-6">
            Break blocks to collect materials!
          </div>
        )}
      </div>
    </div>
  );
}

