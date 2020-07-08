import {MessageEmbed,  ClientUser, Message} from 'discord.js'
import os from 'os-utils'
/*
    biru => #3498db
    white => #ecf0f1
    ungu => #9b59b6
    yellow => #f1c40f
    red => #e74c3c
    green => #2ecc71
*/

export const GUILD_CREATE_EMBED = async (owner:any) => {
    const embed = await new MessageEmbed()
        .setColor('#ecf0f1') //biru
        .setTitle(`Hola Owner of ${owner} :wave:`)
        //http://tiny.cc/bot-invite
        .setURL('http://tiny.cc/invite-cf-bot')
        .setDescription(`> well, thanks for inviting me to your Server ~\n`)
        .addFields(
            {name: `:pushpin: Want to Invite Me ?`, value: '`link`: http://tiny.cc/invite-cf-bot'},
            {name: `:grey_exclamation: Helper`, value: '`!commands` showing list of all commands\n`!info` do you want to know about me? :v\n\nif you have more question,\n`ask more at my server`'},
            {name: `:mag_right: Official Server`, value: 'here : https://discord.gg/xqZBXN'}
        )
        .setThumbnail('https://media.tenor.com/images/df238172e129a54589f44189bb64748b/tenor.gif')
        .setTimestamp()
        .setFooter('nice to meet you ~ UwU')
    return embed
}

export const GUILD_CREATE_SET_INFO_EMBED = async (owner:any) => {
    const embed = await new MessageEmbed()
        .setColor('#ecf0f1') //biru
        .setTitle(`Read Please :pray:`)
        .setDescription(`> Since me join to your server, there are some default settings that you should to know`)
        .addFields(
            {name: `:pushpin: Default Settings`,  //you can changes anytime at your server
                value: `> prefix set to \` ! \`\n > language default \` english \`\n > music \` enabled \`\n > ban word\` disabled \``},
            {name: ':exclamation: Note', value: `some people can use \`moderation commands\` if they have administrator permissions`}
        )
        .setThumbnail('https://media.tenor.com/images/ef34332bec620cc4e5fc14fe3d3c4fb6/tenor.gif')
        .setTimestamp()
        .setFooter('nice to meet you ~ UwU')
    return embed
}