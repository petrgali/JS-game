
import { path, sprites, maps, _ } from './data.js'

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

const drawTerrain = () => {
    document.getElementById('terrain').innerHTML += `<img src=${path}${maps[0]}>`
    document.getElementById('terrain').classList.add('container')
}
const drawShip = () => document.getElementById('mothership').innerHTML += `<img src=${path}${sprites[0]} class='ship'>`

const drawBullet = (x, y) => document.getElementById('burstfire').innerHTML += `<div class='bullet' style='top:${y}px; left:${x}px'></div>`

drawTerrain()
drawShip()

let terrain = document.getElementById('terrain')
let ship = document.getElementsByClassName('ship')[0]

//////////////////
/// CONTROLLER ///
let shipControlState = {}
let bullets = []

document.addEventListener('keydown', (event) => {
    shipControlState[event.key] = true
})
document.addEventListener('keyup', (event) => {
    shipControlState[event.key] = false
})

let intervalID = setInterval(() => {
    if (shipControlState[' ']) {
        bullets.push({ left: _.x + 10, top: _.y })
        drawBullet(_.x + 60, _.y + 10)
    }
}, 50)

// const gunFire = () => {
//     for (let bullet of bullets) {
//         bullet
//     }
// }

///////////////////
///////////////////


const shipMove = () => {
    if (shipControlState['ArrowUp']) _.y -= _.shipSpeedY
    if (shipControlState['ArrowDown']) _.y += _.shipSpeedY
    if (shipControlState['ArrowLeft']) _.x -= _.shipSpeedX
    if (shipControlState['ArrowRight']) _.x += _.shipSpeedX

    ship.style.top = _.y + 'px'
    ship.style.left = _.x + 'px'
}
const terrainMove = () => terrain.scrollLeft += _.speedX



/// VIEW ////

export const render = () => {
    terrainMove()
    shipMove()
    if (!_.brake) {
        window.requestAnimationFrame(render)
    }
}
window.requestAnimationFrame(render)

///////////////////
///////////////////





