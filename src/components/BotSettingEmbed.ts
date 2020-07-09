import {Message, MessageEmbed} from 'discord.js'
import {translate} from '../api'
import DataHandler from '../utils/DataHandler'
let lang:any

export const GUIDE = async (msg:Message):Promise<Message> => {
    lang = await DataHandler.getLang(msg.guild!.id)
    let avGuild:string = msg.guild!.iconURL({dynamic: true}) as string
    return msg.channel.send(new MessageEmbed()
        .setColor('#ecf0f1')
        .setTitle(`:gear: ${await translate("Bot Settings Guide", lang)}`)
        .setURL('https://discord.gg/upJx6a')
        .setDescription(`${await translate("read carefully", lang)} ~`)
        .addFields(
            //FIXME: basic
            {name: `---------------- **${await translate("Basic", lang)}**`, value: `${await translate("status: enabled", lang)}`},
            {name: `> ${await translate("Set Prefix", lang)}`, value: '`<prefix>prefix <value>`', inline: true},
            {name: '\u200B', value: '\u200B', inline: true},
            {name: `> ${await translate("Set Language", lang)}`, value: '`<prefix>lang`', inline:true},
            //{name: '\u200B', value: '\u200B'},
            //FIXME: Language
            {name: `---------------- **${await translate("Language", lang)}**`, value: `${await translate("default: English", lang)}`},
            // <==> value <==>
            {name: `> ${await translate("Supported Language", lang)}`, value: '`<prefix>g -lang`', inline: true},
            {name: '\u200B', value: '\u200B', inline: true},
            {name: `> ${await translate("Change With Code", lang)}`, value: '`<prefix>lang <code>`', inline: true},
            {name: `> ${await translate("Change With Option", lang)}`, value: '`<prefix>lang`', inline: true},
            //FIXME: Ban Words
            {name: `---------------- **${await translate("Ban Words", lang)}**`, value: `${await translate("default: false | status: ", lang)} true / false`},
            // <==> value <==>
            {name: `> ${await translate("Toggle Status", lang)}`, value: '`<prefix>bw -set`', inline: true},
            {name: '\u200B', value: '\u200B', inline: true},
            {name: `> ${await translate("Show List", lang)}`, value: '`<prefix>bw -list`', inline: true},
            {name: `> ${await translate("Add Words", lang)}`, value: '`<prefix>bw +add <value>`', inline: true},
            {name: '\u200B', value: '\u200B', inline: true},
            {name: `> ${await translate("Delete Word", lang)}`, value: '`<prefix>bw -rm <value>`', inline: true},
            {name: `> ${await translate("Add filtered Channels", lang)}`, value: '`<prefix>bw +channel <value>`', inline: true},
            {name: '\u200B', value: '\u200B', inline: true},
            {name: `> ${await translate("Remove filtered Channels", lang)}`, value: '`<prefix>bw -channel <value>`', inline: true},
            {name: `> ${await translate("Toggle Auto Mute", lang)}`, value: `\`<prefix>bw -mute\` ${await translate("toggle mute options", lang)}`, inline: true},
        )
        .setThumbnail(msg.client.user!.displayAvatarURL({dynamic:true}))
        .setFooter('requested', avGuild)
        .setTimestamp()
    )
}  

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

export const LANG_SUPPORTED = async (msg:Message):Promise<Message> => {
    lang = await DataHandler.getLang(msg.guild!.id)
    let avGuild:string = msg.guild!.iconURL({dynamic: true}) as string
    return msg.channel.send(await new MessageEmbed()
        .setColor('#ecf0f1')
        .setTitle(`:flag_white: ${await translate("Language Suported", lang)}`)
        .setURL('https://discord.gg/upJx6a')
        .setDescription(`> ${await translate("read carefully", lang)} ~`)
        .addFields(
            {name: `${await translate("Make sure to input correctly", lang)}`, value: `
                \` en \` : English,
                \` id \` : Bahasa,
                \` jw \` : Javanese,
                \` ja \` : Japanese,
                \` ko \` : Korean,
                \` su \` : Sundanese,
                \` fr \` : French,
            `},
        )
        .setFooter(msg.guild?.name, avGuild)
        .setTimestamp()
    )
}