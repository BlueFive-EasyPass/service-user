import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'
import { UserController } from '../../../adapters/usercontroller'

export default (fastify: FastifyInstance) => <Resource>{
    post: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const { user_CPF: cpf } = request.body as any
            const { user_senha: password } = request.body as any

            console.debug('cpf: ', cpf, 'senha: ', password)

            try {
                await UserController.Login(cpf, password, reply);
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição:" });
            }
        }
    }
}
