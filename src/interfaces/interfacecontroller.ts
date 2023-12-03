import { FastifyReply } from "fastify"

export interface IController {
    SignUp(reply: FastifyReply): any
    GetUser(reply: FastifyReply): any
    UpdateUser(param: any, reply: FastifyReply): any
    Login(reply: FastifyReply): any
    CancelUser(reply: FastifyReply): any
    ActivateUser(reply: FastifyReply): any
    SendImage(reply: FastifyReply): any
    GetImage(reply: FastifyReply): any
}