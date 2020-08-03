import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { INFO, COMMANDS, GUIDE, MUSIC, LANGUAGE, PREFIX, GLOBAL, BANWORD } from '../../../components/HelperEmbed'
import DataHandler from '../../../utils/DataHandler'
export default class Helper extends Command {
    public constructor(){
        super('helper', {
            aliases: ['h', 'help'],
            category: 'Helper',
            channel: 'guild',
            description: {
                content: 'Helper',
                usage: 'h -[value]',
                example: "h -[value]"
            },
            userPermissions: 'SEND_MESSAGES',
            args: [
                {
                    id: 'options',
                    type: 'lowercase',
                    match: 'phrase',
                    //flag: ['-option', '-lang', '-prefix', '-bw']
                }
            ],
            ratelimit: 5,
        })
    }
    public async exec(msg: Message, args:any):Promise<Message|void>{
        if(args.options){
            switch (args.options.toLowerCase()) {
                case 'info':
                    await INFO(msg)
                return
                case 'commands':
                    await COMMANDS(msg)
                return
                case 'guide':
                    await GUIDE(msg)
                return
                case 'music':
                    await MUSIC(msg)
                return
                case 'talks':
                    msg.reply('soon!')
                return
                case 'translate':
                    msg.reply('soon!')
                return
                case 'give':
                    msg.reply('soon!')
                return
                case 'banword':
                    await BANWORD(msg)
                return
                case 'language':
                    await LANGUAGE(msg)
                return
                case 'prefix':
                    msg.content = DataHandler.getPrefix(msg.guild!.id)
                    await PREFIX(msg)
                return
                default:
                    await GLOBAL(msg)
                return
            }
        }
        return await GLOBAL(msg)
    }
}