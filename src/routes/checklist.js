const express = require('express')

const router = express.Router()

const Checklist = require('./models/checklist')

// Pega todas as tasks do checklist
router.get('/', async (req, res) => {
  try {
    let checklists = await Checklist.find({})
    res.status(200).render('checklists/index', { checklists: checklists })
  } catch (err) {
    res.status(500).render('checklists/error', { erro: 'Errro ao exibir as listas' })
  }
})

router.get('/new', async (req, res) => {
  try {
    let checklist = new Checklist()
    res.status(200).render('checklists/new', { checklist: checklist })
  } catch (err) {
    res.status(500).render('pages/error', { errors: 'Erro ao carregar o formulário' })
  }
})

router.get('/:id/edit', async (req, res) => {
  let checklist = await Checklist.findById(req.params.id)
  try {
    res.status(200).render('checklists/edit', { checklist: checklist })
  } catch (err) {
    res.status(500).render('pages/error', { errors: 'Erro ao carregar a edição da lista de tarefas' })
  }
})

// Atualiza uma task
router.put('/:id', async (req, res) => {
  let { name } = req.body.checklist
  let checklist = await Checklist.findById(req.params.id)

  try {
    await checklist.updateOne({ name: name })
    res.redirect('/checklists')
  } catch (err) {
    let errors = err.errors
    res.status(422).render('checklists/edit', {checklist: {...checklist, errors}})
  }
})

// Pesquisa a task pelo id na url
router.get('/:id', async (req, res) => {
  let checklist = await Checklist.findById(req.params.id)
  try {
    res.status(200).render('checklists/show', { checklist: checklist })
  } catch (err) {
    res.status(422).render('checklists/new', { checklist: { ...checklist, err } })
  }
})

// Cria uma tarefa
router.post('/', async (req, res) => {
  let { name } = req.body.checklist  // = req.body['name']
  let checklist = new Checklist({ name: name })

  try {
    await checklist.save()
    res.redirect('/checklists')
  } catch (error) {
    res.status(500).render('checklists/error', { erro: 'Errro ao criar checklist' })
  }
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