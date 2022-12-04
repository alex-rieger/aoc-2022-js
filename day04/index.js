const fs = require('fs')
const lines = fs.readFileSync('./day04/input.txt', 'utf-8').split('\n')

const toRange = range => {
    const [start, end] = range.split('-')
    return {
        start: Number(start),
        end: Number(end),
    }
}

const isFullyContained = (a, b) => {
    return (a.start >= b.start && a.end <= b.end) || (b.start >= a.start && b.end <= a.end)
}

const isOverlapping = (a, b) => {
    const between = (a, boundary) => a.start <= boundary && a.end >= boundary
    return between(a, b.start) || 
           between(a, b.end) ||
           between(b, a.start) ||
           between(b, a.end) 
}

solveFirst()
function solveFirst() {
    let result = 0
    lines.map(line => {
        const [first, second] = line.split(',')
        if (isFullyContained(toRange(first), toRange(second))) {
            result++
        }
    })
    console.log(`number of pairs with fully contained assignments ${result}`) // 498
}

solveSecond()
function solveSecond() {
    let result = 0
    lines.map(line => {
        const [first, second] = line.split(',')
        if (isOverlapping(toRange(first), toRange(second))) {
            result++
        }
    })
    console.log(`number of pairs with assignments that overlap ${result}`) // 859
}