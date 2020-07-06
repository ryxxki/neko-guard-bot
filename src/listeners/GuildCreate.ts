import {Listener} from 'discord-akairo'
import DataHandler from '../utils/DataHandler'
import {Guild,GuildMember} from 'discord.js'
import {DEFAULT} from '../components/GuildCreateEmbed'
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
            //await DataHandler.addGuild('guild', newGuild.ownerID)
            //kemudian DM owner
            //console.log(newGuild)
            const Owner:GuildMember = newGuild.member(newGuild.ownerID) as GuildMember
            await Owner.send(await DEFAULT(newGuild.name))
            return
        } catch (error) {
            console.log(error)
            return
        }
    }
}