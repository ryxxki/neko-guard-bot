import translate from 'google-translate-api-browser'
// import { setCORS } from "../../dist/index";

export default function(data:string, lang:string = "en"):any{
    return translate(data, {to: lang })
        .then(res => {
            //console.log(res)
            //@ts-ignore
           return res.text
        })
        .catch(err => err)

}