const Discord = require('discord.js')
const keys = require('./keys.json')
const functions = require('./functions.js')
const client = new Discord.Client()

client.login(keys.discord_bot_token)
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    if (msg.content === 'ping') msg.reply('pong!')
    if (!msg.content.startsWith('!')) return
    let args = msg.content.substring(1).split(' ')
    console.log(functions.ascension(args[0], args[1], args[2]))
})
