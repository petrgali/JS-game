
import { game } from './modules/game.js'
import { path, resources } from './config/resources.js'
import { message, _, hotKey } from './config/data.js'
import { SFX } from './modules/sound.js'
import { GUI } from './modules/view.js'
import { stars } from './modules/stars.js'


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
gameController()
