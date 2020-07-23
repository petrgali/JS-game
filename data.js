export const path = './sources/sprites/'

export const maps = ['level_map.png']

export const sprites = [
    'ship_mod1.png',
    'ship_mod2.png',
    'ship_mod3.png',
    'ship_mod4.png',
]
export const enemiesSprites = [
    'UFO.png'
]
export const enemies = [
    { topOffset: 80, leftOffset: 1500 },
    { topOffset: 220, leftOffset: 1600 },
    { topOffset: 260, leftOffset: 1650 },
    { topOffset: 280, leftOffset: 1700 },
    { topOffset: 320, leftOffset: 1750 },
    { topOffset: 340, leftOffset: 1800 }
]
export const _ = {
    shipYposition: 200,  // ship init top position
    shipXposition: 50,   // ship init left position
    gameareaBorder: 4,   // CSS setting - used for calculations 
    enemyLength: 24,     // CSS setting - used for calculations
    enemyHeight: 14,     // CSS setting - used for calculations
    shipSkinHeight: 32,  // ship skin size
    shipSkinWidth: 64,   // ship skin size
    shipSpeedY: 1.5,     // ship vertical speed
    shipSpeedX: 1.5,     // ship horizontal speed
    speedX: 0.5,         // terrain horizontal scrolling speed
    firingRate: 3,       // burst fire speed
    firingRange: 450,    // max fire range
    burstSize: 3,        // max bullets count in burst firemode
    bulletSize: 5,       // CSS setting
    bulletXoffset: 60,   // bullet horizontal offset 
    bulletYoffet: 15,    // bullet vertical offset
    fadingRate: 450,     // opacity changing speed rate - less is faster
    brake: false,        // animation hand switch
}