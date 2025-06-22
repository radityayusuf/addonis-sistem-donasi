import type { HttpContext } from '@adonisjs/core/http'
import Kampanye from '#models/kampanye'
import Kategori from '#models/kategori'
import { createKampanyeValidator, updateKampanyeValidator } from '#validators/kampanye'

export default class KampanyeController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search', '')
    const page = request.input('page', 1)
    const limit = 10

    const kampanyes = await Kampanye.query()
      .preload('kategori')
      .if(search, (query) => {
        query.where('nama_kampanye', 'like', `%${search}%`)
          .orWhere('target', 'like', `%${search}%`)
          .orWhereHas('kategori', (kategoriQuery) => {
            kategoriQuery.where('nama_kategori', 'like', `%${search}%`)
          })
      })
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return view.render('kampanye/index', { kampanyes, search })
  }

  async create({ view }: HttpContext) {
    const kategoris = await Kategori.all()
    return view.render('kampanye/create', { kategoris })
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createKampanyeValidator)
      await Kampanye.create(payload)

      session.flash('notification', {
        type: 'success',
        message: 'Kampanye berhasil ditambahkan!'
      })
      return response.redirect().toRoute('kampanye.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages)
        session.flash('old', request.all())
      }
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    const kampanye = await Kampanye.query()
      .where('id', params.id)
      .preload('kategori')
      .firstOrFail()

    return view.render('kampanye/show', { kampanye })
  }

  async edit({ params, view }: HttpContext) {
    const kampanye = await Kampanye.findOrFail(params.id)
    const kategoris = await Kategori.all()
    
    return view.render('kampanye/edit', { kampanye, kategoris })
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const kampanye = await Kampanye.findOrFail(params.id)
      const payload = await request.validateUsing(updateKampanyeValidator)
      
      await kampanye.merge(payload).save()
      
      session.flash('notification', {
        type: 'success',
        message: 'Kampanye berhasil diperbarui!'
      })
      return response.redirect().toRoute('kampanye.index')
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
      const kampanye = await Kampanye.findOrFail(params.id)
      await kampanye.delete()

      session.flash('notification', {
        type: 'success',
        message: 'Kampanye berhasil dihapus!'
      })
      return response.redirect().toRoute('kampanye.index')
    } catch (error) {
      session.flash('notification', {
        type: 'error',
        message: 'Gagal menghapus kampanye!'
      })
      return response.redirect().back()
    }
  }
}