
import { path, sprites, _, hotKey } from './data.js'
import { enemies } from './level_set.js'

const mothership = (() => {
    let ship
    return {
        init: () => {
            shipX = gamearea.left + _.shipXposition
            shipY = gamearea.top + _.shipYposition
        },
        spawn: () => {
            document.getElementById('mothership').innerHTML += `<img src=${path}${sprites[0]} id='ship'>`
            ship = document.getElementById('ship')
        },
        remove: () => {
            ship.remove()
        },
        positionCorrection: () => {
            if (shipY < gamearea.top + _.gameareaBorder + _.borderOffset) {
                shipY = gamearea.top + _.gameareaBorder + _.borderOffset
            } else if (shipY > gamearea.bottom - _.shipSkinHeight - _.gameareaBorder - _.borderOffset) {
                shipY = gamearea.bottom - _.shipSkinHeight - _.gameareaBorder - _.borderOffset
            }
            if (shipX < gamearea.left + _.borderOffset / 2) {
                shipX = gamearea.left + _.borderOffset / 2
            } else if (shipX > gamearea.right - _.shipSkinWidth - _.borderOffset / 2) {
                shipX = gamearea.right - _.shipSkinWidth - _.borderOffset / 2
            }
        },
        positionRefresh: () => {
            ship.style.top = shipY + 'px'
            ship.style.left = shipX + 'px'
        },
        sprite: () => {
            let num = parseInt(ship.src.slice(-5, -4))
            if (num === sprites.length) return ship.src = `${path}${sprites[num - sprites.length]}`
            ship.src = `${path}${sprites[num]}`
        },
        animate: () => setInterval(() => {
            mothership.sprite()
        }, 100),

        controller: () => {
            if (controlState[hotKey.shipDown]) shipY += _.shipSpeedY
            if (controlState[hotKey.shipUP]) shipY -= _.shipSpeedY
            if (controlState[hotKey.shipLeft]) shipX -= _.shipSpeedX
            if (controlState[hotKey.shipRight]) shipX += _.shipSpeedX

            mothership.positionCorrection()

            if (enemy.collision(shipX, _.shipSkinWidth, shipY, _.shipSkinHeight)) {
                mothership.remove()
                GUI.explodeMothership()
                gameState['wasted'] = true
            } else {
                if (enemy.total() < 1) {
                    game.levelEnd()
                }
                mothership.positionRefresh()
            }
        }
    }
})()

