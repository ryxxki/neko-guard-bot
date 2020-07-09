import { Listener } from 'discord-akairo'
import DataHandler from '../../utils/DataHandler'
import { Message } from 'discord.js'
import {BAN_WORD} from '../../components/RandomEmbed'

export default class MessageListener extends Listener{
    public constructor(){
        super('message', {
            emitter: "client",
            event: "message",
            category: "client"
        })
    }

    public async exec(msg: Message):Promise<any>{
        try {
            //TODO: FILTER
            let message = msg.content.toLowerCase().split(' ')
            let ban_word = await DataHandler.getBanWord(msg.guild?.id)
            if(ban_word && ban_word.status && ban_word.onChannel.length >= 1){
                const check = await ban_word.onChannel.find((d:any) => d === msg.channel!.id)
                if(check){
                    const data = await ban_word.words.find((word:any) => message.find((m:any)=> word == m))
                    if(data){ 
                        await msg.delete()
                        return await BAN_WORD(msg)   
                    }
                    return
                }
                return 
            }
            return //benar" gaada
        } catch (error) {
            console.log(error)
            return
        }

    }
}