import {Player} from "../objects/player";
import {Block} from "../objects/block";

import GroupConfig = Phaser.GameObjects.Group;
import { Background } from "../objects/background";

enum KEYS {
    BLOCK = "block",
    PLAYER = "player",
    BACKGROUND = "background"
}


// playGame scene
export class MainScene extends Phaser.Scene {
    player: Player;
    blocks: GroupConfig;
    background: Background;
    camera: Phaser.Cameras.Scene2D.Camera;

    constructor() {
        super("PlayGame");
    }

    preload() {
        this.load.image(KEYS.PLAYER, "./src/games/coin-runner/assets/player.png");
        this.load.image(KEYS.BLOCK, "./src/game/assets/stone.jpg");
        this.load.image(KEYS.BACKGROUND, "./src/game/assets/level-750.jpg");
    }

    create() {

        this.blocks = this.add.group({
            /*classType: Blocks,*/
            runChildUpdate: true
        });

        this.background = new Background({
            scene: this,
            x: 0,
            y: 0,
            key: KEYS.BACKGROUND
        });

        for (let x = 0; x < 20; x++) {
            this.blocks.add(
            new Block({
                scene: this,
                x: x * Block.SIZE,
                y: this.sys.canvas.height - 100,
                key: KEYS.BLOCK
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

        this.camera = this.cameras.main.startFollow(this.player);
    }

    update() {
        this.player.update();
        this.background.tilePositionX = this.camera.scrollX * 0.3;
    }
}
