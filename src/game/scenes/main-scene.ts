import {Player} from "../objects/player";
import {Block} from "../objects/block";

import GroupConfig = Phaser.GameObjects.Group;

enum KEYS {
    BLOCK = "block",
    PLAYER = "player"
}


// playGame scene
export class MainScene extends Phaser.Scene {
    player: Player;
    blocks: GroupConfig;

    constructor() {
        super("PlayGame");
    }

    preload() {
        this.load.image(KEYS.PLAYER, "./src/games/coin-runner/assets/player.png");
        this.load.spritesheet(KEYS.BLOCK, "./src/games/coin-runner/assets/background.png", { frameHeight: 32, frameWidth: 32 });
    }

    create() {

        this.blocks = this.add.group({
            /*classType: Blocks,*/
            runChildUpdate: true
        });


        for (let x = 0; x < 20; x++) {
            this.blocks.add(
            new Block({
                scene: this,
                x: x * 32,
                y: this.sys.canvas.height * 0.90,
                key: KEYS.BLOCK,
                value: 50
            }));
        }


        this.player = new Player({
            scene: this,
            x: this.sys.canvas.width * 0.25,
            y: this.sys.canvas.height * 0.75,
            key: KEYS.PLAYER
        });

        this.physics.add.collider(
            this.player,
            this.blocks,
            null,
            null,
            this
        );
    }

    update() {
        this.player.update();
    }
}
