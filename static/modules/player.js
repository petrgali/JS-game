import { game } from './game.js'
export { player }


const player = (() => {
    let stat = {}
    let startTime
    let endTime
    return {
        stat: () => stat,
        name: () => stat.name,
        new: () => {
            stat.name = ''
            stat.destroyed = 0
            stat.shotsFired = 0
        },
        addPoint: () => stat.destroyed += 1,
        addShot: () => stat.shotsFired += 1,
        setName: (char) => {
            char.length === 1
                ? stat.name += char
                : player.trimName(char)
        },
        calcAccuracy: () => stat.accuracy = Math.ceil(stat.destroyed / stat.shotsFired * 100) || 0,
        trimName: (char) => {
            char === 'Backspace'
                ? stat.name = stat.name.slice(0, -1)
                : char === 'Enter'
                    ? game.timeout()
                    : char
        },
        setScore: (finalScore) => {
            stat.score = finalScore
        },
        stopwatchOn: () => {
            startTime = Date.now()
        },
        stopwatchOff: () => {
            endTime = Date.now()
        },
        setGameTime: () => {
            let diff = new Date(endTime - startTime)
            let minutes = diff.getMinutes()
            let seconds = diff.getSeconds()
            stat.time = `${minutes}:${seconds}`
        }
    }
})()