import { mothership } from './ship.js'
import { bullet } from './firepower.js'
import { enemy } from './enemies.js'
import { GUI } from './view.js'
import { message } from '../config/data.js'
import { player } from './player.js'
export { gameState, controlState, game }

let gameState = {}
let controlState = {}

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

const game = (() => {
    let inputWaiter
    return {
        play: () => {

            if (!gameState.play || (gameState.play && gameState.reset)) {
                gameState['play'] = true
                player.new()
                player.stopwatchOn()
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
                        gameState.listen
                            ? player.setName(event.key)
                            : event.key
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
        inputMode: (msg) => {
            player.stopwatchOff()
            player.setGameTime()
            player.calcAccuracy()
            player.setScore(GUI.finalScore())
            inputWaiter = setInterval(() => {
                GUI.showMenu(msg + message.inputName + `\n${player.name()}`)
            }, 30)
        },
        scoreMode: () => {
            player.JSONexchange()
            game.timeout()
        },
        timeout: () => {
            gameState.listen = false
            window.clearInterval(inputWaiter)
            setTimeout(() => {
                game.reset()
            }, 500)
        },
        levelEnd: () => {
            gameState['levelend'] = true
            gameState.gameover = true
            gameState.wasted = true
            GUI.hideStat()
            gameState.listen = true
            game.inputMode(message.levelend.concat(GUI.finalScore()))
        },
        over: () => {
            gameState['gameover'] = true
            GUI.hideStat()
            gameState.listen = true
            game.inputMode(message.gameover.concat(GUI.finalScore()))
        },
        lostWarning: () => {
            if (gameState.pause) {
                gameState['lostwarning'] = true
                GUI.showMenu(message.warning)
            }
        }
    }
})()
