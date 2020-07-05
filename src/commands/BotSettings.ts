import {GUIDE} from '../components/BotSettingEmbed'
import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {translate} from '../api'
import DataHandler from '../utils/DataHandler'

export default class BotSettings extends Command {
    public constructor(){
        super('bot_settings', {
            aliases: ['set'],
            category: 'Settings Command',
            description: {
                content: 'Settings Bot',
                usage: 'set',
                example: "set"
            },
            ratelimit: 2,
            userPermissions: ['ADMINISTRATOR'],
            // args: [
            //     {
            //         id: 'stuff',
            //         type: 'string',
            //         match: 'content' 
            //     }
            // ]
        })
    }

    public async exec(msg: Message):Promise<Message>{
        const lang:any = await DataHandler.getLang('guild', msg.guild!.id)
        return await GUIDE(msg, lang)
    }
}