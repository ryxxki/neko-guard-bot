import {BOT_PROFILE_DM_EMBED} from '../../components/InfoEmbed'
import {Command} from 'discord-akairo'
import {Message, ClientUser} from 'discord.js'
export default class InfoDm extends Command {
    public constructor(){
        super('bot_info', {
            aliases: ['info'],
            category: 'Public Commands',
            description: {
                content: 'Info Bot',
                usage: 'info',
                example: ["info"]
            },
            cooldown: 5000,
            ratelimit: 2
        })
    }

    public async exec(msg: Message):Promise<Message|void>{
        try {
            return await BOT_PROFILE_DM_EMBED(msg, this.client.user as ClientUser)
        } catch (error) {
            console.log(error)
            msg.content = 'Something Wrong , Try again later'
            return 
        }
        
    }
}