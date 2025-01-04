import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Boleto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.date()
  declare due: DateTime

  @column()
  declare description: string

  @column()
  declare value: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}