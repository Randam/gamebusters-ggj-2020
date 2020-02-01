import game, { gameOptions } from "../game";
import { Player } from "../objects/player";


// playGame scene
export class MainScene extends Phaser.Scene {
    player: Player;

  constructor(){
      super("PlayGame");
  }
  preload(){
      this.load.image("player", "./src/games/coin-runner/assets/player.png");
  }
  create(){
    this.player = new Player({
        scene: this,
        x: this.sys.canvas.width * 0.25,
        y: this.sys.canvas.height * 0.75,
        key: "player"
      });
      // adding the player;

      // setting collisions between the player and the platform group
      //this.physics.add.collider(this.player, this.platformGroup);

      // checking for input
      this.input.on("pointerdown", null, this);
  }

  update(){
  }
};
