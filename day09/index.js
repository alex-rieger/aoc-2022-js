const fs = require('fs')
const lines = fs.readFileSync('./day09/input.txt', 'utf-8').split('\n')

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    move({ x, y }) {
        this.x += x
        this.y += y
    }
    toString() {
        return `${this.x},${this.y}`
    }
}

const directions = {
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
    U: { x: 0, y: 1 },
    D: { x: 0, y: -1 },
}

const chebyshevDistance = (point, otherPoint) => {
    const maxX = Math.abs(point.x - otherPoint.x)
    const maxY = Math.abs(point.y - otherPoint.y)

    if (maxY > maxX) {
        return maxY
    }
    return maxX
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

// ghetto kotlin zipWithNext implementation
const zipWithNext = list => {
    let result = []
    for (let i = 0; i < list.length; i++) {
        if (!!list[i + 1]) result.push([list[i], list[i + 1]])
    }
    return result
}

const catchupTail = (head, tail) => {
    if (chebyshevDistance(head, tail) > 1) {
        const dx = head.x - tail.x
        const dy = head.y - tail.y
        return { x: clamp(dx, -1, 1), y: clamp(dy, -1, 1) }
    }
    return { x: 0, y: 0 }
}

// solveFirst()
function solveFirst() {
    const head = new Point(0, 0)
    const tail = new Point(0, 0)
    let tailVisited = new Set()
    
    lines.forEach(line => {
        const split = line.split(' ')
        const direction = directions[split[0]]
        const n = Number(split[1])

        for (let i = 0; i < n; i++) {
            head.move(direction)
            tail.move(catchupTail(head, tail))
            tailVisited.add(tail.toString())
        }
    })
    console.log(tailVisited.size)
}

solveSecond()
function solveSecond() {
    let knots = []
    for (let i = 0; i < 10; i++) knots.push(new Point(0, 0))
    let tailVisited = new Set()
    tailVisited.add(knots[knots.length -1].toString())

    lines.forEach(line => {
        const split = line.split(' ')
        const direction = directions[split[0]]
        const n = Number(split[1])

        for (let i = 0; i < n; i++) {
            knots[0].move(direction)
            zipWithNext(knots.map((_,i) => i)).forEach(([headIndex, tailIndex]) => {
                knots[tailIndex].move(catchupTail(knots[headIndex], knots[tailIndex]))
            })
            tailVisited.add(knots[knots.length - 1].toString())
        }
    })
    console.log(tailVisited.size)
}