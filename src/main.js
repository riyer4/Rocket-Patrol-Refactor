// Ria Iyer [FIX THE REST LATER!!]
// Rocket Patrol: The Second Saga
// Total Time Taken: 5 hrs
// Mods added: [* = done]
// New Enemy Spaceship (5) *
// Misses/Hits Score Differentiation (5)
// Displays time remaining (3) *
// New title screen (3) *
// 4 new explosion sound effects (3)
// Game Music (1)
// ^^ the mods you chose from the list below, their point values, and if necessary, an explanation of their implementation
// Sources:
// citations for any sources you used in your code (you do not need to cite Nathan's code or Phaser documentation)

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