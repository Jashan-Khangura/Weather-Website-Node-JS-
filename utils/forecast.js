const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon='+ longitude + '&units=metric&appid=22cec9c124279f97db8ebc14e00dac24'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect')
        } 
        else if(body.error) {
            callback('Invalid Coordinates')
        }
        else {
            callback(undefined, {
              Temperature: body.main.temp + " C",
              Humidity: body.main.humidity + "%",
            })
        }
    })
}

module.exports = forecast