import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Animal as AnimalType, useGameStore } from '@/store/gameStore';
import * as THREE from 'three';

interface AnimalProps {
  animal: AnimalType;
}

export function Sheep({ animal }: AnimalProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...animal.position);
      groupRef.current.rotation.y = animal.rotation;
    }
  }, [animal.position, animal.rotation]);

  return (
    <group ref={groupRef}>
      {/* Body - white fluffy */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.5, 0.8]} />
        <meshStandardMaterial color="#EEEEEE" />
      </mesh>
      
      {/* Head - white */}
      <mesh position={[0, 0.4, 0.5]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#EEEEEE" />
      </mesh>
      
      {/* Legs - black */}
      <mesh position={[-0.2, -0.1, 0.25]}>
        <boxGeometry args={[0.15, 0.3, 0.15]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0.2, -0.1, 0.25]}>
        <boxGeometry args={[0.15, 0.3, 0.15]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[-0.2, -0.1, -0.25]}>
        <boxGeometry args={[0.15, 0.3, 0.15]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0.2, -0.1, -0.25]}>
        <boxGeometry args={[0.15, 0.3, 0.15]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
}

export function Cow({ animal }: AnimalProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...animal.position);
      groupRef.current.rotation.y = animal.rotation;
    }
  }, [animal.position, animal.rotation]);

  return (
    <group ref={groupRef}>
      {/* Body - brown and white */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.7, 0.6, 1.0]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* White spots */}
      <mesh position={[0.1, 0.45, 0.2]}>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Head - brown */}
      <mesh position={[0, 0.5, 0.6]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Horns */}
      <mesh position={[-0.15, 0.7, 0.6]}>
        <boxGeometry args={[0.1, 0.15, 0.1]} />
        <meshStandardMaterial color="#DDDDDD" />
      </mesh>
      <mesh position={[0.15, 0.7, 0.6]}>
        <boxGeometry args={[0.1, 0.15, 0.1]} />
        <meshStandardMaterial color="#DDDDDD" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.25, 0, 0.3]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.25, 0, 0.3]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.25, 0, -0.3]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.25, 0, -0.3]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

export function Dog({ animal }: AnimalProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...animal.position);
      groupRef.current.rotation.y = animal.rotation;
    }
  }, [animal.position, animal.rotation]);

  return (
    <group ref={groupRef}>
      {/* Body - tan/brown */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.7]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.3, 0.45]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      
      {/* Snout */}
      <mesh position={[0, 0.2, 0.6]}>
        <boxGeometry args={[0.2, 0.15, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Ears - floppy */}
      <mesh position={[-0.15, 0.45, 0.45]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.15, 0.25, 0.1]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      <mesh position={[0.15, 0.45, 0.45]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.15, 0.25, 0.1]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      
      {/* Tail - wagging up */}
      <mesh position={[0, 0.4, -0.4]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.15, 0, 0.25]}>
        <boxGeometry args={[0.12, 0.25, 0.12]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      <mesh position={[0.15, 0, 0.25]}>
        <boxGeometry args={[0.12, 0.25, 0.12]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      <mesh position={[-0.15, 0, -0.2]}>
        <boxGeometry args={[0.12, 0.25, 0.12]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      <mesh position={[0.15, 0, -0.2]}>
        <boxGeometry args={[0.12, 0.25, 0.12]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
    </group>
  );
}

// Main Animal component that handles AI
export default function Animal({ animal }: AnimalProps) {
  const updatePosition = useGameStore(state => state.updateAnimalPosition);
  const updateVelocity = useGameStore(state => state.updateAnimalVelocity);
  
  useFrame((state, delta) => {
    const now = Date.now();
    
    // Check if it's time to change direction
    if (now >= animal.nextDirectionChange) {
      // Random new direction every 2-5 seconds
      const shouldMove = Math.random() > 0.3; // 70% chance to move
      
      if (shouldMove) {
        const speed = 0.5 + Math.random() * 0.5; // Random speed
        const angle = Math.random() * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vz = Math.sin(angle) * speed;
        updateVelocity(animal.id, [vx, vz], now + 2000 + Math.random() * 3000);
      } else {
        // Stop moving
        updateVelocity(animal.id, [0, 0], now + 1000 + Math.random() * 2000);
      }
    }
    
    // Apply velocity
    if (animal.velocity[0] !== 0 || animal.velocity[1] !== 0) {
      const newX = animal.position[0] + animal.velocity[0] * delta;
      const newZ = animal.position[2] + animal.velocity[1] * delta;
      
      // Keep animals within bounds (-15 to 15)
      const boundedX = Math.max(-15, Math.min(15, newX));
      const boundedZ = Math.max(-15, Math.min(15, newZ));
      
      // Calculate rotation to face movement direction
      const rotation = Math.atan2(animal.velocity[0], animal.velocity[1]);
      
      updatePosition(animal.id, [boundedX, animal.position[1], boundedZ], rotation);
    }
  });
  
  // Render the appropriate animal type
  switch (animal.type) {
    case 'sheep':
      return <Sheep animal={animal} />;
    case 'cow':
      return <Cow animal={animal} />;
    case 'dog':
      return <Dog animal={animal} />;
    default:
      return null;
  }
}


