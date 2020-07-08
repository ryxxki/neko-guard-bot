import {GUIDE, LANG_SUPPORTED} from '../../components/BotSettingEmbed'
import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import DataHandler from '../../utils/DataHandler'

export default class SettingsGuide extends Command {
    public constructor(){
        super('settings_guide', {
            aliases: ['g', 'guide'],
            channel: 'guild',
            category: 'Settings Command',
            description: {
                content: 'Guide Settings Bot',
                usage: 'g [option]',
                example: "g [option]"
            },
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    id: 'options',
                    match: 'rest',
                    flag: ['-option', '-lang', '-prefix', '-bw']
                }
            ],
            ratelimit: 5,
        })
    }

    public async exec(msg: Message, args:any):Promise<Message|void>{
        if(args.options){
            switch (args.options) {
                case '-option':
                    
                    msg.reply('option')
                return
                case '-lang':
                    await LANG_SUPPORTED(msg)
                    msg.reply('lang')
                return
                case '-prefix':
                    msg.reply('prefix')
                return
                case '-bw':
                    msg.reply('bw')
                return
                default:
                    console.log('fireup')
                return
            }
        }
        return await GUIDE(msg)
    }
}