import firestoreRepo from './firestore'

export default class DataHandler {
    public static async getData(collection: string, id:string): Promise<any>{
        try {
            const data = await new firestoreRepo(collection).readOne(id).then(data => data.get())
            //console.log(data.data())
            return {
                id: data.id,
                prefix: data.data()!.prefix,
                lang: data.data()!.lang,
                owner: data.data()!.owner,
                bad_word: data.data()!.bad_word,
                timestamp: {
                    created: data.createTime?.toDate(),
                    updated: data.updateTime?.toDate()
                } 
            }
        } catch (error) {
            console.log(`DataHandler: ${error}`)
            return
        }
    }
    public static async update(collection: string, id:string, data:any):Promise<void>{
        try {
            const doc = await DataHandler.getData('guild', id)
            const db = await new firestoreRepo(collection)
                data.prefix = data.prefix ? data.prefix : '!' as string
                data.lang = data.lang ? data.lang : doc.lang as string
                data.owner = data.owner ? [...doc.owner, data.owner] : doc.owner as []
                data.bad_word = data.bad_word ? data.bad_word : doc.bad_word as boolean
            await db.update(id, data).then(e => true)
            return
        } catch (error) {
            console.log(`DataHandler: ${error}`)
            return
        }
        
    }

    public static async getLang(collection: string, id:string): Promise<any>{
        try {
            //console.log()
            const data = await new firestoreRepo(collection).readOne(id).then(data => data.get())
            return data.data()!.lang
        } catch (error) {
            console.log(`DataHandler: ${error}`)
            return
        }
    }
}