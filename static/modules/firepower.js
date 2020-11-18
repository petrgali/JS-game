import { controlState, gameState } from './game.js'
import { effects } from '../config/resources.js'
import { _, hotKey } from '../config/data.js'
import { mothership } from './ship.js'
import { enemy } from './enemies.js'
import { SFX } from './sound.js'
import { GUI } from './view.js'
import { player } from './player.js'



export const bullet = (() => {
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
                    left: mothership.x() + _.bulletXoffset,
                    top: mothership.y() + _.bulletYoffet,
                    compare: mothership.x() + _.bulletXoffset,
                })
                player.addShot()
                SFX.play(effects.shot)
                bullet.spawn(mothership.x() + _.bulletXoffset, mothership.y() + _.bulletYoffet)
            }
        },
        listener: () => setInterval(() => {
            bullet.generator()
        }, 120),

        controller: () => {
            for (let idx = 0; idx < bulletsArr.length; idx++) {
                if ((bulletsArr[idx].left - bulletsArr[idx].compare) >= _.firingRange ||
                    bulletsArr[idx].left >= GUI.gamearea().right - _.borderOffset ||
                    enemy.collision(bulletsArr[idx].left, _.bulletXsize, bulletsArr[idx].top, _.bulletYsize)) {
                    bullet.remove(idx)
                } else {
                    bullet.positionRefresh(idx)
                }
            }
        }
    }
})()