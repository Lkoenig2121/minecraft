import { create } from 'zustand';
import * as THREE from 'three';

export type BlockType = 'grass' | 'wood' | 'planks' | 'leaves' | 'door';

export interface Block {
  position: [number, number, number];
  type: BlockType;
  id: string;
  isOpen?: boolean; // For doors
  openedAt?: number; // Timestamp when door was opened
}

export interface InventoryItem {
  type: BlockType;
  count: number;
}

interface GameState {
  blocks: Block[];
  inventory: InventoryItem[];
  gameStarted: boolean;
  selectedBlock: BlockType | null;
  showCrafting: boolean;
  
  // Actions
  startGame: () => void;
  addBlock: (position: [number, number, number], type: BlockType) => void;
  removeBlock: (id: string) => void;
  addToInventory: (type: BlockType, count?: number) => void;
  removeFromInventory: (type: BlockType, count?: number) => void;
  selectBlock: (type: BlockType | null) => void;
  toggleCrafting: () => void;
  craftPlanks: () => void;
  craftDoor: () => void;
  toggleDoor: (id: string) => void;
}

const generateWorld = (): Block[] => {
  const blocks: Block[] = [];
  const size = 20;
  
  // Generate grass floor
  for (let x = -size; x <= size; x++) {
    for (let z = -size; z <= size; z++) {
      blocks.push({
        position: [x, 0, z],
        type: 'grass',
        id: `grass-${x}-0-${z}`,
      });
    }
  }
  
  // Generate trees
  const treePositions = [
    [5, 8], [-3, 5], [8, -6], [-7, -4], [12, 3],
    [-10, 8], [6, -10], [-8, 12], [15, -2], [-5, -9],
  ];
  
  treePositions.forEach(([tx, tz], treeIndex) => {
    // Tree trunk (4 blocks high)
    for (let y = 1; y <= 4; y++) {
      blocks.push({
        position: [tx, y, tz],
        type: 'wood',
        id: `wood-${treeIndex}-${tx}-${y}-${tz}`,
      });
    }
    
    // Tree leaves (simple cube shape)
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {
        for (let y = 5; y <= 6; y++) {
          // Skip center top block to make it look more natural
          if (!(x === 0 && z === 0 && y === 6)) {
            blocks.push({
              position: [tx + x, y, tz + z],
              type: 'leaves',
              id: `leaves-${treeIndex}-${tx + x}-${y}-${tz + z}`,
            });
          }
        }
      }
    }
    
    // Top leaf block
    blocks.push({
      position: [tx, 7, tz],
      type: 'leaves',
      id: `leaves-top-${treeIndex}-${tx}-7-${tz}`,
    });
  });
  
  return blocks;
};

export const useGameStore = create<GameState>((set, get) => ({
  blocks: [],
  inventory: [],
  gameStarted: false,
  selectedBlock: null,
  showCrafting: false,
  
  startGame: () => {
    set({ 
      gameStarted: true, 
      blocks: generateWorld(),
      inventory: [],
    });
  },
  
  addBlock: (position, type) => {
    const id = `placed-${type}-${position[0]}-${position[1]}-${position[2]}-${Date.now()}`;
    set(state => ({
      blocks: [...state.blocks, { position, type, id }],
    }));
  },
  
  removeBlock: (id) => {
    const block = get().blocks.find(b => b.id === id);
    if (block && block.type !== 'grass') {
      get().addToInventory(block.type);
      set(state => ({
        blocks: state.blocks.filter(b => b.id !== id),
      }));
    }
  },
  
  addToInventory: (type, count = 1) => {
    set(state => {
      const existingItem = state.inventory.find(item => item.type === type);
      const newState: Partial<GameState> = {};
      
      if (existingItem) {
        newState.inventory = state.inventory.map(item =>
          item.type === type ? { ...item, count: item.count + count } : item
        );
      } else {
        newState.inventory = [...state.inventory, { type, count }];
      }
      
      // Auto-select first item if nothing is selected
      if (!state.selectedBlock && newState.inventory) {
        newState.selectedBlock = newState.inventory[0].type;
      }
      
      return newState;
    });
  },
  
  removeFromInventory: (type, count = 1) => {
    set(state => {
      const existingItem = state.inventory.find(item => item.type === type);
      if (!existingItem || existingItem.count < count) return state;
      
      if (existingItem.count === count) {
        return {
          inventory: state.inventory.filter(item => item.type !== type),
        };
      } else {
        return {
          inventory: state.inventory.map(item =>
            item.type === type ? { ...item, count: item.count - count } : item
          ),
        };
      }
    });
  },
  
  selectBlock: (type) => {
    set({ selectedBlock: type });
  },
  
  toggleCrafting: () => {
    set(state => ({ showCrafting: !state.showCrafting }));
  },
  
  craftPlanks: () => {
    const state = get();
    const woodItem = state.inventory.find(item => item.type === 'wood');
    
    if (woodItem && woodItem.count >= 1) {
      state.removeFromInventory('wood', 1);
      state.addToInventory('planks', 4);
    }
  },
  
  craftDoor: () => {
    const state = get();
    const planksItem = state.inventory.find(item => item.type === 'planks');
    
    if (planksItem && planksItem.count >= 2) {
      state.removeFromInventory('planks', 2);
      state.addToInventory('door', 1);
    }
  },
  
  toggleDoor: (id) => {
    set(state => ({
      blocks: state.blocks.map(block => {
        if (block.id === id && block.type === 'door') {
          const newIsOpen = !block.isOpen;
          return {
            ...block,
            isOpen: newIsOpen,
            openedAt: newIsOpen ? Date.now() : undefined, // Track when opened
          };
        }
        return block;
      }),
    }));
  },
}));

