const Discord = require('discord.js')
const keys = require('./keys.json')
const client = new Discord.Client()

client.login(keys.discord_bot_token)
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    if (msg.content === 'ping') msg.reply('pong!')
    if (!msg.content.startsWith('!')) return
    let args = msg.content.substring(1).split(' ')
    msg.reply('a', 'b', 'c')
})
