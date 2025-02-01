class Play extends Phaser.Scene {
    constructor () {
        super("playScene")
    }


    create() {

        //place tile sprite

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        //green bg
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)

        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)

        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)

        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // add rocket (p1) yuh

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        //add spaceships x 3

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2 , 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0)

        //add mini spaceships x 3

        this.miniShip01 = new miniSpaceship(this, game.config.width + borderUISize*6, borderUISize*10 + borderPadding*4, 'miniSpaceship', 0, 50).setOrigin(0, 0)
        this.miniShip02 = new miniSpaceship(this, game.config.width + borderUISize*3, borderUISize*15 + borderPadding*2 , 'miniSpaceship', 0, 50).setOrigin(0, 0)
        this.miniShip03 = new miniSpaceship(this, game.config.width, borderUISize*10 + borderPadding*4, 'miniSpaceship', 0, 50).setOrigin(0, 0)

        //group all enemies

        this.enemyShips = this.add.group([this.ship01, this.ship02, this.ship03, this.miniShip01, this.miniShip02, this.miniShip03])

        //define the keys

        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.p1Score = 0 //score initialization

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        //game over
        this.gameOver = false

        // time

        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 135
        }

        scoreConfig.fixedWidth = 0

        this.gameTime = this.game.settings.gameTimer // writing down initial time

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true

        }, null, this)

        this.timeLeft = this.add.text(borderUISize + borderPadding*40, borderUISize + borderPadding*2, `Time: ${this.gameTime}`, timeConfig)
    }

    update() {

        //timer mods
        if (this.gameOver) {
            this.gameTime = 0
        } else {
            this.gameTime -= 8.25 // subtracting 1 second per frame
        }
        this.timeLeft.text = `Time: ${Math.floor(this.gameTime / 1000)}`
        
        // check for input for restarting

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
          }

        this.starfield.tilePositionX -= 4

        this.p1Rocket.update()

        this.ship01.update()
        this.ship02.update()
        this.ship03.update()

        this.miniShip01.update()
        this.miniShip02.update()
        this.miniShip03.update()

        //collisions check!


        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
            this.gameTime += 5000
            game.settings.gameTimer += 5000

        }

        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
            this.gameTime += 5000
            game.settings.gameTimer += 5000

        }

        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
            this.gameTime += 5000
            game.settings.gameTimer += 5000

        }

        if(this.checkCollision(this.p1Rocket, this.miniShip03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.miniShip03)
            this.gameTime += 5000
            game.settings.gameTimer += 5000

        }

        if(this.checkCollision(this.p1Rocket, this.miniShip02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.miniShip02)
            this.gameTime += 5000
            game.settings.gameTimer += 5000
        }

        if(this.checkCollision(this.p1Rocket, this.miniShip01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.miniShip01)
            this.gameTime += 5000
            game.settings.gameTimer += 5000
        }

        // if (!this.checkCollision(this.p1Rocket, this.enemyShips)) {
        //     this.p1Rocket.reset()
        //     this.gameTime -= 5000
        //     game.settings.gameTimer += 5000
   
        //     this.rocketMiss = false     
        // // }

        if(!this.gameOver) {
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.miniShip01.update()
            this.miniShip02.update()
            this.miniShip03.update()
        }

    }

    checkCollision(rocket, ship) {

        //simple AABB (?) checking

        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height && 
            rocket.height + rocket.y > ship.y) {
            return true
        } else {
            return false
        }
    }

    shipExplode(ship) {
        //temp hide ship

        ship.alpha = 0

        //create explosion sprite at ship pos

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode') //explode animation
        boom.on('animationcomplete', () => { // callback
            ship.reset() // reset ship pos
            ship.alpha = 1 // ship comes back
            boom.destroy() // remove explosion sprite
        })

        //score stuff

        this.p1Score += ship.point
        this.scoreLeft.text = this.p1Score

        this.sound.play('sfx-explosion')
    }
}