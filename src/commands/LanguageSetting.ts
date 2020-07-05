import {DEFAULT, LANG_GUIDE} from '../components/BotSettingEmbed'
import {Command, Argument } from 'discord-akairo'
import {Message} from 'discord.js'
import {translate} from '../api'
import DataHandler from '../utils/DataHandler'

const lang:any = ['en', 'id', 'jw', 'ja']
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
        const lang:any = await DataHandler.getLang('guild', msg.guild!.id)
        try {
            if(value[0] === 'info')  return await LANG_GUIDE(msg, lang)
            //console.log(value)
            await LANG_GUIDE(msg, lang)
            msg.channel.send('`Type \`||cancel||\` for canceling command`')
            let filter = (m:any) => m.author.id == msg.author.id
            const query:any = await msg.channel.awaitMessages(filter, {max:1})
            //console.log(query.first().content)
            if(parseInt(query.first().content) > 4){
                msg.content = ":x: Invalid Choose"
                return DEFAULT(msg, lang)
            }
            if(query.first().content == "cancel"){
                msg.content = ":x: Canceling"
                return await DEFAULT(msg, lang)
            }
            await DataHandler.update('guild', msg.guild!.id, {lang: lang[parseInt(query.first().content) - 1]})
            msg.content = `Language for this server now is : \`${lang[parseInt(query.first().content) - 1]}\` `
            return await DEFAULT(msg, lang)
        } catch (error) {
            console.log(error)
            msg.content = 'Something Wrong, Try again later'
            return await DEFAULT(msg, lang)
        }
        
    }
}