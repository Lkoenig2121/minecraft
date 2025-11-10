import { useGameStore } from '@/store/gameStore';
import Block from './Block';
import { useFrame } from '@react-three/fiber';

export default function World() {
  const blocks = useGameStore(state => state.blocks);
  const toggleDoor = useGameStore(state => state.toggleDoor);

  // Auto-close doors after 3 seconds
  useFrame(() => {
    const now = Date.now();
    const AUTO_CLOSE_DELAY = 3000; // 3 seconds
    
    blocks.forEach(block => {
      if (block.type === 'door' && block.isOpen && block.openedAt) {
        if (now - block.openedAt >= AUTO_CLOSE_DELAY) {
          console.log('🚪 Auto-closing door:', block.id);
          toggleDoor(block.id);
        }
      }
    });
  });

  return (
    <group>
      {blocks.map(block => (
        <Block
          key={block.id}
          position={block.position}
          type={block.type}
          isOpen={block.isOpen}
        />
      ))}
    </group>
  );
}

