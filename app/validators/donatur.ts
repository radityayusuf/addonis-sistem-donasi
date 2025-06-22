import vine from '@vinejs/vine'

export const createDonaturValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().trim().email().normalizeEmail(),
    telepon: vine.string().trim().mobile({
      locale: ['id-ID'],
      strictMode: false
    })
  })
)

export const updateDonaturValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().trim().email().normalizeEmail(),
    telepon: vine.string().trim().mobile({
      locale: ['id-ID'],
      strictMode: false
    })
  })
)