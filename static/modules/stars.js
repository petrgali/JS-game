import { _ } from '../config/data.js'
export { stars }

const stars = (() => {
    return {
        setStars: () => {
            let space = document.getElementById('stars')
            for (let idx = 0; idx < _.starsCount; idx++) {
                let x = stars.getRandom(5, _.gameareaWidth)
                let y = stars.getRandom(5, _.gameareaHeight)
                space.innerHTML += `<div class="red" id="star" style="top: ${y}px; left: ${x}px;"></div>`
            }
            stars.setBlink()

        },
        setBlink: () => {
            let stars = document.querySelectorAll('#star')

            setInterval(() => {
                for (let idx = 0; idx < _.starsCount - Math.floor(_.starsCount / 2); idx++) {
                    stars[idx].classList.toggle('white')
                }
                for (let idx = Math.floor(_.starsCount / 2); idx < _.starsCount; idx++) {
                    stars[idx].classList.toggle('hidden')
                }
            }, 1000)
        },
        getRandom: (min, max) => {
            return Math.floor(Math.random() * (max - min) + min)
        }
    }
})() 