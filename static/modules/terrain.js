
import { levelMap } from '../config/level_set.js'
import { _ } from '../config/data.js'
import { GUI } from './view.js'
import { tiles, tilesPath } from '../config/resources.js'
export { level }



const level = (() => {
    let terrain
    let mapObj
    let mapArr = []
    return {
        init: () => {
            terrain = document.querySelector('#terrain')
            mapObj = document.getElementsByClassName('map')
        },
        removeAll: () => {
            while (mapObj.length > 0) mapObj[mapObj.length - 1].remove()
            while (mapArr.length > 0) mapArr.splice(mapArr.length - 1, 1)
        },
        tileRemove: (idx) => {
            mapObj[idx].remove()
            mapArr.splice(idx, 1)
        },
        initMap: () => {
            for (let col = 1; col <= levelMap.cols; col++) {
                for (let row = 1; row <= levelMap.rows; row++) {
                    if (levelMap.getTile(col, row) != 0) {
                        mapArr.push({
                            top: (row - 1) * levelMap.tile.size,
                            left: (col) * levelMap.tile.size + GUI.gamearea().right - GUI.gamearea().left,
                            type: levelMap.getTile(col, row)
                        })
                    }
                }
            }
        },
        tileSpawn: (type) => {
            terrain.innerHTML += `<img src='${tilesPath.concat(tiles[type - 1])}' class='map'
            style='transform: translate(0px,0px);'>`
        },
        positionCorrection: (idx) => {
            mapArr[idx].left -= _.terrainSpeed
        },
        positionRefresh: () => {
            Object.values(mapObj).forEach((elem, idx) => {
                elem.style.transform = `translate(${mapArr[idx].left}px, ${mapArr[idx].top}px)`
            })
        },
        controller: () => {
            for (let idx in mapArr) {
                level.positionCorrection(idx)
                if (mapArr[idx].left > GUI.gamearea().right - GUI.gamearea().left - _.gameareaBorder * 2
                    && mapArr[idx].left - _.terrainSpeed <= GUI.gamearea().right - GUI.gamearea().left - _.gameareaBorder * 2) {
                    level.tileSpawn(mapArr[idx].type)
                } else if (mapArr[idx].left >= -_.borderOffset
                    && mapArr[idx].left - _.terrainSpeed < -_.borderOffset) {
                    level.tileRemove(idx)
                }
            }
            level.positionRefresh()
        }
    }

})()