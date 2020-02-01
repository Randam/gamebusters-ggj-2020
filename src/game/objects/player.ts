export class Player extends Phaser.GameObjects.Image {
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);

        // variables
        this.initSprite();
        this.scene.add.existing(this);
    }

    private initSprite () {
        // physics
        this.scene.physics.world.enable(this);
        this.body.setGravityY(1000);
        this.body.setVelocityX(100);

        // sprite
        this.setScale(1.5);
    }

    update(...args): void {
        super.update(...args);
    }
}
