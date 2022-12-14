const fs = require('fs')
const lines = fs.readFileSync('./day01/input.txt', 'utf-8').split('\n')

let buff = 0
const caloriesPerElf = lines.reduce((acc, calories) => {
    if (calories === '') {
        acc.push(buff)
        buff = 0
    } else {
        buff += new Number(calories)
    }
    return acc
}, [])

solveFirst()
function solveFirst() {    
    const highestCount = Math.max(...caloriesPerElf)
    console.log(`highest amount of calories: ${highestCount}`)
}

solveSecond()
function solveSecond() {
    const caloriesPerElfSorted = caloriesPerElf.sort((a,b) => a - b)
    const topThree = caloriesPerElfSorted.slice(-3)
    const sumCalories = topThree.reduce((a,v) => a + v, 0)
    console.log(`calories count of top three elves: ${sumCalories}`)
}
