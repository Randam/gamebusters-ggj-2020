import {Block} from "./block";
import {KEYS} from "../scenes/main-scene";
import BlendModes = Phaser.BlendModes;

export class RepairableBlock extends Phaser.GameObjects.Sprite {
    repairing: boolean;
    repaired: boolean;
    particleTimer: number = 0;
    emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    particles: any;

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
        this.body.setVelocityX(-100);
        this.setInteractive();
        this.setScale(0.5);

        this.repaired = false;
        this.repairing = false;
        this.particles = this.scene.add.particles(KEYS.REPAIRPARTICLE);
    }

    update() {
        if (this.x <= (Block.SIZE - 1) * -1) {
            this.destroy();
        }

        if (!this.repaired && !this.repairing) {
            this.on("pointerdown", function () {
                this.repairing = true;
                this.particleTimer = 60;

                this.emitter = this.particles.createEmitter({
                    speed: 200 * Math.random(),
                    frequency: 1000,
                    lifespan: 500,
                    angle: Math.floor(Math.random() * 90) + 225,
                    blendMode: BlendModes.ADD
                });
                this.emitter.setPosition( this.x, this.y);
            });
        }

        if (this.particleTimer >= 0 && this.repairing) {
            this.particleTimer -= 5;
        }

        if (this.particleTimer > 0 && this.emitter !== undefined && this.repairing && !this.repaired) {
            this.emitter.stop();
            this.repaired = true;
            this.repairing = false;
            this.particles = undefined;
            this.emitter = undefined;
        }
    }
}
