import { FastifyReply } from "fastify";
import { IUser } from "../interfaces/userinterface";
import { MidUser } from "../application/miduser";
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
                if (resultUpdate > 1) {
                    reply.code(400).send({ error: `Mais de um usuário está sendo alterado: ${resultUpdate} usuários` })
                } else {
                    reply.code(200).send({ send: `${resultUpdate} usuário foi alterado` })
                }
            } else {
                reply.code(400).send({ error: 'Sem retornos' })
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" })
        }
    }


    async Login(reply: FastifyReply) {

        try {
            const resultLogin = await this.user.loginSystem()
            const a = {...resultLogin}
            console.log('RESULT JSON: ', resultLogin[0])
            console.log('RESULT SENHA: ', resultLogin[0].user_senha)
            if (!resultLogin) {
                return reply.code(400).send({ error: "CPF ou senha inválidos" });
            } else {
                console.log('teste');
                console.log(this.user)
                console.log(this.user.userData)

                const compare = await this.mid.compareHash(resultLogin[0].user_senha)
                console.log('teste');

                console.log('RESULT HASH: ', compare)


                if (compare) {
                    const token = await this.mid.createToken()
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

                    return reply.code(200).send({ send: 'Logado' });
                } else {
                    return reply.code(400).send({ error: "Erro ao logar na conta:" });
                }
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" });
        }
    }

}