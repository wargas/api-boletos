import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http';
import hash from '@adonisjs/core/services/hash';

export default class AuthController {

    async login({ request}: HttpContext) {
        const { email, password} = request.only(['email', 'password'])

        const user = await User.findByOrFail({email})

        const verifyPass = await hash.verify(user.password, password)

        if(!verifyPass) {
            throw new Error("Email or Password incorrect")
        }

        const token = await User.accessTokens.create(user);

        return token

        
    }

    async logout({ auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const identifier = user.currentAccessToken.identifier

        return await User.accessTokens.delete(user, identifier)
    }

    async currentUser({auth}: HttpContext) {
        const user = auth.getUserOrFail()

        return {
            ...user.toJSON(),
            access: user.currentAccessToken
        }
    }
}