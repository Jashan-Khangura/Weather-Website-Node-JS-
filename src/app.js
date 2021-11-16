const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geoCode = require('../utils/geoCode')
const forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jashan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'Provide an address.'})
    }
    else {
        geoCode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        
            if (error) {
                return res.send({error: 'An error occured.'})
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
               
               if (error) {
                return res.send({error: 'An error occured.'})
               }
                   res.send({
                       weather: forecastData,
                       location,
                       address: req.query.address
                   })
            })
        })
    }  
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jashan'
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
      return res.send({
            error: 'You must provide a search item'
        })
    }
     res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'need help?',
        name: 'Jashan'
    })
})

app.get('/help/*', (req, res) => {
    res.render('err2', {
        title:"Help article not found"
    })
    })
    
app.get('*', (req, res) => {
res.render('err', {
    title:"Page not found"
})
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})