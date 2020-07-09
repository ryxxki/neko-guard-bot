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
            cooldown: 20000,
            ratelimit: 5,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    id: 'options',
                    match: 'phrase'
                    //flag: ['-add', '-rm', '-list', '-set', '-channel']
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
        try {
            if(options){
                let data:any, check:any
                switch (options) {
                    case '+add': 
                        //TODO: cek first
                        check = await DataHandler.getBanWord(msg.guild!.id)
                        check.words = [...check.words, ...value]
                        //TODO: add data ke db value
                        await DataHandler.updateBanWord(msg.guild!.id, check) 
                        //TODO: send reply 
                        msg.content = 'Added Word succesfully'
                        await DEFAULT(msg)
                    return
                    case '+channel': 
                        //TODO: cek first
                        check = await DataHandler.getBanWord(msg.guild!.id)
                        check.onChannel = [...check.onChannel, ...value]
                        //TODO: add data ke db value
                        await DataHandler.updateBanWord(msg.guild!.id, check) 
                        //TODO: send reply 
                        msg.content = 'Added Channel For Filtering succesfully'
                        await DEFAULT(msg)
                    return
                    case '-channel':
                         data = await DataHandler.getBanWord(msg.guild!.id)
                         //TODO: filtering data
                         const hasil = await data.onChannel.filter((e:any, i:any)=> e !== value[i])
                         //TODO: apakah data yg akan di maksud itu ada 
                         if(Object.keys(data.words).length != Object.keys(hasil).length){
                            data.onChannel = hasil
                             //TODO: berhasil di hapus & update ban word
                            await DataHandler.updateBanWord(msg.guild!.id, data)
                            msg.content = `successfully remove ${value}`
                            await DEFAULT(msg)
                            return
                         }
                        //TODO: send reply 
                        msg.content = 'Failed to delete, may because the intended data is not exist'
                        await REJECTED(msg)
                    return
                    case '-rm':
                         data = await DataHandler.getBanWord(msg.guild!.id)
                         //TODO: filtering data
                         const result = await data.words.filter((e:any, i:any)=> e !== value[i])
                         //TODO: apakah data yg akan di maksud itu ada 
                         if(Object.keys(data.words).length != Object.keys(result).length){
                            data.words = result
                             //TODO: berhasil di hapus & update ban word
                            await DataHandler.updateBanWord(msg.guild!.id, data)
                            msg.content = `successfully remove ${value}`
                            await DEFAULT(msg)
                            return
                         }
                        //TODO: send reply 
                        msg.content = 'Failed to delete, may because the intended data is not exist'
                        await REJECTED(msg)
                    return
                    case '-list':
                         data = await DataHandler.getBanWord(msg.guild!.id)
                         msg.reply(data.words)
                    return
                    case '-set':
                        //TODO: cek first
                        check = await DataHandler.getBanWord(msg.guild!.id)
                        check.status = !check.status
                        //TODO: add data ke db value
                        await DataHandler.updateBanWord(msg.guild!.id, check) 
                        //TODO: send reply 
                        if(check.status){
                            msg.content = 'Ban Words is ` enabled ` now'
                            await DEFAULT(msg)
                            return
                        }
                        if(!check.status){
                            msg.content = 'Ban Words is ` disabled ` now'
                            await DEFAULT(msg)
                            return
                        }
                        //TODO: send reply 
                        msg.content = 'Something Wrong, Try Again Later'
                        await REJECTED(msg)
                    return
                    case '-mute':
                        //TODO: cek first
                        check = await DataHandler.getBanWord(msg.guild!.id)
                        check.auto = !check.auto
                        //TODO: add data ke db value
                        await DataHandler.updateBanWord(msg.guild!.id, check) 
                        //TODO: send reply 
                        if(check.auto){
                            msg.content = 'Auto Mute is ` enabled ` now'
                            await DEFAULT(msg)
                            return
                        }
                        if(!check.auto){
                            msg.content = 'Auto Mute is ` disabled ` now'
                            await DEFAULT(msg)
                            return
                        }
                        //TODO: send reply 
                        msg.content = 'Something Wrong, Try Again Later'
                        await REJECTED(msg)
                    return
                    default:
                        msg.content = 'Invalid Request !, Please Read the guide <prefix>g'
                        await REJECTED(msg)
                    return
                }
            }
        } catch (error) {
            
        }
    }
}