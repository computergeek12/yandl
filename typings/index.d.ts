declare module "yandl" {
    import WebSocket from 'ws'
    import { EventEmitter } from 'events'
    import { Collection } from 'discord.js'
    type Snowflake = string
    class WebSocketManager {
        heartbeat?: number
        connection?: WebSocket
        bot: Bot
        constructor(bot: Bot)
        connectAsBot(token: string): Promise<void>
    }
    class Bot extends EventEmitter {
        token: string
        prefix: string
        commands: Collection<string, Command>
        guilds: Collection<string, Guild>
        ws: WebSocketManager
        user?: User
        constructor(token: string, prefix: string)
        connect(): void
        on<K extends keyof BotEvents>(event: K, listener: (...args: BotEvents[K]) => void): this
        once<K extends keyof BotEvents>(event: K, listener: (...args: BotEvents[K]) => void): this
        emit<K extends keyof BotEvents>(event: K, ...args: BotEvents[K]): boolean;
        initUser(): Promise<void>
        command(data: CommandData): Command
    }
    interface BotEvents {
        debug: [string]
        ready: []
        message: [Message]
    }
    type CommandData = {
        name: string,
        description: string,
        aliases?: Array<string>
        usage?: string
        run: (bot: Bot, msg: Message, args: Array<string>) => any
    }
    class Command {
        bot: Bot
        name: string
        description: string
        aliases?: Array<string>
        usage?: string
        constructor(bot: Bot, data: CommandData)
        activate(): void
    }
    type MessageData = {
        id: Snowflake,
        content: string,
        tts: boolean,
        containsEveryonePing: boolean,
        pinned: boolean,
        type: number,
        channelId: string,
        author: User,
        guild: Guild,
        rawData: object,
    }
    class Message {
        id: Snowflake
        content: string
        tts: boolean
        containsEveryonePing: boolean
        pinned: boolean
        type: number
        channelId: string
        author: User
        guild: Guild
        rawData: object
        constructor(bot: Bot, data: MessageData)
        send(content: string): Promise<Message>
        pin(): void
    }
    type UserData = {
        id: Snowflake,
        avatar: string,
        username: string,
        discriminator: string,
        isBot: boolean
    }
    class User {
        bot: Bot
        id: Snowflake
        avatar: string
        username: string
        discriminator: string
        tag: string
        isBot: boolean
        verboseMode: boolean
        constructor(bot: Bot, data: UserData)
        toString(): string
        getAvatar(): string
    }
    type GuildData = {
        id: Snowflake,
        name: string,
        icon: string,
        owner: string,
        mfarequired: boolean
    }
    class Guild {
        bot: Bot
        id: Snowflake
        name: string
        icon: string
        owner: string
        mfarequired: boolean
        constructor(bot: Bot, data: GuildData)
    }
}