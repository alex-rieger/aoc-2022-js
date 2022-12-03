const fs = require('fs')
const lines = fs.readFileSync('./day03/input.txt', 'utf-8').split('\n')

const splitIntoCompartments = items => {
    const half = items.length / 2
    const firstCompartment = items.substr(0, half)
    const secondCompartment = items.substr(half, items.length)
    return [firstCompartment, secondCompartment]
}

const toItemList = item => item.split('')

const findDuplicates = (a, b) => {
    const allDuplicates = a.filter((item, index) => b.indexOf(item) !== -1)
    return [...new Set(allDuplicates)]
}

const toPriority = item => {
    // check if letter is uppercase, subtract correct amount so `charCodeAt` can handle conversion to priority
    // "c".charCodeAt(0) - 96
    // "A".charCodeAt(0) - 38
    const numberToSubtract = item === item.toUpperCase() ? 38 : 96
    return item.charCodeAt(0) - numberToSubtract
}

solveFirst()
function solveFirst() {
    const sum = lines
        .map(line => {
            const [firstCompartment, secondCompartment] = splitIntoCompartments(line)
            return findDuplicates(toItemList(firstCompartment), toItemList(secondCompartment))
        })
        .flat() // flatten Array<Array>
        .map(item => toPriority(item))
        .reduce((a,b) => a +b)
    console.log(`sum of priorities ${sum}`)
}

solveSecond()
function solveSecond() {
    const chunked = []
    for (let i = 0; i <= lines.length - 1; i += 3) {
        const chunk = lines.slice(i, i + 3)
        chunked.push(chunk)
    }
    const sum = chunked
        .map(group => {
            const [first, second, third] = group
            return findDuplicates(
                findDuplicates(toItemList(first), toItemList(second)), 
                toItemList(third)) // all duplicates in chunk
        })
        .flat()
        .map(item => toPriority(item))
        .reduce((a,b) => a +b)
    console.log(`sum of priorities ${sum}`)
}