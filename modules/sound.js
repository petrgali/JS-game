
import { sounds } from '../config/resources.js'

export const SFX = (() => {
    let sound = null
    let context
    let buffer
    return {
        init: () => {
            context = new (window.AudioContext || window.webkitAudioContext)
            buffer = new Buffer(context, sounds)
            buffer.loadAll()
        },
        play: (idx) => {
            sound = new Sound(context, buffer.getSoundByIndex(idx))
            sound.play()
        }
    }
})()


class Sound {
    constructor(context, buffer) {
        this.context = context
        this.buffer = buffer
    }
    init() {
        this.source = this.context.createBufferSource()
        this.source.buffer = this.buffer
        this.source.connect(this.context.destination)
    }
    play() {
        this.init()
        this.source.start(this.context.currentTime)
    }
}
class Buffer {
    constructor(context, urls) {
        this.context = context
        this.urls = urls
        this.buffer = []
    }
    loadSound(url, index) {
        let request = new XMLHttpRequest()
        request.open('get', url, true)
        request.responseType = 'arraybuffer'
        let thisBuffer = this
        request.onload = function () {
            thisBuffer.context.decodeAudioData(request.response, function (buffer) {
                thisBuffer.buffer[index] = buffer
            })
        }
        request.send()
    }
    loadAll() {
        this.urls.forEach((url, index) => {
            this.loadSound(url, index)
        })
    }
    getSoundByIndex(index) {
        return this.buffer[index]
    }
}
