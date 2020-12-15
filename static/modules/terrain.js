
import { levelMap } from '../config/level_set.js'
import { _ } from '../config/data.js'
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
                            left: (col) * levelMap.tile.size + _.gameareaWidth,
                            type: levelMap.getTile(col, row)
                        })
                        terrain.innerHTML += `<img src='${tilesPath.concat(tiles[levelMap.getTile(col, row) - 1])}' class='map hidden'
            style='transform: translate(0px,0px);'>`
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
        positionRefresh: (idx) => {
            mapObj[idx].style.transform = `translate(${mapArr[idx].left}px, ${mapArr[idx].top}px)`
        },
        collision: (axisX, offsetX, axisY, offsetY) => {
            for (let idx in mapArr) {
                if (mapObj[idx].classList.contains('hidden')) return
                if (axisX + offsetX * 0.2 >= mapArr[idx].left &&
                    axisX - offsetX * 0.3 <= mapArr[idx].left &&
                    axisY + offsetY * 0.2 >= mapArr[idx].top &&
                    axisY - offsetY * 0.3 <= mapArr[idx].top) {
                    return true
                }
            }
            return false
        },
        controller: () => {
            for (let idx in mapArr) {
                level.positionCorrection(idx)
                if (mapArr[idx].left > _.gameareaWidth - _.gameareaBorder * 2
                    && mapArr[idx].left - _.terrainSpeed <= _.gameareaWidth - _.gameareaBorder * 2) {
                    mapObj[idx].classList.toggle('hidden')
                } else if (mapArr[idx].left >= -_.borderOffset
                    && mapArr[idx].left - _.terrainSpeed < -_.borderOffset) {
                    level.tileRemove(idx)
                }
                if (mapObj[idx] != undefined && !mapObj[0].classList.contains('hidden')) level.positionRefresh(idx)
            }
        }
    }

})()