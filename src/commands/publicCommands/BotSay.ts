import {Message, GuildMember, MessageEmbed} from 'discord.js'
import {Command} from 'discord-akairo'
import { tenor } from '../../api'

export default class BotSay extends Command {
    public constructor(){
        super("say", {
            aliases: ["say"],
            category: "Public Commands",
            description: {
                content: "Membuat Bot Mengirim Pesan Random",
                usage: "avatar [member]",
                examples: [
                    "say [text] @Member#0001 -with [todo]",
                    "say [text] with [todo]",
                    "say [text] "
                ]
            },
            cooldown: 5000,
            ratelimit: 2,
            args: [
                {
                    id: "text",
                    type: "string",
                    match: "content"
                },
                {
                    id: "member",
                    type: "member"
                },
                {
                    id: "with",
                    type: "string",
                    match: "flag",
                    flag: "-with"
                }
            ]
        })
    }

    public async exec(msg: Message, args: any):Promise<Message|undefined>{
        const member = await args.member ? args.member : ''
        msg.delete()
        if(args.with){
            const check = args.text.split('-with')
            const gif = check[1].length > 1 ? `anime${check[1]}` : 'anime smile'
                msg.channel.send(`${member} ${check[0]}`)
            const data = await tenor(gif, 4)
            if(data){
                msg.channel.send(data)
            }
            return
        }
        msg.channel.send(`${member} ${args.text}`)
        return 
    }
}