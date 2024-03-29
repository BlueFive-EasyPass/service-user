import { FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'
import { IController } from '../../../interfaces/interfaceController'
import { InstanceManager } from '../../instanceManager'

export default () => <Resource>{
    post: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const userLogin = request.body as any
            console.log(userLogin)
            
            const instanceManager = new InstanceManager(userLogin, null);
            const controller: IController = instanceManager.getController();


            try {
                await controller.Login(reply)
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição:" });
            }
        }
    }
}
