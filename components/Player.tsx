import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';

export default function Player() {
  const { camera, scene } = useThree();
  const keysPressed = useRef<Record<string, boolean>>({});
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const verticalVelocity = useRef(0);
  const isGrounded = useRef(false);

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 3, 10);

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      
      // Jump
      if (e.key === ' ' && isGrounded.current) {
        verticalVelocity.current = 8;
        isGrounded.current = false;
      }
      
      // Place block with E key
      if (e.key === 'e' || e.key === 'E') {
        handlePlaceBlock();
      }
      
      // Interact with door (F key)
      if (e.key === 'f' || e.key === 'F') {
        handleDoorInteract();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };
    
    // Handle door interaction (called by F key)
    const handleDoorInteract = () => {
      console.log('🚪 F key pressed - trying to interact with door');
      
      const blocks = useGameStore.getState().blocks;
      const toggleDoor = useGameStore.getState().toggleDoor;
      
      // Cast ray from camera
      const raycaster = new THREE.Raycaster();
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      raycaster.set(camera.position, direction);
      raycaster.far = 5; // Shorter range for interaction
      
      // Get all meshes
      const meshes: THREE.Mesh[] = [];
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.geometry.type === 'BoxGeometry') {
          meshes.push(object);
        }
      });
      
      const intersects = raycaster.intersectObjects(meshes);
      
      if (intersects.length > 0) {
        const intersect = intersects[0];
        
        // Use world position from the intersection point instead of object position
        const worldPos = new THREE.Vector3();
        intersect.object.getWorldPosition(worldPos);
        
        const hitPosition: [number, number, number] = [
          Math.round(intersect.point.x),
          Math.round(intersect.point.y),
          Math.round(intersect.point.z)
        ];
        
        console.log('Hit position:', hitPosition, 'World pos:', worldPos);
        
        // Find the door block by checking which door is close to the hit point
        const hitBlock = blocks.find(b => {
          if (b.type !== 'door') return false;
          
          // Check if the hit point is within the door's bounds
          const xMatch = Math.abs(b.position[0] - hitPosition[0]) < 1.5;
          const zMatch = Math.abs(b.position[2] - hitPosition[2]) < 1.5;
          const yMatch = Math.abs(b.position[1] - hitPosition[1]) < 1.5;
          
          return xMatch && zMatch && yMatch;
        });
        
        if (hitBlock) {
          console.log('✅ Found door block:', hitBlock.id, 'at', hitBlock.position, 'isOpen:', hitBlock.isOpen);
          toggleDoor(hitBlock.id);
        } else {
          console.log('❌ No door in range. Checked position:', hitPosition);
          console.log('Available doors:', blocks.filter(b => b.type === 'door').map(b => ({ id: b.id, pos: b.position })));
        }
      } else {
        console.log('❌ No intersection found');
      }
    };
    
    // Handle placing blocks (called by E key)
    const handlePlaceBlock = () => {
      console.log('🔨 E key pressed - trying to place block');
      
      const selectedBlock = useGameStore.getState().selectedBlock;
      const blocks = useGameStore.getState().blocks;
      const inventory = useGameStore.getState().inventory;
      const addBlock = useGameStore.getState().addBlock;
      
      if (!selectedBlock) {
        console.log('❌ No block selected');
        return;
      }
      
      const hasBlock = inventory.some(item => item.type === selectedBlock && item.count > 0);
      if (!hasBlock) {
        console.log('❌ No blocks in inventory');
        return;
      }
      
      // Cast ray from camera
      const raycaster = new THREE.Raycaster();
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      raycaster.set(camera.position, direction);
      raycaster.far = 10;
      
      // Get all meshes
      const meshes: THREE.Mesh[] = [];
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.geometry.type === 'BoxGeometry') {
          meshes.push(object);
        }
      });
      
      const intersects = raycaster.intersectObjects(meshes);
      
      if (intersects.length > 0) {
        const intersect = intersects[0];
        const normal = intersect.face?.normal;
        
        const hitPosition: [number, number, number] = [
          Math.round(intersect.object.position.x),
          Math.round(intersect.object.position.y),
          Math.round(intersect.object.position.z)
        ];
        
        const hitBlock = blocks.find(
          b => b.position[0] === hitPosition[0] && 
               b.position[1] === hitPosition[1] && 
               b.position[2] === hitPosition[2]
        );
        
        if (normal && hitBlock) {
          const placePosition: [number, number, number] = [
            Math.round(hitPosition[0] + normal.x),
            Math.round(hitPosition[1] + normal.y),
            Math.round(hitPosition[2] + normal.z)
          ];
          
          const occupied = blocks.some(
            b => b.position[0] === placePosition[0] && 
                 b.position[1] === placePosition[1] && 
                 b.position[2] === placePosition[2]
          );
          
          const tooClose = 
            Math.abs(placePosition[0] - camera.position.x) < 0.6 &&
            Math.abs(placePosition[1] - camera.position.y) < 1.8 &&
            Math.abs(placePosition[2] - camera.position.z) < 0.6;
          
          if (!occupied && !tooClose) {
            console.log('✅ Placing block at', placePosition);
            addBlock(placePosition, selectedBlock);
            useGameStore.getState().removeFromInventory(selectedBlock, 1);
          } else {
            console.log('❌ Cannot place:', occupied ? 'occupied' : 'too close');
          }
        }
      } else {
        console.log('❌ No block in range to place on');
      }
    };
    
    // Handle mouse clicks for block breaking
    const handleMouseDown = (e: MouseEvent) => {
      console.log('🖱️ Mouse clicked!', {
        button: e.button,
        buttons: e.buttons,
        which: e.which,
        type: e.type,
        pointerLocked: document.pointerLockElement !== null,
        cameraPosition: camera.position,
      });
      
      const selectedBlock = useGameStore.getState().selectedBlock;
      const blocks = useGameStore.getState().blocks;
      const inventory = useGameStore.getState().inventory;
      const addBlock = useGameStore.getState().addBlock;
      const removeBlock = useGameStore.getState().removeBlock;
      
      console.log('📦 State:', {
        selectedBlock,
        inventoryCount: inventory.length,
        blocksCount: blocks.length
      });
      
      // Cast ray from camera
      const raycaster = new THREE.Raycaster();
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      raycaster.set(camera.position, direction);
      raycaster.far = 10; // Maximum reach distance
      
      console.log('🎯 Raycaster:', {
        origin: raycaster.ray.origin,
        direction: raycaster.ray.direction
      });
      
      // Get all meshes in the scene
      const meshes: THREE.Mesh[] = [];
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.geometry.type === 'BoxGeometry') {
          meshes.push(object);
        }
      });
      
      console.log('🔍 Found meshes:', meshes.length);
      
      const intersects = raycaster.intersectObjects(meshes);
      
      console.log('💥 Intersects:', intersects.length, intersects.length > 0 ? intersects[0] : null);
      
      if (intersects.length > 0) {
        const intersect = intersects[0];
        const point = intersect.point;
        const normal = intersect.face?.normal;
        
        // Use the intersection point in world space instead of object position
        const hitPosition: [number, number, number] = [
          Math.round(intersect.point.x),
          Math.round(intersect.point.y),
          Math.round(intersect.point.z)
        ];
        
        // Find the closest block to the hit point
        const hitBlock = blocks.find(b => {
          const xMatch = Math.abs(b.position[0] - hitPosition[0]) < 1.0;
          const yMatch = Math.abs(b.position[1] - hitPosition[1]) < 1.5;
          const zMatch = Math.abs(b.position[2] - hitPosition[2]) < 1.0;
          
          return xMatch && yMatch && zMatch;
        });
        
        // Left click only - break block
        if (e.button === 0) {
          if (hitBlock) {
            console.log('⛏️ Breaking block at', hitPosition, 'Block:', hitBlock.type);
            removeBlock(hitBlock.id);
          }
        }
      } else {
        console.log('❌ No block in range');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [camera, scene]);

  useFrame((state, delta) => {
    const speed = 10 * delta;
    const keys = keysPressed.current;
    const blocks = useGameStore.getState().blocks;

    // Get camera direction
    camera.getWorldDirection(direction.current);
    direction.current.y = 0;
    direction.current.normalize();

    // Calculate right vector
    const right = new THREE.Vector3();
    right.crossVectors(direction.current, camera.up).normalize();

    // Reset horizontal velocity
    velocity.current.set(0, 0, 0);

    // Horizontal movement
    if (keys['w']) velocity.current.add(direction.current);
    if (keys['s']) velocity.current.sub(direction.current);
    if (keys['a']) velocity.current.sub(right);
    if (keys['d']) velocity.current.add(right);

    // Normalize and apply speed
    if (velocity.current.length() > 0) {
      velocity.current.normalize().multiplyScalar(speed);
      
      // Store old position in case we need to revert
      const oldX = camera.position.x;
      const oldZ = camera.position.z;
      
      // Try to move
      camera.position.add(velocity.current);
      
      // Check for horizontal collisions with blocks (walls, not floor)
      const playerRadius = 0.3; // Player collision radius
      const playerHeight = 1.8; // Player height
      const playerFeetNow = camera.position.y - playerHeight;
      let collided = false;
      
      for (const block of blocks) {
        const [bx, by, bz] = block.position;
        
        // Skip collision with open doors - you can walk through them!
        if (block.type === 'door' && block.isOpen) {
          continue;
        }
        
        // Only check blocks that are at torso/head height, not ground blocks
        // Check blocks from 0.2 above feet to head level
        // This prevents ground blocks from blocking horizontal movement
        if (by > playerFeetNow + 0.2 && by <= camera.position.y + 0.2) {
          // Calculate distance to block center
          const dx = camera.position.x - bx;
          const dz = camera.position.z - bz;
          const distance = Math.sqrt(dx * dx + dz * dz);
          
          // Block collision (0.5 is half block size + player radius)
          if (distance < 0.5 + playerRadius) {
            collided = true;
            break;
          }
        }
      }
      
      // If we collided with a wall, revert the movement
      if (collided) {
        camera.position.x = oldX;
        camera.position.z = oldZ;
      }
    }

    // Apply gravity
    const gravity = -25 * delta;
    verticalVelocity.current += gravity;
    
    // Apply vertical velocity
    camera.position.y += verticalVelocity.current * delta;

    // Check what blocks are below the player for ground collision
    let groundLevel = 2; // Default ground level (grass at y=0, player eyes at y=2)
    isGrounded.current = false;
    
    const playerFeet = camera.position.y - 1.8; // Eye level - player height
    
    // Find the highest block directly below the player
    // Check a larger footprint to handle being near block edges
    for (const block of blocks) {
      const [bx, by, bz] = block.position;
      const blockTop = by + 0.5; // Block top surface
      
      // Check if block is horizontally close to player
      // Use larger radius (0.7) to account for player standing on edge of blocks
      const dx = camera.position.x - bx;
      const dz = camera.position.z - bz;
      const horizontalDist = Math.sqrt(dx * dx + dz * dz);
      
      // Larger footprint check - player's feet can be 0.7 units from block center
      if (horizontalDist < 0.7) {
        const eyeLevel = blockTop + 1.8; // Where eyes would be if standing on this block
        
        // Only consider blocks that are below the player (not high up in trees)
        // Allow small step-up (0.5 units = half a block)
        if (blockTop <= playerFeet + 0.5 && eyeLevel > groundLevel) {
          groundLevel = eyeLevel;
        }
      }
    }

    // Ground collision with small threshold to prevent jitter
    if (camera.position.y <= groundLevel + 0.01) {
      camera.position.y = groundLevel;
      verticalVelocity.current = 0;
      isGrounded.current = true;
    }

    // Optional: Creative mode flying with Shift
    if (keys['shift']) {
      // Hold shift to enable creative flying
      verticalVelocity.current = 0;
      isGrounded.current = true;
      camera.position.y -= speed;
    }
  });

  return null;
}

