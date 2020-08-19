const meta = {
    lightFighter: { class: 'fighter', destructible: true, speed: 2.5, height: 14, length: 24, points: 100 },
    speedComet: { class: 'comet', destructible: false, speed: 5, height: 22, length: 32, points: 0 },
    comet: { class: 'comet', destructible: false, speed: 2.5, height: 22, length: 32, points: 0 }
}

export const enemies = [
    { topOffset: 50, leftOffset: 20, type: meta.speedComet },
    { topOffset: 100, leftOffset: 80, type: meta.speedComet },
    { topOffset: 150, leftOffset: 150, type: meta.speedComet },
    { topOffset: 200, leftOffset: 250, type: meta.speedComet },
    { topOffset: 250, leftOffset: 300, type: meta.speedComet },
    { topOffset: 300, leftOffset: 320, type: meta.speedComet },
    { topOffset: 80, leftOffset: 350, dev: -0.5, type: meta.lightFighter },
    { topOffset: 220, leftOffset: 400, dev: -1.5, type: meta.lightFighter },
    { topOffset: 260, leftOffset: 500, dev: 0.5, type: meta.lightFighter },
    { topOffset: 320, leftOffset: 550, dev: 1, type: meta.lightFighter },
    { topOffset: 180, leftOffset: 600, type: meta.comet },
    { topOffset: 80, leftOffset: 750, dev: -0.7, type: meta.lightFighter },
    { topOffset: 280, leftOffset: 900, type: meta.comet },
    { topOffset: 260, leftOffset: 1000, dev: -0.4, type: meta.lightFighter },
    { topOffset: 280, leftOffset: 1100, dev: 0.7, type: meta.lightFighter },
    { topOffset: 100, leftOffset: 1150, type: meta.comet },
    { topOffset: 300, leftOffset: 1200, type: meta.comet },
    { topOffset: 80, leftOffset: 1250, dev: 0.8, type: meta.lightFighter },
    { topOffset: 220, leftOffset: 1450, dev: 1., type: meta.lightFighter },
    { topOffset: 260, leftOffset: 1500, dev: -1, type: meta.lightFighter },
    { topOffset: 80, leftOffset: 1600, type: meta.comet },
    { topOffset: 180, leftOffset: 1650, type: meta.comet },
    { topOffset: 320, leftOffset: 1800, dev: -0.5, type: meta.lightFighter },
    { topOffset: 340, leftOffset: 1820, dev: -1.5, type: meta.lightFighter }
]