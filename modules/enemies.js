import { enemies, tutorial, timeOffset } from '../config/level_set.js'
import { effects } from '../config/resources.js'
import { _ } from '../config/data.js'
import { GUI, gamearea } from './view.js'
import { SFX } from './sound.js'
import { game } from './game.js'



export const enemy = (() => {
    let Dom = document.getElementsByClassName('enemy')
    let enemiesArr
    let position
    let normalized
    let score = 0
    let removed = 0
    let distance
    return {
        wayTotal: () => distance,
        setDistance: () => distance = enemiesArr[enemiesArr.length - 1].leftOffset,
        skipTutorial: () => { if (removed >= tutorial) return true },
        score: () => score,
        resetScore: () => score = 0,
        initTutorial: () => {
            removed = 0
            enemiesArr = JSON.parse(JSON.stringify(enemies))
            normalized = gamearea.right - gamearea.left
            enemy.setDistance()
        },
        init: () => {
            enemiesArr = JSON.parse(JSON.stringify(enemies))
            enemiesArr.splice(0, tutorial)
            enemiesArr.forEach((line) => {
                line.leftOffset -= timeOffset
            })
            enemy.setDistance()
        },
        spawn: (axisX, axisY, objType) => {
            document.getElementById('enemies').innerHTML += `<div class='enemy'
            style='top:${axisY}px; left:${axisX}px;'></div>`
            Dom[Dom.length - 1].classList.add(objType)
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
                if (axisY >= Dom[id].getBoundingClientRect().top - gamearea.top - offsetY &&
                    axisY <= Dom[id].getBoundingClientRect().top - gamearea.top + enemiesArr[id].type.height &&
                    axisX >= enemiesArr[id].leftOffset + normalized - offsetX &&
                    axisX <= enemiesArr[id].leftOffset + normalized + enemiesArr[id].type.length / 3) {
                    score += enemiesArr[id].type.points
                    if (enemiesArr[id].type.destructible) {
                        GUI.explodeEnemy(enemiesArr[id].leftOffset + normalized,
                            Dom[id].getBoundingClientRect().top)
                        SFX.play(effects.explode)
                        enemy.remove(id)
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
        positionRefresh: () => {
            for (let id = 0; id < Dom.length; id++) {
                Dom[id].style.left = enemiesArr[id].leftOffset + normalized - enemiesArr[id].type.speed + 'px'
                if (enemiesArr[id].type.tricky) {
                    Dom[id].style.top = enemy.verticalDeviation(Dom[id].getBoundingClientRect().top - gamearea.top, id) + 'px'
                }
            }
        },
        controller: () => {
            for (let id in enemiesArr) {
                enemiesArr[id].leftOffset -= enemiesArr[id].type.speed
                position = enemiesArr[id].leftOffset + gamearea.right
                if (position + enemiesArr[id].type.length > gamearea.right - enemiesArr[id].type.speed &&
                    position + enemiesArr[id].type.length - enemiesArr[id].type.speed <=
                    gamearea.right - enemiesArr[id].type.speed) {
                    switch (enemiesArr[id].type.text) {
                        case true: {
                            GUI.showMenu(enemiesArr[id].type.message)
                        }
                        default: {
                            enemy.spawn(position, enemiesArr[id].topOffset, enemiesArr[id].type.class)
                        }
                    }
                } else if (position >= gamearea.left + _.gameareaBorder &&
                    position - enemiesArr[id].type.speed < gamearea.left + _.gameareaBorder) {
                    enemy.remove(id)
                }
            }
            enemy.positionRefresh()
        },
    }
})()
