const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and templates location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Israel Ben David'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About!!!',
        name: 'Israel Ben David'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        name: 'Israel Ben David',
        title: 'Help'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'provide address term'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData
            })
        })
    })

    //res.send(data)
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        name: 'Israel Ben David',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        name: 'Israel Ben David',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up at port 3000')
})