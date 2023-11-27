import { FastifyReply } from "fastify";
import { SignUp } from "../application/signup";
import { IUser } from "./userinterface";
import { MidUser } from "../application/miduser";
import { Login } from "../application/login";
import { InstanceDB } from "./conectioninstance";
import { JWTSign } from "../application/jwtsign";
import { GetUser } from "../application/getcustomuser";
import { UpdateUser } from "../application/updateuser";

export class UserController {

    static async SignUp(userData: IUser, reply: FastifyReply) {
        const connection = InstanceDB.ControllerDB()
        const validateInterface = MidUser.validateCompleteUser(userData)
        const newHash = await MidUser.createHash(userData.user_senha)
        const userDataWithHash = {
            ...userData,
            user_senha: newHash
        }

        console.debug(userDataWithHash.user_senha);


        if (!validateInterface) {
            reply.code(400).send({ error: "Dados incompletos ou tipo de dados incorretos" });
        }

        try {
            const successfulSignUp = await SignUp.signUpExecute(userDataWithHash, connection)

            if (successfulSignUp) {
                reply.code(200).send(userData);

            } else {
                reply.code(400).send({ error: "Erro ao salvar no banco de dados:" });

            }

        } catch (error) {
            reply.code(400).send({ error: "Erro ao salvar no banco de dados:" });
        }

    }

    static async Login(user_CPF: IUser, password: string, reply: FastifyReply) {
        const connection = InstanceDB.ControllerDB()

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
    }

    static async GetUser(query: any, reply: FastifyReply) {
        const connection = InstanceDB.ControllerDB()

        try {
            const resultSearch = await GetUser.searchUserExecute(query, connection)

            if (resultSearch.length > 0) {
                reply.code(200).send(resultSearch)
            } else {
                reply.code(400).send({ error: 'Sem retornos' })
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" })
        }
    }

    static async UpdateUser(update: any, query: any, reply: FastifyReply) {
        const connection = InstanceDB.ControllerDB()
        console.log(update, query);

        try {
            const resultSearch = await UpdateUser.updateUserExecute(update, query, connection)
            console.log(resultSearch);
            console.log(resultSearch);


            if (resultSearch.length > 0) {
                reply.code(200).send(resultSearch)
            } else {
                reply.code(400).send({ error: 'Sem retornos' })
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" })
        }
    }

}