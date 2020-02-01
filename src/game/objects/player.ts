export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);
        this.scene.physics.add.sprite(params.x, params.y, "player");
        this.setGravityY(2);
  
        this.scene.add.existing(this);
    }
}