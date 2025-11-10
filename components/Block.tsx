import { BlockType } from "@/store/gameStore";
import * as THREE from "three";

interface BlockProps {
  position: [number, number, number];
  type: BlockType;
}

const blockColors: Record<BlockType, string> = {
  grass: "#7CBD50",
  wood: "#8B5A2B",
  planks: "#C19A6B",
  leaves: "#2D5016",
};

const blockTextures: Record<
  BlockType,
  { top?: string; side?: string; bottom?: string }
> = {
  grass: { top: "#7CBD50", side: "#6B9E42", bottom: "#5D4F37" },
  wood: { top: "#8B5A2B", side: "#8B5A2B", bottom: "#8B5A2B" },
  planks: { top: "#C19A6B", side: "#C19A6B", bottom: "#C19A6B" },
  leaves: { top: "#2D5016", side: "#2D5016", bottom: "#2D5016" },
};

export default function Block({
  position,
  type,
}: BlockProps) {
  // Click handling is now done via raycasting in Player component

  const materials = [
    new THREE.MeshStandardMaterial({
      color: blockTextures[type].side || blockColors[type],
    }), // right
    new THREE.MeshStandardMaterial({
      color: blockTextures[type].side || blockColors[type],
    }), // left
    new THREE.MeshStandardMaterial({
      color: blockTextures[type].top || blockColors[type],
    }), // top
    new THREE.MeshStandardMaterial({
      color: blockTextures[type].bottom || blockColors[type],
    }), // bottom
    new THREE.MeshStandardMaterial({
      color: blockTextures[type].side || blockColors[type],
    }), // front
    new THREE.MeshStandardMaterial({
      color: blockTextures[type].side || blockColors[type],
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
