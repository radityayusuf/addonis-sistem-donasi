import vine from '@vinejs/vine'

export const createKategoriValidator = vine.compile(
  vine.object({
    nama_kategori: vine.string().trim().minLength(3).maxLength(255)
  })
)

export const updateKategoriValidator = vine.compile(
  vine.object({
    nama_kategori: vine.string().trim().minLength(3).maxLength(255)
  })
)