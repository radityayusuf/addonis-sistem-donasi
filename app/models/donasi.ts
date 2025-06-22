import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Donatur from './donatur.js'
import Kategori from './kategori.js'
import TransaksiDonasi from './transaksi_donasi.js'

export default class Donasi extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare donatur_id: number

  @column()
  declare kategori_id: number

  @column()
  declare jumlah: number

  @column()
  declare tanggal: string

  @belongsTo(() => Donatur)
  declare donatur: BelongsTo<typeof Donatur>

  @belongsTo(() => Kategori)
  declare kategori: BelongsTo<typeof Kategori>

  @hasMany(() => TransaksiDonasi)
  declare transaksiDonasis: HasMany<typeof TransaksiDonasi>
}