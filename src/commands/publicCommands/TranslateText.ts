import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { TRANSLATE } from '../../components/RandomEmbed'
const Format:any[] = [
    {format: 'en', detail:'English'},
    {format:'id', detail:'Bahasa'}, 
    {format:'jw', detail:'Javanese'}, 
    {format:'ja', detail:'Japanese'},
    {format:'ko', detail:'Korean'},
    {format:'su', detail:'Sundanese'},
    {format:'fr', detail:'French'},
]
export default class Translate extends Command {
    public constructor(){
        super('translate', {
            aliases: ['translate', 't'],
            category: 'Public Commands',
            channel: 'guild',
            description: {
                content: 'translate',
                usage: 't [value]',
                example: [
                    "t [value]",
                    "translate [value]"
                ]
            },
            args: [
                {
                    id: 'lang',
                    type: 'lowercase',
                    match: 'phrase',
                    //flag: ['-option', '-lang', '-prefix', '-bw']
                },
                {
                    id: 'value',
                    type: 'string',
                    match: 'text',
                    //flag: ['-option', '-lang', '-prefix', '-bw']
                }
            ],
            ratelimit: 5,
        })

    }
    public async exec(msg: Message, args:any):Promise<Message|void>{
        if(args.lang){
            const cek = await Format.find(e => e.format == args.lang)
            if(cek && args.value){
                msg.content = args.value.split(' ').splice(1,args.value.length - 1).join(' ') 
                console.log(msg.content)
                await TRANSLATE(msg, args.lang)
                return 
            }
        }
    }
}