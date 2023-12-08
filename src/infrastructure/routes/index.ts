import { FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'
import { InstanceManager } from '../instanceManager'
import { MidUser } from '../../application/midUser'
import { IMidUser } from '../../interfaces/interfaceMidUser'
import { IController } from '../../interfaces/interfaceController'

export default () => <Resource>{
    get: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const query: any = request.query
            const instanceManager = new InstanceManager(query, null);
            const controller: IController = instanceManager.getController();
            console.log(query)
            console.log(controller)

            try {
                await controller.GetUser(reply)

            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição:" });
            }
        }
    },
    post: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const userData: any = request.body
            const mid = new MidUser(userData)
            const createHash: IMidUser = await mid.createHash()

            const userDataWithHash = {
                ...userData,
                user_senha: createHash
            }

            const instanceManager = new InstanceManager(userDataWithHash, null);
            const controller: IController = instanceManager.getController();

            try {
                await controller.SignUp(reply)
            } catch (error) {
                reply.code(500).send({ erro: "Erro ao processar a requisição" })
            }
        }
    },

    put: {
        url: '/:cpf',
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const query = request.body as any
            const { cpf } = request.params as any;
            const param = {
                user_CPF: cpf
            }
            console.log(query)
            console.log(cpf)

            if (cpf === null || cpf === undefined || cpf === "" || cpf.length !== 11) {
                reply.code(400).send({ erro: "Parametro enviado é inválido" })

            } else {
                const instanceManager = new InstanceManager(query, null);
                const controller: IController = instanceManager.getController();

                try {
                    await controller.UpdateUser(param, reply)

                } catch (error) {
                    reply.code(500).send({ erro: "Erro ao processar a requisição" })
                }
            }
        }
    },
}
