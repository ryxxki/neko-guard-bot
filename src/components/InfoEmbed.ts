import {MessageEmbed,  ClientUser, Message} from 'discord.js'
import {translate} from '../api'
import os from 'os-utils'
/*
    biru => #3498db
    white => #ecf0f1
    ungu => #9b59b6
    yellow => #f1c40f
    red => #e74c3c
    green => #2ecc71
*/

export const BOT_PROFILE_DM_EMBED = async (msg: Message, client:ClientUser): Promise<Message> => {
    const embed = await new MessageEmbed()
        .setColor('#ecf0f1') 
        .setAuthor(`${client.username} | ${client.id}`, client.displayAvatarURL({dynamic:true}))
        .setTitle(`About Me ~`)
        .setURL('http://tiny.cc/invite-bot')
        .setDescription(`> I'm a Weebs, created by the CheerfulForest server development team ~\n`)
        .addFields(
            {name: `tag`, value: `\`${client.tag}\``, inline:true},
            {name: `name`, value: `\`${client.username}\``, inline:true},
            {name: `created at`, value: `\`${client.createdAt.toDateString()}\``, inline: true},
            {name: `ownerID`, value: `\`human0623\``, inline: true},
            {name: `freemem`, value: `\`${Math.floor(os.totalmem())}\``, inline: true},
            {name: `Official Server`, value: `https://discord.gg/xqZBXN`, inline:true}
        )
        .setThumbnail(client.displayAvatarURL({dynamic: true, size:512}))
        .setTimestamp()
        .setFooter('requested')
    return msg.channel.send(embed)
}

export const COMMAND_DM_EMBED = async (msg:Message) => {
    const embed = await new MessageEmbed()
        .setColor('#ecf0f1')
        .setTitle(`All Commands I Have`)
        .setURL('http://tiny.cc/invite-bot')
        .setDescription(`> okay ~\n`)
        .addField('Here', `
            \`!commands\` showing list of all commands\n
            \`!info\` all about me\n
            > all commands below only work at your guild when u have invite me \n
            \`!lang\` change my language\n
            \`!prefix <newPrefix>\` | \`!prefix info\` all about prefix\n
            \`!<p [withSearchKey] / play / stop / skip / resume / pause / leave>\` music commands\n
            \`!set\` showing the guide of commands settings
        `)
        .setThumbnail('https://media.tenor.com/images/ef34332bec620cc4e5fc14fe3d3c4fb6/tenor.gif')
        .setTimestamp()
        .setFooter('requested')
        return msg.channel.send(embed)
}

export const UPDATE_INFO_DM = async (msg:any):Promise<any> => {
    let embed = new MessageEmbed() //buat set embed discord card message
      .setTitle(msg)
      .setFooter(`notification | cheerful~bot`)
      .addField(`> So what's new?`, `
      \` Ban Words \` now is working\n
      \` Settings Tools \` fixed\n
      \` Notification \` added for DM The Owner Of Server when me was updated\n
      \` Music Player \` fixed bug\n
      `)
      .setColor("#f1c40f")
      .setThumbnail('https://media.tenor.com/images/fcab1b0f11f45631006ea557928c39f8/tenor.gif')
      .setTimestamp()
    return embed
}
