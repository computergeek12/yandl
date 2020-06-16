const fetch = require('node-fetch')
const Bot = require('./Bot')
const User = require('./User')
const Guild = require('./Guild')

/**
 * @class
 * A Discord message.
 */
class Message {
    /**
     * Create a message object
     * @param {Bot} bot The bot that is instansiating this.
     * @param {Object} data The data.
     */
    constructor(bot, data) {
        /**
         * The bot that instansiated this.
         * @memberof Message
         * @type {Bot}
         */
        this.bot = bot
        /**
         * The ID of the message.
         * @memberof Message
         * @type {Snowflake}
         */
        this.id = data.id
        /**
         * The message's content.
         * @memberof Message
         * @type {String}
         */
        this.content = data.content
        /**
         * Is the message a TTS message?
         * @memberof Message
         * @type {Boolean}
         */
        this.tts = data.tts
        /**
         * Has the message pinged everyone? REEEEEEEEEEEEE
         * @memberof Message
         * @type {Boolean}
         */
        this.containsEveryonePing = data.containsEveryonePing
        /**
         * Is the message pinned?
         * @memberof Message
         * @type {Boolean}
         */
        this.pinned = data.pinned
        /**
         * The message's type.
         * @memberof Message
         * @type {Number}
         */
        this.type = data.type
        /**
         * The channel ID of the message.
         * @memberof Message
         * @type {Snowflake}
         */
        this.channelId = data.channelId
        /**
         * The message's author.
         * @memberof Message
         * @type {User}
         */
        this.author = data.author
        /**
         * The guild the message was sent in.
         * @memberof Message
         * @type {Guild}
         */
        this.guild = data.guild
        /**
         * The Discord API raw data.
         * @memberof Message
         * @type {Object}
         */
        this.rawData = data.rawData
    }
    /**
     * Send a message in this message's channel.
     * @memberof Message
     * @param {String} content The message content.
     * @returns {Message}
     */
    async send(content) {
        this.bot.emit('debug', 'Sending message...')
        const msgData = await fetch(`https://discordapp.com/api/channels/${this.channelId}/messages`, {
            method: 'post',
            body: JSON.stringify({
               content: content,
               tts: false 
            }),
            headers: {
                authorization: `Bot ${this.bot.token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        this.bot.emit('debug', `Message sent with content: ${msgData.content}`)
        var msgAuthor = new User(this.bot, {
            id: msgData.author.id,
            avatar: msgData.author.avatar,
            username: msgData.author.username,
            discriminator: msgData.author.discriminator,
            isBot: msgData.author.bot
        })
        return new Message(this.bot, {
            id: msgData.id,
            content: msgData.content,
            tts: msgData.tts,
            containsEveryonePing: msgData.mention_everyone,
            pinned: msgData.pinned,
            type: msgData.type,
            channelId: msgData.channel_id,
            author: msgAuthor,
            guild: this.bot.guilds.get(this.rawData.guild_id),
            rawData: msgData
        })
    }
    /**
     * Pins this message to it's channel.
     * @memberof Message
     */
    async pin() {
        var data = await fetch(`https://discordapp.com/api/channels/${this.channelId}/pins/${this.id}`, {
            method: 'put',
            headers: {
                'Authorization': `Bot ${this.bot.token}`
            }
        }).then(res => res.json())
        if(data.code === 10003) throw new Error('Invalid channel or message!')
        if(data.code === 50013) throw new Error('Can\'t do that!')

    }
    async delete() {
        var data = await fetch(`https://discordapp.com/api/channels/${this.channelId}/messages/${this.id}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bot ${this.bot.token}`
            }
        }).then(res => res.json())
        if(data.code === 50013) throw new Error('Can\'t do that!')
    }

}
module.exports = Message