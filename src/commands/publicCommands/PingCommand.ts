import {Command} from 'discord-akairo'
import {Message} from 'discord.js'

export default class PingCommand extends Command{
    public constructor() {
        super('ping', {
            aliases: ["ping"],
            category: "Public Commands",
            description: {
                content: "Cek Waktu Respon Bot",
                usage: "ping",
                examples: [
                    "ping"
                ]
            },
            ratelimit: 2
        })
    }
    public before():void{
        //return console.log(this.client.commandHandler.cooldowns)
    }
    public exec(message: Message):Promise<Message>{
       
        return message.util!.send(`Pong! \`${this.client.ws.ping}ms\``)
    }
}