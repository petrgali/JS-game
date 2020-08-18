const meta = {
    lightFighter: { class: 'fighter', destructible: true, speed: 4, height: 14, length: 24, points: 100 },
    speedComet: { class: 'comet', destructible: false, speed: 5, height: 22, length: 32, points: 0 },
    comet: { class: 'comet', destructible: false, speed: 4, height: 22, length: 32, points: 0 }
}

export const enemies = [
    { topOffset: 100, leftOffset: 20, type: meta.speedComet },
    { topOffset: 250, leftOffset: 40, type: meta.speedComet },
    { topOffset: 220, leftOffset: 50, type: meta.speedComet },
    { topOffset: 320, leftOffset: 80, type: meta.speedComet },
    { topOffset: 340, leftOffset: 150, type: meta.speedComet },
    { topOffset: 280, leftOffset: 150, type: meta.speedComet },
    { topOffset: 80, leftOffset: 150, dev: -0.5, type: meta.lightFighter },
    { topOffset: 220, leftOffset: 200, dev: -1.5, type: meta.lightFighter },
    { topOffset: 260, leftOffset: 220, dev: 0.5, type: meta.lightFighter },
    { topOffset: 320, leftOffset: 250, dev: 1, type: meta.lightFighter },
    { topOffset: 180, leftOffset: 260, type: meta.comet },
    { topOffset: 80, leftOffset: 265, dev: -0.7, type: meta.lightFighter },
    { topOffset: 280, leftOffset: 300, type: meta.comet },
    { topOffset: 260, leftOffset: 350, dev: -0.4, type: meta.lightFighter },
    { topOffset: 280, leftOffset: 370, dev: 0.7, type: meta.lightFighter },
    { topOffset: 100, leftOffset: 400, type: meta.comet },
    { topOffset: 300, leftOffset: 420, type: meta.comet },
    { topOffset: 80, leftOffset: 480, dev: 0.8, type: meta.lightFighter },
    { topOffset: 220, leftOffset: 500, dev: 1., type: meta.lightFighter },
    { topOffset: 260, leftOffset: 600, dev: -1, type: meta.lightFighter },
    { topOffset: 80, leftOffset: 650, type: meta.comet },
    { topOffset: 180, leftOffset: 700, type: meta.comet },
    { topOffset: 320, leftOffset: 750, dev: -0.5, type: meta.lightFighter },
    { topOffset: 340, leftOffset: 760, dev: -1.5, type: meta.lightFighter }
]