const fs = require('fs')
const aws = require('./aws.js')

const timer = ms => new Promise(res => setTimeout(res, ms))

async function main(filename, table) {
    fs.readFile(filename, async (err, data) => {
        let obj = []
        let arr = data.toString().split('\n')
        let head = arr[0].split(',')
        for (let i = 1; i < arr.length; i++) {
            let row = arr[i].split(',')
            let o = {}
            for (let j = 0; j < row.length; j++) {
                let val = row[j].trim()
                val = isNaN(val) ? val : parseInt(val)
                o[head[j].trim()] = val
            }
            obj.push(o)
        }
        for (let i of obj) {
            aws.awsPut(table, i)
            await timer(1000)
        }
    })
}
// main('exp.csv', 'genshin_exp')
async function something() {
    console.log(await aws.awsScanBetween('genshin_exp', 'level', 1, 20, 'exp'))
}
// something()
aws.awsScanBetween('genshin_exp', 'level', 80, 89, 'exp').then(res => {
    console.log(res.Items.map(i => i.exp).reduce((prev, next) => prev + next))
})