import { game } from './game.js'
import { _, hotKey } from '../config/data.js'
export { player }


const player = (() => {
    let stat = {}
    let startTime
    let endTime
    let statAPI
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
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
            char.length === 1 && stat.name.length < _.maxNameSize
                ? stat.name += char
                : player.trimName(char)
        },
        trimName: (char) => {
            char === hotKey.backspace
                ? stat.name = stat.name.slice(0, -1)
                : char === hotKey.start && stat.name.length > 0
                    ? game.scoreMode()
                    : char
        },
        calcAccuracy: () => stat.accuracy = Math.ceil(stat.destroyed / stat.shotsFired * 100)
            || 0,
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
            stat.minutes = minutes
            stat.seconds = seconds
        },
        sendJSONstat: async () => {
            options.body = JSON.stringify(player.stat())
            await fetch(_.serverURL, options)
        },
        readJSONstat: async () => {
            statAPI = await (await fetch(_.apiURL)).json()
        },
        JSONexchange: () => {
            player.sendJSONstat()
            player.readJSONstat()
        }
    }
})()

