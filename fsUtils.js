import fs from 'fs'
import db from './db.json'

export function saveDb(callback) {
  fs.writeFile('db.json', JSON.stringify(db, null, 2), 'utf8', callback)
}
