import mongoose from 'mongoose'
import { Migration } from '@models/Migration/model'
import { connectDatabase } from '@config/database'

import * as createUserMock from '@migrations/20241122-createUserMock'

const migrations = [createUserMock]

/**
 * Executes all pending migrations.
 */
const runMigrations = async (): Promise<void> => {
  await connectDatabase()

  for (const migration of migrations) {
    const migrationName = migration.up.name

    const existing = await Migration.findOne({ name: migrationName })
    if (existing) {
      console.log(
        `Migration "${migrationName}" has already been applied. Skipping...`
      )
      continue
    }

    try {
      console.log(`Running migration: "${migrationName}"`)
      await migration.up()
      await Migration.create({ name: migrationName, executedAt: new Date() })
      console.log(`Migration "${migrationName}" applied successfully`)
    } catch (err) {
      console.error(`Error applying migration "${migrationName}":`, err)
      process.exit(1)
    }
  }

  console.log('All pending migrations have been applied')
  await mongoose.disconnect()
}

/**
 * Reverts the last applied migration.
 */
const rollbackLastMigration = async (): Promise<void> => {
  await connectDatabase()

  const lastMigration = await Migration.findOne().sort({ executedAt: -1 })
  if (!lastMigration) {
    console.log('No migrations found for rollback')
    return
  }

  const migration = migrations.find((mig) => mig.up.name === lastMigration.name)
  if (!migration || !migration.down) {
    console.error(`Migration "${lastMigration.name}" does not support rollback`)
    return
  }

  try {
    console.log(`Reverting migration: "${lastMigration.name}"`)
    await migration.down()
    await Migration.deleteOne({ name: lastMigration.name })
    console.log(`Migration "${lastMigration.name}" successfully rolled back`)
  } catch (err) {
    console.error(`Error reverting migration "${lastMigration.name}":`, err)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

const main = async (): Promise<void> => {
  const command = process.argv[2]

  switch (command) {
    case 'migrate':
      await runMigrations()
      break
    case 'rollback':
      await rollbackLastMigration()
      break
    default:
      console.log('Command not recognized. Use "migrate" or "rollback"')
      process.exit(1)
  }
}

main()
