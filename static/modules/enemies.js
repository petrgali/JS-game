import { enemies, tutorial, timeOffset } from '../config/level_set.js'
import { effects } from '../config/resources.js'
import { _ } from '../config/data.js'
import { GUI } from './view.js'
import { SFX } from './sound.js'
import { game } from './game.js'
import { player } from './player.js'



export const enemy = (() => {
    let Dom = document.getElementsByClassName('enemy')
    let enemiesArr
    let position
    let normalized
    let score = 0
    let removed = 0
    let distance
    return {
        skipTutorial: () => { if (removed >= tutorial) return true },
        score: () => score,
        wayTotal: () => distance,
        resetScore: () => score = 0,
        setDistance: () => {
            distance = enemiesArr[enemiesArr.length - 1].leftOffset
        },
        deploy: () => {
            enemiesArr = JSON.parse(JSON.stringify(enemies))
            normalized = GUI.gamearea().right - GUI.gamearea().left
        },
        initTutorial: () => {
            removed = 0
            enemy.deploy()
            enemy.setDistance()
        },
        init: () => {
            enemy.deploy()
            enemiesArr.splice(0, tutorial)
            enemiesArr.forEach((line) => {
                line.type.fast
                    ? line.leftOffset -= 2 * timeOffset
                    : line.leftOffset -= timeOffset
            })
            enemy.setDistance()
        },
        spawn: (axisX, axisY, objType) => {
            document.getElementById('enemies').innerHTML += `<div class='enemy ${objType}'
            style='top:${axisY}px; left:${axisX}px;'></div>`
        },
        remove: (id) => {
            enemiesArr.splice(id, 1)
            Dom[id].remove()
            removed += 1
            if (enemy.total() < 1) {
                game.levelEnd()
            }
        },
        removeAll: () => {
            while (Dom.length > 0) Dom[Dom.length - 1].remove()
            while (enemiesArr > 0) enemiesArr.splice(enemiesArr.length - 1, 1)
        },
        total: () => { return enemiesArr.length },

        collision: (axisX, offsetX, axisY, offsetY) => {
            for (let id = 0; id < Dom.length; id++) {
                if (axisY >= Dom[id].getBoundingClientRect().top - GUI.gamearea().top - offsetY &&
                    axisY <= Dom[id].getBoundingClientRect().top - GUI.gamearea().top + enemiesArr[id].type.height &&
                    axisX >= enemiesArr[id].leftOffset + normalized - offsetX &&
                    axisX <= enemiesArr[id].leftOffset + normalized + enemiesArr[id].type.length / 3) {
                    score += enemiesArr[id].type.points
                    if (enemiesArr[id].type.destructible) {
                        GUI.explodeEnemy(enemiesArr[id].leftOffset + normalized,
                            Dom[id].getBoundingClientRect().top - GUI.gamearea().top + _.gameareaBorder)
                        SFX.play(effects.explode)
                        enemy.remove(id)
                        player.addPoint()
                    }
                    return true
                }
            }
            return false
        },
        verticalDeviation: (num, id) => {
            if (num + enemiesArr[id].dev >= enemiesArr[id].topOffset + enemiesArr[id].Ydev ||
                num + enemiesArr[id].dev <= enemiesArr[id].topOffset - enemiesArr[id].Ydev) {
                enemiesArr[id].dev = -enemiesArr[id].dev
            }
            return num + enemiesArr[id].dev
        },
        positionRefresh: (id) => {
            Dom[id].style.left = enemiesArr[id].leftOffset + normalized - enemiesArr[id].type.speed + 'px'
            if (enemiesArr[id].type.tricky) {
                Dom[id].style.top = enemy.verticalDeviation(Dom[id].getBoundingClientRect().top
                    - GUI.gamearea().top, id) + 'px'
            }
        },

        controller: () => {
            for (let id in enemiesArr) {
                enemiesArr[id].leftOffset -= enemiesArr[id].type.speed
                position = enemiesArr[id].leftOffset + GUI.gamearea().right
                if (position + enemiesArr[id].type.length > GUI.gamearea().right - enemiesArr[id].type.speed &&
                    position + enemiesArr[id].type.length - enemiesArr[id].type.speed <=
                    GUI.gamearea().right - enemiesArr[id].type.speed) {
                    switch (enemiesArr[id].type.text) {
                        case true: {
                            GUI.showMenu(enemiesArr[id].type.message)
                        }
                        default: {
                            enemy.spawn(position, enemiesArr[id].topOffset, enemiesArr[id].type.class)
                        }
                    }
                } else if (position >= GUI.gamearea().left + _.gameareaBorder &&
                    position - enemiesArr[id].type.speed < GUI.gamearea().left + _.gameareaBorder) {
                    enemy.remove(id)
                }
                if (Dom[id] != undefined) enemy.positionRefresh(id)
            }
        },
    }
})()
