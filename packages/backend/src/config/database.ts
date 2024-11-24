import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

export const connectDatabase = async (): Promise<void> => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

  if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_NAME) {
    throw new Error(
      'Environment variables required to connect to the database are missing'
    )
  }

  const dbUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(dbUri, { dbName: DB_NAME })
  }
}
