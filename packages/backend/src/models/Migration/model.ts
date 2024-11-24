import mongoose, { Schema, Document } from 'mongoose'

export interface MigrationDocument extends Document {
  name: string
  executedAt: Date
}

const MigrationSchema = new Schema<MigrationDocument>({
  name: { type: String, required: true, unique: true },
  executedAt: { type: Date, required: true },
})

export const Migration = mongoose.model<MigrationDocument>(
  'Migration',
  MigrationSchema
)
