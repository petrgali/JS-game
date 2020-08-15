export const path = './sources/sprites/'


export const sprites = [
    'ship_mod1.png',
    'ship_mod2.png',
    'ship_mod3.png',
    'ship_mod4.png',
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

export const _ = {
    shipYposition: 200,               // ship init top position
    shipXposition: 50,                // ship init left position
    shipSkinHeight: 22,               // ship skin size
    shipSkinWidth: 64,                // ship skin size
    shipSpeedY: 3.5,                  // ship vertical speed
    shipSpeedX: 3.5,                  // ship horizontal speed
    speedX: 4,                        // enemy speed
    firingRate: 10,                   // burst fire speed
    firingRange: 450,                 // max fire range
    burstSize: 3,                     // max-1 bullets count in burst firemode
    bulletSize: 4,                    // CSS setting
    bulletXoffset: 60,                // bullet horizontal offset 
    bulletYoffet: 10,                 // bullet vertical offset
    fadingRate: 450,                  // opacity changing speed rate - less is faster
    gameareaBorder: 4,                // CSS setting - used for calculations 
    borderOffset: 25,                 // dead zone for ship
    try: 1,                           // number of lives
    splashSize: 32,                   // splash size - CSS value
    Ydev: 40                          // enemy vertical deviation range
}