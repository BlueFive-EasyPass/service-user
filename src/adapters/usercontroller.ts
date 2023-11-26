import { FastifyReply } from "fastify";
import { SignUp } from "../application/signup";
import { SequelizeConnection } from '../infrastructure/database';
import { IDatabaseConnection } from "./databaseinterface";

export class UserController {
    static ControllerDB() {
        const sequelizeConnection = new SequelizeConnection();

        const databaseConnection: IDatabaseConnection = {
            Connect: () => sequelizeConnection.Connect(),
            Disconnect: () => sequelizeConnection.Disconnect(),
            Sequelize: sequelizeConnection.getSequelizeInstance(),
        };

        return databaseConnection
    }

    static async SignUp(userData: any, reply: FastifyReply) {
        console.log('aaaa');
        const connection = UserController.ControllerDB()

        try {
           await SignUp.signUp(userData, connection)
           reply.status(200).send(userData);

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            reply.status(400).send(error);
        }

    }
}