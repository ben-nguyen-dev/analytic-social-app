import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
})

userSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

export default mongoose.models.User || mongoose.model('User', userSchema)
