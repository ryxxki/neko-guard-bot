import {Message, GuildMember, MessageEmbed} from 'discord.js'
import {Command} from 'discord-akairo'

export default class AbsenCommand extends Command {
    public constructor(){
        super("absen", {
            aliases: ["absen"],
            category: "Public Commands",
            description: {
                content: "Absen",
                usage: "avatar [member]",
                examples: [
                    "absen"
                ]
            },
            ratelimit: 2,
        })
    }

    public async exec(msg: Message):Promise<Message>{
        msg.util!.reply(`here`)
        let bambang = msg.author.displayAvatarURL({dynamic: true})
        let embed = await new MessageEmbed() //buat set embed discord card message
              .setTitle(`:newspaper: Data Absensi :newspaper:`)
              .setAuthor(msg.author.username, bambang)
              // .setDescription('\u200B')
              .addField("Akun Yang Bernama : ",msg.author.tag)
              .addField("BerID : ",msg.author.id)
              .addField("Catatan : ", "Anda Telah Absen Hari Ini, Jangan Lupa Absen Di Hari Berikutnya")
              .setThumbnail(bambang)
              //.setImage(msg.author.avatarURL())
              .setFooter(msg.guild!.name, msg.guild!.iconURL({dynamic: true}) as string)
              .setColor(`RANDOM`)
        return msg.reply(embed)

    }
}