
import { path, sprites, splash, enemies, _, hotKey } from './data.js'

const mothership = (() => {
    let ship
    return {
        spawn: () => {
            document.getElementById('mothership').innerHTML += `<img src=${path}${sprites[0]} id='ship'>`
            ship = document.getElementById('ship')
        },
        positionCorrection: () => {
            if (shipY < gamearea.top + _.gameareaBorder) {
                shipY = gamearea.top + _.gameareaBorder
            } else if (shipY > gamearea.bottom - _.shipSkinHeight - _.gameareaBorder) {
                shipY = gamearea.bottom - _.shipSkinHeight - _.gameareaBorder
            }
            if (shipX < gamearea.left + _.gameareaBorder) {
                shipX = gamearea.left + _.gameareaBorder
            } else if (shipX > gamearea.right - _.shipSkinWidth - 2 * _.gameareaBorder) {
                shipX = gamearea.right - _.shipSkinWidth - 2 * _.gameareaBorder
            }
        },
        positionRefresh: () => {
            ship.style.top = shipY + 'px'
            ship.style.left = shipX + 'px'
        },
        remove: () => {
            ship.remove()
        },
        init: () => {
            shipX = gamearea.left + _.shipXposition
            shipY = gamearea.top + _.shipYposition
        },
        controller: () => {
            if (controlState[hotKey.shipDown]) shipY += _.shipSpeedY
            if (controlState[hotKey.shipUP]) shipY -= _.shipSpeedY
            if (controlState[hotKey.shipLeft]) shipX -= _.shipSpeedX
            if (controlState[hotKey.shipRight]) shipX += _.shipSpeedX

            mothership.positionCorrection()

            if (enemy.collision(shipX, _.shipSkinWidth, shipY, _.shipSkinHeight)) {
                mothership.remove()
                gameState['wasted'] = true
            } else {
                if (enemy.total() < 1) {
                    game.levelEnd()
                }
                mothership.positionRefresh()
            }
        },
        animate: () => setInterval(() => {
            let num = parseInt(ship.src.slice(-5, -4))
            if (num === sprites.length) return ship.src = `${path}${sprites[num - sprites.length]}`
            ship.src = `${path}${sprites[num]}`
        }, 100)
    }
})()

const bullet = (() => {
    let Dom = document.getElementsByClassName('bullet')
    let bulletsArr
    return {
        spawn: (axisX, axisY) => {
            document.getElementById('burstfire').innerHTML += `<div class='bullet' 
                style='top:${axisY}px; left:${axisX}px'></div>`
        },
        positionRefresh: (id) => {
            bulletsArr[id].left += _.firingRate
            Dom[id].style.left = bulletsArr[id].left + 'px'
            Dom[id].style.opacity = 1 + (bulletsArr[id].compare - bulletsArr[id].left) / _.fadingRate
        },
        remove: (id) => {
            bulletsArr.splice(id, 1)
            Dom[id].remove()
        },
        removeAll: () => {
            while (Dom.length > 0) {
                Dom[Dom.length - 1].remove()
            }
            while (bulletsArr > 0) {
                bulletsArr.splice(bulletsArr.length - 1, 1)
            }
        },
        init: () => bulletsArr = [],
        controller: () => {
            for (let idx = 0; idx < bulletsArr.length; idx++) {
                if ((bulletsArr[idx].left - bulletsArr[idx].compare) >= _.firingRange ||
                    bulletsArr[idx].left >= gamearea.right - 2 * _.gameareaBorder ||
                    enemy.collision(bulletsArr[idx].left, _.bulletSize, bulletsArr[idx].top, _.bulletSize)) {
                    bullet.remove(idx)
                } else {
                    bullet.positionRefresh(idx)
                }
            }
        },
        listener: () => setInterval(() => {
            if (controlState[hotKey.shipFire] && bulletsArr.length <= _.burstSize && !gameState.wasted && !gameState.pause) {
                bulletsArr.push({
                    left: shipX + _.bulletXoffset, compare: shipX + _.bulletXoffset,
                    top: shipY + _.bulletYoffet
                })
                bullet.spawn(shipX + _.bulletXoffset, shipY + _.bulletYoffet)
            }
        }, 70)
    }
})()

