const aws = require('./aws.js')

let asc = { 
    a0: [1, 20], 
    a1: [20, 40], a2: [40, 50], a3: [50, 60], 
    a4: [60, 70], a5: [70, 80], a6: [80, 90]
}

async function main() {
    console.log(await ascension(process.argv[2], process.argv[3], process.argv[4]))
}

async function ascension(character = 'Character', current, target) {
    let text = []
    if (!(current >= 1 && current <= 90 || current in asc) || !current) {
        text.push("didn't get that, defaulting current to a0")
        current = 'a0'
    }

    let [current_asc, current_lvl] = currentSituation(current.toLocaleLowerCase())
    let [target_asc, target_lvl] = targetSituation(target, current_asc)
    let req_exp = 1195925

    if (current_lvl !== target_lvl) {
        text.push([
            character, 
            current_asc, 
            `(${current_lvl}/${asc[current_asc][1]})`
        ].join(' '))
        text.push([
            `${current_lvl} -> ${target_lvl}`,
            `= ${req_exp.toLocaleString()} exp`,
            `= ${(req_exp/2e4).toFixed(2).toLocaleString()} purple books`,
            `+ ${(req_exp/5).toLocaleString()} mora`,
            `to hit level cap`
        ].join(' '))
    }
    
    if (current_asc !== target_asc) {
        // let something = await aws.awsGet('genshin_ascension', target_asc)
        // text.push(something.Item.mora)
    }
    return text.join('\n')
}

function currentSituation(current) {
    let current_asc, current_lvl
    if (!isNaN(current)) {
        current_lvl = parseInt(current)
        for (let i in asc) {
            if (current_lvl <= asc[i][1]) {
                current_asc = i
                break
            }
        }
    } else {
        current_asc = current
        current_lvl = asc[current_asc][0]
    }
    return [current_asc, current_lvl]
}

function targetSituation(target, current_asc) {
    let target_asc, target_lvl
    if (!target) {
        let i = parseInt(current_asc.substr(1))
        i < 6 ? i++ : i
        target_asc = 'a' + i
        target_lvl = asc[current_asc][1]
    } else {
        for (let i in asc) {
            //
        }
    }
    return [target_asc, target_lvl]
}
module.exports = {
    ascension
}