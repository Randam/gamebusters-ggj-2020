import "phaser";
import {MainScene} from "./scenes/main-scene";
import {GameOverScene} from "./scenes/game-over-scene";
import {BootScene} from "./scenes/boot-scene";
import GameConfig = Phaser.Types.Core.GameConfig;

// main game configuration
const config: GameConfig = {
    type: Phaser.AUTO,
    width: 1360,
    height: 750,
    scene: [GameOverScene, MainScene, BootScene],
    backgroundColor: 0x444444,

    // physics settings
    physics: {
        default: "arcade"
    }
};

export const settings = {
  walkSpeed: 180
}

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

let game: Game;

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    const game = new Game(config);
});

export default game;
