const express = require('express')

const checklistDependentRoute = express.Router()
const simpleRouter = express.Router()

const Checklist = require('./models/checklist')
const Task = require('./models/task')

checklistDependentRoute.get('/:id/tasks/new', async (req, res) => {
  try {
    let task = Task()
    res.status(200).render('tasks/new', { checklistId: req.params.id, task: task })
  } catch (err) {
    res.status(422).render('pages/error', { errors: 'Erro ao carregar o formulário' })
  }
})

simpleRouter.delete('/:id', async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id)
    let checklist = await Checklist.findById(task.checklist)
    let taskToRemove = checklist.tasks.indexOf(task.id)
    checklist.tasks.splice(taskToRemove, 1)
    checklist.save()
    res.redirect(`/checklists/${checklist.id}`)
  } catch (err) {
    res.status(422).render('pages/error', { errors: 'Erro ao remover uma task' })
  }
})

checklistDependentRoute.post('/:id/tasks', async (req, res) => {
  let { name } = req.body.task
  let task = new Task({ name: name, checklist: req.params.id })
  try {
    await task.save()
    let checklist = await Checklist.findById(req.params.id)
    checklist.tasks.push(task)
    checklist.save()
    res.redirect(`/checklists/${req.params.id}`)
  } catch (err) {
    let errors = err.errors
    res.status(422).render('tasks/new', { task: { ...task, errors }, checklistId: req.params.id })
  }
})

module.exports = {
   checklistDependent: checklistDependentRoute,
   simple: simpleRouter
 }