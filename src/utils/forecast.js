const request = require('postman-request');
const { parse } = require('postman-request/lib/cookies');

const forecast=(latitude,longitude,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=32d614d80fb02829351920b1d7413b26&query='+latitude+','+longitude;
    request(url,(error,response) => {
        const jsonData=JSON.parse(response.body);
            if (error)
                callback('Unable to connect to location services!', undefined);
            else if (response.error)
                callback('Unable to find the data for the required location!,Try another search', undefined);
            else {
                callback(undefined, 'It is ' + jsonData.current.temperature + ' and feels like ' + jsonData.current.feelslike);
            }
        })
}

module.exports=forecast;


