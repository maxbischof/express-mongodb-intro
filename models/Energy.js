import mongoose from 'mongoose'

const schema = {
  value: Number,
  timestamp: String,
  studentId: String
}

export default mongoose.model('Energy', schema)