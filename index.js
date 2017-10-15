// Modules
let bodyParser = require('body-parser')
let express = require('express')
let app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')

// Route
let index = require('./src/route/index')
let api	= require('./src/route/api')

app.use('/', index)
app.use('/api', api)

app.listen(process.env.PORT || 8000)
console.log('Website on')