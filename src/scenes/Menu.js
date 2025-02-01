class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene")
    }

    preload() {
    
    // image + sprite loading

        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('miniSpaceship', './assets/miniSpaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('mainScreen', './assets/mainScreen.png')

        ///spritesheet

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        //audio!!

        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')

        this.load.audio('music', './assets/music.mp3')

    }


    create() {

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        this.mainScreen = this.add.tileSprite(0, 0, 640, 480, 'mainScreen').setOrigin(0, 0)


        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#add8e6',
            color: '#000',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height - 150, 'Use <-> arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#E6E6FA'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height - borderPadding - 90, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5)
                
        //keys

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //music

        let bgm = game.add.audio('music')
        bgm.loop = true


    }

    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {

          // easy mode

          game.settings = {
            spaceshipSpeed: 3,
            miniSpaceshipSpeed: 5,
            gameTimer: 60000    
          }
          
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {

          // hard mode

          game.settings = {
            spaceshipSpeed: 4,
            miniSpaceshipSpeed: 6,
            gameTimer: 45000    
          }

          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
    }
}