import {Message, MessageEmbed} from 'discord.js'

export const DEFAULT_EMBED = (msg: Message, queue:any):Promise<Message> => 
{
    let av = msg.author.displayAvatarURL({dynamic: true})
    return msg.channel.send(new MessageEmbed()
        .setAuthor(`${msg.author.username}`, av)
        .setTitle(`${queue.list[queue.list.length - 1].title} ~ [ ${msg.content} ]`)
        .setDescription(queue.list[queue.list.length - 1].description || "none description")
        .setThumbnail(queue.list[queue.list.length - 1].thumbnail)
        .setFooter(msg.guild!.name, msg.guild!.iconURL({dynamic: true}) as string)
        .setColor(`#2ecc71`)
    )
}

export const SIMPLE_EMBED = (msg: Message, gif:string = "https://media1.tenor.com/images/e9808bd93cc8961ef81e6fa8ae560046/tenor.gif?itemid=13857197"):Promise<Message> =>
{
    let av = msg.author.displayAvatarURL({dynamic: true})
    return msg.channel.send(new MessageEmbed()
              .setAuthor(`${msg.author.username}`, av)
              .addField(msg.content, '~ okay :thumbsup:')
              .setThumbnail(gif)
              .setColor(`BLUE`)
    )
}

export const PLAY_EMBED = (msg: Message, queue:any):Promise<Message> =>
{
    let av = msg.author.displayAvatarURL({dynamic: true})
    return msg.channel.send(new MessageEmbed() //buat set embed discord card message
              .setAuthor(msg.author.username, av)
              .setTitle(`[||${msg.content}||] ~ ${queue.list[0].title}`)
              .setDescription(queue.list[0].description || "none description")
              .setThumbnail(queue.list[0].thumbnail)
              .setFooter(msg.guild!.name, msg.guild!.iconURL({dynamic: true}) as string)
              .setColor(`#2ecc71`)
    )
}