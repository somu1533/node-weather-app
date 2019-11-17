const request = require('request')

const get_geo_coordinates = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic29tYXBwYSIsImEiOiJjazJ2azhzeDUwNjAzM21tdjVmcmNraGZiIn0.4wg3dsSRvfOvxQPEaJLfkQ'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Not able to connect', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find the location, Try another search', undefined)
        } else {
            co_ordinates = {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1]
            }
            callback(undefined,co_ordinates)
        }
        
    })
}

const forcast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/a54500ec2a85580a171c2815c8efd08b/' + latitude + ',' + longitude 
    
    request({url: url, json: true}, (error, response) => {
        //console.log("somappa ===================",response.body)
        if (error) {
            callback('Not able to connect', undefined)
        }
        else {    
            data = response.body
            callback(undefined, "It is currently " + data.currently.temperature + ", The chances of raining " + data.currently.precipProbability)
        }
        //console.log("It is currently ",data.currently.temperature,", The chances of raining ",data.currently.precipProbability)
    })
}

const geocode = {
    get_geo_coordinates: get_geo_coordinates,
    get_forcast: forcast
}
module.exports = geocode