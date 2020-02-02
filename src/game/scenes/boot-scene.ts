import { KEYS } from "./main-scene";

export class BootScene extends Phaser.Scene {
    logo_off: Phaser.GameObjects.Image;
    logo_on: Phaser.GameObjects.Image;
    gbSound: Phaser.Sound.BaseSound;
    wankerTween: Phaser.Tweens.Tween;

    constructor() {
        super("Boot");
    }

    preload() {
        this.load.image("logo_off", "./src/game/assets/logo01.jpg");
        this.load.image("logo_on", "./src/game/assets/logo02.jpg");

        this.load.audio("jingle", "./src/game/assets/jingle.m4a");
    }

    create() {
        this.logo_off = this.add.image(0, 0, "logo_off");
        this.logo_off.setOrigin(0);
        this.logo_on = this.add.image(0, 0, "logo_on");
        this.logo_on.setOrigin(0);
        this.logo_on.setVisible(false);

        this.gbSound = this.sound.add("jingle");

        setTimeout(this.logoOn.bind(this), 1000);
    }

    logoOn() {
        this.logo_on.setVisible(true);
        this.logo_off.setVisible(false);
        this.wankerTween = this.tweens.add({
            targets: this.logo_on,
            alpha: 0.0,
            duration: 3000,
            ease: 'linear',
            yoyo: false,
            repeat: 0,
            onComplete: this.goToTitle.bind(this)
        });

        this.gbSound.play();

        this.input.on("pointerdown", function () {
            this.goToTitle();
        }, this);
    }

    goToTitle() {
        this.wankerTween.stop();
        this.gbSound.stop();
        this.gbSound.destroy();
        this.scene.start("GameOver");
    }

    update() {
    }
}