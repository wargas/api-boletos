const BoletosController = () => import('#controllers/boletos_controller')
import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('auth', [AuthController, 'login'])
router.post('register', [AuthController, 'store'])


router.group(() => {
  router.post('logout', [AuthController, 'logout'])
  router.get('me', [AuthController, 'currentUser'])
  router.get('search', [BoletosController, 'search'])
  router.resource('/boletos', BoletosController)
}).use(middleware.auth({ guards: ['api'] }))


router.get('/', async () => {
  return {
    hello: 'world', version: '1.0', build: process.env.BUILD_TIME || '-'
  }
})

