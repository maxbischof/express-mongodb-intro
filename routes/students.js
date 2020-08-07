import express from 'express'
import db from '../db.json'
import { saveDb } from '../fsUtils'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

router.get('/', (req, res) => {
  res.json(db.students)
})

router.post('/', (req, res) => {
  const student = { ...req.body, id: uuidv4() }
  db.students.push(student)
  saveDb((error) => res.json(error ?? student))
})

export default router
