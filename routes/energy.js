import express from 'express'
import Energy from '../models/Energy'

const router = express.Router()

// router.get('/:studentId', (req, res) => {
//   const { studentId } = req.params.studentId

//   const you = getStudentEnergyById(studentId)
//   const students = getAverageEnergy()
//   const timestamp = getEarliestTimestamp()

//   res.json({
//     you,
//     students,
//     timestamp,
//   })
// })

router.get('/', (req, res) => {
  Energy.find()
    .then((studentEnergy) => res.json(studentEnergy))
})

router.get('/:studentId', (req, res) => {
  Energy.find({studentId: req.params.studentId})
    .then((studentEnergy) => res.json(studentEnergy))
})

router.post('/', (req, res) => {
  Energy.create({studentId: req.body.studentId,
    value: req.body.value, 
    timestamp: new Date()})
    .then((energy) => res.json(energy))
    .catch((error) => res.json(error))
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
