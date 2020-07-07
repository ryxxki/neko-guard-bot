import {DEFAULT, LANG_OPTION, REJECTED} from '../../components/BotSettingEmbed'
import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {translate} from '../../api'
import DataHandler from '../../utils/DataHandler'

const Format:any[] = [
    {format: 'en', detail:'English'},{format:'id', detail:'Bahasa'}, {format:'jw', detail:'Java'}, {format:'ja', detail:'Japan'}]
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
            channel: 'guild',
            cooldown: 60000,
            ratelimit: 1,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    id: 'value',
                    type: 'string'
                }
            ]
        })
    }

    public async exec(msg: Message, {value}: {value:string}):Promise<Message>{
        let lang:any = await DataHandler.getLang('guild', msg.guild!.id)
        try {
            //
            const cek = await Format.find(e => e.format == value)
            if(cek){
                await DataHandler.update('guild', msg.guild!.id, {lang: cek.format})
                msg.content = `Language for this server now is : \`${cek.detail}\``
                return await DEFAULT(msg, lang)
            }
            //
            await LANG_OPTION(msg, lang)
            msg.channel.send(`cancel ${await translate('for canceling command')}` )
            let filter = (m:any) => m.author.id == msg.author.id
            const query:any = await msg.channel.awaitMessages(filter, {max:1})
            //console.log(query.first().content)
            if(parseInt(query.first().content) > 4){
                msg.content = "Invalid Choose"
                return await REJECTED(msg, lang)
            }
            if(query.first().content == 'cancel'){
                msg.content = "Canceling"
                return await REJECTED(msg, lang)
            }
            if(parseInt(query.first().content) <= 4){
                //console.log({lang: Format[parseInt(query.first().content) - 1]})
                await DataHandler.update('guild', msg.guild!.id, {lang: Format[parseInt(query.first().content) - 1].format})
                msg.content = `Language for this server now is : \`${await Format[parseInt(query.first().content) - 1].detail}\` `
                return await DEFAULT(msg, lang)
            }
            msg.content = "Something Wrong, Try Again Later"
            return await DEFAULT(msg, lang)
        } catch (error) {
            console.log(error)
            msg.content = 'Something Wrong, Try again later'
            return await DEFAULT(msg, lang)
        }
        
    }
}