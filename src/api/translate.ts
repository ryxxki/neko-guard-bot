import translate from 'google-translate-open-api';

export default async function(data:string, lang:any = "en"):Promise<any>{
    return await translate(data, {to: lang })
        .then(res => {
            //console.log(res.status)
            return res.data[0]
        })
        .catch(err => console.error(err))

}