import {Message, MessageEmbed} from 'discord.js'
import DataHandler from '../utils/DataHandler'
import {translate} from '../api'
let lang:any
export const DEFAULT_EMBED = async (msg: Message, queue:any):Promise<Message> => 
{
    lang = await DataHandler.getLang(msg.guild!.id)
    let av = msg.author.displayAvatarURL({dynamic: true})
    return msg.channel.send(new MessageEmbed()
        .setAuthor(await translate(msg.content, lang), av)
        .setTitle(`${queue.list[queue.list.length - 1].title}`)
        .addFields(
            {name: `duration`, value: `${queue.list[queue.list.length - 1].duration}`, inline:true},
            {name: `position`, value: `${queue.list.length}`, inline:true},
            {name: `uploaded`, value: `${queue.list[queue.list.length - 1].uploaded_at}`, inline:true}
        )
        .setThumbnail(queue.list[queue.list.length - 1].thumbnail)
        .setFooter(msg.guild!.name, msg.guild!.iconURL({dynamic: true}) as string)
        .setColor(`#2ecc71`)
    )
}

export const SIMPLE_EMBED = async (msg: Message):Promise<Message> =>
{
    lang = await DataHandler.getLang(msg.guild!.id)
    let av = msg.author.displayAvatarURL({dynamic: true})
    return msg.channel.send(new MessageEmbed()
              .setAuthor(`${msg.author.username}`, av)
              .addField(await translate(msg.content, lang), '~ okay :thumbsup:')
              .setColor(`BLUE`)
    )
}

export const PLAY_EMBED = async (msg: Message, queue:any):Promise<Message> =>
{
    lang = await DataHandler.getLang(msg.guild!.id)
    let av = msg.author.displayAvatarURL({dynamic: true})
    return msg.channel.send(new MessageEmbed() //buat set embed discord card message
              .setAuthor(await translate(msg.content, lang), av)
              .setTitle(`:notes: ${queue.list[0].title}`)
              .addFields(
                {name: `duration`, value: `${queue.list[0].duration}`, inline:true},
                {name: `position`, value: `1`, inline:true},
                {name: `uploaded`, value: `${queue.list[0].uploaded_at}`, inline:true},
                {name: `${queue.list[0].views} views`, value: `${queue.list[0].description ? queue.list[0].description : 'none'}`}
            )
              .setThumbnail(queue.list[0].thumbnail)
              .setFooter(msg.guild!.name, msg.guild!.iconURL({dynamic: true}) as string)
              .setColor(`#2ecc71`)
    )
}