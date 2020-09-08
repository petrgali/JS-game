import { mothership } from './ship.js'
import { bullet } from './firepower.js'
import { enemy } from './enemies.js'
import { GUI } from './view.js'
import { message } from '../config/data.js'

export let gameState = {}
export let controlState = {}

const render = () => {
    if (!gameState.wasted) {
        mothership.controller()
        enemy.controller()
        if (!gameState.levelend) {
            GUI.controller()
        }
    }
    bullet.controller()
    if (!gameState.pause) {
        requestAnimationFrame(render)
    }
}

export const game = (() => {
    return {
        play: () => {
            if (!gameState.play || (gameState.play && gameState.reset)) {
                gameState['play'] = true
                GUI.hideMenu()
                mothership.init()
                bullet.init()
                gameState.tutorialOff
                    ? enemy.init()
                    : enemy.initTutorial()
                mothership.spawn()

                if (!gameState.reset) {
                    document.addEventListener('keydown', (event) => {
                        controlState[event.key] = true
                    })
                    document.addEventListener('keyup', (event) => {
                        controlState[event.key] = false
                    })
                    mothership.animate()
                    bullet.listener()
                    requestAnimationFrame(render)
                }
                if (gameState.gameover) {
                    gameState.gameover = false
                    gameState.wasted = false
                    gameState.reset = false
                    gameState.levelend = false
                }
                GUI.gameStat()
            }
        },
        pause: () => {
            if (gameState.pause) {
                gameState.lostwarning = false
                gameState.pause = false
                GUI.hideMenu()
                requestAnimationFrame(render)
                return
            }
            if (gameState.play && !gameState.wasted && !gameState.levelend) {
                gameState['pause'] = true
                GUI.showMenu(message.pause)
            }
        },
        reset: () => {
            gameState.tutorialOff = false
            if (gameState.lostwarning) {
                gameState.lostwarning = false
                gameState.play = false
                gameState.reset = true
                GUI.reset()
                GUI.refreshLifes()
                game.play()
                game.pause()
                gameState.reset = false
                return
            }
            if (gameState.gameover) {
                gameState.reset = true
                GUI.reset()
                GUI.showMenu(message.start)
                gameState.play = true
                return
            }
            if (gameState.wasted) {
                enemy.skipTutorial()
                    ? gameState.tutorialOff = true
                    : gameState.tutorialOff = false
                setTimeout(() => {
                    gameState.reset = true
                    gameState.wasted = false
                    gameState.play = false
                    GUI.refreshLifes()
                    GUI.clearField()
                    game.play()
                    gameState.reset = false
                }, 2000)
                return
            }
        },
        levelEnd: () => {
            gameState['levelend'] = true
            gameState.gameover = true
            gameState.wasted = true
            GUI.hideStat()
            GUI.showMenu(message.levelend.concat(GUI.finalScore()))
            setTimeout(() => {
                game.reset()
            }, 2000)
        },
        over: () => {
            gameState['gameover'] = true
            GUI.hideStat()
            GUI.showMenu(message.gameover.concat(GUI.finalScore()))
            setTimeout(() => {
                game.reset()
            }, 2000)
        },
        lostWarning: () => {
            if (gameState.pause) {
                gameState['lostwarning'] = true
                GUI.showMenu(message.warning)
            }
        }
    }
})()
