import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Donasi from './donasi.js'

export default class Donatur extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare email: string

  @column()
  declare telepon: string

  @hasMany(() => Donasi)
  declare donasis: HasMany<typeof Donasi>
}