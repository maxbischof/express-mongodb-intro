import express from 'express'
import db from '../db.json'
import { saveDb } from '../fsUtils'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

router.get('/:studentId', (req, res) => {
  const { studentId } = req.params

  const you = getStudentEnergyById(studentId)
  const students = getAverageEnergy()
  const timestamp = getEarliestTimestamp()

  res.json({
    you,
    students,
    timestamp,
  })
})

router.post('/', (req, res) => {
  const date = new Date()
  const timestamp = date.toUTCString()
  const newEntry = { ...req.body, timestamp, id: uuidv4() }
  db.energy.push(newEntry)
  saveDb((error) => res.json(error ?? newEntry))
})

export default router

function getEarliestTimestamp() {
  const energyByTimestamp = db.energy
    .slice()
    .sort((a, b) => a.timestamp - b.timestamp)
  const firstEnergy = energyByTimestamp[0]
  return firstEnergy.timestamp
}

function getAverageEnergy() {
  const sumOfEnergy = db.energy.reduce((acc, cur) => acc + cur.energy, 0)
  const averageEnergy = sumOfEnergy / db.energy.length
  return Math.round(averageEnergy)
}

function getStudentEnergyById(studentId) {
  const hasSameId = (entry) => entry.student === studentId
  const student = db.energy.find(hasSameId)
  return student.energy
}
