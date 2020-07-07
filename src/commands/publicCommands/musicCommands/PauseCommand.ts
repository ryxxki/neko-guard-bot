import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {QUEUE, CONNECTION, pause} from '../../../utils/MusicPlayer'
import {SIMPLE_EMBED} from '../../../components/MusicEmbed'
import {translate} from '../../../api'
import DataHandler from '../../../utils/DataHandler'

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
            msg.content = `${await translate(`Pausing Song`, lang)}`
            SIMPLE_EMBED(msg)
            return await pause(msg, lang)
        } catch (error) {
            console.log(error)
        }
    
    }   
}