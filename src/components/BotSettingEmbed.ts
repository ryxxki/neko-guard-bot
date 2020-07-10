import {Message, MessageEmbed} from 'discord.js'
import {translate} from '../api'
import DataHandler from '../utils/DataHandler'
let lang:any

export const DEFAULT = async (msg:Message):Promise<Message>  => {
    lang = await DataHandler.getLang(msg.guild!.id)
    return msg.channel.send(await new MessageEmbed()
        .addField(await translate(msg.content, lang), '~ okay :thumbsup:')
        .setColor('#ecf0f1')
    )
}

export const REJECTED = async (msg:Message):Promise<Message>  => {
    lang = await DataHandler.getLang(msg.guild!.id)
    return msg.channel.send(await new MessageEmbed()
        .addField(`:x: ${await translate(msg.content, lang)}`, '~ okay :thumbsup:')
        .setColor('#e74c3c')
    )
}

export const LIST = async (msg:Message, data:any):Promise<Message>  => {
    lang = await DataHandler.getLang(msg.guild!.id)
    return msg.channel.send(await new MessageEmbed()
        .addField(`${await translate('All Banned Words', lang)}`, '```css\n'+data.words+'\n```')
        .setColor('#ecf0f1')
    )
}

export const LANG_OPTION = async (msg:Message):Promise<Message>  => {
    lang = await DataHandler.getLang(msg.guild!.id)
    let avGuild:string = msg.guild!.iconURL({dynamic: true}) as string
    return msg.channel.send(await new MessageEmbed()
        .setColor('#ecf0f1')
        .setTitle(`:flag_white: ${await translate("Change Bot Language", lang)}`)
        .setURL('https://discord.gg/upJx6a')
        .setDescription(`${await translate("read carefully", lang)} ~`)
        .addFields(
            {name: `--- ${await translate("Default", lang)}`, value: '`\'en\'` | English'},
            {name: 'English', value: `${await translate("by Typing", lang)} : \`1\``, inline: true}, //en
            
            {name: 'Bahasa', value: `${await translate("by Typing", lang)} : \`2\``, inline: true}, //id
            {name: 'Javanese', value: `${await translate("by Typing", lang)} : \`3\``, inline: true}, //jw
           
            {name: 'Japanese', value: `${await translate("by Typing", lang)} : \`4\``, inline: true}, //ja
            {name: 'Korean', value: `${await translate("by Typing", lang)} : \`5\``, inline: true}, //ja
           
            {name: 'Sundanese', value: `${await translate("by Typing", lang)} : \`6\``, inline: true}, //ja
            {name: 'French', value: `${await translate("by Typing", lang)} : \`7\``, inline: true}, //ja
        )
        .setThumbnail('https://media.tenor.com/images/4901a554a7fdc304f417f932cdd7c6c9/tenor.gif')
        .setFooter(msg.guild?.name, avGuild)
        .setTimestamp()
    )
}




// export const COMMAND_GUIDE = async (msg:Message) => {
//     const embed = await new MessageEmbed()
//         .setColor('#ecf0f1')
//         .setTitle(`All Commands`)
//         .setURL('http://tiny.cc/invite-bot')
//         .setDescription(`> okay ~\n`)
//         .addField('Here', `
//             \`!commands\` showing list of all commands\n
//             \`!info\` all about me\n
//             \`!lang\` change my language\n
//             \`!prefix <newPrefix>\` | \`!prefix info\` all about prefix\n
//             \`!<p [withSearchKey] / play / stop / skip / resume / pause / leave>\` music commands\n
//             \`!set\` showing the guide of commands settings
//         `)
//         .setThumbnail('https://media.tenor.com/images/ef34332bec620cc4e5fc14fe3d3c4fb6/tenor.gif')
//         .setTimestamp()
//         .setFooter('requested')
//         return msg.channel.send(embed)
// }