import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaksi_donasi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('donasi_id').unsigned().references('id').inTable('donasi').notNullable()
      table.integer('kampanye_id').unsigned().references('id').inTable('kampanye').notNullable()
      table.string('status').notNullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}