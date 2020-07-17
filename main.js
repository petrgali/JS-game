
import { path, sprites, maps, _ } from './data.js'


const drawTerrain = () => {
    document.getElementById('terrain').innerHTML += `<img src=${path}${maps[0]}>`
    document.getElementById('terrain').classList.add('container')
}
const drawShip = () => document.getElementById('mothership').innerHTML += `<img src=${path}${sprites[0]} id='ship'>`

const drawBullet = (axisX, axisY) => document.getElementById('burstfire').innerHTML += `<div class='bullet' 
style='top:${axisY}px; left:${axisX}px'></div>`;


drawTerrain()
drawShip()


let terrain = document.getElementById('terrain')
let ship = document.getElementById('ship')

//////////////////
/// CONTROLLER ///
let bulletsDom = document.getElementsByClassName('bullet')
let shipControlState = {}
let bulletsArr = []

document.addEventListener('keydown', (event) => {
    shipControlState[event.key] = true
})
document.addEventListener('keyup', (event) => {
    shipControlState[event.key] = false
})



setInterval(() => {
    if (shipControlState[' '] && bulletsArr.length <= _.burstSize) {
        bulletsArr.push({ left: _.x + _.bulletXoffset, compare: _.x + _.bulletXoffset })
        drawBullet(_.x + _.bulletXoffset, _.y + _.bulletYoffet)
    }
}, 70)

setInterval(() => {
    let num = parseInt(ship.src.slice(-5, -4))
    if (num === 4) return ship.src = `${path}${sprites[num - 4]}`
    ship.src = `${path}${sprites[num]}`
}, 300);
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
    for (let idx = 0; idx < bulletsArr.length; idx++) {
        if ((bulletsArr[idx].left - bulletsArr[idx].compare) >= _.firingRange) {
            removeBullet(idx)
        } else {
            animateBullet(idx)
        }
    }
}
const animateBullet = (id) => {
    bulletsArr[id].left += _.firingRate
    bulletsDom[id].style.left = bulletsArr[id].left + 'px'
    bulletsDom[id].style.opacity = 1 + (bulletsArr[id].compare - bulletsArr[id].left) / _.fadingRate
}
const removeBullet = (id) => {
    bulletsArr.splice(id, 1)
    bulletsDom[id].remove()
}

const terrainMove = () => terrain.scrollLeft += _.speedX



/// VIEW ////


export const render = () => {
    // terrainMove()
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





