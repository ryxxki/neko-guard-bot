import {DEFAULT, REJECTED} from '../../components/BotSettingEmbed'
import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import DataHandler from '../../utils/DataHandler'

export default class BanWordSetting extends Command {
    public constructor(){
        super('bw_setting', {
            aliases: ['bw', 'banword'],
            category: 'Settings Command',
            description: {
                content: 'Settings Lang Bot ',
                usage: 'bw [option] [value]',
                example: ["bw [option] [value]"]
            },
            channel: 'guild',
            cooldown: 60000,
            ratelimit: 1,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    id: 'options',
                    match: 'phrase'
                    //flag: ['-add', '-rm', '-list', '-set']
                },
                {
                    id: 'value',
                    type: 'lowercase',
                    match: 'separate'
                }
            ]
        })
    }

    public async exec(msg: Message, {options, value}: {options: any, value: string}):Promise<Message|void>{
        let lang:any = await DataHandler.getLang('guild', msg.guild!.id)
        try {
            if(options){
                let data:any, check:any
                switch (options) {
                    case '-add': 
                        //TODO: cek first
                        check = await DataHandler.getDataBanWord(msg.guild!.id)
                        check.words = [...check.words, ...value]
                        //TODO: add data ke db value
                        await DataHandler.updateBanWord(msg.guild!.id, check) 
                        //TODO: send reply 
                        msg.content = 'Added Word succesfully'
                        await DEFAULT(msg, lang)
                    return
                    case '-rm':
                         data = await DataHandler.getDataBanWord(msg.guild!.id)
                         //TODO: filtering data
                         const result = await data.words.filter((e:any)=> e !== value)
                         //TODO: apakah data yg akan di maksud itu ada 
                         if(Object.keys(data.words).length != Object.keys(result).length){
                            data.words = result
                             //TODO: berhasil di hapus & update ban word
                            await DataHandler.updateBanWord(msg.guild!.id, data)
                            msg.reply(`successfully remove ${value}`)
                            return
                         }
                        //TODO: send reply 
                        msg.content = 'Failed to delete, may because the intended data is not exist'
                        await REJECTED(msg, lang)
                    return
                    case '-list':
                         data = await DataHandler.getDataBanWord(msg.guild!.id)
                         msg.reply(data.words)
                    return
                    case '-set':
                        //TODO: cek first
                        check = await DataHandler.getDataBanWord(msg.guild!.id)
                        check.status = !check.status
                        //TODO: add data ke db value
                        await DataHandler.updateBanWord(msg.guild!.id, check) 
                        //TODO: send reply 
                        if(check.status){
                            msg.content = 'Ban Words is ` enabled ` now'
                            await DEFAULT(msg, lang)
                            return
                        }
                        if(!check.status){
                            msg.content = 'Ban Words is ` disable ` now'
                            await DEFAULT(msg, lang)
                            return
                        }
                        //TODO: send reply 
                        msg.content = 'Something Wrong, Try Again Later'
                        await REJECTED(msg, lang)
                    return
                    default:
                        msg.content = 'Invalid Request !'
                        await REJECTED(msg, lang)
                    return
                }
            }
            return msg.reply('ok')
        } catch (error) {
            
        }
    }
}