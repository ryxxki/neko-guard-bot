import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {QUEUE, CONNECTION, pause} from '../../../utils/MusicPlayer'
import {SIMPLE_EMBED} from '../../../components/MusicEmbed'

export default class PauseCommand extends Command{
    public constructor(){
        super('pause', {
            aliases: ['pause'],
            category: "Music Commands",
            description: {
                content: "Pause Musik",
                usage: "pause",
                example: "pause [no args]"
            },
            ratelimit: 2,
        })
    }

    public async exec(msg: Message):Promise<any> {
        try {
            return msg.channel.send('Maintenace :(')
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
            msg.content = `Pausing Song`
            SIMPLE_EMBED(msg)
            return await pause(msg)
        } catch (error) {
            console.log(error)
        }
    
    }   
}