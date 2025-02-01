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
        this.load.audio('expl1', './assets/expl1.mp3')
        this.load.audio('expl2', './assets/expl2.mp3')
        this.load.audio('expl3', './assets/expl3.mp3')
        this.load.audio('expl4', './assets/expl4.mp3')


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
            fontFamily: 'Times New Roman',
            fontSize: '35px',
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
                

        // highscore

        this.highscore = 0
        let highscoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#000',
            color: '#fff',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 200
        }
        this.highscoreLeft = this.add.text(borderUISize - borderPadding*2, borderUISize*7 + borderPadding*21, `Highscore: ${this.highscore}`, highscoreConfig)


        //keys

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //music

        let bgm = this.sound.add('music')
        bgm.loop = true
        bgm.play()


    }

    
    update() {

        // hs mods 

        this.highscoreLeft.text = `Highscore: ${localStorage.getItem('highscore')}` 
        {
            if (this.p1Score > localStorage.getItem('highscore')) {
            localStorage.setItem('highscore', this.p1Score)
            }  
        }

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