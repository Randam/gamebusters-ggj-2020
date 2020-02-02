import {Block} from "./block";
import {KEYS} from "../scenes/main-scene";
import BlendModes = Phaser.BlendModes;
import { settings } from "../game";

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
        this.body.setVelocityX(settings.walkSpeed * -1);
        this.setInteractive();
        this.setScale(0.5);
        this.setVisible(true);

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
                if (!this.repairing && !this.repaired) {
                    this.repairing = true;
                    this.particleTimer = 1;

                    this.emitter = this.particles.createEmitter({
                        speed: 100,
                        blendMode: BlendModes.ADD
                    });
                    this.emitter.setPosition(this.x, this.y);
                }
            });
        }

        if (this.particleTimer >= 0 && this.repairing) {
            this.particleTimer++;
        }

        if (this.particleTimer > 30 && this.emitter !== undefined && this.repairing && !this.repaired) {
            //this.emitter.stop();
            this.emitter.manager.emitters.removeAll();
            this.particleTimer = 0;
        }
    }
}
