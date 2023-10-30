controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // If this hitting bottom not added sprite can fly just by hitting button A and always wins :)
    // 
    if (boyJumper.isHittingTile(CollisionDirection.Bottom)) {
        boyJumper.vy = -250
    }
})
info.onScore(25, function () {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.gameOver(false)
})
function setLevel3 () {
    gameLevel = 3
    gameUpdateTime = 1500
    maxBarrelSpeed = -100
    minBarrelSpeed = -80
    game.splash("Level " + gameLevel)
}
function setGameLevel (level: number, barrel_min: number, barrel_max: number, update_time: number) {
    gameLevel = level
    gameUpdateTime = update_time
    maxBarrelSpeed = barrel_max
    minBarrelSpeed = barrel_min
    game.splash("Level " + gameLevel)
}
let newBarrel: Sprite = null
let BARRELS_WIN_NUMBER = 0
let minBarrelSpeed = 0
let maxBarrelSpeed = 0
let gameUpdateTime = 0
let gameLevel = 0
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
setGameLevel(1, -50, -80, 2000)
game.onUpdateInterval(gameUpdateTime, function () {
    BARRELS_WIN_NUMBER = 10
    newBarrel = sprites.createProjectileFromSide(img`
        1 e e e e e e 1 
        e e e e e e e e 
        1 1 1 1 1 1 1 1 
        e e e e e e e e 
        e e e e e e e e 
        1 1 1 1 1 1 1 1 
        e e e e e e e e 
        1 e e e e e e 1 
        `, randint(maxBarrelSpeed, minBarrelSpeed), 0)
    tiles.placeOnTile(newBarrel, tiles.getTileLocation(9, 5))
    info.changeScoreBy(1)
    if (info.score() == 5) {
        setGameLevel(2, -80, -100, 2000)
    }
    if (info.score() == 10) {
        setGameLevel(3, -80, -100, 1500)
    }
    if (info.score() == 15) {
        setGameLevel(4, 1, 1, 1500)
    }
})
