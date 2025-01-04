/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BoletosController = () => import('#controllers/boletos_controller')
import router from '@adonisjs/core/services/router'

router.resource('/boletos', BoletosController)

router.get('/', async () => {
  return {
    hello: 'world', version: '1.0'
  }
})
