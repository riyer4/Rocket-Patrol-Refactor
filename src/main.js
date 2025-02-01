// Ria Iyer
// Rocket Patrol: The Second Saga
// Total Time Taken: 12 hrs
// Mods added: [* = done]
// New Enemy Spaceship (5) * -> the little red ships
// 2 player (5) * -> dual rocket
// Displays time remaining (3) * -> top left of screen
// New title screen (3) * -> made with PixilArt
// 4 new explosion sound effects (3) * -> found on Pixibay
// Game Music (1) * -> also found on Pixibay
// Highscore (1) * -> bottom left
// Sources:
// https://phaser.io/news/2019/07/save-and-load-progress-with-local-storage

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

// UI sizes!!

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

