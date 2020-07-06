import {Message, GuildMember, MessageEmbed} from 'discord.js'
import {Command} from 'discord-akairo'

export default class AvatarCommand extends Command {
    public constructor(){
        super("avatar", {
            aliases: ["avatar", "av"],
            category: "Public Commands",
            description: {
                content: "Menampilkan avatar member",
                usage: "avatar [member]",
                examples: [
                    "avatar",
                    "avatar @Member#0001",
                    "avatar member"
                ]
            },
            cooldown: 5000,
            ratelimit: 2,
            args: [
                {
                    id: "member",
                    type: "member",
                    default: (msg:Message) => msg.member
                }
            ]
        })
    }

    public exec(msg: Message, {member}: {member: GuildMember}):Promise<Message>{
        //exec(msg, args)
        //member => ref ke args id = member
        msg.util!.reply(`here`)
        return msg.util!.send(new MessageEmbed()
            .setTitle(`Avatar | ||${member.user.tag}||`)
            .setColor(`RANDOM`)
            .setImage(member.user.displayAvatarURL({dynamic: true, size:2048}))
        )
    }
}