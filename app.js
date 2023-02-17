require('./config/database')
const express = require('express')
const checkListRouter = require('./src/routes/checklist')
const rootRouter =  require('./src/routes/index')
const path = require('path')

const app = express()
app.use(express.json())

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use('/checklists', checkListRouter)
app.use('/', rootRouter)

app.listen('3000', () => {
  console.log('Servidor iniciado!')
})