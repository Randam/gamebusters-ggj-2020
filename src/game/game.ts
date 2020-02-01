import "phaser";
import { MainScene } from "./scenes/main-scene";
import GameConfig = Phaser.Types.Core.GameConfig;

// main game configuration
const config: GameConfig = {
  type: Phaser.AUTO,
  width: 1334,
  height: 750,
  scene: MainScene,
  backgroundColor: 0x444444,

  // physics settings
  physics: {
      default: "arcade"
  }
};

// global game options
export const gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [50, 250],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

let game;

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  const game = new Game(config);
});

export default game;
