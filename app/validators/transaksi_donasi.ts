import vine from '@vinejs/vine'

export const createTransaksiDonasiValidator = vine.compile(
  vine.object({
    donasi_id: vine.number().exists(async (db, value) => {
      const donasi = await db.from('donasi').where('id', value).first()
      return donasi
    }),
    kampanye_id: vine.number().exists(async (db, value) => {
      const kampanye = await db.from('kampanye').where('id', value).first()
      return kampanye
    }),
    status: vine.string().in(['pending', 'success', 'failed'])
  })
)

export const updateTransaksiDonasiValidator = vine.compile(
  vine.object({
    donasi_id: vine.number().exists(async (db, value) => {
      const donasi = await db.from('donasi').where('id', value).first()
      return donasi
    }),
    kampanye_id: vine.number().exists(async (db, value) => {
      const kampanye = await db.from('kampanye').where('id', value).first()
      return kampanye
    }),
    status: vine.string().in(['pending', 'success', 'failed'])
  })
)