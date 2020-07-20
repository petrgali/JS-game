export const path = './sources/sprites/'

export const maps = ['level_map.png']

export const sprites = [
    'ship_mod1.png',
    'ship_mod2.png',
    'ship_mod3.png',
    'ship_mod4.png',
]
export const _ = {
    shipYposition: 200,  // ship init top position
    shipXposition: 50,   // ship init left position
    gameareaBorder: 4,   // CSS setting
    shipSkinHeight: 32,  // ship skin size
    shipSkinWidth: 64,   // ship skin size
    shipSpeedY: 1.5,     // ship vertical speed
    shipSpeedX: 1,       // ship horizontal speed
    speedX: 2,           // terrain horizontal scrolling speed
    firingRate: 3,       // burst fire speed
    firingRange: 400,    // max fire range
    burstSize: 3,        // max bullets count in burst firemode
    bulletXoffset: 60,   // bullet horizontal offset 
    bulletYoffet: 15,    // bullet vertical offset
    fadingRate: 250,     // opacity changing speed rate - less is faster
    brake: false,        // animation hand switch
}