const bullet = (() => {
    let Dom = document.getElementsByClassName('bullet')
    let bulletsArr = []
    return {
        init: () => bulletsArr.length = 0,
        spawn: (axisX, axisY) => {
            document.getElementById('burstfire').innerHTML += `<div class='bullet' 
                style='top:${axisY}px; left:${axisX}px'></div>`
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
        positionRefresh: (id) => {
            bulletsArr[id].left += _.firingRate
            Dom[id].style.opacity = 1 + (bulletsArr[id].compare - bulletsArr[id].left) / _.fadingRate
            Dom[id].style.left = bulletsArr[id].left + 'px'
        },
        generator: () => {
            if (controlState[hotKey.shipFire] && bulletsArr.length <= _.burstSize && !gameState.wasted && !gameState.pause) {
                bulletsArr.push({
                    left: shipX + _.bulletXoffset, compare: shipX + _.bulletXoffset,
                    top: shipY + _.bulletYoffet
                })
                bullet.spawn(shipX + _.bulletXoffset, shipY + _.bulletYoffet)
            }
        },
        listener: () => setInterval(() => {
            bullet.generator()
        }, 70),

        controller: () => {
            for (let idx = 0; idx < bulletsArr.length; idx++) {
                if ((bulletsArr[idx].left - bulletsArr[idx].compare) >= _.firingRange ||
                    bulletsArr[idx].left >= gamearea.right - _.borderOffset ||
                    enemy.collision(bulletsArr[idx].left, _.bulletSize, bulletsArr[idx].top, _.bulletSize)) {
                    bullet.remove(idx)
                } else {
                    bullet.positionRefresh(idx)
                }
            }
        }
    }
})()

const enemy = (() => {
    let Dom = document.getElementsByClassName('enemy')
    let enemiesArr
    return {
        init: () => enemiesArr = JSON.parse(JSON.stringify(enemies)),
        spawn: (axisX, axisY, objType) => {
            document.getElementById('enemies').innerHTML += `<div class='enemy'
            style='top:${axisY}px; left:${axisX}px;'></div>`
            Dom[Dom.length - 1].classList.add(objType)
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
        total: () => { return enemiesArr.length },

        collision: (axisX, offsetX, axisY, offsetY) => {
            for (let id = 0; id < Dom.length; id++) {
                if (axisY >= Dom[id].getBoundingClientRect().top - offsetY &&
                    axisY <= Dom[id].getBoundingClientRect().top + enemiesArr[id].type.height &&
                    axisX >= Dom[id].getBoundingClientRect().left - offsetX &&
                    axisX <= Dom[id].getBoundingClientRect().left + enemiesArr[id].type.length) {
                    score += enemiesArr[id].type.points
                    if (enemiesArr[id].type.destructible) {
                        GUI.explodeEnemy(Dom[id].getBoundingClientRect().left - gamearea.left,
                            Dom[id].getBoundingClientRect().top)
                        enemy.remove(id)
                    }
                    return true
                }
            }
            return false
        },
        verticalDeviation: (num, id) => {
            if (num + enemiesArr[id].dev >= enemiesArr[id].topOffset + _.Ydev ||
                num + enemiesArr[id].dev <= enemiesArr[id].topOffset - _.Ydev) {
                enemiesArr[id].dev = -enemiesArr[id].dev
            }
            return num + enemiesArr[id].dev
        },
        positionRefresh: () => {
            for (let id = 0; id < Dom.length; id++) {
                Dom[id].style.left = enemiesArr[id].leftOffset - enemiesArr[id].type.speed + 'px'
                if (enemiesArr[id].type.destructible) {
                    Dom[id].style.top = enemy.verticalDeviation(Dom[id].getBoundingClientRect().top, id) + 'px'
                }
            }
        },
        controller: () => {
            for (let id in enemiesArr) {
                enemiesArr[id].leftOffset -= enemiesArr[id].type.speed
                if (enemiesArr[id].leftOffset + enemiesArr[id].type.length > gamearea.right - enemiesArr[id].type.speed &&
                    enemiesArr[id].leftOffset + enemiesArr[id].type.length - enemiesArr[id].type.speed <=
                    gamearea.right - enemiesArr[id].type.speed) {
                    enemy.spawn(enemiesArr[id].leftOffset, enemiesArr[id].topOffset, enemiesArr[id].type.class)
                } else if (enemiesArr[id].leftOffset >= gamearea.left + _.gameareaBorder &&
                    enemiesArr[id].leftOffset - enemiesArr[id].type.speed < gamearea.left + _.gameareaBorder) {
                    enemy.remove(id)
                }
            }
            enemy.positionRefresh()
        },
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
                GUI.showPause()
            }
        },
        reset: () => {
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
        levelEnd: () => {
            gameState['levelend'] = true
            gameState.gameover = true
            gameState.wasted = true
            GUI.hideStat()
            GUI.levelEnd()
            setTimeout(() => {
                game.reset()
            }, 2000)
        },
        over: () => {
            gameState['gameover'] = true
            GUI.hideStat()
            GUI.gameOver()
            setTimeout(() => {
                game.reset()
            }, 2000)
        },
        lostWarning: () => {
            if (gameState.pause) {
                gameState['lostwarning'] = true
                GUI.lostWarning()
            }
        }
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
        gameOver: () => {
            mainMenu.innerText = `**GAME OVER**\n\nfinal score ${score}`
        },
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
        resetScore: () => {
            score = 0
            timeElapsed = 0
        },
        resetLifes: () => lifes = _.try,
        levelEnd: () => {
            mainMenu.innerText = `congratulations!\n\nyou survived!\n\nfinal score ${score}`
        },
        wasted: () => {
            mainMenu.innerText = 'REKT!!'
            lifes -= 1
            lifes >= 0 ? game.reset() : game.over()
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
            style='top:${shipY}px; left:${shipX}px'></div>`

            setTimeout(() => {
                document.getElementById('ship_decal').remove()
            }, 600);
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
        clearField: () => {
            bullet.removeAll()
            enemy.removeAll()
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
                GUI.wasted()
            }
        }
    }
})()


export const userController = () => {
    GUI.init()
    GUI.showMenu()
    document.addEventListener('keydown', (event) => {
        if (event.keyCode == 61 ||
            event.keyCode == 107 || event.keyCode == 173 ||
            event.keyCode == 109 || event.keyCode == 187 ||
            event.keyCode == 189) event.preventDefault()

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
                GUI.stepForward()
                break
            case hotKey.no:
                GUI.stepBackward()
        }
    })
    window.addEventListener('wheel', (event) => {
        event.preventDefault()
    })
}
