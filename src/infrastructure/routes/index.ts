import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'
import { UserController } from '../../adapters/usercontroller'

export default (fastify: FastifyInstance) => <Resource>{
    get: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const query = request.query

            try {
                await UserController.GetUser(query, reply)
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição:" });
            }
        }
    },
    post: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const formData: any = request.body

            try {
                await UserController.SignUp(formData, reply)

            } catch (error) {
                reply.code(500).send({ erro: "Erro ao processar a requisição" })
            }
        }
    },

    put: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const { update: update } = request.body as any
            const { query: query } = request.body as any

            try {
                await UserController.UpdateUser(update, query, reply)

            } catch (error) {
                reply.code(500).send({ erro: "Erro ao processar a requisição" })
            }
        }
    },
}
