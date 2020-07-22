
// const drawTerrain = () => {
//     document.getElementById('terrain').innerHTML += `<img src=${path}${maps[0]}>`
//     document.getElementById('terrain').classList.add('container')
// }
// drawTerrain()
// let terrain = document.getElementById('terrain')
// const terrainMove = () => terrain.scrollLeft += _.speedX


import { path, sprites, enemies, _ } from './data.js'

const mothership = (() => {
    let ship
    return {
        spawn: () => {
            document.getElementById('mothership').innerHTML += `<img src=${path}${sprites[0]} id='ship'>`
            ship = document.getElementById('ship')
        },
        controller: () => {
            if (shipControlState['ArrowDown']) _.shipYposition += _.shipSpeedY
            if (shipControlState['ArrowUp']) _.shipYposition -= _.shipSpeedY
            if (shipControlState['ArrowLeft']) _.shipXposition -= _.shipSpeedX
            if (shipControlState['ArrowRight']) _.shipXposition += _.shipSpeedX

            mothership.positionCorrection()
            mothership.positionRefresh()
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
        animate: setInterval(() => {
            let num = parseInt(ship.src.slice(-5, -4))
            if (num === sprites.length) return ship.src = `${path}${sprites[num - sprites.length]}`
            ship.src = `${path}${sprites[num]}`
        }, 100)
    }
})()

const bullet = (() => {
    let bulletsDom = document.getElementsByClassName('bullet')
    let bulletsArr = []
    return {
        spawn: (axisX, axisY) => {
            document.getElementById('burstfire').innerHTML += `<div class='bullet' 
                style='top:${axisY}px; left:${axisX}px'></div>`
        },
        animate: (id) => {
            bulletsArr[id].left += _.firingRate
            bulletsDom[id].style.left = bulletsArr[id].left + 'px'
            bulletsDom[id].style.opacity = 1 + (bulletsArr[id].compare - bulletsArr[id].left) / _.fadingRate
        },
        remove: (id) => {
            bulletsArr.splice(id, 1)
            bulletsDom[id].remove()
        },
        burstFire: () => {
            for (let idx = 0; idx < bulletsArr.length; idx++) {
                if ((bulletsArr[idx].left - bulletsArr[idx].compare) >= _.firingRange ||
                    bulletsArr[idx].left >= gamearea.right - 2 * _.gameareaBorder) {
                    bullet.remove(idx)
                } else {
                    bullet.animate(idx)
                }
            }
        },
        listener: setInterval(() => {
            if (shipControlState[' '] && bulletsArr.length <= _.burstSize) {
                bulletsArr.push({ left: _.shipXposition + _.bulletXoffset, compare: _.shipXposition + _.bulletXoffset })
                bullet.spawn(_.shipXposition + _.bulletXoffset, _.shipYposition + _.bulletYoffet)
            }
        }, 70)
    }
})()

const enemy = (() => {
    let enemiesDom = document.getElementsByClassName('enemy')
    return {
        spawn: (axisX, axisY) => {
            document.getElementById('enemies').innerHTML += `<div class='enemy'
            style='top:${axisY}px; left:${axisX}px'></div>`
        },
        controller: () => {
            for (let id in enemies) {
                enemies[id].leftOffset -= _.speedX
                if (enemies[id].leftOffset + _.enemyLength > gamearea.right && enemies[id].leftOffset + _.enemyLength - _.speedX <= gamearea.right) {
                    enemy.spawn(enemies[id].leftOffset, enemies[id].topOffset)
                } else if (enemies[id].leftOffset >= gamearea.left && enemies[id].leftOffset - _.speedX < gamearea.left) {
                    enemy.remove(id)
                }
            }
        },
        move: () => {
            for (let id = 0; id < enemiesDom.length; id++) {
                enemiesDom[id].style.left = enemies[id].leftOffset - _.speedX + 'px'
            }
        },
        remove: (id) => {
            enemies.splice(id, 1)
            enemiesDom[id].remove()
        }

    }

})()
//////////////////
//////////////////
let gamearea = document.getElementById('gamefield').getBoundingClientRect()
_.shipXposition += gamearea.left
_.shipYposition += gamearea.top


let shipControlState = {}
document.addEventListener('keydown', (event) => {
    shipControlState[event.key] = true
})
document.addEventListener('keyup', (event) => {
    shipControlState[event.key] = false
})

///////////////////
///////////////////

/// VIEW ////


mothership.spawn()
mothership.animate
bullet.listener

export const render = () => {
    // terrainMove()
    enemy.controller()
    enemy.move()
    mothership.controller()
    bullet.burstFire()
    if (!_.brake) {
        window.requestAnimationFrame(render)
    }
}
window.requestAnimationFrame(render)





////////////////////////
/////CONTROL MANUAL/////
let animate = document.getElementsByTagName('button')[0]
animate.addEventListener('click', function () {
    if (!_.brake) {
        animate.innerText = 'ON Animation'
        _.brake = true
    } else {
        animate.innerText = 'OFF Animation'
        _.brake = false
        window.requestAnimationFrame(render)
    }
})
let reload = document.getElementsByName('reset')[0]
reload.addEventListener('click', function () {
    terrain.scrollTo(0, 0)
})
/////////////
/////////////





