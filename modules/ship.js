import { sprites, effects, path } from '../config/resources.js'
import { game, controlState, gameState } from './game.js'
import { _, hotKey } from '../config/data.js'
import { enemy } from './enemies.js'
import { SFX } from './sound.js'
import { GUI, gamearea } from './view.js'

export const mothership = (() => {
    let ship
    let shipX
    let shipY
    return {
        x: () => shipX,
        y: () => shipY,
        init: () => {
            shipX = _.shipXposition
            shipY = _.shipYposition
        },
        spawn: () => {
            document.getElementById('mothership').innerHTML += `<img src=${path}${sprites[0]} id='ship'>`
            ship = document.getElementById('ship')
        },
        remove: () => {
            ship.remove()
        },
        positionCorrection: () => {
            if (shipY < _.gameareaBorder + _.borderOffset) {
                shipY = _.gameareaBorder + _.borderOffset
            } else if (shipY > gamearea.bottom - gamearea.top - _.shipSkinHeight - _.gameareaBorder - _.borderOffset) {
                shipY = gamearea.bottom - gamearea.top - _.shipSkinHeight - _.gameareaBorder - _.borderOffset
            }
            if (shipX < _.borderOffset / 2) {
                shipX = _.borderOffset / 2
            } else if (shipX > gamearea.right - gamearea.left - _.shipSkinWidth - _.borderOffset / 2) {
                shipX = gamearea.right - gamearea.left - _.shipSkinWidth - _.borderOffset / 2
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
                SFX.play(effects.explode)
                GUI.explodeMothership()
                gameState['wasted'] = true
            } else {
                mothership.positionRefresh()
            }
        }
    }
})()