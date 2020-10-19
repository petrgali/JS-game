import { mothership } from './ship.js'
import { bullet } from './firepower.js'
import { enemy } from './enemies.js'
import { GUI } from './view.js'
import { message } from '../config/data.js'
import { player } from './player.js'
import { scoreBoard } from './scoreboard.js'
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

                if (!gameState.reset) game.initGameCore()

                if (gameState.gameover) {
                    gameState.gameover = false
                    gameState.wasted = false
                    gameState.reset = false
                    gameState.levelend = false
                }
                GUI.gameStat()
            }
        },
        initGameCore: () => {
            document.addEventListener('keydown', (event) => {
                controlState[event.code] = true
                if (gameState.nameInput) player.setName(event.key)
            })
            document.addEventListener('keyup', (event) => {
                controlState[event.code] = false
                if (gameState.scoreBoard) scoreBoard.rotatePage(event.key)
            })
            mothership.animate()
            bullet.listener()
            requestAnimationFrame(render)
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
                GUI.removeFooter()
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
                GUI.showMenu(msg.concat(GUI.finalScore()) + message.inputName + player.name())
            }, 30)
        },
        scoreMode: () => {
            clearInterval(inputWaiter)
            gameState.nameInput = false
            GUI.clearField()
            player.sendJSONstat()
            player.readJSONstat().then(data => {
                scoreBoard.createTable()
                scoreBoard.fillTable(data)
                gameState.scoreBoard = true
            })
        },
        stop: () => {
            gameState.scoreBoard = false
            setTimeout(() => {
                game.reset()
            }, 500)
        },
        levelEnd: () => {
            gameState['levelend'] = true
            gameState.gameover = true
            gameState.wasted = true
            GUI.hideStat()
            gameState.nameInput = true
            game.inputMode(message.levelend)
        },
        over: () => {
            gameState['gameover'] = true
            GUI.hideStat()
            gameState.nameInput = true
            game.inputMode(message.gameover)
        },
        lostWarning: () => {
            if (gameState.pause) {
                gameState['lostwarning'] = true
                GUI.showMenu(message.warning)
            }
        }
    }
})()
