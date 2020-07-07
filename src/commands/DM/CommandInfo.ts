import {COMMAND_DM_EMBED, BOT_PROFILE_DM_EMBED} from '../../components/InfoEmbed'
import {Command} from 'discord-akairo'
import {Message, ClientUser} from 'discord.js'
export default class InfoDm extends Command {
    public constructor(){
        super('commands_dm', {
            aliases: ['commands'],
            category: 'DM',
            description: {
                content: 'Info Commands Bot',
                usage: 'commands',
                example: ["commands"]
            },
            channel: 'dm',
            cooldown: 5000,
            ratelimit: 1
        })
    }

    public async exec(msg: Message):Promise<Message | void>{
        try {
            return await COMMAND_DM_EMBED(msg)
        } catch (error) {
            console.log(error)
            //msg.content = 'Something Wrong , Try again later'
            return //await COMMAND_EMBED(msg)
        }
        
    }
}