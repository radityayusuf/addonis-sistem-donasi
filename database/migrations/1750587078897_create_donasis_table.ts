import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'donasi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('donatur_id').unsigned().references('id').inTable('donatur').notNullable()
      table.integer('kategori_id').unsigned().references('id').inTable('kategori').notNullable()
      table.decimal('jumlah', 12, 2).notNullable()
      table.date('tanggal').notNullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}