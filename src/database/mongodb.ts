import mongoose from 'mongoose'
const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Add Mongo URI to .env.local')
}
const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri)
    console.log('\x1b[32m', 'Connected to MongoDB.')
  } catch (error) {
    console.log(error)
  }
}

export default connectMongoDB
