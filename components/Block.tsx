import { BlockType } from "@/store/gameStore";
import * as THREE from "three";

interface BlockProps {
  position: [number, number, number];
  type: BlockType;
  isOpen?: boolean;
}

const blockColors: Record<BlockType, string> = {
  grass: "#7CBD50",
  wood: "#8B5A2B",
  planks: "#C19A6B",
  leaves: "#2D5016",
  door: "#8B4513",
};

const blockTextures: Record<
  BlockType,
  { top?: string; side?: string; bottom?: string }
> = {
  grass: { top: "#7CBD50", side: "#6B9E42", bottom: "#5D4F37" },
  wood: { top: "#8B5A2B", side: "#8B5A2B", bottom: "#8B5A2B" },
  planks: { top: "#C19A6B", side: "#C19A6B", bottom: "#C19A6B" },
  leaves: { top: "#2D5016", side: "#2D5016", bottom: "#2D5016" },
  door: { top: "#654321", side: "#8B4513", bottom: "#654321" },
};

export default function Block({
  position,
  type,
  isOpen,
}: BlockProps) {
  // Click handling is now done via raycasting in Player component

  // For doors, make them thinner and pivot around a hinge
  if (type === 'door') {
    const [x, y, z] = position;
    
    // Rotation when open - door swings 90 degrees
    const rotation: [number, number, number] = isOpen ? [0, Math.PI / 2, 0] : [0, 0, 0];
    
    return (
      <group position={[x - 0.5, y + 0.5, z]} rotation={rotation}>
        {/* Position the door mesh so it pivots around the left edge (hinge point) */}
        {/* The mesh offset of [0.5, 0, 0] centers the door at the block position when closed */}
        <mesh position={[0.5, 0, 0]}>
          <boxGeometry args={[1, 2, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>
    );
  }

  // Get textures with fallback
  const texture = blockTextures[type] || {};
  const color = blockColors[type] || "#999999";
  
  const materials = [
    new THREE.MeshStandardMaterial({
      color: texture.side || color,
    }), // right
    new THREE.MeshStandardMaterial({
      color: texture.side || color,
    }), // left
    new THREE.MeshStandardMaterial({
      color: texture.top || color,
    }), // top
    new THREE.MeshStandardMaterial({
      color: texture.bottom || color,
    }), // bottom
    new THREE.MeshStandardMaterial({
      color: texture.side || color,
    }), // front
    new THREE.MeshStandardMaterial({
      color: texture.side || color,
    }), // back
  ];

  return (
    <mesh
      position={position}
      material={materials}
    >
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}
