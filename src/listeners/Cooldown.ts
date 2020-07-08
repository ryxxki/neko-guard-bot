import {Listener} from 'discord-akairo'
import {Message} from 'discord.js'
import {translate} from '../api'
import DataHandler from '../utils/DataHandler'

export default class Cooldown extends Listener{
    public constructor(){
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown',
            category: 'client'
        })
    }

    public async exec(msg:Message):Promise<void>{ 
        //TODO: dapatkan bedasrkan id author
        const lang:any = await DataHandler.getLang(msg.guild!.id)
        const text = [
            await translate("This command have cooldown time of", lang),
            await translate("You're on cooldown", lang)
        ]
        const user:any = this.client.commandHandler.cooldowns.get(msg.author.id)
        if(user.ping){
            msg.reply(`${text[0]} ${(user.ping.timer._idleTimeout/1000).toFixed(1)}sec , ${text[1]} ~`)
            return
        }
        if(user.lang_setting){
            msg.reply(`${text[0]} ${(user.lang_setting.timer._idleTimeout/1000).toFixed(1)}sec , ${text[1]} ~`)
            return
        }
        if(user.bot_setting){
            msg.reply(`${text[0]} ${(user.bot_setting.timer._idleTimeout/1000).toFixed(1)}sec , ${text[1]} ~`)
            return
        }
        if(user.prefix_setting){
            msg.reply(`${text[0]} ${(user.prefix_setting.timer._idleTimeout/1000).toFixed(1)}sec , ${text[1]} ~`)
            return
        }
         msg.reply(`too fast, you're in cooldown ~`)
        return
    }
}