const enemy = (() => {
    let Dom = document.getElementsByClassName('enemy')
    let enemiesArr
    return {
        spawn: (axisX, axisY, sprite) => {
            document.getElementById('enemies').innerHTML += `<div class='enemy'
            style='top:${axisY}px; left:${axisX}px;'>
            <img src=${path}${sprite}>
            </div>`
        },
        collision: (axisX, offsetX, axisY, offsetY) => {
            for (let id = 0; id < Dom.length; id++) {
                if (axisY >= Dom[id].getBoundingClientRect().top - offsetY &&
                    axisY <= Dom[id].getBoundingClientRect().top + enemiesArr[id].type.height &&
                    axisX >= Dom[id].getBoundingClientRect().left - offsetX &&
                    axisX <= Dom[id].getBoundingClientRect().left + enemiesArr[id].type.length) {
                    score += enemiesArr[id].type.points
                    GUI.explode(enemiesArr[id].leftOffset, enemiesArr[id].topOffset)
                    enemy.remove(id)
                    return true
                }
            }
            return false
        },
        positionRefresh: () => {
            for (let id = 0; id < Dom.length; id++) {
                Dom[id].style.left = enemiesArr[id].leftOffset - _.speedX + 'px'
            }
        },
        remove: (id) => {
            enemiesArr.splice(id, 1)
            Dom[id].remove()
        },
        removeAll: () => {
            while (Dom.length > 0) {
                Dom[Dom.length - 1].remove()
            }
            while (enemiesArr > 0) {
                enemiesArr.splice(enemiesArr.length - 1, 1)
            }
        },
        init: () => {
            enemiesArr = JSON.parse(JSON.stringify(enemies))
        },
        controller: () => {
            for (let id in enemiesArr) {
                enemiesArr[id].leftOffset -= _.speedX
                if (enemiesArr[id].leftOffset + enemiesArr[id].type.length > gamearea.right &&
                    enemiesArr[id].leftOffset + enemiesArr[id].type.length - _.speedX <= gamearea.right) {
                    enemy.spawn(enemiesArr[id].leftOffset, enemiesArr[id].topOffset, enemiesArr[id].type.sprite)
                } else if (enemiesArr[id].leftOffset >= gamearea.left + _.gameareaBorder &&
                    enemiesArr[id].leftOffset - _.speedX < gamearea.left + _.gameareaBorder) {
                    enemy.remove(id)
                }
            }
            enemy.positionRefresh()
        },
        total: () => { return enemiesArr.length }
    }
})()

//////////////////
//////////////////
let shipX
let shipY
let gamearea = document.getElementById('gamefield').getBoundingClientRect()
let gameState = {}
let controlState = {}
let score = 0


const render = () => {
    if (!gameState.wasted) {
        mothership.controller()
        GUI.controller()
        enemy.controller()
    }

    bullet.controller()
    if (!gameState.pause) {
        requestAnimationFrame(render)
    }
}

