import {DEFAULT, REJECTED} from '../../components/BotSettingEmbed'
import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import DataHandler from '../../utils/DataHandler'

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
            channel: 'guild',
            cooldown: 5000,
            ratelimit: 1,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    id: 'value',
                    type: 'string',
                    match: 'separate'
                }
            ]
        })
    }

    public async exec(msg: Message, {value}: {value:string}):Promise<Message>{
        try {
            const p:string = await value
            if(p == null){
                const prefix:string = await DataHandler.getPrefix(msg.guild!.id)
                msg.content = `Prefix Command of this server : \`${prefix}\` `
                return await DEFAULT(msg)
            }
            await DataHandler.updatePrefix(msg.guild!.id, p[0])
            msg.content = `The Prefix Command for this server now is : \`${p[0]}\` `
            return await DEFAULT(msg)
        } catch (error) {
            console.log(error)
            msg.content = 'Something Wrong While Updating Prefix Command, Try again later'
            return await DEFAULT(msg)
        }
        
    }
}