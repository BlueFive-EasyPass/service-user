import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'
import { UserController } from '../../adapters/usercontroller'
import { IUser } from '../../adapters/userinterface'

export default (fastify: FastifyInstance) => <Resource>{
  get: {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {

      reply.send('this is get method')

    }
  },
  head: {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send('this is head method')

    }
  },
  patch: {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send('this is patch method')

    }
  },
  post: {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const formData: any = request.body

      UserController.SignUp(formData, reply)
    }
  },
  put: {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send('this is put method')

    }
  },
  options: {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send('this is options method')

    }
  },
}