export { player }


const player = (() => {
    let stat = {}
    let startTime
    let endTime
    return {
        stat: () => stat,
        new: () => {
            stat.name = ''
        },
        setName: (char) => {
            stat.name += char
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