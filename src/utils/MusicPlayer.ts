import ytdl from 'ytdl-core'
import {VoiceConnection} from 'discord.js'
import {SIMPLE_EMBED, PLAY_EMBED} from '../components/MusicEmbed'

export let QUEUE:any = {
    id: "",
    list: []
}
export let CONNECTION:VoiceConnection

export const PLAY = async (conn:VoiceConnection, msg: any):Promise<void> => {
    try {
        //TODO: store koneksi ke CONNECTION
        CONNECTION = conn
        //TODO: play music
        CONNECTION.play(await ytdl(QUEUE.list[0]!.link, {filter: 'audioonly'}))
        //TODO: when started
        CONNECTION.dispatcher.on('start', async () => {
            msg.content = `Now Playing`
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
                PLAY(CONNECTION, msg)
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
                    msg.content = `The queue is empty, I'll get out`
                    SIMPLE_EMBED(msg)
                //TODO: bot disconnect dari voiceChannel
                return CONNECTION.disconnect()            
            }, 40000)
            return
        })
        CONNECTION.dispatcher.on('error', async() => {
            msg.content = `Error while trying to play the song`
            SIMPLE_EMBED(msg)
            return
        })
    } catch (error) {
        console.log(error)
            msg.content = `Error while trying to play the song`
            SIMPLE_EMBED(msg)
        return
    }
    
}

export const skip = async(msg: any) => CONNECTION.dispatcher.end()

export const stop = async(msg: any) => {
    QUEUE.list = []
    CONNECTION.dispatcher.end()
        setTimeout(async () => {
            if(QUEUE.list.length >= 1) return
            QUEUE.id = ""
            await CONNECTION.disconnect()
            msg.content = `30 seconds I was ignored, I'll get out`
            SIMPLE_EMBED(msg) 
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

export const pause = (msg: any) => {
    CONNECTION.dispatcher.pause()
    //TODO: menunggu selama 20 detik
        setTimeout(async () => {
            //TODO: jika masih ke pause, 
            if(CONNECTION.dispatcher.paused){
                QUEUE.id = ""
                QUEUE.list = []
                CONNECTION.disconnect()
                msg.content = `30 seconds I was ignored, I'll get out`
                SIMPLE_EMBED(msg)
            }
            return 
        }, 30000)
    return
}

