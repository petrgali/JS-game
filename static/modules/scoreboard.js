import { GUI } from './view.js'
import { board } from '../config/data.js'
export { scoreBoard }

const scoreBoard = (() => {
    let blocks
    return {
        showTable: () => {
            GUI.constructTable()
            blocks = document.querySelectorAll('td')
        },
        fillTable: (data) => {
            let idx = 0
            let filler = board.legend.concat(data)
            blocks.forEach(cell => {
                if (idx < filler.length) {
                    cell.innerText = filler[idx]
                    idx += 1
                }
            })
        }
    }
})()