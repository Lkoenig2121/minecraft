import { useGameStore } from '@/store/gameStore';
import Block from './Block';

export default function World() {
  const blocks = useGameStore(state => state.blocks);

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

