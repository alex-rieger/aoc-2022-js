const fs = require('fs')
const chars = fs.readFileSync('./day06/input.txt', 'utf-8').split('')

const newBuffer = markerSize => {
    const arr = new Array()
    arr.push = function() {
        if (this.length == markerSize) this.shift()
        return Array.prototype.push.apply(this, arguments)
    }
    return arr
}

const isCharsAllUnique = (chars, markerSize) => [...new Set(chars)].length === markerSize

solveFirst()
function solveFirst() {
    let buffer = newBuffer(4)
    let processedChars = 0
    for (const char of chars) {
        buffer.push(char)
        processedChars++
        if (isCharsAllUnique(buffer, 4)) {
            console.log(buffer.join(''));
            console.log(processedChars)
            break
        }
    }
}

solveSecond()
function solveSecond() {
    let buffer = newBuffer(14)
    let processedChars = 0
    for (const char of chars) {
        buffer.push(char)
        processedChars++
        if (isCharsAllUnique(buffer, 14)) {
            console.log(buffer.join(''));
            console.log(processedChars)
            break
        }
    }
}