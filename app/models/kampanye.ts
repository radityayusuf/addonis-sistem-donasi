import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Kategori from './kategori.js'
import TransaksiDonasi from './transaksi_donasi.js'

export default class Kampanye extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_kampanye: string

  @column()
  declare kategori_id: number

  @column()
  declare target: number

  @belongsTo(() => Kategori)
  declare kategori: BelongsTo<typeof Kategori>

  @hasMany(() => TransaksiDonasi)
  declare transaksiDonasis: HasMany<typeof TransaksiDonasi>
}