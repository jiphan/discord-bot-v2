const fs = require('fs')
const aws = require('./aws.js')
const genshin = require('./genshin.js')

const timer = ms => new Promise(res => setTimeout(res, ms))

// uploadFile('exp.csv', 'genshin_exp')
async function uploadFile(filename, table) {
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
            await timer(2000)
        }
    })
}

// genshin.ascension('Fischl', 1, 'a6').then(res => {
//     console.log(res)
// })


//https://stackoverflow.com/a/57477448 wtf
const arr = [ 
    { 'name': 'P1', 'value': 150, 'type': 'something'}, 
    { 'name': 'P1', 'value': 150, 'type': 'asd'}, 
    { 'name': 'P2', 'value': 200, 'type': 'asd'}, 
    { 'name': 'P3', 'value': 450, 'type': 'sdf'} 
];

const res = Array.from(arr.reduce((acc, {value, ...r}) => {
    const key = JSON.stringify(r);
    const current = acc.get(key) || {...r, value: 0};  
    return acc.set(key, {...current, value: current.value + value});
  }, new Map).values());
  console.log(res);