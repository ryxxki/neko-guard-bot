import firestoreRepo from './firestore'

export default class DataHandler {
    public static async getDataGuild(id:string): Promise<any>{
        try {
            const data = await new firestoreRepo('guild').readOne(id).then(data => data.get())
            //console.log(data.data())
            return {
                id: data.id,
                prefix: data.data()!.prefix,
                lang: data.data()!.lang,
                owner: data.data()!.owner,
                ban_word: data.data()!.ban_word,
                timestamp: {
                    created: data.createTime?.toDate(),
                    updated: data.updateTime?.toDate()
                } 
            }
        } catch (error) {
            console.log(`GetDataGuild: ${error}`)
            return
        }
    }
    public static async getDataBanWord(id:string): Promise<any>{
        try {
            const data = await new firestoreRepo('ban_word').readOne(id).then(data => data.get())
            //console.log(data.data())
            return {
                id: data.id,
                status: data.data()!.status,
                words: data.data()!.words,
                auto: data.data()!.auto,
                onChannel: data.data()!.onChannel,
                timestamp: {
                    created: data.createTime?.toDate(),
                    updated: data.updateTime?.toDate()
                } 
            } as Object
        } catch (error) {
            console.log(`GetDataBanWord: ${error}`)
            return
        }
    }
    public static async updateGuild(id:string, data:any):Promise<void>{
        try {
            const doc = await DataHandler.getDataGuild(id)
            const db = await new firestoreRepo('guild')
                data.prefix = data.prefix ? data.prefix : doc.prefix as string
                data.lang = data.lang ? data.lang : doc.lang as string
                data.owner = data.owner ? [...doc.owner, data.owner] : doc.owner as []
                data.bad_word = data.ban_word ? data.ban_word : doc.ban_word as boolean
            await db.update(id, data).then(e => true)
            return
        } catch (error) {
            console.log(`updateGuild: ${error}`)
            return
        }
        
    }

    public static async getLang(collection: string, id:string): Promise<any>{
        try {
            //console.log()
            const data = await new firestoreRepo(collection).readOne(id).then(data => data.get())
            return data.data()!.lang
        } catch (error) {
            console.log(`getLang: ${error}`)
            return
        }
    }

    public static async addGuild(id: string, owner:any):Promise<void>{
        try {
            let db = await new firestoreRepo('guild')
            let data:any = await {
                prefix : '!',
                lang : 'en',
                owner : await [owner],
                ban_word : false
            }
            await db.create(id, data).then(e => console.log(`guild : ${e.writeTime.seconds}`))
            //TODO: buat untuk ban word sekalian
            db = await new firestoreRepo('ban_word')
            data = await {
                status : false,
                words : [], 
                auto : false,
                onChannel : []
            }
            await db.create(id, data).then(e => console.log(`ban_word : ${e.writeTime.seconds}`))
            return
        } catch (error)     {
            console.log(`Add Guild: ${error}`)
            return
        }
        
    }
    // =>  update data (msg.channel.id, data)
    public static async updateBanWord(id: string, data:any):Promise<void>{
        try {
            //TODO: the Update
            const db = await new firestoreRepo('ban_word')
            let doc:any = {
                status : data.status ,
                words : data.words, 
                auto : data.auto ,
                onChannel : data.onChannel
            }
            //id + object
            await db.update(id, doc).then(e => true)
            return
        } catch (error)     {
            console.log(`Ban Word: ${error}`)
            return
        }
        
    }
    public static async deleteBanWord(id: string, data:any):Promise<void>{
        try {
            //TODO: cek first
            const check = await DataHandler.getDataBanWord(id)
            //TODO: the Update
            const db = await new firestoreRepo('ban_word')
            let doc:any = {
                status : data.status ? data.status : check.status,
                words : data.words, 
                auto : data.auto ? data.auto : check.auto,
                onChannel : data.onChannel ? [...check.onChannel, data.onChannel] : check.onChannel
            }
            //id + object
            await db.update(id, doc).then(e => true)
            return
        } catch (error)     {
            console.log(`Ban Word: ${error}`)
            return
        }
        
    }
}