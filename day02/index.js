const fs = require('fs')
const lines = fs.readFileSync('./day02/input.txt', 'utf-8').split('\n')

const shapes = [
    { name: 'rock', beats: 'scissors', points: 1 },
    { name: 'paper', beats: 'rock', points: 2 },
    { name: 'scissors', beats: 'paper', points: 3 },
]

shapes.fromCode = code => {
    if (['A','X'].indexOf(code) !== -1) return shapes[0] // rock
    if (['B','Y'].indexOf(code) !== -1) return shapes[1] // paper
    if (['C','Z'].indexOf(code) !== -1) return shapes[2] // scissors
}

const computePlayerScore = (oShape, pShape) => {
    if (oShape.name === pShape.name) return 3 // draw
    if (oShape.beats === pShape.name) return 0 // player loss
    if (pShape.beats === oShape.name) return 6 // player win
}

solveFirst()
function solveFirst() {
    let score = 0
    lines
        .map(line => line.split(' '))
        .forEach(([oCode, pCode]) => {
            const oShape = shapes.fromCode(oCode)
            const pShape = shapes.fromCode(pCode)
            score += computePlayerScore(oShape, pShape)
            score += pShape.points
        })
    console.log(`player score = ${score}`)
}

solveSecond()
function solveSecond() {
    let score = 0
    lines
        .map(line => line.split(' '))
        .forEach(([oCode, pCode]) => {
            const oShape = shapes.fromCode(oCode)
            if (pCode == 'X') { // choose losing shape
                pShape = shapes.find(s => oShape.beats === s.name)
            } else if (pCode == 'Y') { // choose same shape
                pShape = oShape
            } else if (pCode == 'Z') { // choose winning shape
                pShape = shapes.find(s => s.beats === oShape.name)
            }
            score += computePlayerScore(oShape, pShape)
            score += pShape.points
        })
    console.log(`player score with new strategy = ${score}`)
}