import {Listener} from 'discord-akairo'
import DataHandler from '../../utils/DataHandler'
import {Guild,GuildMember} from 'discord.js'
import {GUILD_CREATE_EMBED, GUILD_CREATE_SET_INFO_EMBED} from '../../components/GuildCreatedEmbed'
export default class GuildCreated extends Listener{
    public constructor(){
        super('BotJoin',{
            emitter: 'client',
            event: 'guildCreate',
            category: 'guild',
            type: 'on'
        })
    }

    public async exec(newGuild: Guild):Promise<void>{
        try {
            //console.log('owner: ',newGuild.ownerID)
            //console.log(newGuild)
            //TODO: Add data guild ke database
            await DataHandler.addGuild(newGuild.id, newGuild.ownerID)
            //kemudian DM owner
            const Owner:GuildMember = newGuild.member(newGuild.ownerID) as GuildMember
            await Owner.send(await GUILD_CREATE_EMBED(newGuild.name))
            await Owner.send(await GUILD_CREATE_SET_INFO_EMBED(newGuild.name))
            return
        } catch (error) {
            console.log(error)
            return
        }
    }
}