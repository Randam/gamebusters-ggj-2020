export class BGLayer extends Phaser.GameObjects.TileSprite {

    constructor(params) { // 4375
        super(params.scene, params.x, params.y, 1360, 750, params.key);

        // variables
        this.initSprite();
        this.scene.add.existing(this);
    }

    private initSprite() {
        // sprite
        this.setOrigin(0, 0);
        this.setScrollFactor(0);

        // physics
        //this.scene.physics.world.enable(this);
        //this.body.setSize(1, 1);
        //this.body.setAllowGravity(false);
        //this.body.setImmovable(true);
        //this.body.setVelocityX(-100);
    }

    update() {
    }
}
