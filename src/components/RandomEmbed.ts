import {Message, MessageEmbed} from 'discord.js'
import {translate} from '../api'
import DataHandler from '../utils/DataHandler'
let lang:any

export const BAN_WORD = async (msg:Message):Promise<Message> => {
    let bambang = msg.author.displayAvatarURL()
    let embed = new MessageEmbed() //buat set embed discord card message
      .setTitle("Banned Word Detected !")
      .addField("Members ",msg.author)
      .setFooter(msg.guild!.name)
      .setColor("#3498db")
      .setThumbnail(bambang)
    return msg.channel.send(embed)
}

