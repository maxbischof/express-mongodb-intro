import express from 'express'
import db from './db.json'

const server = express()
server.use(express.json())

const port = process.env.PORT ?? 4000

server.get('/buddys', (req, res) => {
  res.json(db.buddyList)
})

server.post('/energy', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

server.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
)
