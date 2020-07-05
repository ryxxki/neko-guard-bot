import {Message, MessageEmbed} from 'discord.js'
import {translate} from '../api'
import DataHandler from '../utils/DataHandler'

export const GUIDE = async (msg:Message, lang:any) => {
    let avGuild:string = msg.guild!.iconURL({dynamic: true}) as string
    return msg.channel.send(await new MessageEmbed()
        .setColor('#ecf0f1')
        .setTitle(`:gear: ${await translate("Bot Settings Guide", lang)}`)
        .setURL('https://discord.gg/upJx6a')
        .setDescription(`${await translate("read carefully", lang)} ~`)
        .addFields(
            {name: `--- ${await translate("Basic", lang)}`, value: `${await translate("status: enabled", lang)}`},
            {name: `> ${await translate("Set Prefix", lang)}`, value: '`<prefix>prefix <value>`', inline: true},
            {name: '\u200B', value: '\u200B', inline: true},
            {name: `> ${await translate("Set Language", lang)}`, value: '`<prefix>lang <option>`', inline:true},
            //{name: '\u200B', value: '\u200B'},
            {name: `--- ${await translate("Bad Words", lang)}`, value: `${await translate("status: ", lang)}true / false`},
            {name: `> ${await translate("Set Status", lang)}`, value: '`<prefix>bw <t/f>`', inline: true},
            {name: '\u200B', value: '\u200B', inline: true},
            {name: `> ${await translate("Show List", lang)}`, value: '`<prefix>bw list <value>`', inline: true},
            {name: `> ${await translate("Add", lang)}`, value: '`<prefix>bw add <value>`', inline: true},
            {name: '\u200B', value: '\u200B', inline: true},
            {name: `> ${await translate("Delete", lang)}`, value: '`<prefix>bw rm <value>`', inline: true},
        )
        .setThumbnail(msg.client.user!.displayAvatarURL({dynamic:true}))
        .setFooter(msg.guild?.name, avGuild)
        .setTimestamp()
    )
}  

export const DEFAULT = async (msg:Message, lang:any) => {
    //console.log(lang)
    return msg.channel.send(await new MessageEmbed()
        .addField(await translate(msg.content, lang), '~ okay :thumbsup:')
        .setColor('#ecf0f1')
    )
}

export const LANG_GUIDE = async (msg:Message, lang:any) => {
    let avGuild:string = msg.guild!.iconURL({dynamic: true}) as string
    return msg.channel.send(await new MessageEmbed()
        .setColor('#ecf0f1')
        .setTitle(`:flag_white: ${await translate("Language Supported", lang)}`)
        .setURL('https://discord.gg/upJx6a')
        .setDescription(`${await translate("read carefully", lang)} ~`)
        .addFields(
            {name: `--- ${await translate("Default", lang)}`, value: '`\'en\'` | English'},
            {name: 'English', value: `${await translate("by Typing", lang)} : \`1\``, inline: true}, //en
            {name: '\u200B', value: '\u200B', inline: true},
            {name: 'Bahasa', value: `${await translate("by Typing", lang)} : \`2\``, inline: true}, //id
            {name: 'Javanese', value: `${await translate("by Typing", lang)} : \`3\``, inline: true}, //jw
            {name: '\u200B', value: '\u200B', inline: true},
            {name: 'Japanese', value: `${await translate("by Typing", lang)} : \`4\``, inline: true}, //ja
        )
        .setThumbnail('https://media.tenor.com/images/4901a554a7fdc304f417f932cdd7c6c9/tenor.gif')
        .setFooter(msg.guild?.name, avGuild)
        .setTimestamp()
    )
}