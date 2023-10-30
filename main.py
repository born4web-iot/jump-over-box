def on_a_pressed():
    # If this hitting bottom not added sprite can fly just by hitting button A and always wins :)
    # 
    if boyJumper.is_hitting_tile(CollisionDirection.BOTTOM):
        boyJumper.vy = -250
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def setLevel4():
    global gameLevel, gameUpdateTime, maxBarrelSpeed, minBarrelSpeed
    gameLevel = 4
    gameUpdateTime = 1000
    maxBarrelSpeed = -120
    minBarrelSpeed = -30
    game.splash("Level " + str(gameLevel))

def on_on_overlap(sprite, otherSprite):
    game.game_over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, on_on_overlap)

def setLevel3():
    global gameLevel, gameUpdateTime, maxBarrelSpeed, minBarrelSpeed
    gameLevel = 3
    gameUpdateTime = 1500
    maxBarrelSpeed = -100
    minBarrelSpeed = -80
    game.splash("Level " + str(gameLevel))
def setLevel2():
    global gameLevel, gameUpdateTime, maxBarrelSpeed, minBarrelSpeed
    gameLevel = 2
    gameUpdateTime = 2000
    maxBarrelSpeed = -100
    minBarrelSpeed = -80
    game.splash("Level " + str(gameLevel))

def on_on_score():
    game.game_over(True)
info.on_score(40, on_on_score)

def setLevel1():
    global gameLevel, gameUpdateTime, maxBarrelSpeed, minBarrelSpeed
    gameLevel = 1
    gameUpdateTime = 2000
    maxBarrelSpeed = -80
    minBarrelSpeed = -50
    game.splash("Level " + str(gameLevel))
newBarrel: Sprite = None
BARRELS_WIN_NUMBER = 0
minBarrelSpeed = 0
maxBarrelSpeed = 0
gameUpdateTime = 0
gameLevel = 0
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
setLevel1()

def on_update_interval():
    global BARRELS_WIN_NUMBER, newBarrel
    BARRELS_WIN_NUMBER = 10
    newBarrel = sprites.create_projectile_from_side(img("""
            1 e e e e e e 1 
                    e e e e e e e e 
                    1 1 1 1 1 1 1 1 
                    e e e e e e e e 
                    e e e e e e e e 
                    1 1 1 1 1 1 1 1 
                    e e e e e e e e 
                    1 e e e e e e 1
        """),
        randint(maxBarrelSpeed, minBarrelSpeed),
        0)
    tiles.place_on_tile(newBarrel, tiles.get_tile_location(9, 5))
    info.change_score_by(1)
    if info.score() == 5:
        setLevel2()
    if info.score() == 10:
        setLevel3()
    if info.score() == 20:
        setLevel4()
game.on_update_interval(gameUpdateTime, on_update_interval)
