import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {stop, QUEUE, CONNECTION} from '../../../utils/MusicPlayer'
import {SIMPLE_EMBED} from '../../../components/MusicEmbed'

export default class StopCommand extends Command{
    public constructor(){
        super('stop', {
            aliases: ['stop'],
            category: "Music Commands",
            description: {
                content: "Stop Musik",
                usage: "stop",
                example: "stop [no args]"
            },
            ratelimit: 2,
        })
    }

    public async exec(msg: Message):Promise<any> {
        try {
            //TODO: mengecek apakah ada koneksi
            if(CONNECTION == undefined){
                msg.content = 'Im not playing any Song right now'
                SIMPLE_EMBED(msg)
                return
            }
            //TODO: mengecek user yang `memberi` perintah berada di posisi mana
            if(QUEUE.id && QUEUE.id !== msg.member!.voice.channelID){
                msg.content = `You must be on the same voice channel to use me`
                SIMPLE_EMBED(msg)
                return
            }
                await stop(msg)
                msg.content = `Stopped Queue`
                SIMPLE_EMBED(msg)
            return
        } catch (error) {
            console.log(error)
        }
    
    }   
}