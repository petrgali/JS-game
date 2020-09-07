const meta = {
  lightFighter: {
    class: "fighter",
    destructible: true,
    speed: 2.5,
    height: 14,
    length: 24,
    points: 100,
  },
  testFighter: {
    class: "fighter",
    destructible: true,
    speed: 2.5,
    height: 14,
    length: 24,
    points: 0,
  },
  speedComet: {
    class: "comet",
    destructible: false,
    speed: 5,
    height: 22,
    length: 32,
    points: 0,
  },
  comet: {
    class: "comet",
    destructible: false,
    speed: 2.5,
    height: 22,
    length: 32,
    points: 0,
  },
  bannerUP: {
    briefing: true,
    speed: 5,
    length: 1,
    message: `press \u2191 to move UP`
  },
  bannerDOWN: {
    briefing: true,
    speed: 5,
    length: 1,
    message: `press \u2193 to move DOWN`
  },
  bannerSHOOT: {
    briefing: true,
    speed: 5,
    length: 1,
    message: `press space to FIRE`
  },
  bannerDONE: {
    briefing: true,
    speed: 5,
    length: 1,
    message: `you're all set!\ngood luck!`
  },
  rmBanner: {
    briefing: true,
    speed: 5,
    length: 1,
    message: ''
  }
};
export const introLength = 29
export const timeOffset = 2100
export const enemies = [
  ///intro///
  { topOffset: 50, leftOffset: 150, type: meta.bannerUP },
  { topOffset: 50, leftOffset: 400, type: meta.rmBanner },
  { topOffset: 100, leftOffset: 450, type: meta.speedComet },
  { topOffset: 150, leftOffset: 500, type: meta.speedComet },
  { topOffset: 220, leftOffset: 510, type: meta.speedComet },
  { topOffset: 250, leftOffset: 550, type: meta.speedComet },
  { topOffset: 350, leftOffset: 570, type: meta.speedComet },
  { topOffset: 200, leftOffset: 600, type: meta.speedComet },
  { topOffset: 320, leftOffset: 650, type: meta.speedComet },
  { topOffset: 50, leftOffset: 1000, type: meta.bannerDOWN },
  { topOffset: 50, leftOffset: 1250, type: meta.rmBanner },
  { topOffset: 40, leftOffset: 1300, type: meta.speedComet },
  { topOffset: 90, leftOffset: 1320, type: meta.speedComet },
  { topOffset: 120, leftOffset: 1350, type: meta.speedComet },
  { topOffset: 160, leftOffset: 1400, type: meta.speedComet },
  { topOffset: 200, leftOffset: 1430, type: meta.speedComet },
  { topOffset: 250, leftOffset: 1480, type: meta.speedComet },
  { topOffset: 270, leftOffset: 1530, type: meta.speedComet },
  { topOffset: 300, leftOffset: 1590, type: meta.speedComet },
  { topOffset: 50, leftOffset: 1850, type: meta.bannerSHOOT },
  { topOffset: 50, leftOffset: 2150, type: meta.rmBanner },
  { topOffset: 120, leftOffset: 1100, type: meta.testFighter },
  { topOffset: 200, leftOffset: 1150, type: meta.testFighter },
  { topOffset: 300, leftOffset: 1200, type: meta.testFighter },
  { topOffset: 80, leftOffset: 1250, type: meta.testFighter },
  { topOffset: 180, leftOffset: 1300, type: meta.testFighter },
  { topOffset: 240, leftOffset: 1350, type: meta.testFighter },
  { topOffset: 50, leftOffset: 3700, type: meta.bannerDONE },
  { topOffset: 50, leftOffset: 4100, type: meta.rmBanner },
  //////


  { topOffset: 220, leftOffset: 2165, dev: -1.5, type: meta.lightFighter },
  { topOffset: 260, leftOffset: 2200, dev: 0.5, type: meta.lightFighter },
  { topOffset: 320, leftOffset: 2250, dev: 1, type: meta.lightFighter },
  { topOffset: 180, leftOffset: 2300, type: meta.comet },
  { topOffset: 80, leftOffset: 2350, dev: -0.7, type: meta.lightFighter },
  { topOffset: 280, leftOffset: 2400, type: meta.comet },
  { topOffset: 260, leftOffset: 2430, dev: -0.4, type: meta.lightFighter },
  { topOffset: 280, leftOffset: 2460, dev: 0.7, type: meta.lightFighter },
  { topOffset: 100, leftOffset: 2550, type: meta.comet },
  { topOffset: 300, leftOffset: 2600, type: meta.comet },
  { topOffset: 80, leftOffset: 2650, dev: 0.8, type: meta.lightFighter },
  { topOffset: 220, leftOffset: 2660, dev: 1., type: meta.lightFighter },
  { topOffset: 260, leftOffset: 2700, dev: -1, type: meta.lightFighter },
  { topOffset: 80, leftOffset: 2730, type: meta.comet },
  { topOffset: 180, leftOffset: 2770, type: meta.comet },
  { topOffset: 320, leftOffset: 2900, dev: -0.5, type: meta.lightFighter },
];
