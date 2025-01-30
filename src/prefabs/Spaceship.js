//spaceship prefab

class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)
        this.point = pointValue //store point val
        this.moveSpeed = game.settings.spaceshipSpeed //speed of spaceship
    }

    update() {

        //left

        this.x -= this.moveSpeed
        
        //wrap

        if(this.x <= 0 - this.width) { //test
            this.x = game.config.width
        }
    }

    reset() {
        this.x = game.config.width
    }
}