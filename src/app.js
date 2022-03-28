const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forcast')
const geocode = require('./utils/geocode')



const app = express()
//define paths for express configurations
const publicDirectorPath  = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectorPath))


app.get('', (req, res) => {
    res.render('index', {
       title: 'Weather App',
        name: 'Hassan Elwany'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Hassan Elwany'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this for help',
        title: 'help',
        name: 'Hassan Elwany'

    })
})



app.get('/weather', (req, res) => {

    const address = req.query.address
    if (!address)
    {
       return res.send({
           error: 'The address must be provided'
       }) 
    }

    else 
    {
        geocode(req.query.address, (error, data) => {
            if (error)
            {
              return res.send({error})
            }
            
            
                forecast(data.latitude, data.longitude, (error, forecastData) =>{
                    if (error)
                    {
                        return res.send({error})
                    }
                    
                        res.send({
                            forecast: forecastData,
                            location: data.location,
                            address: req.query.address
                        })
                  
                })
            
        })
    }

})


app.get('/help/*', (req, res) => {
    res.render('404')
})

app.get('*', (req, res) => {
    res.render('404')
})




app.listen(3000, () => {
    console.log('server is run on port 3000')
})