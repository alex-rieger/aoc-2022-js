const fs = require('fs')
const lines = fs.readFileSync('./day08/input.txt', 'utf-8').split('\n')

const toTable = lines => {
    let table = {}
    lines.map((line, index) => table[index] = line.split('').map(l => Number(l)))
    return table
}

const takeUntil = (list, predicate) => {
    let result = []
    if (list.length < 1) return result
    for (let i = 0; i < list.length; i++) { 
        result.push(list[i])
        if (predicate(list[i], i) === true) {
            break
        }
        
    }
    return result
}

const colsToList = (table, colIdx) => {
    const result = []
    for (const key of Object.keys(table)) {
        result.push(table[key][colIdx])
    }
    return result
}

solveFirst()
function solveFirst() {
    const table = toTable(lines)
    let count = 0

    for (const [rowIndex, rowValues] of Object.entries(table)) {
        const rIdx = parseInt(rowIndex)
        for (const [cIdx, currentTree] of table[rIdx].entries()) {
            // reverse the list so i don't have to go backwards
            const leftTrees = table[rIdx].slice(0, cIdx).reverse()
            const rightTrees = table[rIdx].slice(cIdx + 1)
            const topTrees = colsToList(table, cIdx).slice(0, rIdx).reverse()
            const bottomTrees = colsToList(table, cIdx).slice(rIdx + 1)

            // tree has to be at the edge if any of the lists is empty
            if (leftTrees.length === 0 || rightTrees.length === 0 || topTrees.length === 0 || bottomTrees.length === 0) {
                count++
            } else {
                // check whether any higher tree is blocking the view
                const isHigherThanCurrent = t => t >= currentTree
                const hasHigherTreesToLeft = !leftTrees.some(isHigherThanCurrent)
                const hasHigherTreesToRight = !rightTrees.some(isHigherThanCurrent)
                const hasHigherTreesToTop = !topTrees.some(isHigherThanCurrent)
                const hasHigherTreesToBottom = !bottomTrees.some(isHigherThanCurrent)

                if (hasHigherTreesToLeft || hasHigherTreesToRight || hasHigherTreesToTop || hasHigherTreesToBottom) {
                    count++
                }
            }
        }
    }
    console.log(count)
}


solveSecond()
function solveSecond() {
    const table = toTable(lines)
    let max = 0

    for (const [rowIndex, rowValues] of Object.entries(table)) {
        const rIdx = parseInt(rowIndex)
        for (const [cIdx, currentTree] of table[rIdx].entries()) {
            // reverse the list so i don't have to go backwards
            const leftTrees = table[rIdx].slice(0, cIdx).reverse()
            const rightTrees = table[rIdx].slice(cIdx + 1)
            const topTrees = colsToList(table, cIdx).slice(0, rIdx).reverse()
            const bottomTrees = colsToList(table, cIdx).slice(rIdx + 1)

            const isHigherThanCurrent = t => t >= currentTree
            const leftDistance = takeUntil(leftTrees, isHigherThanCurrent).length
            const rightDistance = takeUntil(rightTrees, isHigherThanCurrent).length
            const topDistance = takeUntil(topTrees, isHigherThanCurrent).length
            const bottomDistance = takeUntil(bottomTrees, isHigherThanCurrent).length

            const newMax = leftDistance * rightDistance * topDistance * bottomDistance
            if (newMax > max) {
                max = newMax
            }
        }
    }
    console.log(max)
}
