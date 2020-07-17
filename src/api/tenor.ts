 const axios = require('axios')

export default (search:string, limit:number) => {
    // set the apikey and limit
    const apikey = "VBIOIEMZX24E";
    // data will be loaded by each call's callback
    return axios.get(`https://api.tenor.com/v1/search?q=${search}&key=${apikey}&limit=${limit}`)
    .then((response:any) => 
        response.data.results[Math.floor(Math.random() * Math.floor(limit))].media[0].mediumgif.url
        ).catch(() => console.log('gif err')) 

    }   