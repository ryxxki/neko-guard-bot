import {MessageEmbed} from 'discord.js'
import {translate} from '../api'
/*
biru => #3498db
white => #ecf0f1
ungu => #9b59b6
yellow => #f1c40f
red => #e74c3c
green => #2ecc71
*/

export const DEFAULT = async (owner:any) => {
    const embed = await new MessageEmbed()
        .setColor('#e74c3c') //biru
        .setTitle(`Hola Owner of ${owner} :wave:`)
        .setURL('https://discord.gg/qGnJJv')
        .setDescription(`> well, Thanks for inviting me to your Server ~\n`)
        .addFields(
            {name: `:pushpin: Wanna Invite Me ?`, value: '`link`: https://discord.com/oauth2/authorize?client_id=713026835948240896&permissions=8&scope=bot'},
            {name: `:grey_exclamation: Helper`, value: '`!commands` showing list of all commands\n`!cmd <command name>` show the specifics of command\n`!info` do you want to know about me? :v\n\nif you have more question,\n`ask more at my server`'},
            {name: `:mag_right: Official Server`, value: `here : https://discord.gg/xqZBXN`}
        )
        .setThumbnail('https://media.tenor.com/images/df238172e129a54589f44189bb64748b/tenor.gif')
        .setTimestamp()
        .setFooter('salam hangat')
    return embed
}