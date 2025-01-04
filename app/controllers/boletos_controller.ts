import Boleto from '#models/boleto';
import type { HttpContext } from '@adonisjs/core/http';


export default class BoletosController {

    index({ }: HttpContext) {
        return Boleto.all()
    }

    show({ params }: HttpContext) {
        // return params;
        return Boleto.findOrFail(params.id)
    }

    async update({ params, request }: HttpContext) {
        const boleto = await Boleto.findOrFail(params.id)

        boleto.merge(request.only(['description', 'value', 'due']))

        await boleto.save()
        return boleto;
    }

    async store({ request }: HttpContext) {
        const boleto = await Boleto.create(request.only(['description', 'value', 'due']))


        return boleto;
    }

    async destroy({ params }: HttpContext) {
        const boleto = await Boleto.findOrFail(params.id)

        return await boleto.delete()
    }
    
}