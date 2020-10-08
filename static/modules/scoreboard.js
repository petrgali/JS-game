import { GUI } from './view.js'
export { scoreBoard }

const scoreBoard = (() => {
    let blocks
    return {
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