import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Donasi from './donasi.js'
import Kampanye from './kampanye.js'

export default class TransaksiDonasi extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare donasi_id: number

  @column()
  declare kampanye_id: number

  @column()
  declare status: string

  @belongsTo(() => Donasi)
  declare donasi: BelongsTo<typeof Donasi>

  @belongsTo(() => Kampanye)
  declare kampanye: BelongsTo<typeof Kampanye>
}