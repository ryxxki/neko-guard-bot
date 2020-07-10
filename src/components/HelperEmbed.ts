import {Message, MessageEmbed} from 'discord.js'
import {translate} from '../api'
import DataHandler from '../utils/DataHandler'
let lang:any, embed:any
/*
    biru => #3498db
    white => #ecf0f1
    ungu => #9b59b6
    yellow => #f1c40f
    red => #e74c3c
    green => #2ecc71
*/


export const GLOBAL = async (msg: Message):Promise<Message> => {
    lang = await DataHandler.getLang(msg.guild!.id)
    let av = msg.guild?.client.user?.displayAvatarURL()
    embed = new MessageEmbed()
        .setColor('#9b59b6')
        .setTimestamp()
        .setAuthor('cheerful~bot', av)
        .setTitle('')
        .setThumbnail('https://media.tenor.com/images/b5a256f7ac359a6b507f80ecb43c6eb9/tenor.gif')
        .setDescription(`> ${await translate("Hey, Please read carefully ", lang)}
            > ${await translate("Prefix", lang)} : \` * \` & ${await translate("Language Default", lang)} : \` English \`
        `)
        .addFields(
            {name: `> General`, value: `
                \` info \`
                \` commands \`
                \` guide \`
                \` music \`
            `,inline: true},
            {name: `> Fun`, value: `
                \` talks \`
                \` translate \`
                \` give \`
            `, inline:true},
            {name: `> Configuration`, value: `
                \` banword \`
                \` language \`
                \` prefix \`
            `,inline:true},
            {name: `Example`, value: `\` <prefix>h <command name> / *h commands\``,inline:true}
        )
        .setFooter('requested')
    return msg.channel.send(embed)
}

export const INFO = async (msg:Message):Promise<Message> => {
    lang = await DataHandler.getLang(msg.guild!.id)
    let av = msg.guild?.client.user?.displayAvatarURL()
    embed = new MessageEmbed()
        .setColor('#9b59b6')
        .setTimestamp()
        .setAuthor('cheerful~bot', av)
        .setThumbnail('https://media.tenor.com/images/b5a256f7ac359a6b507f80ecb43c6eb9/tenor.gif')
        .setTitle(`${await translate("Prefix Default", lang)}: \` * \` |\u200B ${await translate("Language Default", lang)}: \` English \``)
        .setDescription(`${await translate("Server and Bot Information", lang)}`)
        .addFields(
            {name: `> ${await translate("Info Server", lang)}`, value: `
                \` Server \` ${msg.guild?.name}\n
                ${await translate("For get details of Your Server", lang)},\n ${await translate("type", lang)} \` *info -server\`
            `, inline: true},
            {name: `> Info Bot`, value: `
                \` Server \` Cheerful Forest\n
                ${await translate("For get details of The Bot", lang)},\n ${await translate("type", lang)} \` *info -bot\`
            `, inline: true}
        )
        .setFooter('requested')
    return msg.channel.send(embed)
}
// \` Owner \` ||${msg.guild?.member('565747416352030741')?.displayName}}||\n
// \` Developer \` ||${msg.guild?.member('622252136209580032')?.displayName}||||${msg.guild?.member('565747416352030741')?.displayName}|\n
// \` Created At \` ${msg.client.user?.createdAt.toDateString()}\n
// \` Desciption \` I'm a Weebs, created by the CheerfulForest server development team. \n
                
