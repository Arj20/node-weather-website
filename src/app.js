const express = require('express')
const path= require('path')
const hbs = require('hbs')
const forecast = require('../src/utils/forecast.js')
const geocode = require('../src/utils/geocode.js')

const app =express()

//Setting paths for Express config.
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath  = path.join(__dirname,'../templates/views')
const partialsPath  = path.join(__dirname,'../templates/partials')


//SetUp handlebar engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Arihant'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me!!',
        name:'Arihant'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'Help me!!',
        name:'Arihant'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
    return res.send({
        error:'please enter a proper address!'
    })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
        return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            return res.send({error})
        res.send({
            forecast:forecastData,location,
            address:req.query.address
        })
    })

    
    // res.send({
    //     forecast:'it may rain..',
    //     location:'jhansi',
    //     address:req.query.address,
    //     })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Arihant',
        errorMessage:'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Arihant',
        errorMessage:'Error not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})