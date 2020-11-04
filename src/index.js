const Discord = require('discord.js')
const keys = require('./keys.json')
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    if (msg.content === 'ping') msg.reply('pong!')
    if (msg.content === 'kill') client.destroy()
    if (msg.content === 'reset') client.destroy().then(() => client.login(keys.discord_bot_token))
})

client.login(keys.discord_bot_token)