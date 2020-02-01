import {Player} from "../objects/player";
import {Block} from "../objects/block";
import {RepairableBlock} from "../objects/repairableBlock";
import { BGLayer } from "../objects/bglayer";

import GroupConfig = Phaser.GameObjects.Group;

enum KEYS {
    BLOCK1 = "block1",
    BLOCK2 = "block2",
    REPAIRBLOCK = "repairblock",
    PLAYER = "player",
    BACKGROUND = "background",
    BGLAYER0 = "bglayer0",
    BGLAYER1 = "bglayer1",
    BGLAYER2 = "bglayer2",
}

enum MUSIC {
    TITLE = "title"
}

enum SOUND {
    YAWN1 = "yawn1",
    YAWN2 = "yawn2",
    YAWN3 = "yawn3",
    YAWN4 = "yawn4",
    SCREAM = "scream"
}

// playGame scene
export class MainScene extends Phaser.Scene {
    player: Player;
    blocks: GroupConfig;
    repairBlocks: GroupConfig;
    background: Phaser.GameObjects.Image;
    bglayer0: BGLayer;
    bglayer1: BGLayer;
    bglayer2: BGLayer;
    camera: Phaser.Cameras.Scene2D.Camera;
    music: Phaser.Sound.BaseSound;
    yawn: Array<Phaser.Sound.BaseSound> = [];
    scream: Phaser.Sound.BaseSound;
    yawnTimer: number =0;

    constructor() {
        super("PlayGame");
    }

    preload() {
        this.load.audio(SOUND.SCREAM, "./src/game/assets/scream.mp3");
        this.load.audio(SOUND.YAWN1, "./src/game/assets/yawn1.mp3");
        this.load.audio(SOUND.YAWN2, "./src/game/assets/yawn2.mp3");
        this.load.audio(SOUND.YAWN3, "./src/game/assets/yawn3.mp3");
        this.load.audio(SOUND.YAWN4, "./src/game/assets/yawn4.mp3");
        this.load.audio(MUSIC.TITLE, "./src/game/assets/title.m4a");
        this.load.spritesheet(KEYS.PLAYER, "./src/game/assets/character_sprite.png", { frameWidth: 220, frameHeight: 350, startFrame: 0, endFrame: 44 });
        this.load.image(KEYS.BLOCK1, "./src/game/assets/stone1.jpg");
        this.load.image(KEYS.BLOCK2, "./src/game/assets/stone2.jpg");
        this.load.image(KEYS.REPAIRBLOCK, "./src/game/assets/stone3.jpg");
        this.load.image(KEYS.BACKGROUND, "./src/game/assets/layer-fixed.jpg");
        this.load.image(KEYS.BGLAYER0, "./src/game/assets/layer-0.png");
        this.load.image(KEYS.BGLAYER1, "./src/game/assets/layer-2.png");
        this.load.image(KEYS.BGLAYER2, "./src/game/assets/layer-1.png");
    }

    create() {
        this.yawn[0] = this.sound.add(SOUND.YAWN1);
        this.yawn[1] = this.sound.add(SOUND.YAWN2);
        this.yawn[2] = this.sound.add(SOUND.YAWN3);
        this.scream = this.sound.add(SOUND.SCREAM);

        var animConfig = {
            key: "sleepwalk",
            frames: this.anims.generateFrameNumbers(KEYS.PLAYER, { start: 0, end: 43 }),
            frameRate: 20,
            yoyo: false,
            repeat: -1
        };
    
        let anim = this.anims.create(animConfig);

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
        this.music.play("loop", { loop: true });

        this.background = this.add.image(0, 0, KEYS.BACKGROUND);
        this.background.setOrigin(0);

        this.blocks = this.add.group({
            /*classType: Blocks,*/
            runChildUpdate: true
        });

        this.repairBlocks = this.add.group({
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

        for (let x = 0; x < 12; x++) {
            this.blocks.add(
            new Block({
                scene: this,
                x: x * Block.SIZE,
                y: this.sys.canvas.height - Block.SIZE,
                key: Math.random() > .2 ? KEYS.BLOCK1 : KEYS.BLOCK2
            }));
        }

        for (let x = 0; x < 20; x++) {
            if (Math.random() > .8) {
                this.repairBlocks.add(
                    new RepairableBlock({
                        scene: this,
                        x: x * 60,
                        y: this.sys.canvas.height - 60,
                        key: KEYS.REPAIRBLOCK
                    }));
            }
        }

        this.player = new Player({
            scene: this,
            x: this.sys.canvas.width * 0.25,
            y: 534,
            key: KEYS.PLAYER,
            scream: this.scream
        });

        this.player.anims.play("sleepwalk");


        this.bglayer0 = new BGLayer({
            scene: this,
            x: 0,
            y: 0,
            key: KEYS.BGLAYER0
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
        this.bglayer0.tilePositionX = this.bglayer0.tilePositionX + 5;
        this.bglayer1.tilePositionX = this.bglayer1.tilePositionX + 1;
        this.bglayer2.tilePositionX = this.bglayer2.tilePositionX + 2;

        if (this.bglayer1.tilePositionX > this.yawnTimer && !this.player.falling) {
            this.yawn[Math.floor(Math.random() * 3)].play();
            this.yawnTimer = this.yawnTimer + Math.random() * 500 + 200;
        }

    }
}
