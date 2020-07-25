
import { path, sprites, enemies, _, hotKey } from './data.js'

const mothership = (() => {
    let ship
    return {
        spawn: () => {
            document.getElementById('mothership').innerHTML += `<img src=${path}${sprites[0]} id='ship'>`
            ship = document.getElementById('ship')
            _.shipXposition += gamearea.left
            _.shipYposition += gamearea.top
        },
        positionCorrection: () => {
            if (_.shipYposition < gamearea.top + _.gameareaBorder) {
                _.shipYposition = gamearea.top + _.gameareaBorder
            } else if (_.shipYposition > gamearea.bottom - _.shipSkinHeight - _.gameareaBorder) {
                _.shipYposition = gamearea.bottom - _.shipSkinHeight - _.gameareaBorder
            }
            if (_.shipXposition < gamearea.left + _.gameareaBorder) {
                _.shipXposition = gamearea.left + _.gameareaBorder
            } else if (_.shipXposition > gamearea.right - _.shipSkinWidth - 2 * _.gameareaBorder) {
                _.shipXposition = gamearea.right - _.shipSkinWidth - 2 * _.gameareaBorder
            }
        },
        positionRefresh: () => {
            ship.style.top = _.shipYposition + 'px'
            ship.style.left = _.shipXposition + 'px'
        },
        remove: () => ship.remove(),
        controller: () => {
            if (controlState['ArrowDown']) _.shipYposition += _.shipSpeedY
            if (controlState['ArrowUp']) _.shipYposition -= _.shipSpeedY
            if (controlState['ArrowLeft']) _.shipXposition -= _.shipSpeedX
            if (controlState['ArrowRight']) _.shipXposition += _.shipSpeedX

            mothership.positionCorrection()

            if (enemy.collision(_.shipXposition, _.shipSkinWidth, _.shipYposition, _.shipSkinHeight)) {
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
    let bulletsArr = []
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
            if (controlState[' '] && bulletsArr.length <= _.burstSize) {
                bulletsArr.push({
                    left: _.shipXposition + _.bulletXoffset, compare: _.shipXposition + _.bulletXoffset,
                    top: _.shipYposition + _.bulletYoffet
                })
                bullet.spawn(_.shipXposition + _.bulletXoffset, _.shipYposition + _.bulletYoffet)
            }
        }, 70)
    }
})()

const enemy = (() => {
    let Dom = document.getElementsByClassName('enemy')
    let enemiesArr = Array.from(enemies)
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

let gameState = {}
let controlState = {}
let gamearea = document.getElementById('gamefield').getBoundingClientRect()

const render = () => {
    mothership.controller()
    bullet.controller()
    enemy.controller()
    if (!gameState.pause) {
        window.requestAnimationFrame(render)
    }
}
const UI = (() => {
    return {

    }
})()

const game = (() => {
    return {
        start: () => {
            if (!gameState.start) {
                gameState['start'] = true
                document.addEventListener('keydown', (event) => {
                    controlState[event.key] = true
                })
                document.addEventListener('keyup', (event) => {
                    controlState[event.key] = false
                })
                mothership.spawn()
                mothership.animate()
                bullet.listener()
                window.requestAnimationFrame(render)
            }
        },
        pause: () => {
            if (gameState.pause) {
                gameState.pause = false
                window.requestAnimationFrame(render)
                return
            }
            gameState['pause'] = true
            window.cancelAnimationFrame(render)
        }
    }
})()



export const initGame = (event) => {
    switch (event.keyCode) {
        case hotKey.start:
            game.start()
            break
        case hotKey.restart:
            /////////////////
            /////////////////
            break
        case hotKey.pause:
            game.pause()
            break
    }
}








