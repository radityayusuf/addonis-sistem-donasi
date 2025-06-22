import type { HttpContext } from '@adonisjs/core/http'
import Donasi from '#models/donasi'
import Donatur from '#models/donatur'
import Kategori from '#models/kategori'
import { createDonasiValidator, updateDonasiValidator } from '#validators/donasi'

export default class DonasiController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search', '')
    const page = request.input('page', 1)
    const limit = 10

    const donasis = await Donasi.query()
      .preload('donatur')
      .preload('kategori')
      .if(search, (query) => {
        query.where('jumlah', 'like', `%${search}%`)
          .orWhere('tanggal', 'like', `%${search}%`)
          .orWhereHas('donatur', (donaturQuery) => {
            donaturQuery.where('nama', 'like', `%${search}%`)
          })
          .orWhereHas('kategori', (kategoriQuery) => {
            kategoriQuery.where('nama_kategori', 'like', `%${search}%`)
          })
      })
      .orderBy('tanggal', 'desc')
      .paginate(page, limit)

    return view.render('donasi/index', { donasis, search })
  }

  async create({ view }: HttpContext) {
    const donaturs = await Donatur.all()
    const kategoris = await Kategori.all()
    return view.render('donasi/create', { donaturs, kategoris })
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createDonasiValidator)
      await Donasi.create(payload)

      session.flash('notification', {
        type: 'success',
        message: 'Donasi berhasil ditambahkan!'
      })
      return response.redirect().toRoute('donasi.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages)
        session.flash('old', request.all())
      }
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    const donasi = await Donasi.query()
      .where('id', params.id)
      .preload('donatur')
      .preload('kategori')
      .firstOrFail()

    return view.render('donasi/show', { donasi })
  }

  async edit({ params, view }: HttpContext) {
    const donasi = await Donasi.findOrFail(params.id)
    const donaturs = await Donatur.all()
    const kategoris = await Kategori.all()
    
    return view.render('donasi/edit', { donasi, donaturs, kategoris })
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const donasi = await Donasi.findOrFail(params.id)
      const payload = await request.validateUsing(updateDonasiValidator)
      
      await donasi.merge(payload).save()
      
      session.flash('notification', {
        type: 'success',
        message: 'Donasi berhasil diperbarui!'
      })
      return response.redirect().toRoute('donasi.index')
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
      const donasi = await Donasi.findOrFail(params.id)
      await donasi.delete()

      session.flash('notification', {
        type: 'success',
        message: 'Donasi berhasil dihapus!'
      })
      return response.redirect().toRoute('donasi.index')
    } catch (error) {
      session.flash('notification', {
        type: 'error',
        message: 'Gagal menghapus donasi!'
      })
      return response.redirect().back()
    }
  }
}