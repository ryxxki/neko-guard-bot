import { Listener } from 'discord-akairo'
import {MessageEmbed, GuildChannel} from 'discord.js'
export default class MemberAdded extends Listener{
    public constructor(){
        super('MemberAdd',{
            emitter: 'client',
            event: 'guildMemberAdd',
            category: 'guild'
        })
    }

    public exec(member: GuildChannel):void{
        const channel = member.guild.channels.cache.find(ch => ch.id === '725946613801025617')
        // const chnl = this.client.channels.cache.get('715702893944242199')?.
        // chnl?.fetch
        
    }
}