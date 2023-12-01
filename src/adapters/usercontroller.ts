import { FastifyReply } from "fastify";
import { IUser } from "../interfaces/userinterface";
import { MidUser } from "../application/miduser";
import { Login } from "../application/login";
import { JWTSign } from "../application/jwtsign";
import { User } from "../domain/user";
import { InstanceDB } from "./conectioninstance";
import { IUserService } from "../interfaces/interfaceService";
import { IController } from "../interfaces/interfacecontroller";
import dotenv from 'dotenv'
import { IMidUser } from "../interfaces/interfacemiduser";

dotenv.config()

export class UserController implements IController {
    private user: IUser;
    private mid: IMidUser;

    constructor(user: IUser) {
        this.user = user;
        this.mid = new MidUser(this.user)
    }

    async SignUp(reply: FastifyReply) {
        try {
            console.log(this.user)

            const validateFields = this.mid.validateCompleteUser()

            if (!validateFields) {
                reply.code(400).send({ error: "Formato do envio inválido:" });
            } else {
                const successfulSignUp = await this.user.saveToDatabase();
                console.log(successfulSignUp)

                if (successfulSignUp) {
                    reply.code(200).send({ user: this.user.userData, get: process.env.service });
                } else {
                    reply.code(400).send({ error: "Erro ao salvar no banco de dados:" });
                }
            }

        } catch (error) {

            reply.code(400).send({ error: "Erro ao salvar no banco de dados:" });
        }
    }

    async GetUser(reply: FastifyReply) {

        try {
            const resultSearch = await this.user.searchUser()

            if (resultSearch) {
                reply.code(200).send(resultSearch)
            } else {
                reply.code(400).send({ error: 'Sem retornos' })
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" })
        }
    }

    async UpdateUser(param: any, reply: FastifyReply) {
        console.log(param);
        console.log(this.user);

        try {
            const resultUpdate = await this.user.updateUser(param)
            console.log(resultUpdate);
            console.log(resultUpdate);


            if (resultUpdate) {
                reply.code(200).send({ send: `Usuário alterado`})
            } else {
                reply.code(400).send({ error: 'Sem retornos' })
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" })
        }
    }

    /*

    async Login(user_CPF: IUser, password: string, reply: FastifyReply) {
        const connection = InstanceDB.createConnection()

        try {
            const resultLogin = await Login.loginExecute(user_CPF, connection)

            if (!resultLogin) {
                return reply.code(400).send({ error: "Erro ao logar na conta:" });
            }

            const compare = await MidUser.compareHash(resultLogin.user_senha, password)

            if (compare) {
                const token = await JWTSign.signExecute()
                console.log('token: ', token);

                const currentDate = new Date();
                const expiresData = new Date();
                expiresData.setDate(currentDate.getDate() + 7);

                reply.setCookie('token', token, {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'strict',
                    expires: expiresData
                });

                return reply.code(200).send('Logado');
            } else {
                return reply.code(400).send({ error: "Erro ao logar na conta:" });
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" });
        }
    } */

}