const game = (() => {
    return {
        play: () => {
            if (!gameState.play || (gameState.play && gameState.reset)) {
                gameState['play'] = true
                GUI.hideMenu()
                mothership.init()
                bullet.init()
                enemy.init()
                mothership.spawn()

                if (!gameState.reset) {
                    GUI.gameStat()
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
                    GUI.resetLifes()
                    GUI.gameStat()
                    gameState.gameover = false
                    gameState.wasted = false
                    gameState.reset = false
                }
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
            if (gameState.play && !gameState.wasted) {
                gameState['pause'] = true
                GUI.showPause()
            }
        },
        reset: () => {
            if (gameState.lostwarning) {
                gameState.lostwarning = false
                gameState.play = false
                gameState.reset = true
                GUI.clearField()
                GUI.resetScore()
                GUI.resetLifes()
                GUI.refreshLifes()
                game.play()
                game.pause()
                gameState.reset = false
                return
            }
            if (gameState.gameover) {
                gameState.reset = true
                GUI.clearField()
                GUI.resetScore()
                GUI.showMenu()
                gameState.play = true
                return
            }
            if (gameState.wasted) {
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
        over: () => {
            gameState['gameover'] = true
            GUI.hideStat()
            GUI.gameOver()
            setTimeout(() => {
                game.reset()
            }, 2000)
        },
        levelEnd: () => {
            setTimeout(() => {
                // gameState.pause = true
                gameState.wasted = true
                gameState.play = false
                gameState.reset = true
                GUI.clearField()
                GUI.resetScore()
                GUI.resetLifes()
                GUI.refreshLifes()
                game.play()
                // game.pause()
                gameState.reset = false
            }, 2000)
        },
        lostWarning: () => {
            if (gameState.pause) {
                gameState['lostwarning'] = true
                GUI.lostWarning()
            }
        },
        stepBackward: () => {
            if (gameState.lostwarning) {
                gameState.lostwarning = false
                GUI.showPause()
            }
        },
        stepForward: () => {
            if (gameState.lostwarning) {
                game.reset()
            }
        },
    }
})()

const GUI = (() => {
    let splash
    let lifes
    let mainMenu
    let playerMenu
    let scoreInfo
    let progressBar
    let lifeInfo
    let decal = document.getElementsByClassName('decal')
    let percent = 0
    let timeElapsed = 0
    return {
        init: () => {
            document.getElementById('gamefield').innerHTML += `<div id='menu_screen'></div>`
            document.getElementById('gamefield').innerHTML += `<div id='splash'></div>`
            document.getElementById('info').innerHTML += `<div id='score'></div>`
            document.getElementById('info').innerHTML += `<div id='lifes'></div>`
            document.getElementById('progress').innerHTML += `<div id='bar'></div>`
            mainMenu = document.getElementById('menu_screen')
            splash = document.getElementById('splash')
            playerMenu = document.getElementById('info')
            scoreInfo = document.getElementById('score')
            lifeInfo = document.getElementById('lifes')
            progressBar = document.getElementById('bar')
            GUI.resetLifes()
        },
        showMenu: () => {
            mainMenu.innerText = `press enter to start`
        },
        showPause: () => {
            mainMenu.innerText = `**GAME MENU**\n\npress ctrl to resume\npress shift to restart`
        },
        lostWarning: () => {
            mainMenu.innerText = '**GAME MENU**\n\nyour progress will be lost\nare you sure?\ny/n'
        },
        clearField: () => {
            bullet.removeAll()
            enemy.removeAll()
            mothership.remove()
        },
        resetScore: () => {
            score = 0
            timeElapsed = 0
        },
        resetLifes: () => lifes = _.try,
        hideMenu: () => mainMenu.textContent = '',
        gameStat: () => {
            document.getElementById('progress').style.opacity = 1
            lifeInfo.innerText = `tries ${lifes}`
        },
        hideStat: () => {
            document.getElementById('progress').style.opacity = 0
            lifeInfo.innerText = ``
            scoreInfo.innerText = ``
        },
        wasted: () => {
            mainMenu.innerText = 'REKT!!'
            lifes -= 1
            lifes >= 0 ? game.reset() : game.over()
        },
        explode: (axisX, axisY) => {
            splash.innerHTML += `<div class='decal' style='top:${axisY}px; left:${axisX}px'></div>`
            setTimeout(() => {
                decal[0].remove()
            }, 600);
        },
        gameOver: () => {
            mainMenu.innerText = `**GAME OVER**\n\nfinal score ${score}`
        },
        scoreRefresh: () => {
            scoreInfo.innerText = `score ${score}`
        },
        timeElapsed: () => {
            timeElapsed += _.speedX
            percent = (timeElapsed / (enemies[enemies.length - 1].leftOffset - gamearea.right +
                enemies[enemies.length - 1].type.length)) * 100
            percent <= 100 ?
                percent > 99.6 ?
                    progressBar.style.width = 100 + '%' :
                    progressBar.style.width = `${percent}` + '%' :
                percent
        },
        refreshLifes: () => {
            lifeInfo.innerText = `tries ${lifes}`
            timeElapsed = 0
        },
        controller: () => {
            GUI.scoreRefresh()
            GUI.timeElapsed()
            if (gameState.wasted) {
                GUI.wasted()
            }
        }
    }
})()


export const userController = () => {
    GUI.init()
    GUI.showMenu()
    document.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case hotKey.start:
                game.play()
                break
            case hotKey.restart:
                game.lostWarning()
                break
            case hotKey.pause:
                game.pause()
                break
            case hotKey.yes:
                game.stepForward()
                break
            case hotKey.no:
                game.stepBackward()

        }
    })
}
