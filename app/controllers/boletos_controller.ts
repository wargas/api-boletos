import Boleto from '#models/boleto';
import type { HttpContext } from '@adonisjs/core/http';


export default class BoletosController {

    async search({request, auth}: HttpContext) {
        const start = request.input('start', '')
        const end = request.input('end', '')

        const page = request.input('page', '1')

        const user = auth.getUserOrFail()

        const query = Boleto.query().where('user_id', user.id)
            

        if(start != '') {
            query.where('due', '>=', start)
        }

        if(end != '' ) {
            query.where('due', '<=', end)
        }

        const sum = await query.clone().sum('value as value').first()

        const paginate = (await query.paginate(parseInt(page), 15)).toJSON();

        return {
            sum, ...paginate
        }
    }

    index({ auth }: HttpContext) {
        const user = auth.getUserOrFail()
        return Boleto.query().where('user_id', user.id)
    }

    show({ params, auth }: HttpContext) {
        // return params;
        const user = auth.getUserOrFail()
        return Boleto.query()
            .where('user_id', user.id)
            .where('id', params.id)
            .first()
    }

    async update({ params, request, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const boleto = await Boleto.query()
            .where('user_id', user.id)
            .where('id', params.id)
            .firstOrFail()

        boleto.merge(request.only(['description', 'value', 'due']))

        await boleto.save()
        return boleto;
    }

    async store({ request, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const data = request.only(['description', 'value', 'due'])
        const boleto = await Boleto.create(
            {
                ...data,
                userId: user.id
            },
        )


        return boleto;
    }

    async destroy({ params, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const boleto = await Boleto.query()
            .where('user_id', user.id)
            .where('id', params.id)
            .firstOrFail()

        return await boleto.delete()
    }

}