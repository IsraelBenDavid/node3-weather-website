const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d5edbb4902d51f9cb714fa318cce4ae4&query='
        + latitude + ',' + longitude
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Location not found at weather services!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature
                + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out and the humidity is ' +
                body.current.humidity)
        }
    })
}

module.exports = forecast