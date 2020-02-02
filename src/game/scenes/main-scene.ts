import {Player} from "../objects/player";
import {Block} from "../objects/block";
import {RepairableBlock} from "../objects/repairableBlock";
import {BGLayer} from "../objects/bglayer";

import GroupConfig = Phaser.GameObjects.Group;
import {Street} from "../objects/street";

//export const streetTiles: Array<number> = [1, 2, 3, 4, 5, 6, 1, 2, 1, 2, 3, 4, 5, 6, 6, 1, 2, 6, 2, 6, 3, 6]; // 6 = hole in street
//export const fallTiles: Array<number> =   [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1];
export const streetTiles: Array<number> = [1, 2, 3, 4, 5, 6]; // 6 = hole in street
export const fallTiles: Array<number> =   [1, 1, 1, 1, 1, 0];

export enum KEYS {
    BLOCK1 = "block1",
    BRIDGE_FIXED = "bridge",
    BRIDGE_BROKEN = "bridgebroken",
    PLAYER = "player",
    BACKGROUND = "background",
    BGLAYER0 = "bglayer0",
    BGLAYER1 = "bglayer1",
    BGLAYER2 = "bglayer2",
    REPAIRPARTICLE = "repairparticle"
}

enum ANIMATION {
    SLEEPWALK = "sleepwalk"
}

enum MUSIC {
    TITLE = "title",
    LOOP = "loop"
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
    yawnTimer: number = 0;
    dead: boolean = false;
    playerSprites: number = 43;
    distance: number;
    distanceText: Phaser.GameObjects.Text;
    street: GroupConfig;

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
        this.load.spritesheet(KEYS.PLAYER, "./src/game/assets/character_sprite.png", {
            frameWidth: 220,
            frameHeight: 350,
            startFrame: 0,
            endFrame: this.playerSprites
        });
        this.load.image(KEYS.BLOCK1, "./src/game/assets/stone1.jpg");
        this.load.image(KEYS.BRIDGE_FIXED, "./src/game/assets/bridge.png");
        this.load.image(KEYS.BRIDGE_BROKEN, "./src/game/assets/bridge_broken.png");
        this.load.image(KEYS.BACKGROUND, "./src/game/assets/layer-fixed.jpg");
        this.load.image(KEYS.BGLAYER0, "./src/game/assets/layer-0.png");
        this.load.image(KEYS.BGLAYER1, "./src/game/assets/layer-2.png");
        this.load.image(KEYS.BGLAYER2, "./src/game/assets/layer-1.png");

        for (let x = 1; x <= 6; x++) {
            this.load.image("street" + x.toString(), "./src/game/assets/blocks/0" + x.toString() + ".png");
        }

        this.load.image(KEYS.REPAIRPARTICLE, './src/game/assets/repair_particle.png');
    }

    create() {
        this.distance = 0;
        this.dead = false;

        this.yawn[0] = this.sound.add(SOUND.YAWN1);
        this.yawn[1] = this.sound.add(SOUND.YAWN2);
        this.yawn[2] = this.sound.add(SOUND.YAWN3);
        this.scream = this.sound.add(SOUND.SCREAM);

        let animConfig = {
            key: ANIMATION.SLEEPWALK,
            frames: this.anims.generateFrameNumbers(KEYS.PLAYER, {start: 0, end: this.playerSprites}),
            frameRate: 43,
            yoyo: false,
            repeat: -1
        };

        let anim = this.anims.create(animConfig);

        this.music = this.sound.add(MUSIC.TITLE);

        let loopMarker = {
            name: MUSIC.LOOP,
            start: 0,
            duration: this.music.totalDuration,
            config: {
                loop: true
            }
        };
        this.music.addMarker(loopMarker);
        this.music.play(MUSIC.LOOP, {loop: true});

        this.background = this.add.image(0, 0, KEYS.BACKGROUND);
        this.background.setOrigin(0);

        this.blocks = this.add.group({
            runChildUpdate: true
        });

        this.repairBlocks = this.add.group({
            runChildUpdate: true
        });

        this.street = this.add.group({
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

        for (let x = 0; x < streetTiles.length; x++) {
            this.street.add(
                new Street({
                    scene: this,
                    x: x * Street.SIZE,
                    y: 0,
                    key: "street" + streetTiles[x]
                }));
        }

        for (let x = 0; x < fallTiles.length; x++) {
            if (fallTiles[x] === 1) {
                this.blocks.add(
                    new Block({
                        scene: this,
                        x: x * Block.SIZE,
                        y: this.sys.canvas.height - 200,
                        key: KEYS.BLOCK1
                    }));
            } else {
                const repairblock: RepairableBlock = new RepairableBlock({
                    scene: this,
                    x: x * Block.SIZE,
                    y: 0,
                    key: KEYS.BRIDGE_BROKEN
                });
                this.repairBlocks.add(repairblock);
                this.blocks.add(
                    new Block({
                        scene: this,
                        x: x * Block.SIZE,
                        y: this.sys.canvas.height + 500,
                        key: KEYS.BLOCK1,
                        repairblock: repairblock
                    }));
            }
        }

        this.player = new Player({
            scene: this,
            x: this.sys.canvas.width * 0.25,
            y: this.sys.canvas.height - 200 - 160,
            key: KEYS.PLAYER,
            scream: this.scream
        });

        this.player.anims.play(ANIMATION.SLEEPWALK);


        this.bglayer0 = new BGLayer({
            scene: this,
            x: 0,
            y: 100,
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

        this.distanceText = this.add.text(this.sys.canvas.width - 50, 20, 'DISTANCE: ' + this.distance.toString(), {
            fontFamily: 'Copperfield',
            fontSize: 20,
            color: 'white',
            boundsAlignH: "right",
            boundsAlignV: "middle"
        });
        this.distanceText.setOrigin(1, 0);
    }

    pad(num: number, size: number) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    update() {
        this.player.update();

        this.moveBackgrounds();
        this.playYawnSound();

        this.distanceText.setText("DISTANCE: " + this.pad(Math.floor(this.distance / 10), 6) + " M");

        if (this.player.y > this.sys.canvas.height + 200 && !this.dead) {
            this.dead = true;
            var txt = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 4, '   Your sleep has become eternal...', {
                fontFamily: 'Perpetua',
                fontSize: 64,
                color: 'white',
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            txt.setOrigin(0.5, 0);
            this.input.on("pointerdown", function () {
                this.music.stop();
                this.scene.start("Boot");
            }, this);
        }

        if (!this.dead)
            this.distance++;
    }

    moveBackgrounds() {
        this.bglayer0.tilePositionX = this.bglayer0.tilePositionX + 4;
        this.bglayer1.tilePositionX = this.bglayer1.tilePositionX + 0.75;
        this.bglayer2.tilePositionX = this.bglayer2.tilePositionX + 1;
    }

    playYawnSound() {
        if (this.bglayer1.tilePositionX > this.yawnTimer && !this.player.falling) {
            this.yawn[Math.floor(Math.random() * 3)].play();
            this.yawnTimer = this.yawnTimer + Math.random() * 500 + 200;
        }
    }
}
