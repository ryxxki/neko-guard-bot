import { Listener } from 'discord-akairo'
import DataHandler from '../../utils/DataHandler'
import {UPDATE_INFO_DM} from '../../components/InfoEmbed'
export default class ReadyListener extends Listener{
    public constructor(){
        super('ready', {
            emitter: "client",
            event: "ready",
            category: "client"
        })
    }

    public exec():void{
        //TODO: active
        const user:any = this.client.users.cache.map(e => e.id).length
        let status = ["Yang Pake Masker", "CheerfulForest", `with ${user} users`]
        this.client.user?.setStatus('online')
        console.log(`${this.client.user?.tag} is now online and ready`)
        //TODO: send message also set ban_word of guild
        this.client.guilds.cache.forEach(async e => {
            DataHandler.setBanWord(e.id)
            const msg = `Restart Server. Previous settings such as language and prefix commands has been resetting `//when updated ... `
            //`I have been updated by the owner. Previous settings such as language and prefix commands are reset when updated ... `
            e.owner?.send(await UPDATE_INFO_DM(msg))
        })
        setInterval(() => {
            this.client.user!.setActivity(
            status[Math.floor(Math.random() * Math.floor(status.length))], 
            { type:'WATCHING'})
        }, 10000)
    }
}