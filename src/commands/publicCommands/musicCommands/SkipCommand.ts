import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {QUEUE, CONNECTION,skip} from '../../../utils/MusicPlayer'
import {SIMPLE_EMBED} from '../../../components/MusicEmbed'

export default class SkipCommand extends Command{
    public constructor(){
        super('skip', {
            aliases: ['skip'],
            category: "Music Commands",
            description: {
                content: "Skip Musik",
                usage: "skip",
                example: "skip [no args]"
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
            //TODO: mengecek apakah ada next queue
            if(QUEUE.list.lenght <= 1){ 
                msg.content = `The queue is empty`
                SIMPLE_EMBED(msg)
                return
            }
            // bagian embed <==
            msg.content = `Skipped Song`
            await SIMPLE_EMBED(msg)
            // langsung gas kalau ada
            return await skip(msg)
        } catch (error) {
            console.log(error)
        }
    
    }   
}