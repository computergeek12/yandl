const BaseChannel = require('./BaseChannel')
const Bot = require('./Bot')
const Guild = require('./Guild')
/**
 * @class
 * Represents a text channel.
 * @extends BaseChannel
 */
class TextChannel extends BaseChannel {
    /**
     * Create a text channel object.
     * @param {Bot} bot The bot to instansiate with.
     * @param {Object} data The Discord API data.
     */
    constructor(bot, data) {
        super(bot, data)
        /**
         * The guild that the channel belongs to.
         * @type {Guild}
         * @memberof TextChannel
         */
        this.guild = this.bot.guilds.get(data.guildId)
        /**
         * The topic of the channel.
         * @type {String}
         * @memberof TextChannel
         */
        this.topic = data.topic
        /**
         * Is the channel for adults (18+) only?
         * @type {Boolean?}
         * @memberof TextChannel
         */
        this.nsfw = data.nsfw
        
    }
}
module.exports = TextChannel