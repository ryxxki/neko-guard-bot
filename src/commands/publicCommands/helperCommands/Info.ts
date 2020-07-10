import {BOT_PROFILE, SERVER_PROFILE} from '../../../components/InfoEmbed'
import {Command} from 'discord-akairo'
import {Message, ClientUser} from 'discord.js'

export default class Info extends Command {
    public constructor(){
        super('info', {
            aliases: ['info'],
            category: 'Helper',
            description: {
                content: 'Info',
                usage: 'info',
                example: ["info"]
            },
            cooldown: 5000,
            ratelimit: 1,
            args: [
                {
                    id: 'options',
                    type: 'lowercase',
                    match: 'phrase'
                }
            ]
        })
    }

    public async exec(msg: Message, args:any):Promise<Message|void>{
        try {
            console.log(args.options)
            switch (args.options) {
                case '-server':
                    await SERVER_PROFILE(msg, this.client.user as ClientUser)
                return
                case '-bot':
                    await BOT_PROFILE(msg, this.client.user as ClientUser)
                return
                default:
                return
            }
        } catch (error) {
            console.log(error)
            msg.content = 'Something Wrong , Try again later'
            return 
        }
        
    }
}