info.onScore(getWinScore(), function () {
    game.gameOver(true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // If this hitting bottom not added sprite can fly just by hitting button A and always wins :)
    // 
    if (boyJumper.isHittingTile(CollisionDirection.Bottom)) {
        boyJumper.vy = -250
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.gameOver(false)
})
function getWinScore () {
    return BOXES_TO_WIN
}
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    info.changeScoreBy(1)
})
function setGameLevel (level: number, barrel_min: number, barrel_max: number, update_time: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    gameLevel = level
    gameUpdateTime = update_time
    maxBarrelSpeed = barrel_max
    minBarrelSpeed = barrel_min
    game.splash("Level " + gameLevel)
}
let newBarrel: Sprite = null
let minBarrelSpeed = 0
let maxBarrelSpeed = 0
let gameUpdateTime = 0
let gameLevel = 0
let BOXES_TO_WIN = 0
let boyJumper: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
boyJumper = sprites.create(img`
    ........................
    ....ffffff..............
    ..ffeeeef2f.............
    .ffeeeef222f............
    .feeeffeeeef...cc.......
    .ffffee2222ef.cdc.......
    .fe222ffffe2fcddc.......
    fffffffeeeffcddc........
    ffe44ebf44ecddc.........
    fee4d41fddecdc..........
    .feee4dddedccc..........
    ..ffee44e4dde...........
    ...f222244ee............
    ...f2222e2f.............
    ...f444455f.............
    ....ffffff..............
    .....fff................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Player)
tiles.placeOnTile(boyJumper, tiles.getTileLocation(1, 5))
boyJumper.ay = 500
let BARRELS_PER_LEVEL = 10
BOXES_TO_WIN = 20
setGameLevel(1, -50, -80, 2000)
game.onUpdateInterval(gameUpdateTime, function () {
    newBarrel = sprites.createProjectileFromSide(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, randint(maxBarrelSpeed, minBarrelSpeed), 0)
    tiles.placeOnTile(newBarrel, tiles.getTileLocation(9, 5))
    if (info.score() == 5) {
        setGameLevel(2, -80, -100, 1500)
    }
    if (info.score() == 10) {
        setGameLevel(3, -80, -100, 1000)
    }
    if (info.score() == 15) {
        setGameLevel(4, -80, -100, 500)
    }
})
