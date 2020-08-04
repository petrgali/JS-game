export const path = './sources/sprites/'

export const maps = ['level_map.png']

export const sprites = [
    'ship_mod1.png',
    'ship_mod2.png',
    'ship_mod3.png',
    'ship_mod4.png',
]
export const splash = [
    'splash1.png',
    'splash2.png',
    'splash3.png',
    'splash4.png',
]
export const hotKey = {
    shipUP: 'ArrowUp',          //  
    shipDown: 'ArrowDown',      //
    shipLeft: 'ArrowLeft',      //  ship control keys bindings
    shipRight: 'ArrowRight',    //
    shipFire: ' ',              //// 
    start: 13,                  //// Enter
    restart: 16,                //// shift     game control keys bindings
    pause: 17,                  //// ctrl 
    yes: 89,                    //// y
    no: 78                      //// n
}

const meta = {
    lightFighter: { sprite: 'UFO.png', height: 14, length: 24, points: 100 }
}

export const enemies = [
    { topOffset: 80, leftOffset: 1500, active: true, type: meta.lightFighter },
    { topOffset: 220, leftOffset: 1600, active: true, type: meta.lightFighter },
    { topOffset: 260, leftOffset: 1650, active: true,type: meta.lightFighter },
    { topOffset: 280, leftOffset: 1700, active: true,type: meta.lightFighter },
    { topOffset: 320, leftOffset: 1750, active: true,type: meta.lightFighter },
    { topOffset: 340, leftOffset: 1800, active: true,type: meta.lightFighter },
    { topOffset: 80, leftOffset: 1900, active: true,type: meta.lightFighter },
    { topOffset: 220, leftOffset: 2000, active: true,type: meta.lightFighter },
    { topOffset: 260, leftOffset: 2150, active: true,type: meta.lightFighter },
    { topOffset: 280, leftOffset: 2150, active: true,type: meta.lightFighter },
    { topOffset: 320, leftOffset: 2250, active: true,type: meta.lightFighter },
    { topOffset: 340, leftOffset: 2500, active: true,type: meta.lightFighter },
    { topOffset: 80, leftOffset: 2600, active: true,type: meta.lightFighter },
    { topOffset: 220, leftOffset: 2650, active: true,type: meta.lightFighter },
    { topOffset: 260, leftOffset: 2750, active: true,type: meta.lightFighter },
    { topOffset: 280, leftOffset: 2900, active: true,type: meta.lightFighter },
    { topOffset: 320, leftOffset: 3050, active: true,type: meta.lightFighter },
    { topOffset: 340, leftOffset: 3200, active: true,type: meta.lightFighter }
]
export const _ = {
    shipYposition: 200,               // ship init top position
    shipXposition: 50,                // ship init left position
    shipSkinHeight: 22,               // ship skin size
    shipSkinWidth: 64,                // ship skin size
    shipSpeedY: 3.5,                  // ship vertical speed
    shipSpeedX: 3.5,                  // ship horizontal speed
    speedX: 3,                        // terrain horizontal scrolling speed
    firingRate: 10,                    // burst fire speed
    firingRange: 450,                 // max fire range
    burstSize: 3,                     // max bullets count in burst firemode
    bulletSize: 4,                    // CSS setting
    bulletXoffset: 60,                // bullet horizontal offset 
    bulletYoffet: 10,                 // bullet vertical offset
    fadingRate: 450,                  // opacity changing speed rate - less is faster
    gameareaBorder: 4,                // CSS setting - used for calculations 
    try: 1
}