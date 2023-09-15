import { model, models, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser } from '@/types/user'

const userSchema = new Schema<IUser>({
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

userSchema.pre<IUser>('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

export default models.User || model<IUser>('User', userSchema)
