import {GUIDE} from '../../components/BotSettingEmbed'
import {Command} from 'discord-akairo'
import {Message} from 'discord.js'
import {translate} from '../../api'
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
            args: [
                {
                    id: 'options',
                    match: 'rest',
                    flag: ['--option', '--lang', '--prefix', '--bw']
                }
            ],
            ratelimit: 2,
        })
    }

    public async exec(msg: Message, args:any):Promise<Message|void>{
        //console.log(args.options)
        if(args.options){
            switch (args.options) {
                case '--option':
                    console.log('option')
                return
            
                default:
                    console.log('fireup')
                return
            }
        }
        const lang:any = await DataHandler.getLang('guild', msg.guild!.id)
        return await GUIDE(msg, lang)
    }
}