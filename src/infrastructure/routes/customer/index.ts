import { FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'
import { InstanceManager } from '../../instanceManager';
import { IController } from '../../../interfaces/interfaceController';
import { IUser } from '../../../interfaces/userInterface';

export default () => <Resource>{
    patch: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const data = request.body as Array<object>
            console.log('test', [data]);
            console.log('test', data);


            const instanceManager = new InstanceManager(null, null);
            const controller: IController = instanceManager.getController();

            try {
                await controller.UpdateCustomer(data, reply)
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar requisção" })
            }
        }
    }
}