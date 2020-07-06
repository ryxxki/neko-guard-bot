import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {QUEUE, CONNECTION,skip} from '../../../utils/MusicPlayer'
import {DEFAULT_EMBED, SIMPLE_EMBED} from '../../../components/MusicEmbed'
import DataHandler from '../../../utils/DataHandler'
import {translate} from '../../../api'

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

        const lang:any = await DataHandler.getLang('guild', msg.guild!.id)
        try {
            //TODO: mengecek apakah ada koneksi
            if(CONNECTION == undefined){
                msg.content = `${await translate('Im not playing any Song right now', lang)}`
                SIMPLE_EMBED(msg)
                return
            }
            //TODO: mengecek user yang `memberi` perintah berada di posisi mana
            if(QUEUE.id && QUEUE.id !== msg.member!.voice.channelID){
                msg.content = await translate(`You must be on the same voice channel to use me`, lang)
                SIMPLE_EMBED(msg)
                return
            }
            //TODO: mengecek apakah ada next queue
            if(QUEUE.list.lenght <= 1){ 
                msg.content = await translate(`The queue is empty`, lang)
                SIMPLE_EMBED(msg)
                return
            }
            // bagian embed <==
            msg.content = `${await translate(`Skipped Song`, lang)}`
            SIMPLE_EMBED(msg, QUEUE)
            // langsung gas kalau ada
            return await skip(msg)
        } catch (error) {
            console.log(error)
        }
    
    }   
}