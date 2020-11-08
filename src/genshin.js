const aws = require('./aws.js')

let asc = { 
    a0: [1, 20], 
    a1: [20, 40], a2: [40, 50], a3: [50, 60], 
    a4: [60, 70], a5: [70, 80], a6: [80, 90]
}

async function ascension(character, current, target) {
    let text = ['']
    if (!(current >= 1 && current <= 90 || current in asc)) {
        current = 'a0'
    }

    character = characterName(character)
    let [current_asc, current_lvl] = currentSituation(current)
    let [target_asc, target_lvl] = targetSituation(target, current_asc)

    if (current_lvl < target_lvl) {
        text.push([
            character, 
            current_asc, 
            `(${current_lvl}/${asc[current_asc][1]})`
        ].join(' '))
        let res = await aws.awsScanBetween('genshin_exp', 'level', current_lvl, target_lvl - 1, 'exp')
        let req_exp = res.Items.map(i => i.exp).reduce((prev, next) => prev + next)
        text.push([
            `${current_lvl} -> ${target_lvl}`,
            `= ${req_exp.toLocaleString()} exp`,
            `= ${(req_exp/2e4).toFixed(2).toLocaleString()} purple books`,
            `+ ${(req_exp/5).toLocaleString()} mora`
        ].join(' '))
    }
    
    if (current_asc !== target_asc) {
        text.push([
            character,
            current_asc
        ].join(' '))
        text.push((await aws.awsGet('genshin_ascension', target_asc)))
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
        //handle string
        for (let i in asc) {
            if (i === target) {
                target_lvl = asc[i][0]
                target_asc = target
                break
            } else if (target >= asc[i][0]) {
                target_asc = i
                target_lvl = parseInt(target)
            } else if (target < asc[i][0]) break
        }
        //handle number
    }
    return [target_asc, target_lvl]
}

function characterName(char) {
    switch(char.toLowerCase()) {
        case 'amber': return 'Amber'
        case 'barbara': return 'Barbara'
        case 'beidou': return 'Beidou'
        case 'bennet': return 'Bennet'
        case 'pit':
        case 'childe': return 'Childe'
        case 'chongyun': return 'Chongyun'
        case 'darknighthero': case 'batman':
        case 'diluc': return 'Diluc'
        case 'diona': return 'Diona'
        case 'fish':
        case 'fischl': return 'Fischl'
        case 'dandeliontights': case 'dandelion':
        case 'jean': return 'Jean'
        case 'kaeyak': case 'kayak':
        case 'kaeya': return 'Kaeya'
        case 'keqing': return 'Keqing'
        case 'fireloli':
        case 'klee': return 'Klee'
        case 'lisa': return 'Lisa'
        case 'mona': return 'Mona'
        case 'ninguang':
        case 'ningguang': return 'Ningguang'
        case '2b':
        case 'noelle': return 'Noelle'
        case 'iceloli': case 'nana': case '77':
        case 'qiqi': return 'Qiqi'
        case 'razor': return 'Razor'
        case 'c12h22o11':
        case 'sucrose': return 'Sucrose'
        case 'lumine': case 'ying': case 'hotaru':
        case 'aether': case 'kong': case 'sora':
        case 'traveller':
        case 'traveler': return 'Traveler'
        case 'barbatos':
        case 'venti': return 'Venti'
        case 'xiangling': return 'Xiangling'
        case 'xiao': return 'Xiao'
        case 'xingqiu': return 'Xingqiu'
        case 'xinyan': return 'Xinyan'
        case 'geochad': case 'geodaddy':
        case 'zhongli': return 'Zhongli'
        default: return 'Character'
    }
}

module.exports = {
    ascension
}