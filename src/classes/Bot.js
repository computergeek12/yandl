const { EventEmitter } = require('events')
const User = require('./User')
const { Collection } = require('discord.js')
const WebSocketManager = require('./WebSocketManager')
const fetch = require('node-fetch')
const Command = require('./Command')
const { get } = require('http')
/**
 * @class
 * The main Discord API hub.
 * @extends EventEmitter
 */
class Bot extends EventEmitter {
    /**
     * Create a bot instance
     * @constructor
     * @param {String} token The bot's token
     * @param {String} prefix The bot's prefix
     */
    constructor(token, prefix) {
        super()

        /**
         * The bot's token.
         * @type {String}
         * @memberof Bot
         */
        this.token = token
        /**
         * The bot's prefix.
         * @type {String}
         * @memberof Bot
         */
        this.prefix = prefix
        /**
         * The bot's commands.
         * @type {Collection}
         * @memberof Bot
         */
        this.commands = new Collection()
        /**
         * The bot's WebSocketManager.
         * @type {WebSocketManager}
         * @memberof Bot
         */
        this.ws = new WebSocketManager(this)
        /**
         * The bot's guild cache.
         * @type {Collection}
         * @memberof Bot
         */
        this.guilds = new Collection()
        /**
         * The bot's Discord user (must be initialized with initUser())
         * @type {User?}
         * @memberof Bot
         */
        this.user = undefined
        /**
         * Is the bot running in Verbose?
         * @type {Boolean}
         * @memberof Bot
         */
        this.verboseMode = false
        var helpCmd = new Command(this, {
            name: 'help',
            description: 'Get help with a command',
            usage: '[cmd]',
            run: (bot, msg, args) => {
                if(args[0]) {
                    const cmd = bot.commands.get(args[0].toLowerCase())
                    var info = `No information for command ${args[0].toLowerCase()}`
                    if(!cmd) return msg.send(info)
                    info = `**Name:** \`${cmd.name}\`\n`
                    if(cmd.description) info += `**Description**: ${cmd.description}\n`
                    if(cmd.usage) info += `**Usage (<> = required, [] = optional)**: \`${this.prefix}${cmd.name} ${cmd.usage}\`\n`
                    info += `\n*Bot made with YANDL*`
                    msg.send(info)
                } else {
                    const getCmds = () => {
                        return bot.commands.map(cmd => `- \`${cmd.name}\``).join(' ')
                    }
                    msg.send(`**Commands:**\n${getCmds()}\n\n*Bot made with YANDL*`)
                }
            }
        })
        helpCmd.activate()
    }
    /**
     * Connects to Discord.
     * @memberof Bot
     */
    async connect() {
        this.ws.connectAsBot(this.token)
    }
    /**
     * Initializes the user property.
     * @memberof Bot
     */
    async initUser() {
        var userData = await fetch('http://discordapp.com/api/users/@me', {
            headers: {
                authorization: `Bot ${this.token}`
            }
        }).then(res => res.json())
        this.user = new User(this, {
            id: userData.id,
            avatar: userData.avatar,
            username: userData.username,
            discriminator: userData.discriminator,
            isBot: userData.bot
        })
    }
    async _handleMessage(msg) {
        if(msg.rawData.author.bot) return;
        if(this.verboseMode) console.log('Message sent')
        this.emit('message', msg)
        if(!msg.content.startsWith(this.prefix)) return;
        var args = msg.content.slice(this.prefix.length).split(' ')
        var cmd = args.shift().toLowerCase()
        var commandObj = this.commands.get(cmd)
        if(this.verboseMode) console.log('Command sent')
        if(commandObj) commandObj.run(this, msg, args)
    }

}
module.exports = Bot