import { Listener } from 'discord-akairo'
import DataHandler from '../../utils/DataHandler'
import { Message } from 'discord.js'
import {BAN_WORD} from '../../components/RandomEmbed'
import { MessageEmbed } from 'discord.js'

export default class MessageListener extends Listener{
    public constructor(){
        super('message', {
            emitter: "client",
            event: "message",
            category: "client"
        })
    }

    public async exec(msg: Message):Promise<any>{
        try {
            //TODO: FILTER
            if(msg.author.bot) return 
            let message = msg.content.toLowerCase().split(' ')
            let ban_word = await DataHandler.getBanWord(msg.guild?.id)
            if(ban_word && ban_word.status && ban_word.onChannel.length >= 1){
                const check = await ban_word.onChannel.find((d:any) => d === msg.channel!.id)
                if(check){
                    const data = await ban_word.words.find((word:any) => message.find((m:any)=> word == m))
                    if(data){ 
                        await msg.delete()
                        return await BAN_WORD(msg)   
                    }
                    return
                }
                return 
            }



            let cookIMG = [
                "https://pa1.narvii.com/5799/fed48996801958f00895458e6eb2701ef9c192ae_hq.gif", 
                "https://i.pinimg.com/originals/5a/93/c0/5a93c0afbcab2a12a9d73e4506686def.gif",
                "https://geekoutsw.files.wordpress.com/2015/05/0bcdc28fb98e86fdb8680adab87a71c2.gif?w=700"
            ]
            if(msg.content == "cook"){
                let embed = new MessageEmbed() //buat set embed discord card message
                .setImage(cookIMG[Math.floor(Math.random() * Math.floor(cookIMG.length))])
                .setColor(`RANDOM`)
                msg.channel.send("Here here !!! <@" + msg.author + ">")
                msg.channel.send(embed)
                return
           }
            if(msg.content == "card"){
                let embed = new MessageEmbed() //buat set embed discord card message
                .setImage("https://cdn.animesoul.com/images/cards/6/1572137570476.gif")
                .setColor(`FF0000`)
                msg.channel.send(embed)
                return
           }
            if(msg.content == "card1"){
                let embed = new MessageEmbed() //buat set embed discord card message
                .setImage("https://cdn.discordapp.com/attachments/708485108453212283/722791987702398976/Rory_Mercury_Tier_6.jpg")
                .setTitle('Rory Mercury Tier: 6')
                .setURL('https://animesoul.com/cards/info/5d3112b06b245e5b11e59d78')
                .addField("To claim, use: ``claim [captcha code]``", '')
                .addField("See your collected cards here.", 'https://animesoul.com/inventory')
                .setColor(`FF0000`)
                msg.channel.send(embed)
                return
           }
            if(msg.content == "card claimed"){
                let embed = new MessageEmbed() //buat set embed discord card message
                .setImage("https://media.discordapp.net/attachments/708650649486622773/725165639836237824/Lain_Iwakura5Serial_Experiments_LainOriginal.png?width=464&height=597")
                .setTitle("Fusion By: ||Gktau09||#1001 Lain Iwakura Tier: 5")
                .setColor(`FFFF00`)
                msg.channel.send(embed)
                return
           }
            if(msg.content == "Oagariyo"){
                let embed = new MessageEmbed() //buat set embed discord ")
                .setImage("https://media2.giphy.com/media/2ey7YsQRFczEQ/giphy.gif")
                .setColor(`RANDOM`)
                msg.channel.send("Oagariyo!!! <@" + msg.author + ">")
                msg.channel.send(embed)
                return
           }
           let ttrIMG = [
             "https://media1.tenor.com/images/1982b3d1e14ee257ca55638e5e5a1778/tenor.gif", 
               "https://66.media.tumblr.com/118055dbef9df883a8cee6c3dbc15eed/7f8d7efabbf6910d-53/s500x750/3d10316265388c2519ac1a2e1aa363993b7447e5.gif",
               "https://66.media.tumblr.com/398e933d00e6fc03e6afa3f309d9d01b/f272bb4600f42f94-a8/s500x750/90eff5b98d8db95de64649c6767a7b61c5e607b5.gif",
               "https://46.media.tumblr.com/b8ecd131e8500255e85b4751e21ccb7e/tumblr_oodajm9OVn1utlkb0o2_500.gif",
               "https://i.pinimg.com/originals/14/ae/26/14ae266b958f23e01b3124db7d352df7.gif",
               "https://66.media.tumblr.com/eb007b8e20bb9cc68c1f1f70de0f61f1/tumblr_oa5svzf0wS1vuwxr3o7_250.gif",
               "https://66.media.tumblr.com/eb23953728f9ea8631ea311427f9ac42/tumblr_obv28sZlgf1ty8mv1o2_r1_500.gif",
               "https://pa1.narvii.com/6727/fc111b98389953197f243160ee143618128adea7_00.gif",
               "https://thumbs.gfycat.com/IncomparableEagerArgali-small.gif",
               "http://fanaru.com/shokugeki-no-souma/image/173811-shokugeki-no-souma-ready-to-cook.gif",
               "https://46.media.tumblr.com/7b703c8c8fe02e982bfecfb04b564db0/tumblr_p91sytwoC01qzxv73o1_540.gif",
               "https://66.media.tumblr.com/0197f1dc537d49337595a1397493f1b1/555c9e296b040921-e5/s500x750/15304c0c7eceaefe2b1d0a24ab8c62d7e821e348.gif",
               "https://i.pinimg.com/originals/81/af/88/81af880326a06f25743bbee3e7add079.gif",
               "https://66.media.tumblr.com/01bc0e459653945cba02169ba1fcb30a/tumblr_pz82de4Rb31w38yryo4_500.gif",
               "https://i.imgur.com/elHjPt1.gif",
               "https://66.media.tumblr.com/71bbe2fdde8371655668566db613e539/tumblr_oyrhkvGJOk1ut5ryuo1_500.gif"
            ]
            if(msg.content == "ttr"){
                let embed = new MessageEmbed() //buat set embed discord card message
                .setImage(ttrIMG[Math.floor(Math.random() * Math.floor(ttrIMG.length))])
                .setColor(`RANDOM`)
                msg.channel.send(" <@" + msg.author + "> You Got The:")
                msg.channel.send(embed)
                return
          }
            return //benar" gaada
        } catch (error) {
            console.log(error)
            return
        }

    }
}