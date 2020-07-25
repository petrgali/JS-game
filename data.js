export const path = './sources/sprites/'

export const maps = ['level_map.png']

export const sprites = [
    'ship_mod1.png',
    'ship_mod2.png',
    'ship_mod3.png',
    'ship_mod4.png',
]
export const hotKey = {
    start: 13,     // Enter
    restart: 82,   // r||R
    pause: 17,     // ctrl 
}

const meta = {
    lightFighter: { sprite: 'UFO.png', height: 14, length: 24, points: 100 }
}

export const enemies = [
    { topOffset: 80, leftOffset: 1500, type: meta.lightFighter },
    { topOffset: 220, leftOffset: 1600, type: meta.lightFighter },
    { topOffset: 260, leftOffset: 1650, type: meta.lightFighter },
    { topOffset: 280, leftOffset: 1700, type: meta.lightFighter },
    { topOffset: 320, leftOffset: 1750, type: meta.lightFighter },
    { topOffset: 340, leftOffset: 1800, type: meta.lightFighter }
]
export const _ = {
    shipYposition: 200,               // ship init top position
    shipXposition: 50,                // ship init left position
    gameareaBorder: 4,                // CSS setting - used for calculations 
    shipSkinHeight: 22,               // ship skin size
    shipSkinWidth: 64,                // ship skin size
    shipSpeedY: 3.5,                  // ship vertical speed
    shipSpeedX: 3.5,                  // ship horizontal speed
    speedX: 3,                        // terrain horizontal scrolling speed
    firingRate: 6,                    // burst fire speed
    firingRange: 300,                 // max fire range
    burstSize: 3,                     // max bullets count in burst firemode
    bulletSize: 3,                    // CSS setting
    bulletXoffset: 60,                // bullet horizontal offset 
    bulletYoffet: 10,                 // bullet vertical offset
    fadingRate: 450,                  // opacity changing speed rate - less is faster
}