import { KEYS } from "./main-scene";

export class GameOverScene extends Phaser.Scene {
    background: Phaser.GameObjects.Image;
    startText: Phaser.GameObjects.Text;
    titleText: Phaser.GameObjects.Text;
    wolfSound: Phaser.Sound.BaseSound;
    rainSound: Phaser.Sound.BaseSound;
    constructor() {
        super("GameOver");
    }

    preload() {
        this.load.image(KEYS.BACKGROUND, "./src/game/assets/layer-fixed.jpg");
        this.load.audio("wolf", "./src/game/assets/wolf.mp3");
        this.load.audio("rain", "./src/game/assets/rain.mp3");
    }

    create() {
        this.background = this.add.image(0, 0, KEYS.BACKGROUND);
        this.background.setOrigin(0);
        this.titleText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 4, 'Wandering Wanker', { fontFamily: 'Perpetua', fontSize: 120, color: '#dddddd', boundsAlignH: "center", boundsAlignV: "middle"});        
        this.titleText.setOrigin(0.5, 0);
        this.startText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 1.5, 'Start', { fontFamily: 'Copperplate', fontSize: 48, color: 'white', boundsAlignH: "center", boundsAlignV: "middle"});        
        this.startText.setOrigin(0.5, 0);

        this.tweens.add({
            targets: this.background,
            alpha: 0.9,
            duration: 2000,
            ease: 'elastic',
            yoyo: true,
            repeat: -1
        });

        this.input.on("pointerdown", function () {
            this.startText.setVisible(false);
            this.rainSound.stop();
            this.scene.start("PlayGame");
        }, this);

        this.wolfSound = this.sound.add("wolf");
        this.rainSound = this.sound.add("rain");
        this.rainSound.play();
        this.wolfSound.play();
    }

    update() {
    }
}