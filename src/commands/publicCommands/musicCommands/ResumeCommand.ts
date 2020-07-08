import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {QUEUE, CONNECTION, resume} from '../../../utils/MusicPlayer'
import {SIMPLE_EMBED} from '../../../components/MusicEmbed'

export default class ResumeCommand extends Command{
    public constructor(){
        super('resume', {
            aliases: ['resume'],
            category: "Music Commands",
            description: {
                content: "Resume Musik",
                usage: "resume",
                example: "resume [no args]"
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
                msg.content =`You must be on the same voice channel to use me`
                SIMPLE_EMBED(msg)
                return
            }
            if(!CONNECTION.dispatcher.paused){
                msg.content = `Music is not paused`
                SIMPLE_EMBED(msg)
                return
            }
            msg.content = `Resuming Song`
            SIMPLE_EMBED(msg)
            return await resume(msg)
        } catch (error) {
            console.log(error)
        }
    
    }   
}