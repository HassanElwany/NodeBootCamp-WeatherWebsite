const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
 const apiKey = `a857fc576a3a002e68df0e93142b6235
 `

 const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`

 request({url, json: true}, (error, response)=>{
    if (error)
    {
        callback('can not connected to weather service', undefined)
    } 
    else if (response.body.error)
    {
        callback('Unable to find location', undefined)
    }
    else
    {
        callback(undefined, `${response.body.weather[0].description}. It's currently ${response.body.main.temp}. It feels like ${response.body.main.feels_like}`)
    }
 })

}
module.exports= forecast