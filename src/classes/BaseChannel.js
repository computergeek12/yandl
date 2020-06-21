const Bot = require('./Bot')
/**
 * @class
 * Represents *any* type of channel on Discord.
 */
class BaseChannel {
    /**
     * Create a channel object.
     * @param {Bot} bot The bot to instansiate with.
     * @param {Object} data The Discord API data.
     */
    constructor(bot, data) {
        /**
         * The bot that instansiated this.
         * @type {Bot}
         * @memberof BaseChannel
         */
        this.bot = bot
        /**
         * The channel ID.
         * @type {Snowflake}
         * @memberof BaseChannel
         */
        this.id = data.id
        /**
         * The type of the channel.
         * @type {Number}
         * @memberof BaseChannel
         */
        this.type = data.type
        /**
         * The channel's name.
         * @type {String}
         * @memberof BaseChannel
         */
        this.name = data.name
    }
}
module.exports = BaseChannel