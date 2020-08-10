import mongoose from 'mongoose'

const schema = {
  name: String
}

export default mongoose.model('Student', schema)

