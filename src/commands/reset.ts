import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
require('dotenv').config()

export default class Reset extends Command {
    public constructor(){
        super('reset', {
            aliases: ['reset', 'restart'],
            category: 'Private Commands',
            channel: 'guild',
            description: {
                content: 'reset',
                usage: 'reset',
                example: [
                    "reset",
                    "restart"
                ]
            },
            userPermissions: ['ADMINISTRATOR'],
            cooldown: 5000,
            ratelimit: 2,
        })

    }
    public async exec(msg: Message):Promise<Message|void>{
     msg.channel.send('Resetting...')
    .then(msg => this.client.destroy())
    .then(() => this.client.login(process.env.TOKEN))
    }
}