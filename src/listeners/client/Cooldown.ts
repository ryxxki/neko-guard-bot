import {Listener} from 'discord-akairo'
import { Message } from 'discord.js'

export default class Cooldown extends Listener{
    public constructor(){
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown',
            category: 'client'
        })
    }

    public async exec(msg:Message):Promise<void>{ 
         msg.reply(`too fast, you're in cooldown ~`)
        return
    }
}