export const COMMANDS = async (msg:Message):Promise<Message> => {
    lang = await DataHandler.getLang(msg.guild!.id)
    let av = msg.guild?.client.user?.displayAvatarURL()
    embed = new MessageEmbed()
        .setColor('#9b59b6')
        .setTimestamp()
        .setAuthor('cheerful~bot', av)
        .setThumbnail('https://media1.tenor.com/images/ad4804e880c2edcecbb79217b479610a/tenor.gif?itemid=10903422')
        .setTitle(`${await translate("All Commands | read carefully", lang)} ~`)
        .setURL('http://tiny.cc/invite-bot')
        .setDescription(`Prefix Default of Commands : \` * \``)
        .addField(`> ${await translate("Some commands needed ADMINISTRATOR permission ", lang)}`, `
            \`*commands\` ${await translate("showing list of all commands", lang)}\n
            \`*info\` ${await translate("about server and bot", lang)}\n
            \`*lang\` ${await translate("change my language", lang)}\n
            \`*prefix\` ${await translate("set prefix of commands", lang)}\n
            \`*p / play / pause / resume / stop / skip / leave\` ${await translate("music player", lang)}\n
            \`*help\` helper${await translate("showing list of all commands", lang)}\n
            \`*bw / banword\` ${await translate("settings of banwords [new Feature]", lang)}\n
            \`*talks / t\` ${await translate("let's talk with AI bot [soon]", lang)}\n
            \`*translate\` ${await translate("translate language of the text [soon]", lang)}\n
            \`*give\` ${await translate("fun feature to make me send something to others member [soon]", lang)}\n
        `)
        .setFooter('requested')
        return msg.channel.send(embed)
}
export const GUIDE = async (msg:Message):Promise<Message> => {

    lang = await DataHandler.getLang(msg.guild!.id)
    let av = msg.guild?.client.user?.displayAvatarURL()
    embed = new MessageEmbed()
        .setColor('#9b59b6')
        .setTimestamp()
        .setThumbnail('https://media1.tenor.com/images/ad4804e880c2edcecbb79217b479610a/tenor.gif?itemid=10903422')
        .setAuthor('cheerful~bot', av)
        .setTitle(`:gear: ${await translate("Bot Settings Guide", lang)}`)
        .setURL('http://tiny.cc/invite-bot')
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
        .setFooter('requested')
    return msg.channel.send(embed)
    
}
export const MUSIC = async (msg:Message):Promise<Message> => {
    lang = await DataHandler.getLang(msg.guild!.id)
    let av = msg.guild?.client.user?.displayAvatarURL()
    embed = new MessageEmbed()
        .setColor('#9b59b6')
        .setTimestamp()
        .setThumbnail('https://media.tenor.com/images/b5a256f7ac359a6b507f80ecb43c6eb9/tenor.gif')
        .setAuthor('cheerful~bot', av)
        .setTitle('Music Player')
        .setURL('http://tiny.cc/invite-bot')
        .setDescription(`I will playing Your favorite song`)
        .addFields(
            {name: `> ${await translate("Play Queue", lang)}`, value: '\` <prefix>p / play \`', inline: true},
            {name: `> ${await translate("Pause Queue", lang)}`, value: '\` <prefix>pause \`', inline: true},
            {name: `> ${await translate("Resume Queue", lang)}`, value: '\` <prefix>resume \`', inline: true},
            {name: `> ${await translate("Skip Queue", lang)}`, value: '\` <prefix>skip \`', inline: true},
            {name: `> ${await translate("Stop Queue", lang)}`, value: '\` <prefix>stop \`', inline: true},
            {name: `> ${await translate("Bot Leave", lang)}`, value: '\` <prefix>leave \`', inline: true},
        )
        .setFooter('requested')
    return msg.channel.send(embed)
}
/*
export const TALKS = async (msg:Message):Promise<Message> => {
    
}
export const TRANSLATE = async (msg:Message):Promise<Message> => {
    
}
export const GIVE = async (msg:Message):Promise<Message> => {
    
}
*/
export const BANWORD = async (msg:Message):Promise<Message> => {
    lang = await DataHandler.getLang(msg.guild!.id)
    let embed = new MessageEmbed()
    .setTitle(`**${await translate("Ban Words", lang)}**`)
    .setDescription(`${await translate("default: false | status: ", lang)} true / false`)
    .addFields(
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
        {name: `> ${await translate("Toggle Auto Mute", lang)}`, value: '`<prefix>bw -mute`' + await translate("toggle mute options", lang), inline: true},
    )
    return msg.channel.send(embed)
}

export const LANGUAGE = async (msg:Message):Promise<Message> => {
    lang = await DataHandler.getLang(msg.guild!.id)
    let av = msg.guild?.client.user?.displayAvatarURL()
    embed = new MessageEmbed()
        .setColor('#9b59b6')
        .setAuthor('cheerful~bot', av)
        .setTitle(`${await translate("Language Supported", lang)}`)
        .setURL('http://tiny.cc/invite-bot')
        .setThumbnail('https://media1.tenor.com/images/ad4804e880c2edcecbb79217b479610a/tenor.gif?itemid=10903422')
        .setDescription(`> ${await translate("read carefully", lang)} ~`)
        .addField(await translate("Make sure to input correctly", lang), `
            \` en \` : English, 
            \` id \` : Bahasa,
            \` jw \` : Javanese, 
            \` ja \` : Japanese,
            \` ko \` : Korean,
            \` su \` : Sundanese,
            \` fr \` : French `, true)
        .addField(`\u200B`, `\u200B`, true)
        .addField(await translate("How to Use ? ", lang), `
            \` 2 Ways \`\n
            \` <prefix>lang <country code> \`
            \` <prefix>lang \` : ${await translate("with options", lang)}
            `, true)
        .setFooter('requested')
        .setTimestamp()
    return msg.channel.send(embed)
}

export const PREFIX = async (msg:Message):Promise<Message> => {
    lang = await DataHandler.getLang(msg.guild!.id)
    let av = msg.guild?.client.user?.displayAvatarURL()
    embed = new MessageEmbed()
        .setColor('#9b59b6')
        .setTimestamp()
        .setAuthor('cheerful~bot', av)
        //.setThumbnail('https://media1.tenor.com/images/ad4804e880c2edcecbb79217b479610a/tenor.gif?itemid=10903422')
        .setDescription(`${await translate("Prefix Default", lang)}: \` * \` | ${await translate("Prefix For Now ", lang)}: \` ${msg.content || '*'} \``)
        //.setDescription(`${await translate("Prefix Info", lang)}`)
        .setFooter('requested')
    return msg.channel.send(embed)
}
