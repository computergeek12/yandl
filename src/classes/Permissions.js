const { BitField } = require("discord.js");

/**
 * @class
 * Manages a permission bitfield.
 * @extends {BitField}
 */
class Permissions extends BitField {
   /**
    * Something that can be resolved into a Permissions bitfield
    * @typedef {string|number|Permissions|PermissionResolvable[]} PermissionResolvable
    */
   /**
    * Checks if a user has a permission, or one of multiple permissions.
    * @param {PermissionResolvable} perm A resolvable permission
    * @param {Boolean} checkAdmin Bypass checks if the user has admin?
    */
    any(perm, checkAdmin = true) {
        return (checkAdmin && super.has(this.constructor.FLAGS.ADMINISTRATOR)) || super.any(perm)
        
    }
    /**
    * Checks if a user has a permission.
    * @param {PermissionResolvable} perm A resolvable permission
    * @param {Boolean} checkAdmin Bypass checks if the user has admin?
    */
    has(perm, checkAdmin = true) {
        return (checkAdmin && super.has(this.constructor.FLAGS.ADMINISTRATOR)) || super.any(perm)
    }

}
Permissions.FLAGS = {
    CREATE_INSTANT_INVITE: 1 << 0,
    KICK_MEMBERS: 1 << 1,
    BAN_MEMBERS: 1 << 2,
    ADMINISTRATOR: 1 << 3,
    MANAGE_CHANNELS: 1 << 4,
    MANAGE_GUILD: 1 << 5,
    ADD_REACTIONS: 1 << 6,
    VIEW_AUDIT_LOG: 1 << 7,
    PRIORITY_SPEAKER: 1 << 8,
    STREAM: 1 << 9,
    VIEW_CHANNEL: 1 << 10,
    SEND_MESSAGES: 1 << 11,
    SEND_TTS_MESSAGES: 1 << 12,
    MANAGE_MESSAGES: 1 << 13,
    EMBED_LINKS: 1 << 14,
    ATTACH_FILES: 1 << 15,
    READ_MESSAGE_HISTORY: 1 << 16,
    MENTION_EVERYONE: 1 << 17,
    USE_EXTERNAL_EMOJIS: 1 << 18,
    VIEW_GUILD_INSIGHTS: 1 << 19,
    CONNECT: 1 << 20,
    SPEAK: 1 << 21,
    MUTE_MEMBERS: 1 << 22,
    DEAFEN_MEMBERS: 1 << 23,
    MOVE_MEMBERS: 1 << 24,
    USE_VAD: 1 << 25,
    CHANGE_NICKNAME: 1 << 26,
    MANAGE_NICKNAMES: 1 << 27,
    MANAGE_ROLES: 1 << 28,
    MANAGE_WEBHOOKS: 1 << 29,
    MANAGE_EMOJIS: 1 << 30,
};
/**
 * Bitfield with all permissions
 * @type {Number}
 * @memberof Permissions
 */
Permissions.ALL = Object.values(Permissions.FLAGS).reduce((all, p) => all | p, 0)

/**
 * Bitfield with default permissions
 * @type {Number}
 * @memberof Permissions
 */
Permissions.DEFAULT = 104324673

module.exports = Permissions