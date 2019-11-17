const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPaths = path.join(__dirname, '../templetes/views')
const partialPaths = path.join(__dirname, '../templetes/partials')

const geocode = require('../utils/wheather.js')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPaths)
hbs.registerPartials(partialPaths)

app.get('',(req, resp) => {
    resp.render('index', {
        title: 'Weather',
        name: 'Somappa'
    })
})
// app.get('/', (req, resp) => {
//     resp.send('Welcome to Express')
// })

// app.get('/help', (req, resp) => {
//     resp.send('Help Page')
// })

// app.get('/about', (req, resp) => {
//     resp.send('about Page')
// })

app.get('/weather', (req, resp) => {
    console.log('location : ' + req.query.location)
    if (!req.query.location) {
        return resp.send('You must pass location parms')
    }

    geocode.get_geo_coordinates(req.query.location,(error,response) => {
        if (error) {
            return resp.send({
                error: error
            })
        }
        geocode.get_forcast(response.latitude,response.longitude,(error, response) => {
            if (error) {
                return resp.send({
                    error: error
                })
            }
            resp.send({
                location: req.query.location,
                weather: response
            })
        })
    })    
})

app.listen(port, () => {
    console.log("Web server is running on port 3000")
})