const Bot = require('./Bot')
const Message = require('./Message')
const zlib = require('zlib')
const { EventEmitter } = require('events')
const WebSocket = require('ws')
const fetch = require('node-fetch')
const User = require('./User')
const Guild = require('./Guild')
/**
 * @class
 * The websocket/gateway manager for a Discord bot.
 */
class WebSocketManager {
   
    /**
     * Create a WebSocketManager.
     * @param {Bot} bot The client
     */
    constructor(bot) {
        /**
         * The websocket's heartbeat interval.
         * @memberof WebSocketManager
         * @type {Number}
         */
        this.heartbeat = null
        /**
         * The websocket's connection.
         * @memberof WebSocketManager
         * @type {WebSocket}
         */
        this.connection = null
        /**
         * The bot that instansiated this.
         * @memberof WebSocketManager
         * @type {Bot}
         */
        this.bot = bot

    }
    /**
     * Connects to the Discord API as a bot.
     * @param {String} token The bot's token
     */
    connectAsBot(token) {
        return new Promise(async(resolve) => {
            const ProgressBar = require('progress')
            const bar = new ProgressBar('connecting [:bar]', {
                total: 16
            })
            let gatewayData = await fetch('http://discordapp.com/api/gateway/bot', {
                headers: {
                    authorization: `Bot ${token}`
                }
            }).then(res => res.json())
            if(!gatewayData.url) throw new Error('Invalid bot token!')
            bar.tick(4)
            if(this.bot.verboseMode) bar.interrupt('Connecting to the gateway...')
            let discordApi = new WebSocket(gatewayData.url)
            this.connection = discordApi
            if(this.bot.verboseMode) bar.interrupt('Connected!')
            bar.tick(4)
            discordApi.on('message', (msg) => {
                if(msg instanceof Buffer) return;
                const JSONmsg = JSON.parse(msg)
                
                if(JSONmsg.op === 10) {
                    this.heartbeat = JSONmsg.d.heartbeat_interval
                    if(this.bot.verboseMode) bar.interrupt(`Hello World recieved with interval ${this.heartbeat}`)
                    bar.tick(4)
                    if(this.bot.verboseMode) bar.interrupt('Going online...')
                    const identityInfo = {
                        op: 2,
                        d: {
                            token: token,
                            properties: {
                                $os: "linux",
                                $browser: "v8",
                                $device: "pc"
                            },
                            compress: false,
                            large_threshold: 250,
                            guild_subscriptions: false,
                            presence: {
                                status: "online",
                                since: Date.now(),
                                afk: false
                            }
                        }
                    }
                    discordApi.send(JSON.stringify(identityInfo))
                    setInterval(() => {
                        const heartbeatObj = {
                            op: 1,
                            d: 0
                        }
                        heartbeatObj.d += 1
                        discordApi.send(JSON.stringify(heartbeatObj))
                        if(this.bot.verboseMode) console.log('Heartbeated')
                    }, this.heartbeat)
                    
                }
                switch(JSONmsg.t) {
                    case 'READY':
                        bar.tick(4)
                        bar.terminate()
                        if(this.bot.verboseMode) { 
                            console.log('Ready!')
                        }
                        this.bot.emit('ready')
                        break;
                    case 'GUILD_CREATE':
                        var guild = JSONmsg.d
                        this.bot.emit('debug', `Guild now availiable: ${guild.name}`)
                        this.bot.guilds.set(guild.id, new Guild(this.bot, {
                            id: guild.id,
                            name: guild.name,
                            icon: guild.icon,
                            owner: guild.owner_id,
                            mfaLevel: guild.mfa_level
                        }))
                        break;
                    case 'MESSAGE_CREATE':
                        var message = JSONmsg.d
                        this.bot._handleMessage(new Message(this.bot, {
                            id: message.id,
                            content: message.content,
                            tts: message.tts,
                            containsEveryonePing: message.mention_everyone,
                            pinned: message.pinned,
                            type: message.type,
                            channelId: message.channel_id,
                            author: new User(this.bot, {
                                id: message.author.id,
                                avatar: message.author.avatar,
                                username: message.author.username,
                                discriminator: message.author.discriminator,
                                isBot: message.author.bot
                            }),
                            guild: this.bot.guilds.get(message.guild_id),
                            rawData: message
                        }))

                }
            })
            resolve()
        })

    }
}
module.exports = WebSocketManager