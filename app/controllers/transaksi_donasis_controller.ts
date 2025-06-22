import type { HttpContext } from '@adonisjs/core/http'
import TransaksiDonasi from '#models/transaksi_donasi'
import Donasi from '#models/donasi'
import Kampanye from '#models/kampanye'
import { createTransaksiDonasiValidator, updateTransaksiDonasiValidator } from '#validators/transaksi_donasi'

export default class TransaksiDonasiController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search', '')
    const page = request.input('page', 1)
    const limit = 10

    const transaksiDonasis = await TransaksiDonasi.query()
      .preload('donasi')
      .preload('kampanye')
      .if(search, (query) => {
        query.where('status', 'like', `%${search}%`)
          .orWhereHas('donasi', (donasiQuery) => {
            donasiQuery.where('jumlah', 'like', `%${search}%`)
          })
          .orWhereHas('kampanye', (kampanyeQuery) => {
            kampanyeQuery.where('nama_kampanye', 'like', `%${search}%`)
          })
      })
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return view.render('transaksi_donasi/index', { transaksiDonasis, search })
  }

  async create({ view }: HttpContext) {
    const donasis = await Donasi.all()
    const kampanyes = await Kampanye.all()
    return view.render('transaksi_donasi/create', { donasis, kampanyes })
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createTransaksiDonasiValidator)
      await TransaksiDonasi.create(payload)

      session.flash('notification', {
        type: 'success',
        message: 'Transaksi donasi berhasil ditambahkan!'
      })
      return response.redirect().toRoute('transaksi_donasi.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages)
        session.flash('old', request.all())
      }
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    const transaksiDonasi = await TransaksiDonasi.query()
      .where('id', params.id)
      .preload('donasi')
      .preload('kampanye')
      .firstOrFail()

    return view.render('transaksi_donasi/show', { transaksiDonasi })
  }

  async edit({ params, view }: HttpContext) {
    const transaksiDonasi = await TransaksiDonasi.findOrFail(params.id)
    const donasis = await Donasi.all()
    const kampanyes = await Kampanye.all()
    
    return view.render('transaksi_donasi/edit', { transaksiDonasi, donasis, kampanyes })
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const transaksiDonasi = await TransaksiDonasi.findOrFail(params.id)
      const payload = await request.validateUsing(updateTransaksiDonasiValidator)
      
      await transaksiDonasi.merge(payload).save()
      
      session.flash('notification', {
        type: 'success',
        message: 'Transaksi donasi berhasil diperbarui!'
      })
      return response.redirect().toRoute('transaksi_donasi.index')
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
      const transaksiDonasi = await TransaksiDonasi.findOrFail(params.id)
      await transaksiDonasi.delete()

      session.flash('notification', {
        type: 'success',
        message: 'Transaksi donasi berhasil dihapus!'
      })
      return response.redirect().toRoute('transaksi_donasi.index')
    } catch (error) {
      session.flash('notification', {
        type: 'error',
        message: 'Gagal menghapus transaksi donasi!'
      })
      return response.redirect().back()
    }
  }
}