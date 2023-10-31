def on_on_score():
    game.game_over(True)
info.on_score(getWinScore(), on_on_score)

def on_a_pressed():
    # If this hitting bottom not added sprite can fly just by hitting button A and always wins :)
    # 
    if boyJumper.is_hitting_tile(CollisionDirection.BOTTOM):
        boyJumper.vy = -250
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    game.game_over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, on_on_overlap)

def getWinScore():
    return BOXES_TO_WIN

def on_on_destroyed(sprite2):
    info.change_score_by(1)
sprites.on_destroyed(SpriteKind.projectile, on_on_destroyed)

def setGameLevel(level: number, barrel_min: number, barrel_max: number, update_time: number):
    global gameLevel, gameUpdateTime, maxBarrelSpeed, minBarrelSpeed
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile)
    gameLevel = level
    gameUpdateTime = update_time
    maxBarrelSpeed = barrel_max
    minBarrelSpeed = barrel_min
    game.splash("Level " + str(gameLevel))
newBarrel: Sprite = None
minBarrelSpeed = 0
maxBarrelSpeed = 0
gameUpdateTime = 0
gameLevel = 0
BOXES_TO_WIN = 0
boyJumper: Sprite = None
tiles.set_current_tilemap(tilemap("""
    level1
"""))
boyJumper = sprites.create(img("""
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
    """),
    SpriteKind.player)
tiles.place_on_tile(boyJumper, tiles.get_tile_location(1, 5))
boyJumper.ay = 500
BARRELS_PER_LEVEL = 10
BOXES_TO_WIN = 20
setGameLevel(1, -50, -80, 2000)

def on_update_interval():
    global newBarrel
    newBarrel = sprites.create_projectile_from_side(img("""
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
        """),
        randint(maxBarrelSpeed, minBarrelSpeed),
        0)
    tiles.place_on_tile(newBarrel, tiles.get_tile_location(9, 5))
    if info.score() == 5:
        setGameLevel(2, -80, -100, 1500)
    if info.score() == 10:
        setGameLevel(3, -80, -100, 1000)
    if info.score() == 15:
        setGameLevel(4, -80, -100, 500)
game.on_update_interval(gameUpdateTime, on_update_interval)
