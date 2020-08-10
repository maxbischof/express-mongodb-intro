import express from 'express'
import Student from '../models/Student'
import mongoose from 'mongoose'

const router = express.Router()

router.get('/:studentId', (req, res) => {
  Student.findById(req.params.studentId)
    .then((student) => res.json(student))
})

router.get('/', (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((error) => res.json(error))
})

router.post('/', (req, res) => {
  Student.create(req.body)
    .then((student) => res.json(student))
    .catch((error) => res.json(error))
})

router.patch('/:studentId', (req, res) => {
  Student.findOneAndUpdate(
    {_id: req.params.studentId}, 
    { $set: { name: req.body.name }}, 
    {new: true})
    .then((student) => res.json(student))
    .catch((error) => res.json(error))
})

router.delete('/:studentId', (req, res) => {
  Student.findOneAndDelete({_id: req.params.studentId})
    .then((student) => res.json(student))
    .catch((error) => res.json(error))
})


export default router
