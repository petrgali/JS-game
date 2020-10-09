import { GUI } from './view.js'
import { player } from './player.js'
export { scoreBoard }

const scoreBoard = (() => {
    let blocks
    let scoreArr = []
    return {
        testing: () => {

        },
        showTable: () => {
            // GUI.showMenu(board.title)
            GUI.constructTable()
            blocks = document.querySelectorAll('td')
            scoreBoard.fillTable()
        },
        fillTable: () => {
            blocks.forEach(cell => cell.innerText = 'hello')
        }
    }
})()