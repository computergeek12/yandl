const Bot = require("./Bot")

/**
 * @class
 * Represents a user on Discord.
 */
class User {
    /**
     * Create a user object
     * @param {Bot} bot The bot that is instansiating this.
     * @param {Object} data The data.
     */
    constructor(bot, data) {
        /**
         * The bot that instansiated this.
         * @memberof User
         * @type {Bot}
         */
        this.bot = bot
        /**
         * The user's ID.
         * @memberof User
         * @type {Snowflake}
         */
        this.id = data.id
        /**
         * The user's avatar hash.
         * @memberof User
         * @type {String}
         */
        this.avatar = data.avatar
        /**
         * The user's name.
         * @memberof User
         * @type {String}
         */
        this.username = data.username
        /**
         * The user's DiscordTag.
         * @memberof User
         * @type {String}
         */
        this.discriminator = data.discriminator
        /**
         * The user's name and tag.
         * @memberof User
         * @type {String}
         */
        this.tag = `${this.username}#${this.discriminator}`
        /**
         * Is the user a bot?.
         * @memberof User
         * @type {String}
         */
        this.isBot = data.isBot
    }
    /**
     * Get the user's ID mention.
     * @memberof User
     * @returns {String}
     */
    toString() {
        return `<@${this.id}>`
    }
    /**
     * Get the user's avatar URL.
     * @memberof User
     * @type {String}
     */
    get avatarURL() {
        var URLParts = ['http://cdn.discordapp.com/avatars']
        URLParts.push(this.id)
        URLParts.push(this.avatar + '.png')
        return URLParts.join('/')
    }
}
module.exports = User