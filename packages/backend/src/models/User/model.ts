import mongoose, { Schema } from 'mongoose'
import { AuthService } from '@models/Auth/service'
import { IUser } from '@interfaces/index'

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  password: { type: String, required: true },
})

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await AuthService.hashPassword(this.password)
  next()
})

export const User = mongoose.model<IUser>('User', UserSchema)
