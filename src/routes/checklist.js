const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  console.log('Test')
  res.send('test')
})

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  res.send(`id: ${req.params.id}`)
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.status(200).send(req.body)
})

router.put('/:id', (req, res) => {
  console.log(req.params.id)
  res.send(` put id: ${req.params.id}`)
})

module.exports = router