/** 
 * @class
 * A server (or guild) on Discord.
 */
class Guild {
    /**
     * Create a guild object
     * @param {Bot} bot The bot that is instansiating this.
     * @param {Object} data The data.
     */
    constructor(bot, data) {
        /**
         * The bot that instansiated this.
         * @memberof Guild
         * @type {Bot}
         */
        this.bot = bot
        /**
         * The guild's ID.
         * @memberof Guild
         * @type {Snowflake}
         */
        this.id = data.id
        /**
         * The guild's name.
         * @memberof Guild
         * @type {String}
         */
        this.name = data.name
        /**
         * The guild's icon hash.
         * @memberof Guild
         * @type {String}
         */
        this.icon = data.icon
        /**
         * The guild's owner ID.
         * @memberof Guild
         * @type {Snowflake}
         */
        this.owner = data.owner
        /**
         * Is 2FA required to moderate this server?.
         * @memberof Guild
         * @type {Boolean}
         */
        data.mfaLevel = 1 ? this.mfarequired = true : this.mfarequired = false
    }
}
module.exports = Guild