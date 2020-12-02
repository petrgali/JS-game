
import { game } from './modules/game.js'
import { path, resources } from './config/resources.js'
import { message, _, hotKey } from './config/data.js'
import { SFX } from './modules/sound.js'
import { GUI } from './modules/view.js'
import { stars } from './modules/stars.js'
import { levelMap } from './config/level_set.js'


const preloadImage = (src) =>
    new Promise(resolve => {
        const image = new Image()
        image.onload = resolve
        image.src = src
    })


export const gameController = async () => {
    GUI.init()
    SFX.init()
    stars.setStars()
    GUI.showMenu(message.loading)
    await Promise.all(resources.map(filename => preloadImage(path.concat(filename))))
    GUI.showMenu(message.start)
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case hotKey.start:
                game.play()
                buildMap()
                break
            case hotKey.restart:
                game.lostWarning()
                break
            case hotKey.pause:
                game.pause()
                break
            case hotKey.yes:
                GUI.stepForward()
                break
            case hotKey.no:
                GUI.stepBackward()
        }
    })
}



const buildMap = () => {
    let terrain = document.querySelector('#terrain')
    for (let col = 1; col <= levelMap.cols; col++) {
        for (let row = 1; row <= levelMap.rows; row++) {
            if (levelMap.getTile(col, row) === 1) {
                terrain.innerHTML += `<img src='${levelMap.img}' id='obj'
                style='transform: translate(${(col) * levelMap.tile.size}px,${(row - 1) * levelMap.tile.size}px); position: absolute;'>`
            }
        }
    }
    let map = document.querySelectorAll('#obj')
    setInterval(() => {
        Object.values(map).forEach((obj) => {
            // console.log(obj.getBoundingClientRect().left)
            obj.style.transform = `translate(${obj.getBoundingClientRect().left - 540 - 1}px)`
        })
    }, 2000)


}
gameController()
