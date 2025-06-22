import vine from '@vinejs/vine'

export const createDonasiValidator = vine.compile(
  vine.object({
    donatur_id: vine.number().exists(async (db, value) => {
      const donatur = await db.from('donatur').where('id', value).first()
      return donatur
    }),
    kategori_id: vine.number().exists(async (db, value) => {
      const kategori = await db.from('kategori').where('id', value).first()
      return kategori
    }),
    jumlah: vine.number().min(1000),
    tanggal: vine.date()
  })
)

export const updateDonasiValidator = vine.compile(
  vine.object({
    donatur_id: vine.number().exists(async (db, value) => {
      const donatur = await db.from('donatur').where('id', value).first()
      return donatur
    }),
    kategori_id: vine.number().exists(async (db, value) => {
      const kategori = await db.from('kategori').where('id', value).first()
      return kategori
    }),
    jumlah: vine.number().min(1000),
    tanggal: vine.date()
  })
)