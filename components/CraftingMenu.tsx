import { useGameStore } from '@/store/gameStore';

export default function CraftingMenu() {
  const inventory = useGameStore(state => state.inventory);
  const craftPlanks = useGameStore(state => state.craftPlanks);
  const craftDoor = useGameStore(state => state.craftDoor);
  const toggleCrafting = useGameStore(state => state.toggleCrafting);

  const woodCount = inventory.find(item => item.type === 'wood')?.count || 0;
  const planksCount = inventory.find(item => item.type === 'planks')?.count || 0;
  const canCraftPlanks = woodCount >= 1;
  const canCraftDoor = planksCount >= 2;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-auto">
      <div className="bg-gray-800 p-8 rounded-xl border-4 border-gray-600 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Crafting Table</h2>
          <button
            onClick={toggleCrafting}
            className="text-white text-2xl hover:text-red-400 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {/* Recipe: Wood to Planks */}
          <div className={`bg-gray-700 p-6 rounded-lg border-2 ${
            canCraftPlanks ? 'border-green-500' : 'border-gray-600'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-900 rounded mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">WOOD</span>
                  </div>
                  <p className="text-white text-sm">× 1</p>
                </div>
                
                <span className="text-white text-3xl">→</span>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-700 rounded mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PLANKS</span>
                  </div>
                  <p className="text-white text-sm">× 4</p>
                </div>
              </div>

              <button
                onClick={craftPlanks}
                disabled={!canCraftPlanks}
                className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
                  canCraftPlanks
                    ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                Craft
              </button>
            </div>
            
            {!canCraftPlanks && (
              <p className="text-red-400 text-sm mt-3">
                Need at least 1 wood block! (You have: {woodCount})
              </p>
            )}
          </div>

          {/* Recipe: Planks to Door */}
          <div className={`bg-gray-700 p-6 rounded-lg border-2 ${
            canCraftDoor ? 'border-green-500' : 'border-gray-600'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-700 rounded mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PLANKS</span>
                  </div>
                  <p className="text-white text-sm">× 2</p>
                </div>
                
                <span className="text-white text-3xl">→</span>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-800 rounded mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">DOOR</span>
                  </div>
                  <p className="text-white text-sm">× 1</p>
                </div>
              </div>

              <button
                onClick={craftDoor}
                disabled={!canCraftDoor}
                className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
                  canCraftDoor
                    ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                Craft
              </button>
            </div>
            
            {!canCraftDoor && (
              <p className="text-red-400 text-sm mt-3">
                Need at least 2 planks! (You have: {planksCount})
              </p>
            )}
          </div>

          {/* Inventory Display */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-white font-bold mb-3">Your Inventory:</h3>
            <div className="flex gap-3 flex-wrap">
              {inventory.length === 0 ? (
                <p className="text-gray-400 text-sm">Empty - Break blocks to collect materials!</p>
              ) : (
                inventory.map(item => (
                  <div key={item.type} className="bg-gray-600 px-4 py-2 rounded text-white text-sm">
                    {item.type}: {item.count}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

