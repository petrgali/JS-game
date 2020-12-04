
import { levelMap } from '../config/level_set.js'
export { level }



const level = (() => {
    let terrain
    let mapObj
    let mapArr = []
    return {
        init: () => terrain = document.querySelector('#terrain'),
        removeAll: () => {
            while (mapObj.length > 0) mapObj[mapObj.length - 1].remove()
            while (mapArr.length > 0) mapArr.splice(mapArr.length - 1, 1)
        },
        buildMap: () => {
            for (let col = 1; col <= levelMap.cols; col++) {
                for (let row = 1; row <= levelMap.rows; row++) {
                    if (levelMap.getTile(col, row) === 1) {
                        mapArr.push({ left: (col) * levelMap.tile.size, top: (row - 1) * levelMap.tile.size })
                        terrain.innerHTML += `<img src='${levelMap.img}' class='map'
                        style='transform: translate(0px,0px);'>`
                    }
                }
            }
            mapObj = document.getElementsByClassName('map')
        },
        positionCorrection: (idx) => {
            ////custom speed setting - should be replaced
            mapArr[idx].left -= 0.5
        },
        positionRefresh: (obj, idx) => {
            obj.style.transform = `translate(${mapArr[idx].left}px, ${mapArr[idx].top}px)`
        },
        controller: () => {
            Object.values(mapObj).forEach((obj, idx) => {
                level.positionRefresh(obj, idx)
                level.positionCorrection(idx)
            })
        }
    }

})()