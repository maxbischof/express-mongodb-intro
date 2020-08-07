import express from 'express'
import energyRoute from './routes/energy'
import studentsRoute from './routes/students'

const server = express()
server.use(express.json()) // middleware to get body from request

server.use(express.static('public'))

server.use('/api/students', studentsRoute)
server.use('/api/energy', energyRoute)

const port = process.env.PORT ?? 4000
server.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
)
