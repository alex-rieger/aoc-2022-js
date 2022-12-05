const fs = require('fs')
const lines = fs.readFileSync('./day05/input.txt', 'utf-8').split('\n')

const parseTableRow = line => {
    let charCounter = 0
    let result = []
    let buffer = []
    for (let i = 0; i <= line.length - 1; i++) {
        const char = line[i]
        if (charCounter <= 2) {
            buffer.push(char)
        }
        charCounter++
        if (charCounter === 3) {
            result.push(buffer.join(''))
            buffer = []
        }
        if (charCounter === 4) {
            charCounter = 0
        }
    }
    return result
}

const parseOperation = operation => operation.match(/\d+/gi)

const newStacks = () => {
    const stacks = {}
    lines
        .slice(0, 8) // initial stack state
        .map(line => line.split(''))
        .map(parseTableRow)
        .forEach(row => {
            row.forEach((crate, idx) => {
                const i = idx + 1
                if (!stacks[i]) stacks[i] = []
                if (crate !== '   ') stacks[i].push(crate)
            })
        })

    for (const [idx, _] of Object.entries(stacks)) {
        stacks[idx] = stacks[idx].reverse()
    }

    return stacks
}

solveFirst()
function solveFirst() {
    const stacks = newStacks()
    lines.slice(10)
        .map(parseOperation)
        .forEach(([amount, from, to]) => {
            for (let i = 1; i <= amount; i++) {
                const item = stacks[from].pop()
                stacks[to].push(item)
            }
        })
    
    let result = ''
    for (const [_, values] of Object.entries(stacks)) {
        result += values[values.length - 1]
    }
    console.log(result.replace(/\[/gi, '').replace(/\]/gi, ''))
}

solveSecond()
function solveSecond() {
    const stacks = newStacks()
    lines.slice(10)
        .map(parseOperation)
        .forEach(([amount, from, to]) => {
            let buffer = []
            for (let i = 1; i <= amount; i++) {
                buffer.push(stacks[from].pop())
            }
            stacks[to] = [...stacks[to], ...buffer.reverse()]
        })
    
    let result = ''
    for (const [_, values] of Object.entries(stacks)) {
        result += values[values.length - 1]
    }
    console.log(result.replace(/\[/gi, '').replace(/\]/gi, ''))
}
  