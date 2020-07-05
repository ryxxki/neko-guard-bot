import ytdl from 'ytdl-core'
import {translate} from '../api'
import {VoiceConnection} from 'discord.js'
import {DEFAULT_EMBED, SIMPLE_EMBED, PLAY_EMBED} from '../components/MusicEmbed'

export let QUEUE:any = {
    id: "",
    list: []
}
export let CONNECTION:VoiceConnection

export const PLAY = async (conn:VoiceConnection, msg: any, lang:any):Promise<void> => {
    try {
        //TODO: store koneksi ke CONNECTION
        CONNECTION = conn
        //TODO: play music
        CONNECTION.play(ytdl(QUEUE.list[0].link, {filter: 'audioonly'}))
        //TODO: when started
        CONNECTION.dispatcher.on('start', async () => {
            msg.content = `:notes: ${await translate("Now playing", lang)}`
            PLAY_EMBED(msg, QUEUE)
            console.log('playing music : ', QUEUE.list[0].link)
            return
        })
        //TODO: when finished
        CONNECTION.dispatcher.on('finish', async () => {
            //TODO: delete first  queue from QUEUE list
            await QUEUE.list.shift()
            //TODO: check apakah list queue masih ada
            if(QUEUE.list.length >= 1){
                //TODO: kalau masih ada reRun PLAY
                PLAY(CONNECTION, msg, lang)
                return 
            }
            //TODO: kalau list queue sudah ga ada / kosong,
            setTimeout(async () => {
                //TODO: check terakhir apakah list queue masih ada
                if(QUEUE.list.length >= 1){
                    return
                }  
                //TODO: ketika list queue benar" ga ada, auto leave
                //TODO: hapus id voiceChannel dan pastikan list queue kosong juga
                if(CONNECTION.status == 4) return
                QUEUE.id = "" 
                QUEUE.list = []
                // bagian embed <==
                    msg.content = `${await translate("The queue is empty, I'll get out", lang)}`
                    SIMPLE_EMBED(msg)
                //TODO: bot disconnect dari voiceChannel
                return CONNECTION.disconnect()            
            }, 40000)
            return
        })
        CONNECTION.dispatcher.on('error', async() => {
            console.log(`err from musicplayer`)
            msg.content = `${await translate("Error while trying to play the song", lang)}`
            SIMPLE_EMBED(msg)
            return
        })
    } catch (error) {
        console.log(error)
            msg.content = `${await translate("Error while trying to play the song", lang)}`
            SIMPLE_EMBED(msg)
        return
    }
    
}

const rejected = (msg: any) => {
    msg.content = "No activity"
    SIMPLE_EMBED(msg)
    return
}

export const skip = async(msg: any) => CONNECTION.dispatcher.end()

export const stop = async(msg: any, lang:any) => {
    QUEUE.list = []
    CONNECTION.dispatcher.end()
        setTimeout(async () => {
            if(QUEUE.list.length >= 1) return
            QUEUE.id = ""
            await CONNECTION.disconnect()
            msg.content = `${await translate(`30 seconds I was ignored, I'll get out`, lang)}`
            SIMPLE_EMBED(msg, "https://media1.tenor.com/images/2f198dc24f638fc9f16776c8ebd183fd/tenor.gif?itemid=14682313") 
            return 
        }, 30000)
    return
}

export const leave = async(msg: any) => {
    QUEUE.list = []
    QUEUE.id = ""
    CONNECTION.disconnect()       
    return
}

export const resume = (msg: any) => CONNECTION.dispatcher.resume() 

export const pause = (msg: any, lang:any) => {
    CONNECTION.dispatcher.pause()
    //TODO: menunggu selama 20 detik
        setTimeout(async () => {
            //TODO: jika masih ke pause, 
            if(CONNECTION.dispatcher.paused){
                QUEUE.id = ""
                QUEUE.list = []
                CONNECTION.disconnect()
                msg.content = `${await translate(`30 seconds I was ignored, I'll get out`, lang)}`
                SIMPLE_EMBED(msg, "https://media1.tenor.com/images/2f198dc24f638fc9f16776c8ebd183fd/tenor.gif?itemid=14682313")
            }
            return 
        }, 30000)
    return
}

