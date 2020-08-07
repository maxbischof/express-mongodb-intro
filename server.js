import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from './db.json'
import studentsRoute from './routes/students'

const server = express()
server.use(express.json()) // middleware to get body from request

server.use('/students', studentsRoute)

server.get('/energy/:studentId', (req, res) => {
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

server.post('/energy', (req, res) => {
  console.log(req.body) // {student: <id>, energy: <Number>}
  const date = new Date()
  const timestamp = date.toUTCString()
  const newEntry = { ...req.body, timestamp, id: uuidv4() }
  db.energy.push(newEntry)
  saveDb((error) => res.json(error ?? newEntry))
})

const port = process.env.PORT ?? 4000
server.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
)
