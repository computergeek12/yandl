const Bot = require("./Bot")

/**
 * @class
 * A bot command.
 */
class Command {
   /**
    * Data for a command
    * @typedef {Object} CommandData
    * @memberof Command
    * @type {Object}
    * @property {String} name Command name
    * @property {String} description Command description
    * @property {String[]} [aliases] Aliases of the command
    * @property {String} [usage] Command usage
    * @property {Function} run Callback function for the command
    */
    /**
     * Create a new command.
     * @param {Bot} bot The discord bot that you want to respond to the command.
     * @param {CommandData} data The data for this command.
     */
    constructor(bot, data) {
        /**
         * The bot that handles this command.
         * @memberof Command
         * @type {Bot}
         */
        this.bot = bot
        /**
         * The command's name.
         * @memberof Command
         * @type {String}
         */
        this.name = data.name
        /**
         * The command's description.
         * @memberof Command
         * @type {String}
         */
        this.description = data.description
        /**
         * The command's aliases.
         * @memberof Command
         * @type {String[]}
         */
        this.aliases = data.aliases
        /**
         * The command's usage.
         * @memberof Command
         * @type {String}
         */
        this.usage = data.usage
        /**
         * The command's callback function.
         * @memberof Command
         * @type {Function}
         */
        this.run = data.run
        /**
         * Is the command enabled?
         * @memberof Command
         * @type {Boolean}
         */
        this.enabled = true
    }
    /**
     * Activate the command.
     * @memberof Command
     */
    activate() {
        this.bot.commands.set(this.name, this)
    }
}
module.exports = Command