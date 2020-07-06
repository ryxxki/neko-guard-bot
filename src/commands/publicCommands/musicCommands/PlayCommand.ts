import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {ytsearch} from '../../../api'
import {PLAY, QUEUE} from '../../../utils/MusicPlayer'
import {DEFAULT_EMBED, SIMPLE_EMBED} from '../../../components/MusicEmbed'
import {translate} from '../../../api'
import DataHandler from '../../../utils/DataHandler'

export default class PlayCommand extends Command{
    public constructor(){
        super('play', {
            aliases: ['p', 'play'],
            category: "Music Commands",
            description: {
                content: "Memulai Musik",
                usage: "p [query]",
                example: [
                    "p [query]",
                    "play [query]"
                ]
            },
            ratelimit: 1,
            args: [
                {
                    id: "query",
                    match: "restContent",
                    type: 'string',
                }
            ]
        })
    }

    public async exec(msg: Message, {query}: {query:string}):Promise<any> {
        const lang:any = await DataHandler.getLang('guild', msg.guild!.id)
        try {
        //TODO: CEK SEBELUM SEARCH LEWAT API
            // mengecek posisi user
            if(!msg.member?.voice.channel){
                msg.content = await translate("You must join a voice channel first", lang)
                SIMPLE_EMBED(msg)
                return
            }
            // mengecek keyword search 
            if(query == null){
                msg.content = await translate("Please give me the keyword of search", lang)
                SIMPLE_EMBED(msg)
                return
            }
            // mengecek user yang `memberi` perintah berada di posisi mana
            if(QUEUE.id && QUEUE.id !== msg.member!.voice.channelID){
                msg.content = await translate("You must be on the same voice channel to use me", lang)
                SIMPLE_EMBED(msg)
                return
            }
        //TODO: CEK SESUDAH SEARCH LEWAT API
            let result = await ytsearch(query).then((e:any) => e.items)

            if(QUEUE.list.length >= 1){
                //TODO: PUSH KE QUEUE 
                await QUEUE.list.push(result[0])
                msg.content = `${await translate("Song Added", lang)}`
                DEFAULT_EMBED(msg, QUEUE)
                return
            }
        //TODO: PUSH SEBAGAI QUEUE BARU
            //console.log(result[0])
            await QUEUE.list.push(result[0])
            QUEUE.id = await msg.member!.voice.channelID
            return await msg.member!.voice.channel!.join().then(connection => {
                PLAY(connection, msg, lang)
                //console.log(QUEUE.list)
                return 
            }).catch(async err => {
                console.log(`err from play_command : ${err}`)
                msg.content = `${await translate("something Wrong,try again later", lang)}`
                //await leave(msg)
                SIMPLE_EMBED(msg, QUEUE)
                return
            })

        } catch (error) {
            console.log(error)
        }
    
    }   
}