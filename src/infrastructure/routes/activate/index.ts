import { FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'
import { InstanceManager } from '../../instanceManager';
import { IController } from '../../../interfaces/interfaceController';
import { IUser } from '../../../interfaces/userInterface';

export default () => <Resource>{
    patch: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const userData = request.body as IUser['userData'];

            const instanceManager = new InstanceManager(userData, null);
            const controller: IController = instanceManager.getController();

            try {
                await controller.ActivateUser(reply)
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar requisção" })
            }
        }
    }
}