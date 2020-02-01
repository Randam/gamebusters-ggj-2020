import {Player} from "../objects/player";
import {Block} from "../objects/block";

import GroupConfig = Phaser.GameObjects.Group;
import { BGLayer } from "../objects/bglayer";

enum KEYS {
    BLOCK1 = "block1",
    BLOCK2 = "block2",
    BLOCK3 = "block3",
    PLAYER = "player",
    BACKGROUND = "background",
    BGLAYER1 = "bglayer1",
    BGLAYER2 = "bglayer2",
}

enum MUSIC {
    TITLE = "title"
}

// playGame scene
export class MainScene extends Phaser.Scene {
    player: Player;
    blocks: GroupConfig;
    background: Phaser.GameObjects.Image;
    bglayer1: BGLayer;
    bglayer2: BGLayer;
    camera: Phaser.Cameras.Scene2D.Camera;
    music: Phaser.Sound.BaseSound;

    constructor() {
        super("PlayGame");
    }

    preload() {
        this.load.audio(MUSIC.TITLE, "./src/game/assets/title.m4a")
        this.load.image(KEYS.PLAYER, "./src/games/coin-runner/assets/player.png");
        this.load.image(KEYS.BLOCK1, "./src/game/assets/stone1.jpg");
        this.load.image(KEYS.BLOCK2, "./src/game/assets/stone2.jpg");
        this.load.image(KEYS.BLOCK3, "./src/game/assets/stone3.jpg");
        this.load.image(KEYS.BACKGROUND, "./src/game/assets/layer-fixed.jpg")
        this.load.image(KEYS.BGLAYER1, "./src/game/assets/layer-2.png");
        this.load.image(KEYS.BGLAYER2, "./src/game/assets/layer-1.png");
    }

    create() {
        this.music = this.sound.add(MUSIC.TITLE);
        var loopMarker = {
            name: 'loop',
            start: 0,
            duration: this.music.totalDuration,
            config: {
                loop: true
            }
        };
        this.music.addMarker(loopMarker);
        this.music.play("loop", { delay: 0 });

        this.background = this.add.image(0, 0, KEYS.BACKGROUND);
        this.background.setOrigin(0);

        this.blocks = this.add.group({
            /*classType: Blocks,*/
            runChildUpdate: true
        });

        this.bglayer1 = new BGLayer({
            scene: this,
            x: 0,
            y: 0,
            key: KEYS.BGLAYER1
        });

        this.bglayer2 = new BGLayer({
            scene: this,
            x: 0,
            y: 0,
            key: KEYS.BGLAYER2
        });

        for (let x = 0; x < 20; x++) {
            this.blocks.add(
            new Block({
                scene: this,
                x: x * Block.SIZE,
                y: this.sys.canvas.height - Block.SIZE,
                key: (Math.random() > .5 ? KEYS.BLOCK1 : KEYS.BLOCK2)
            }));
        }


        this.player = new Player({
            scene: this,
            x: this.sys.canvas.width * 0.25,
            y: this.sys.canvas.height - Block.SIZE * 2 + 30,
            key: KEYS.PLAYER
        });

        this.physics.add.collider(
            this.player,
            this.blocks,
            null,
            null,
            this
        );

        this.camera = this.cameras.main.startFollow(this.player, false, 0, 0, -300, 0);
        this.camera.setScroll(0);
    }

    update() {
        this.player.update();
        this.bglayer1.tilePositionX = this.bglayer1.tilePositionX + 1;
        this.bglayer2.tilePositionX = this.bglayer2.tilePositionX + 2;

    }
}
