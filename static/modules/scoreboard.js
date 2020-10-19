import { GUI } from './view.js'
import { board, hotKey } from '../config/data.js'
import { game } from './game.js'
export { scoreBoard }

const scoreBoard = (() => {
    let blocks
    let rows
    let pageNum = 0
    let skippedEnter
    return {
        currentPage: () => pageNum,
        createTable: () => {
            GUI.constructTable()
            rows = document.querySelectorAll('tr')
            blocks = document.querySelectorAll('td')
        },
        initDoubleClick: () => skippedEnter = 0,
        fillTable: (data) => {
            let idx = 0
            let filler = board.cols.concat(data)
            blocks.forEach(cell => {
                if (idx < filler.length) {
                    cell.innerText = filler[idx]
                    idx += 1
                }
            })
            scoreBoard.hideRecords()
            scoreBoard.initDoubleClick()
            GUI.refreshFooter()
            scoreBoard.showPage(pageNum)
        },
        rotatePage: (key) => {
            if (key === hotKey.shipLeft) pageNum--
            if (key === hotKey.shipRight) pageNum++
            if (key === hotKey.start) skippedEnter++
            if (skippedEnter >= 2) game.stop()
            if (pageNum >= scoreBoard.totalPages()) pageNum = scoreBoard.totalPages() - 1
            if (pageNum < 0) pageNum = 0
            scoreBoard.hidePrevious()
            scoreBoard.showPage(pageNum)
        },
        totalPages: () => {
            return Math.ceil((rows.length - 1) / board.visibleRows)
        },
        showPage: (page) => {
            for (let idx = page * board.visibleRows + 1;
                idx <= page * board.visibleRows + board.visibleRows; idx++) {
                if (idx < rows.length) rows[idx].classList.toggle('hidden')
            }
        },
        hideRecords: () => {
            Object.keys(rows)
                .forEach((_, index) => {
                    if (index !== 0) rows[index].classList.toggle('hidden')
                })
        },
        hidePrevious: () => {
            document.querySelectorAll('tr:not(.hidden)')
                .forEach((elem, index) => {
                    if (index !== 0) elem.classList.toggle('hidden')
                })
        }
    }
})()