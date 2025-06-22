import type { HttpContext } from '@adonisjs/core/http'
import Kategori from '#models/kategori'
import { createKategoriValidator, updateKategoriValidator } from '#validators/kategori'

export default class KategoriController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search', '')
    const page = request.input('page', 1)
    const limit = 10

    const kategoris = await Kategori.query()
      .if(search, (query) => {
        query.where('nama_kategori', 'like', `%${search}%`)
      })
      .paginate(page, limit)

    return view.render('kategori/index', { kategoris, search })
  }

  async create({ view }: HttpContext) {
    return view.render('kategori/create')
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createKategoriValidator)
      await Kategori.create(payload)

      session.flash('notification', {
        type: 'success',
        message: 'Kategori berhasil ditambahkan!'
      })
      return response.redirect().toRoute('kategori.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages)
        session.flash('old', request.all())
      }
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    return view.render('kategori/show', { kategori })
  }

  async edit({ params, view }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    return view.render('kategori/edit', { kategori })
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const kategori = await Kategori.findOrFail(params.id)
      const payload = await request.validateUsing(updateKategoriValidator)
      
      await kategori.merge(payload).save()
      
      session.flash('notification', {
        type: 'success',
        message: 'Kategori berhasil diperbarui!'
      })
      return response.redirect().toRoute('kategori.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages)
        session.flash('old', request.all())
      }
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      const kategori = await Kategori.findOrFail(params.id)
      await kategori.delete()

      session.flash('notification', {
        type: 'success',
        message: 'Kategori berhasil dihapus!'
      })
      return response.redirect().toRoute('kategori.index')
    } catch (error) {
      session.flash('notification', {
        type: 'error',
        message: 'Gagal menghapus kategori!'
      })
      return response.redirect().back()
    }
  }
}