import { settings } from "../game";
import { streetTiles } from "../scenes/main-scene";

export class Street extends Phaser.GameObjects.Sprite {
    static SIZE = 300;

    constructor(params) {

        super(params.scene, params.x, params.y, params.key);

        // variables
        this.initSprite();
        this.scene.add.existing(this);
    }

    private initSprite() {
        // sprite
        this.setOrigin(0, 0);
        this.setFrame(0);

        // physics
        this.scene.physics.world.enable(this);
        this.body.setSize(1, 1);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setVelocityX(settings.walkSpeed * -1);
        this.setVisible(true);
    }

    update() {
        if (this.x <= (Street.SIZE - 1) * -1) {
            this.setX((streetTiles.length - 1) * Street.SIZE);
        }

    }
}
