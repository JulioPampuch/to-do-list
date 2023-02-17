const express = require('express')

const router = express.Router()

const Checklist = require('./models/checklist')

// Pega todas as tasks do checklist
// router.get('/', async (req, res) => {
//   try {
//     let checklists = await Checklist.find({})
//     res.status(200).json(checklists)
//   } catch (err) {
//     res.status(400).json(err)
//   }
// })

// Pesquisa a task pelo id na url
router.get('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id)
    res.status(200).json(checklist)
  } catch (err) {
    res.status(422).json(err)
  }
})

// Cria uma tarefa
router.post('/', async (req, res) => {
  let { name } = req.body
  // req.body['name']

  try {
    let checklist = await Checklist.create({ "name": name })
    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error)
  }

  res.status(200).send(req.body)
})

// Atualiza uma task
router.put('/:id', async (req, res) => {
  let { name } = req.body

  try {
    let checklist = await Checklist.findByIdAndUpdate(req.params.id, { name }, { new: true })
    res.status(200).json(checklist)
  } catch (err) {
    res.status(422).json(err)
  }
  res.send(` put id: ${req.params.id}`)
})

// Deleta uma task
router.delete('/:id', async (req, res) => {
  let { name } = req.body

  try {
    let checklist = await Checklist.findByIdAndDelete(req.params.id, { name })
    res.status(200).json(checklist)
  } catch (err) {
    res.status(422).json(err)
  }

})

module.exports = router