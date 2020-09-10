import { message } from './data.js'

const meta = {
  fighter: {
    class: "fighter",
    destructible: true,
    speed: 2.5,
    height: 14,
    length: 24,
    points: 80,
  },
  trickyFighter: {
    class: "fighter",
    destructible: true,
    tricky: true,
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
  cruiser: {
    class: "cruiser",
    destructible: true,
    tricky: true,
    speed: 3,
    height: 30,
    length: 30,
    points: 150,
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
  tutorial: {
    text: true,
    speed: 5,
    length: 1,
    message: message.tutorial
  },
  bannerUP: {
    text: true,
    speed: 5,
    length: 1,
    message: message.tutorialUP
  },
  bannerDOWN: {
    text: true,
    speed: 5,
    length: 1,
    message: message.tutorialDOWN
  },
  bannerSHOOT: {
    text: true,
    speed: 5,
    length: 1,
    message: message.tutorialSHOOT
  },
  bannerDONE: {
    text: true,
    speed: 5,
    length: 1,
    message: message.tutorialDONE
  },
  ingameMOAR: {
    text: true,
    speed: 2.5,
    length: 1,
    message: message.moar
  },
  ingameRM: {
    text: true,
    speed: 2.5,
    length: 1,
    message: ''
  },
  rmBanner: {
    text: true,
    speed: 5,
    length: 1,
    message: ''
  }
};
export const tutorial = 29
export const timeOffset = 3500
export const enemies = [
  ///intro///
  { topOffset: 50, leftOffset: 150, type: meta.tutorial },
  { topOffset: 50, leftOffset: 1200, type: meta.rmBanner },
  { topOffset: 50, leftOffset: 1350, type: meta.bannerUP },
  { topOffset: 50, leftOffset: 1700, type: meta.rmBanner },
  { topOffset: 360, leftOffset: 850, type: meta.comet },
  { topOffset: 310, leftOffset: 890, type: meta.comet },
  { topOffset: 260, leftOffset: 930, type: meta.comet },
  { topOffset: 210, leftOffset: 970, type: meta.comet },
  { topOffset: 160, leftOffset: 1020, type: meta.comet },
  { topOffset: 110, leftOffset: 1070, type: meta.comet },
  { topOffset: 50, leftOffset: 3000, type: meta.bannerDOWN },
  { topOffset: 50, leftOffset: 3350, type: meta.rmBanner },
  { topOffset: 30, leftOffset: 1650, type: meta.comet },
  { topOffset: 80, leftOffset: 1700, type: meta.comet },
  { topOffset: 130, leftOffset: 1750, type: meta.comet },
  { topOffset: 180, leftOffset: 1800, type: meta.comet },
  { topOffset: 230, leftOffset: 1850, type: meta.comet },
  { topOffset: 280, leftOffset: 1900, type: meta.comet },
  { topOffset: 50, leftOffset: 4650, type: meta.bannerSHOOT },
  { topOffset: 50, leftOffset: 5200, type: meta.rmBanner },
  { topOffset: 340, leftOffset: 2700, type: meta.testFighter },
  { topOffset: 80, leftOffset: 2750, type: meta.testFighter },
  { topOffset: 300, leftOffset: 2770, type: meta.testFighter },
  { topOffset: 200, leftOffset: 2780, type: meta.testFighter },
  { topOffset: 130, leftOffset: 2800, type: meta.testFighter },
  { topOffset: 260, leftOffset: 2840, type: meta.testFighter },
  { topOffset: 180, leftOffset: 2850, type: meta.testFighter },
  { topOffset: 50, leftOffset: 6500, type: meta.bannerDONE },
  { topOffset: 50, leftOffset: 7000, type: meta.rmBanner },

  ////// scene1-1
  { topOffset: 280, leftOffset: 3650, type: meta.comet },
  { topOffset: 230, leftOffset: 3700, type: meta.comet },
  { topOffset: 330, leftOffset: 3710, type: meta.comet },

  { topOffset: 100, leftOffset: 3800, type: meta.fighter },
  { topOffset: 40, leftOffset: 3850, type: meta.fighter },
  { topOffset: 160, leftOffset: 3840, type: meta.fighter },
  { topOffset: 300, leftOffset: 3880, type: meta.comet },
  { topOffset: 180, leftOffset: 3930, type: meta.fighter },
  { topOffset: 70, leftOffset: 3940, type: meta.comet },
  { topOffset: 240, leftOffset: 3950, type: meta.fighter },
  { topOffset: 120, leftOffset: 3960, type: meta.comet },
  { topOffset: 260, leftOffset: 4010, type: meta.fighter },
  { topOffset: 70, leftOffset: 4050, type: meta.comet },
  { topOffset: 300, leftOffset: 4040, type: meta.fighter },
  { topOffset: 150, leftOffset: 4120, type: meta.fighter },
  { topOffset: 280, leftOffset: 4140, type: meta.comet },
  { topOffset: 190, leftOffset: 4160, type: meta.fighter },
  { topOffset: 250, leftOffset: 4200, type: meta.comet },

  ////// scene1-2
  { topOffset: 50, leftOffset: 4300, type: meta.fighter },
  { topOffset: 100, leftOffset: 4310, type: meta.fighter },
  { topOffset: 160, leftOffset: 4320, type: meta.fighter },
  { topOffset: 200, leftOffset: 4330, type: meta.fighter },
  { topOffset: 260, leftOffset: 4400, type: meta.fighter },
  { topOffset: 320, leftOffset: 4410, type: meta.fighter },

  ////////scene1-3
  { topOffset: 330, leftOffset: 4510, type: meta.comet },
  { topOffset: 260, leftOffset: 4560, type: meta.fighter },
  { topOffset: 70, leftOffset: 4570, type: meta.comet },
  { topOffset: 240, leftOffset: 4690, type: meta.fighter },
  { topOffset: 120, leftOffset: 4700, type: meta.comet },
  { topOffset: 200, leftOffset: 4750, type: meta.fighter },
  { topOffset: 150, leftOffset: 4800, type: meta.fighter },
  { topOffset: 50, leftOffset: 4830, type: meta.comet },
  { topOffset: 190, leftOffset: 4890, type: meta.fighter },
  { topOffset: 220, leftOffset: 4940, type: meta.comet },

  { topOffset: 250, leftOffset: 4950, type: meta.fighter },
  { topOffset: 300, leftOffset: 4980, type: meta.fighter },
  { topOffset: 330, leftOffset: 5050, type: meta.fighter },

  ////////scene1-final
  { topOffset: 40, leftOffset: 5430, type: meta.fighter },
  { topOffset: 70, leftOffset: 5431, type: meta.fighter },
  { topOffset: 100, leftOffset: 5432, type: meta.fighter },
  { topOffset: 130, leftOffset: 5433, type: meta.fighter },
  { topOffset: 160, leftOffset: 5434, type: meta.fighter },
  { topOffset: 190, leftOffset: 5435, type: meta.fighter },
  { topOffset: 220, leftOffset: 5436, type: meta.fighter },
  { topOffset: 250, leftOffset: 5437, type: meta.fighter },
  { topOffset: 280, leftOffset: 5438, type: meta.fighter },
  { topOffset: 310, leftOffset: 5439, type: meta.fighter },
  { topOffset: 330, leftOffset: 5440, type: meta.fighter },

  { topOffset: 55, leftOffset: 5460, type: meta.fighter },
  { topOffset: 85, leftOffset: 5461, type: meta.fighter },
  { topOffset: 115, leftOffset: 5462, type: meta.fighter },
  { topOffset: 145, leftOffset: 5463, type: meta.fighter },
  { topOffset: 175, leftOffset: 5464, type: meta.fighter },
  { topOffset: 205, leftOffset: 5465, type: meta.fighter },
  { topOffset: 235, leftOffset: 5466, type: meta.fighter },
  { topOffset: 265, leftOffset: 5467, type: meta.fighter },
  { topOffset: 295, leftOffset: 5468, type: meta.fighter },
  { topOffset: 325, leftOffset: 5469, type: meta.fighter },


  { topOffset: 50, leftOffset: 5800, type: meta.ingameMOAR },
  { topOffset: 50, leftOffset: 6050, type: meta.ingameRM },

  /////scene2-1








  // { topOffset: 250, leftOffset: 4950, type: meta.fighter },
  // { topOffset: 300, leftOffset: 4980, type: meta.fighter },
  // { topOffset: 330, leftOffset: 5050, type: meta.fighter },


  // { topOffset: 220, leftOffset: 2165, Ydev: 40, dev: -1.5, type: meta.trickyFighter },
  // { topOffset: 260, leftOffset: 2200, Ydev: 40, dev: 0.5, type: meta.trickyFighter },
  // { topOffset: 320, leftOffset: 2250, Ydev: 40, dev: 1.0, type: meta.trickyFighter },
  // { topOffset: 180, leftOffset: 2300, type: meta.comet },
  // { topOffset: 80, leftOffset: 2350, Ydev: 40, dev: -0.7, type: meta.trickyFighter },
  // { topOffset: 280, leftOffset: 2400, type: meta.comet },
  // { topOffset: 260, leftOffset: 2430, Ydev: 40, dev: -0.4, type: meta.trickyFighter },
  // { topOffset: 280, leftOffset: 2460, Ydev: 40, dev: 0.7, type: meta.trickyFighter },
  // { topOffset: 100, leftOffset: 2550, type: meta.comet },
  // { topOffset: 300, leftOffset: 2600, type: meta.comet },
  // { topOffset: 80, leftOffset: 2650, Ydev: 40, dev: 0.8, type: meta.trickyFighter },
  // { topOffset: 220, leftOffset: 2660, Ydev: 40, dev: 1.0, type: meta.trickyFighter },
  // { topOffset: 260, leftOffset: 2700, Ydev: 40, dev: -1.0, type: meta.trickyFighter },
  // { topOffset: 80, leftOffset: 2730, type: meta.comet },
  // { topOffset: 180, leftOffset: 2770, type: meta.comet },
  // { topOffset: 320, leftOffset: 2900, Ydev: 40, dev: -0.5, type: meta.trickyFighter },
];
