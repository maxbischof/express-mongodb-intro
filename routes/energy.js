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

router.get('/avg/:studentId', (req, res) => {
  Energy.find({studentId: req.params.studentId})
    .then((studentEnergys) => {
      const allEnergyPromises = studentEnergys.map(energy => {
        return Energy.find({
          "timestamp": {"$gte": new Date(new Date(energy.timestamp).getTime() - 15*60000), 
          "$lt": new Date(new Date(energy.timestamp).getTime() + 15*60000)}})
          .then(timeSlotEnergy => {
            const timeSlotEnergySum = timeSlotEnergy.reduce((acc, cur) => acc.value + cur.value)

            const timeSlotEnergyAvg = timeSlotEnergySum / timeSlotEnergy.length

            return {...energy._doc, avgEnergy: timeSlotEnergyAvg}
          })
        })
      Promise.all(allEnergyPromises).then((allEnergys) => res.json(allEnergys))
    })
})

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
