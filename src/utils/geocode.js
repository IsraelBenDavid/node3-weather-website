const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFydGswMDciLCJhIjoiY2w4b202cDlnMHR4NDQwcDZnZ3JxN2NyaSJ9.GmscB7i2sZ6pA-gNKCLD8Q&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to geo services!', undefined)
        } else if (body.features.length === 0) {
            callback('Location not found at geo services!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode