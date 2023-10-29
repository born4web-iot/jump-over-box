controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // If this hitting bottom not added sprite can fly just by hitting button A and always wins :)
    // 
    if (boyJumper.isHittingTile(CollisionDirection.Bottom)) {
        boyJumper.vy = -200
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.gameOver(false)
})
let projectile: Sprite = null
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
game.onUpdateInterval(2000, function () {
    projectile = sprites.createProjectileFromSide(img`
        1 e e e e e e 1 
        e e e e e e e e 
        1 1 1 1 1 1 1 1 
        e e e e e e e e 
        e e e e e e e e 
        1 1 1 1 1 1 1 1 
        e e e e e e e e 
        1 e e e e e e 1 
        `, randint(-100, -70), 0)
    tiles.placeOnTile(projectile, tiles.getTileLocation(9, 5))
    info.changeScoreBy(1)
})
