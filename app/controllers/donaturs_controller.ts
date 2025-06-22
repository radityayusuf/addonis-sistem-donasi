import type { HttpContext } from '@adonisjs/core/http'
import Donatur from '#models/donatur'
import { createDonaturValidator, updateDonaturValidator } from '#validators/donatur'

export default class DonaturController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search', '')
    const page = request.input('page', 1)
    const limit = 10

    const donaturs = await Donatur.query()
      .if(search, (query) => {
        query.where('nama', 'like', `%${search}%`)
          .orWhere('email', 'like', `%${search}%`)
          .orWhere('telepon', 'like', `%${search}%`)
      })
      .paginate(page, limit)

    return view.render('donatur/index', { donaturs, search })
  }

  async create({ view }: HttpContext) {
    return view.render('donatur/create')
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createDonaturValidator)
      await Donatur.create(payload)

      session.flash('notification', {
        type: 'success',
        message: 'Donatur berhasil ditambahkan!'
      })
      return response.redirect().toRoute('donatur.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages)
        session.flash('old', request.all())
      }
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    const donatur = await Donatur.findOrFail(params.id)
    return view.render('donatur/show', { donatur })
  }

  async edit({ params, view }: HttpContext) {
    const donatur = await Donatur.findOrFail(params.id)
    return view.render('donatur/edit', { donatur })
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const donatur = await Donatur.findOrFail(params.id)
      const payload = await request.validateUsing(updateDonaturValidator)
      
      await donatur.merge(payload).save()
      
      session.flash('notification', {
        type: 'success',
        message: 'Donatur berhasil diperbarui!'
      })
      return response.redirect().toRoute('donatur.index')
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
      const donatur = await Donatur.findOrFail(params.id)
      await donatur.delete()

      session.flash('notification', {
        type: 'success',
        message: 'Donatur berhasil dihapus!'
      })
      return response.redirect().toRoute('donatur.index')
    } catch (error) {
      session.flash('notification', {
        type: 'error',
        message: 'Gagal menghapus donatur!'
      })
      return response.redirect().back()
    }
  }
}