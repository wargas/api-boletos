import Boleto from '#models/boleto';
import type { HttpContext } from '@adonisjs/core/http';


export default class BoletosController {

    index({}: HttpContext) {
        return Boleto.all()
    }

    async store({ request }: HttpContext) {
        const boleto = await Boleto.create(request.only(['description', 'value', 'due']))


        return boleto;
    }
}