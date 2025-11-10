# Minecraft Game

A Minecraft-like game built with Next.js, React Three Fiber, and Three.js. Mine blocks, craft items, and build your own world!

## Features

- 🌍 **Procedurally Generated World**: Grassy terrain with trees
- ⛏️ **Block Breaking**: Break trees and collect wood (just like real Minecraft!)
- 🎒 **Inventory System**: Collect and manage your materials
- 🔨 **Crafting System**: Craft wood into planks (1 wood → 4 planks), and planks into doors (2 planks → 1 door)
- 🚪 **Interactive Doors**: Craft and place doors, then open/close them with F key!
- 🏗️ **Building Mechanics**: Place blocks to build anything you want
- 🎮 **First-Person Controls**: WASD movement with mouse look
- 🚧 **Collision Detection**: Can't walk through blocks
- ⚡ **Gravity & Physics**: Realistic jumping and falling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Controls

- **WASD** - Move around
- **Mouse** - Look around (click to lock cursor)
- **Left Click** - Break/mine blocks
- **E** - Place selected block
- **F** - Open/Close door (when looking at one)
- **Space** - Jump
- **Shift** - Crouch/move down (creative mode flying)
- **C** - Open crafting menu
- **1-5** - Select block from inventory

## How to Play

1. Click "Start New World" to begin
2. Click anywhere to lock your cursor and start playing
3. Break wood blocks from trees by left-clicking them
4. Open the crafting menu (press C):
   - Craft **wood → planks** (1 wood = 4 planks)
   - Craft **planks → door** (2 planks = 1 door)
5. Select blocks from your inventory (press 1-5 or click them)
6. Press E to place blocks and build structures!
7. Place a door and press **F** while looking at it to open/close it! 🚪
8. Jump on placed blocks to climb higher and build multi-story buildings!

## Technology Stack

- **Next.js 14** - React framework
- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **Zustand** - State management
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

## Project Structure

```
minecraft/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── Block.tsx        # Individual block component
│   ├── Game.tsx         # Main game scene
│   ├── World.tsx        # World generation & management
│   ├── Player.tsx       # Player controls
│   ├── HUD.tsx          # Heads-up display
│   ├── Inventory.tsx    # Inventory UI
│   ├── CraftingMenu.tsx # Crafting interface
│   └── StartScreen.tsx  # Start menu
├── store/           # State management
│   └── gameStore.ts    # Game state (Zustand)
└── public/          # Static assets
```

## Future Enhancements

- More block types (stone, dirt, etc.)
- More crafting recipes
- Day/night cycle
- Mob spawning
- Better collision detection
- Save/load world functionality
- Multiplayer support

## License

MIT

Enjoy building your world! 🎮⛏️🌳
