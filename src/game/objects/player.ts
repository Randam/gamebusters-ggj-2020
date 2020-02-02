import { settings } from "../game";

export class Player extends Phaser.GameObjects.Sprite {
    private scream: Phaser.Sound.BaseSound;
    public falling: boolean = false;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key);
        this.scream = params.scream;

        // variables
        this.initSprite();
        this.scene.add.existing(this);
    }

    private initSprite() {
        // physics
        this.scene.physics.world.enable(this);
        this.body.setGravityY(4000);
        this.body.setVelocityX(settings.walkSpeed);
        this.body.setSize(this.width);

        // sprite
        this.setScale(0.5);
    }

    update(...args): void {
        super.update(...args);

        if (this.body.velocity.y > 0 && this.y > this.scene.sys.canvas.height - 200) {
            if (!this.falling) {
                this.scream.play();
            }
            this.falling = true;
        }
    }
}
