import {DEFAULT} from '../components/BotSettingEmbed'
import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {translate} from '../api'
import DataHandler from '../utils/DataHandler'

export default class PrefixSetting extends Command {
    public constructor(){
        super('prefix_setting', {
            aliases: ['prefix'],
            category: 'Settings Command',
            description: {
                content: 'Settings Prefix Bot ',
                usage: 'prefix [value]',
                example: ["prefix [value]"]
            },
            ratelimit: 2,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    id: 'value',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start:  async(_:Message):Promise<any> => {
                            _.content = 'Missing Value!, Please read Settings Guide with command : `<prefix>set`\n`Waiting for the value...`'
                            let lang:any = await DataHandler.getLang('guild', _.guild!.id)
                            return await DEFAULT(_, lang)
                        }
                    } 
                }
            ]
        })
    }

    public async exec(msg: Message, {value}: {value:string}):Promise<Message>{
        let lang:any = await DataHandler.getLang('guild', msg.guild!.id)
        try {
            await DataHandler.update('guild', msg.guild!.id, {prefix: value})
            msg.content = `The Prefix for this server now is : \`${value}\` `
            return await DEFAULT(msg, lang)
        } catch (error) {
            console.log(error)
            msg.content = 'Something Wrong While Updating Prefix, Try again later'
            return await DEFAULT(msg, lang)
        }
        
    }
}