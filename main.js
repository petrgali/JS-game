
import { path, sprites, maps, _ } from './data.js'


const drawTerrain = () => {
    document.getElementById('terrain').innerHTML += `<img src=${path}${maps[0]}>`
    document.getElementById('terrain').classList.add('container')
}
const drawShip = () => document.getElementById('mothership').innerHTML += `<img src=${path}${sprites[0]} class='ship'>`

const drawBullet = (axisX, axisY) => document.getElementById('burstfire').innerHTML += `<div class='bullet' 
style='top:${axisY}px; left:${axisX}px'></div>`;

drawTerrain()
drawShip()

let terrain = document.getElementById('terrain')
let ship = document.getElementsByClassName('ship')[0]

//////////////////
/// CONTROLLER ///
let burst = document.getElementsByClassName('bullet')
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
        bullets.push({ left: _.x + 60, compare: _.x + 60 })
        drawBullet(_.x + 60, _.y + 10)
    }
}, 50)

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
const burstFire = () => {
    for (let idx = 0; idx < bullets.length; idx++) {
        if ((bullets[idx].left - bullets[idx].compare) >= _.firingRange) {
            bullets.splice(idx, 1)
            burst[idx].remove()
        } else {
            bullets[idx].left += _.firingSpeed
            burst[idx].style.left = bullets[idx].left + 'px'
        }
    }
}
const terrainMove = () => terrain.scrollLeft += _.speedX



/// VIEW ////

export const render = () => {
    terrainMove()
    shipMove()
    burstFire()
    if (!_.brake) {
        window.requestAnimationFrame(render)
    }
}
window.requestAnimationFrame(render)

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


///////////////////
///////////////////





