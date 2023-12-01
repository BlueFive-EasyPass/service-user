import { FastifyReply } from "fastify"

export interface IController {
    SignUp(reply: FastifyReply): any
    GetUser(reply: FastifyReply): any
    UpdateUser(param: any, reply: FastifyReply): any

}