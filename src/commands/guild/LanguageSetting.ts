import {DEFAULT, LANG_OPTION, REJECTED} from '../../components/BotSettingEmbed'
import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {translate} from '../../api'
import DataHandler from '../../utils/DataHandler'

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
            cooldown: 30000,
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
        try {
            const Format = DataHandler.getFormatLang()
            const cek = await Format.find(e => e.format == value)
            if(cek){
                await DataHandler.updateLang(msg.guild!.id, cek.format)
                msg.content = `Language for this server now is : \`${cek.detail}\``
                return await DEFAULT(msg)
            }
            //
            await LANG_OPTION(msg)
            msg.channel.send(`cancel ${await translate('for canceling command')}` )
            let filter = (m:any) => m.author.id == msg.author.id
            const query:any = await msg.channel.awaitMessages(filter, {max:1})
            if(parseInt(query.first().content) > Format.length){
                msg.content = "Invalid Choose"
                return await REJECTED(msg)
            }
            if(query.first().content == 'cancel'){
                msg.content = "Canceling"
                return await REJECTED(msg)
            }
            if(parseInt(query.first().content) <= Format.length){
                //console.log({lang: Format[parseInt(query.first().content) - 1]})
                await DataHandler.updateLang(msg.guild!.id, Format[parseInt(query.first().content) - 1].format)
                msg.content = `Language for this server now is : \`${await Format[parseInt(query.first().content) - 1].detail}\` `
                return await DEFAULT(msg)
            }
            msg.content = "Something Wrong, Try Again Later"
            return await DEFAULT(msg)
        } catch (error) {
            console.log(error)
            msg.content = 'Something Wrong, Try again later'
            return await DEFAULT(msg)
        }
        
    }
}