import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo'
import { Message } from 'discord.js'
import { join } from "path";
import DataHandler from '../utils/DataHandler'
import {DEFAULT} from '../components/BotSettingEmbed'
require('dotenv').config()
let cooldown

declare module 'discord-akairo' {
    interface AkairoClient {
        commandHandler: CommandHandler
        listenerHandler: ListenerHandler
    }
}

interface BotOptions {
    token?:string
    owners?:string | string[]
}

export default class BotClient extends AkairoClient {
    public config!: BotOptions;
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "listeners")
    })
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "commands"),
        prefix: (msg: Message):Promise<string> => DataHandler.getData('guild', msg.guild!.id).then((e:any) => e.prefix as string),
        allowMention: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 10000,
         argumentDefaults: {
            prompt: {
                modifyStart: (_:Message, str:string): string => `${str}\n\n\`Type \`||cancel||\` for canceling command...\``,
                modifyRetry: (_:Message, str:string): string => `${str}\n\n\`Type \`||cancel||\` for canceling command....\``,
                timeout: (_:Message):Promise<any> => {
                    _.content ="No response from author, canceling the command"
                    return DEFAULT(_)
                },
                ended: (_:Message):Promise<any> => {
                    _.content = "The chance to try again is up"
                    return DEFAULT(_)
                },
                cancel: (_:Message):Promise<any> => {
                    _.content = 'Command canceled by author'
                    return DEFAULT(_)
                },
                retries: 1,
                time: 10000,
                cancelWord: 'cancel'
            },         
            otherwise: ""
        },  
        ignorePermissions: (msg: Message):any => DataHandler.getData('guild', msg.guild!.id).then((e:any) => e.owner as string[])
    })

    public constructor(config: BotOptions){
        super({
            ownerID: '565747416352030741'
        })
        this.config = config
    }

    private async _init():Promise<void>{
        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        })
        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
    }

    public async start():Promise<string>{
        await this._init()
        return this.login(this.config.token)
    }
}