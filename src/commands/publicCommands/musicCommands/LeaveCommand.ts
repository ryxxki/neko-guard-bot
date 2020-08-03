import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {QUEUE, CONNECTION, leave} from '../../../utils/MusicPlayer'
import {SIMPLE_EMBED} from '../../../components/MusicEmbed'

export default class LeaveCommand extends Command{
    public constructor(){
        super('leave', {
            aliases: ['leave'],
            category: "Music Commands",
            description: {
                content: "Leave Musik",
                usage: "leave",
                example: "leave [no args]"
            },
            ratelimit: 2,
        })
    }

    public async exec(msg: Message):Promise<any> {
        try {
            return msg.channel.send('Maintenace :(')
            //TODO: mengecek apakah ada koneksi
            if(CONNECTION == undefined){
                msg.content = `Im not playing any Song right now`
                SIMPLE_EMBED(msg)
                return
            }
            //TODO: mengecek user yang `memberi` perintah berada di posisi mana
            if(QUEUE.id && QUEUE.id !== msg.member!.voice.channelID){
                msg.content = `You must be on the same voice channel to use me`
                SIMPLE_EMBED(msg)
                return
            }
            msg.content = `Thanks For Using Me ~ Have a nice day `
            SIMPLE_EMBED(msg)
            await leave(msg)
        } catch (error) {
            console.log(error)
        }
    
    }   
}