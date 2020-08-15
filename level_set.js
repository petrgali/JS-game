const meta = {
    lightFighter: { class: 'fighter', destructible: true, speed: 4, height: 14, length: 24, points: 100 },
    speedComet: { class: 'comet', destructible: false, speed: 5, height: 22, length: 32, points: 0 },
    comet: { class: 'comet', destructible: false, speed: 4, height: 22, length: 32, points: 0 }
}

export const enemies = [
    { topOffset: 100, leftOffset: 1500, type: meta.speedComet },
    { topOffset: 250, leftOffset: 1600, type: meta.speedComet },
    { topOffset: 220, leftOffset: 1650, type: meta.speedComet },
    { topOffset: 320, leftOffset: 1850, type: meta.speedComet },
    { topOffset: 340, leftOffset: 1950, type: meta.speedComet },
    { topOffset: 280, leftOffset: 1970, type: meta.speedComet },
    { topOffset: 80, leftOffset: 1800, dev: -0.5, type: meta.lightFighter },
    { topOffset: 220, leftOffset: 1840, dev: -1.5, type: meta.lightFighter },
    { topOffset: 260, leftOffset: 1940, dev: 0.5, type: meta.lightFighter },
    { topOffset: 320, leftOffset: 2040, dev: 1, type: meta.lightFighter },
    { topOffset: 180, leftOffset: 2050, type: meta.comet },
    { topOffset: 80, leftOffset: 2100, dev: -0.7, type: meta.lightFighter },
    { topOffset: 280, leftOffset: 2130, type: meta.comet },
    { topOffset: 260, leftOffset: 2150, dev: -0.4, type: meta.lightFighter },
    { topOffset: 280, leftOffset: 2150, dev: 0.7, type: meta.lightFighter },
    { topOffset: 100, leftOffset: 2200, type: meta.comet },
    { topOffset: 300, leftOffset: 2300, type: meta.comet },
    { topOffset: 80, leftOffset: 2600, dev: 0.8, type: meta.lightFighter },
    { topOffset: 220, leftOffset: 2650, dev: 1., type: meta.lightFighter },
    { topOffset: 260, leftOffset: 2750, dev: -1, type: meta.lightFighter },
    { topOffset: 80, leftOffset: 2750, type: meta.comet },
    { topOffset: 180, leftOffset: 2850, type: meta.comet },
    { topOffset: 320, leftOffset: 3050, dev: -0.5, type: meta.lightFighter },
    { topOffset: 340, leftOffset: 3200, dev: -1.5, type: meta.lightFighter }
]