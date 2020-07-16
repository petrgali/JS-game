export const path = './sources/sprites/'

export const maps = ['level_map.png']

export const sprites = [
    'zoom1.png',
    'zoom2.png',
    'zoom3.png',
    'zoom4.png',
]
export const _ = {
    y: 200,           // ship start top position
    x: 50,            // ship start left position
    shipSpeedY: 1.5,  // ship vertical speed
    shipSpeedX: 1,    // ship horizontal speed
    speedX: 2,        // terrain horizontal scrolling speed
    firingRate: 2.5,  // burst fire speed
    firingRange: 400, // max fire range
    burstSize: 5,     // max bullets count in burst firemode
    bulletXoffset: 60,// bullet horizontal offset 
    bulletYoffet: 10, // bullet vertical offset
    fadingRate: 450,  // opacity changing speed rate
    brake: false,     // animation hand switch
}