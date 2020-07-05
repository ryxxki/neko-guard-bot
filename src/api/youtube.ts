const ytsr = require('ytsr')
let filter:any
export default async (query:string) => {
    return new Promise((res, rej) => {
        ytsr.getFilters(query, async (err:Error, filters:any)=>{
            if(err) throw err
            filter = filters.get('Type').find((o:any) => o.name === 'Video')
            let options = {
              limit: 15,
              nextpageRef: filter.ref,
            }
              return await ytsr(null, options, (err:Error, searchResults:object)=>{
                if(err) rej(err)
                return res(searchResults)
              })
            
          })
    }) 
}