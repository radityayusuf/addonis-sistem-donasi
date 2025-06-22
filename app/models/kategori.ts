import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Donasi from './donasi.js'
import Kampanye from './kampanye.js'

export default class Kategori extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_kategori: string

  @hasMany(() => Donasi)
  declare donasis: HasMany<typeof Donasi>

  @hasMany(() => Kampanye)
  declare kampanyes: HasMany<typeof Kampanye>
}