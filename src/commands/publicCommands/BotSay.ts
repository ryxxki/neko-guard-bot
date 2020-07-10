import {Message, GuildMember, MessageEmbed} from 'discord.js'
import {Command} from 'discord-akairo'

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
                    type: "text",
                    match: "phrase"
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

    public exec(msg: Message, {member}: {member: GuildMember}):Promise<Message|undefined>{
        console.log('ok')
        return msg.reply('soon')
    }
}