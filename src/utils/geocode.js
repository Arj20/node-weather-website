const request = require('postman-request');
   
const geocode =(address,callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJqMjAiLCJhIjoiY2tmMmpnZXV5MDM1aTJzazIyZjUxdTJnaiJ9.EZzSUjNJzMTONz6EixnQbQ&limit=1';
    request(url,(error,response)=>{
        //converting string data from server to json object
        const jsonData=JSON.parse(response.body)

        //checking server error
        if(error){
            callback('Unable to connect to location services!',undefined)
        }
        
        //checking input data error
        else if(jsonData.features.length===0){
            callback('Unable to connect to location services!,Try another search',undefined)
        }

        //returning lat,long,location
         else {
            callback(undefined,{
                latitude: jsonData.features[0].center[1],
                longitude:jsonData.features[0].center[0],
                location: jsonData.features[0].place_name
            })
        }
    })

}

module.exports=geocode;