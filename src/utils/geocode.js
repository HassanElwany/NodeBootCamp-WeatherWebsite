const request = require('postman-request')

const geoCode = (address, callback) => {
    const apiGeocoding = `pk.eyJ1IjoiaGFzc2FuMDAwNyIsImEiOiJjbDE3em1ibjAwcmpiM2pwZnZldmY4dTlsIn0.Bms5gzeEnh8GD9hVXe_yvw`

    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiGeocoding}&limit=1`
    request({url, json: true}, (error, response) => {
        if(error)
        {
            callback('Unable to connect the geocoding services', undefined)
        }
        else if (response.body.features.length === 0)
        {
            callback('Unable to find location', undefined)
        }
        callback(undefined, {
           latitude: response.body.features[0].center[1],
           longitude: response.body.features[0].center[0],
           location: response.body.features[0].place_name
        })
    })
}

module.exports = geoCode