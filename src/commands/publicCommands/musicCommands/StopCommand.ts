import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {stop, QUEUE, CONNECTION} from '../../../utils/MusicPlayer'
import {SIMPLE_EMBED, PLAY_EMBED} from '../../../components/MusicEmbed'
import DataHandler from '../../../utils/DataHandler'
import {translate} from '../../../api'

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
                await stop(msg, lang)
                msg.content = await translate(`Stopped Queue`, lang)
                SIMPLE_EMBED(msg)
            return
        } catch (error) {
            console.log(error)
        }
    
    }   
}