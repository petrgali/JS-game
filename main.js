
import { path, sprites, enemies, _, hotKey } from './data.js'

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
        remove: () => ship.remove(),
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
            } else {
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
            if (controlState[hotKey.shipFire] && bulletsArr.length <= _.burstSize) {
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
                } else if (enemiesArr[id].leftOffset >= gamearea.left && enemiesArr[id].leftOffset - _.speedX < gamearea.left) {
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

const render = () => {
    mothership.controller()
    bullet.controller()
    enemy.controller()
    if (!gameState.pause) {
        requestAnimationFrame(render)
    }
}

const game = (() => {
    return {
        play: () => {
            if (!gameState.play) {
                gameState['play'] = true
                UI.hideMenu()
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
            }
        },
        pause: () => {
            if (gameState.pause) {
                gameState.pause = false
                UI.hideMenu()
                requestAnimationFrame(render)
                return
            }
            if (gameState.play) {
                gameState['pause'] = true
                UI.showPause()
                cancelAnimationFrame(render)
            }
        },
        reset: () => {
            if (gameState.pause) {
                gameState.play = false
                gameState.reset = true
                bullet.removeAll()
                enemy.removeAll()
                mothership.remove()
                game.play()
                game.pause()
                gameState.reset = false
            }
        }
    }
})()

const UI = (() => {
    let mainMenu
    return {
        showMenu: () => {
            document.getElementById('gamefield').innerHTML += `<div id='menu_screen'>
            press enter to start
            </div>`
            mainMenu = document.getElementById('menu_screen')
        },
        showPause: () => {
            mainMenu.innerText = `**GAME MENU**\n\npress ctrl to resume\npress shift to restart`
        },

        hideMenu: () => mainMenu.textContent = ''
    }
})()


export const gameController = () => {
    UI.showMenu()
    document.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case hotKey.start:
                game.play()
                break
            case hotKey.restart:
                game.reset()
                break
            case hotKey.pause:
                game.pause()
                break
        }
    })
}








