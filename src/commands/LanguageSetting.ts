import {DEFAULT, LANG_GUIDE} from '../components/BotSettingEmbed'
import {Command, Argument } from 'discord-akairo'
import {Message} from 'discord.js'
import {translate} from '../api'
import DataHandler from '../utils/DataHandler'

const Format:any = ['en', 'id', 'jw', 'ja']
export default class LanguageSetting extends Command {
    public constructor(){
        super('lang_setting', {
            aliases: ['lang'],
            category: 'Settings Command',
            description: {
                content: 'Settings Lang Bot ',
                usage: 'lang [value]',
                example: ["lang [value]"]
            },
            ratelimit: 2,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    id: 'value',
                    type: 'string',
                    match: 'separate',
                    default: 'none'
                }
            ]
        })
    }

    public async exec(msg: Message, {value}: {value:string}):Promise<Message>{
        try {
            const lang:any = await DataHandler.getLang('guild', msg.guild!.id)
            if(value[0] === 'info')  return await LANG_GUIDE(msg, lang)
            //console.log(value)
            await LANG_GUIDE(msg, lang)
            msg.content ='Type `cancel` for canceling command'
            await DEFAULT(msg, 'en')
            let filter = (m:any) => m.author.id == msg.author.id
            const query:any = await msg.channel.awaitMessages(filter, {max:1})
            //console.log(query.first().content)
            if(parseInt(query.first().content) > 4){
                msg.content = " \`:x:\` Invalid Choose"
                return await DEFAULT(msg, lang)
            }
            if(query.first().content == 'cancel'){
                msg.content = " \`:x:\` Canceling"
                return await DEFAULT(msg, lang)
            }
            await DataHandler.update('guild', msg.guild!.id, {lang: Format[parseInt(query.first().content) - 1]})
            msg.content = `Language for this server now is : \`${Format[parseInt(query.first().content) - 1]}\` `
            return await DEFAULT(msg, lang)
        } catch (error) {
            const lang:any = await DataHandler.getLang('guild', msg.guild!.id)
            console.log(error)
            msg.content = 'Something Wrong, Try again later'
            return await DEFAULT(msg, lang)
        }
        
    }
}