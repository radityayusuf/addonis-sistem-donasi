import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Redirect root to login or dashboard
router.get('/', ({ auth, response }) => {
  if (auth.user) {
    return response.redirect().toRoute('dashboard')
  }
  return response.redirect().toRoute('auth.login')
})

// Import controllers
const AuthController = () => import('#controllers/auth_controller')
const DonaturController = () => import('#controllers/donatur_controller')
const KategoriController = () => import('#controllers/kategori_controller')
const DonasiController = () => import('#controllers/donasi_controller')
const KampanyeController = () => import('#controllers/kampanye_controller')
const TransaksiDonasiController = () => import('#controllers/transaksi_donasi_controller')

// Auth routes (login, register, logout)
router.group(() => {
  router.get('/login', [AuthController, 'showLogin']).as('login')
  router.post('/login', [AuthController, 'login']).as('check')
  router.get('/register', [AuthController, 'showRegister']).as('register')
  router.post('/register', [AuthController, 'register']).as('checkRegister')
}).as('auth').middleware(middleware.guest())

// Authenticated routes
router.group(() => {
  router.post('/logout', [AuthController, 'logout']).as('logout')
  router.get('/dashboard', ({ view }) => view.render('dashboard')).as('dashboard')
}).middleware(middleware.auth())

// Donatur routes
router.group(() => {
  router.get('/', [DonaturController, 'index']).as('index')
  router.get('/create', [DonaturController, 'create']).as('create')
  router.post('/', [DonaturController, 'store']).as('store')
  router.get('/:id', [DonaturController, 'show']).as('show')
  router.get('/:id/edit', [DonaturController, 'edit']).as('edit')
  router.post('/:id', [DonaturController, 'update']).as('update')
  router.post('/:id/delete', [DonaturController, 'destroy']).as('destroy')
}).prefix('/donatur').as('donatur').middleware(middleware.auth())

// Kategori routes
router.group(() => {
  router.get('/', [KategoriController, 'index']).as('index')
  router.get('/create', [KategoriController, 'create']).as('create')
  router.post('/', [KategoriController, 'store']).as('store')
  router.get('/:id', [KategoriController, 'show']).as('show')
  router.get('/:id/edit', [KategoriController, 'edit']).as('edit')
  router.post('/:id', [KategoriController, 'update']).as('update')
  router.post('/:id/delete', [KategoriController, 'destroy']).as('destroy')
}).prefix('/kategori').as('kategori').middleware(middleware.auth())

// Donasi routes
router.group(() => {
  router.get('/', [DonasiController, 'index']).as('index')
  router.get('/create', [DonasiController, 'create']).as('create')
  router.post('/', [DonasiController, 'store']).as('store')
  router.get('/:id', [DonasiController, 'show']).as('show')
  router.get('/:id/edit', [DonasiController, 'edit']).as('edit')
  router.post('/:id', [DonasiController, 'update']).as('update')
  router.post('/:id/delete', [DonasiController, 'destroy']).as('destroy')
}).prefix('/donasi').as('donasi').middleware(middleware.auth())

// Kampanye routes
router.group(() => {
  router.get('/', [KampanyeController, 'index']).as('index')
  router.get('/create', [KampanyeController, 'create']).as('create')
  router.post('/', [KampanyeController, 'store']).as('store')
  router.get('/:id', [KampanyeController, 'show']).as('show')
  router.get('/:id/edit', [KampanyeController, 'edit']).as('edit')
  router.post('/:id', [KampanyeController, 'update']).as('update')
  router.post('/:id/delete', [KampanyeController, 'destroy']).as('destroy')
}).prefix('/kampanye').as('kampanye').middleware(middleware.auth())

// Transaksi Donasi routes
router.group(() => {
  router.get('/', [TransaksiDonasiController, 'index']).as('index')
  router.get('/create', [TransaksiDonasiController, 'create']).as('create')
  router.post('/', [TransaksiDonasiController, 'store']).as('store')
  router.get('/:id', [TransaksiDonasiController, 'show']).as('show')
  router.get('/:id/edit', [TransaksiDonasiController, 'edit']).as('edit')
  router.post('/:id', [TransaksiDonasiController, 'update']).as('update')
  router.post('/:id/delete', [TransaksiDonasiController, 'destroy']).as('destroy')
}).prefix('/transaksi-donasi').as('transaksi_donasi').middleware(middleware.auth())