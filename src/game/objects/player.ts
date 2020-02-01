export class Player extends Phaser.GameObjects.Sprite {
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);

        // variables
        this.initSprite();
        this.scene.add.existing(this);
    }

    private initSprite () {
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
        //if (this.body.velocity.y > 0) {
        //    this.body.angularVelocity = 200;
        //    this.body.angularAcceleration = 200;
        //   this.body.allowRotation = true;
        //}
    }
}
