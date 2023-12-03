import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import multer from 'fastify-multer';
import { IUser } from '../../../interfaces/userInterface';
import { InstanceManager } from '../../instanceManager';
import { IController } from '../../../interfaces/interfaceController';
const upload = multer({ dest: 'uploads/' });

export default (): Resource => ({
  post: {
    preHandler: upload.single('data'),
    handler: async (request: any, reply: FastifyReply) => {
      try {
        const data = request.file as any;
        const { cpf } = request.body as any;
        const { tipo } = request.body as any;

        const image: IUser['imagem'] = {
          data: data,
          user_CPF: cpf,
          tipo: tipo
        }
        if (!data || !cpf || !tipo) {
          reply.code(400).send('Image, CPF e tipo são obrigatórios');
          return;
        }
        const instanceManager = new InstanceManager(null, image);
        const controller: IController = instanceManager.getController();
        console.log(data);
        console.log(controller);
        await controller.SendImage(reply)
      } catch (err) {
        console.error('Error:', err);
        reply.code(500).send('Internal Server Error');
      }
    },
  },
  get: {
    handler: async (request: any, reply: FastifyReply) => {
      const { user_CPF } = request.query as any;
      const { tipo } = request.query as any;
      console.log(user_CPF, tipo)
      const image: IUser['imagem'] = {
        user_CPF: user_CPF,
        tipo: tipo
      }
      console.log(image);
      try {
        const instanceManager = new InstanceManager(null, image);
        const controller: IController = instanceManager.getController();
        await controller.GetImage(reply)
      } catch (err) {
        console.error('Error:', err);
        reply.code(500).send('Internal Server Error');
      }
    }
  }
})
