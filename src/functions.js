const aws = require('./aws.js')

let asc = { 
    a0: [1, 20], 
    a1: [20, 40], a2: [40, 50], a3: [50, 60], 
    a4: [60, 70], a5: [70, 80], a6: [80, 90]
}

function ascension(character = 'Character', current = 'a0', target = 'a6') {
    current = current.toLocaleLowerCase()
    if (!(current >= 1 && current <= 90 || current in asc)) {
        console.log("didn't get that, defaulting to a0")
        current = 'a0'
    }
    let ascension, level
    if (!isNaN(current)) {
        level = parseInt(current)
        for (let i in asc) if (level <= asc[i][1]) ascension = i
    } else {
        ascension = current
        level = asc[ascension][0]
    }
    console.log(character, ascension, `(${level}/${asc[ascension][1]})`)
    aws.awsGet('genshin_ascension', ascension, data => {
        console.log(data.Item)
    })
}

function main() {
    ascension('Fischl', process.argv[2].toLocaleLowerCase())
}
main()

