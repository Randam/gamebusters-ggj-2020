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
        this.body.setVelocityX(100);
        this.body.setSize(this.width / 1.5);

        // sprite
        this.setScale(1);
    }

    update(...args): void {
        super.update(...args);
        console.log(this.body.velocity.y);
        if (this.body.velocity.y > 0) {
            if (!this.falling) {
                this.scream.play();
            }
            this.falling = true;
        }
    }
}
