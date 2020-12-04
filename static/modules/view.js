
import { enemies } from '../config/level_set.js'
import { bullet } from './firepower.js'
import { mothership } from './ship.js'
import { _, message, board } from '../config/data.js'
import { enemy } from './enemies.js'
import { game, gameState } from './game.js'
import { player } from './player.js'
import { scoreBoard } from './scoreboard.js'
import { level } from './terrain.js'
export { GUI }

const GUI = (() => {
    let footerInterval
    let splash
    let footer
    let lifes
    let indicator
    let mainMenu
    let scoreInfo
    let progressBar
    let lifeInfo
    let decal = document.getElementsByClassName('decal')
    let percent = 0
    let timeElapsed = 0
    let gamearea
    return {
        gamearea: () => gamearea,
        setGamearea: () => {
            gamearea = document.getElementById('gamefield').getBoundingClientRect()
        },
        finalScore: () => enemy.score() + lifes * _.multiplier,
        init: () => {
            gamearea = document.getElementById('gamefield').getBoundingClientRect()
            document.getElementById('gamefield').innerHTML += `<div id='menu_screen'></div>`
            document.getElementById('gamefield').innerHTML += `<div id='splash'></div>`
            document.getElementById('info').innerHTML += `<div id='score'></div>`
            document.getElementById('info').innerHTML += `<div id='lifes'></div>`
            document.getElementById('progress').innerHTML += `<div id='bar'></div>`
            mainMenu = document.getElementById('menu_screen')
            splash = document.getElementById('splash')
            scoreInfo = document.getElementById('score')
            lifeInfo = document.getElementById('lifes')
            progressBar = document.getElementById('bar')
            GUI.resetLifes()
        },
        showMenu: (text) => {
            mainMenu.innerText = text
        },
        constructTable: () => {
            let boardHeader = board.title
                .concat(GUI.tableHeader())
            mainMenu.innerHTML = boardHeader
                .concat(GUI.autoTable())
            GUI.addFooter()
            document.querySelector('table').classList.add('scoretable')
        },
        tableHeader: () => {
            return `<div id='header'>congrats "${player.name()}"<br> 
            you're in top ${Math.round(player.rank() / player.totalPlayers() * 100)}% 
            in ${player.rank()} place</div>`
        },
        addFooter: () => {
            footer = document.createElement('div')
            document.getElementById('gamefield').appendChild(footer)
                .classList.add('footer')
        },
        refreshFooter: () => {
            footerInterval = setInterval(() => {
                footer.innerText = board.navTitle
                    .concat(`${scoreBoard.currentPage() + 1}`)
                    .concat(board.delimeter)
                    .concat(`${scoreBoard.totalPages()}`)
            })
        },
        removeFooter: () => {
            clearInterval(footerInterval)
            footer.remove()
        },
        autoTable: () => {
            let sample = `<table><tbody>`
            for (let idx = 0; idx <= player.totalPlayers(); idx++) {
                sample += `<tr>`
                for (let i = 0; i < board.cols.length; i++) {
                    sample += `<td></td>`
                }
                sample += `</tr>`
            }
            sample
                .concat(`</tbody></table>`)
            return sample
        },
        hideMenu: () => mainMenu.textContent = '',
        gameStat: () => {
            document.getElementById('progress').style.opacity = 1
            for (let i = 0; i < lifes; i++) {
                lifeInfo.innerHTML += `<div class='life'></div>`
            }
            indicator = document.getElementsByClassName('life')
        },
        hideStat: () => {
            document.getElementById('progress').style.opacity = 0
            lifeInfo.innerHTML = ``
            scoreInfo.innerText = ``
        },
        scoreRefresh: () => {
            scoreInfo.innerText = `score ${enemy.score()}`
        },
        timeElapsed: () => {
            timeElapsed += enemies[enemies.length - 1].type.speed
            percent = (timeElapsed / (enemy.wayTotal() +
                enemies[enemies.length - 1].type.length)) * 100
            percent <= 100 ?
                percent > 99.8 ?
                    progressBar.style.width = 100 + '%' :
                    progressBar.style.width = `${percent}` + '%' :
                percent
        },
        refreshLifes: () => {
            while (indicator.length > 0) {
                indicator[indicator.length - 1].remove()
            }
            timeElapsed = 0
        },
        resetScore: () => {
            enemy.resetScore()
            timeElapsed = 0
        },
        resetLifes: () => lifes = _.try,
        wasted: () => {
            lifes -= 1
            lifes >= 1 ? game.reset() : game.over()
        },
        explodeEnemy: (axisX, axisY) => {
            splash.innerHTML += `<div class='decal' style='top:${axisY - _.splashSize / 2}px; 
            left:${axisX - _.splashSize / 2}px'></div>`

            setTimeout(() => {
                decal[0].remove()
            }, 600);
        },
        explodeMothership: () => {
            document.getElementById('mothership').innerHTML += `<div id='ship_decal' 
            style='top:${mothership.y()}px; left:${mothership.x()}px'></div>`

            setTimeout(() => {
                document.getElementById('ship_decal').remove()
            }, 600);
        },
        stepBackward: () => {
            if (gameState.lostwarning) {
                gameState.lostwarning = false
                GUI.showMenu(message.pause)
            }
        },
        stepForward: () => {
            if (gameState.lostwarning) {
                game.reset()
            }
        },
        clearField: () => {
            bullet.removeAll()
            enemy.removeAll()
            level.removeAll()
            mothership.remove()
        },
        reset: () => {
            GUI.clearField()
            GUI.resetScore()
            GUI.resetLifes()
        },
        controller: () => {
            GUI.scoreRefresh()
            GUI.timeElapsed()
            if (gameState.wasted) {
                GUI.showMenu(message.wasted)
                GUI.wasted()
            }
        }
    }
})()


window.onresize = () => GUI.setGamearea()