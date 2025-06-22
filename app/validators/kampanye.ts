import vine from '@vinejs/vine'

export const createKampanyeValidator = vine.compile(
  vine.object({
    nama_kampanye: vine.string().trim().minLength(3).maxLength(255),
    kategori_id: vine.number().exists(async (db, value) => {
      const kategori = await db.from('kategori').where('id', value).first()
      return kategori
    }),
    target: vine.number().min(100000)
  })
)

export const updateKampanyeValidator = vine.compile(
  vine.object({
    nama_kampanye: vine.string().trim().minLength(3).maxLength(255),
    kategori_id: vine.number().exists(async (db, value) => {
      const kategori = await db.from('kategori').where('id', value).first()
      return kategori
    }),
    target: vine.number().min(100000)
  })
)