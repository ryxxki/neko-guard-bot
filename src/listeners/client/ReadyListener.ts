import { Listener } from 'discord-akairo'
const status = ["#MakanBang", "#PakaiMasker", "#CuciTangan"]
export default class ReadyListener extends Listener{
    public constructor(){
        super('ready', {
            emitter: "client",
            event: "ready",
            category: "client"
        })
    }

    public exec():void{
        this.client.user?.setStatus('online')
        console.log(`${this.client.user?.tag} is now online and ready`)
        setInterval(() => {
            this.client.user!.setActivity(
            status[Math.floor(Math.random() * Math.floor(status.length))], 
            { type:'PLAYING'})
        }, 1000)
        //this.client.user!.setActivity("Cheerful~Forest", { type:'PLAYING'})
    }
}