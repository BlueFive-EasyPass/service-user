import { UserModelDB } from "../infrastructure/modeldb";
import { IDatabaseConnection } from "../interfaces/databaseinterface";
import { IUserRepository } from "../interfaces/interfaceRepository";
import { IUser } from "../interfaces/userinterface";

export class UserRepository implements IUserRepository {
    private connection: IDatabaseConnection;

    constructor(connection: IDatabaseConnection) {
        this.connection = connection;
    }

    async save(userData: IUser['userData']): Promise<boolean> {
        try {
            console.log(this.connection)

            this.connection.Connect();
            console.log('Conexão com o banco de dados estabelecida');
            const User = new UserModelDB(this.connection)
            const model = User.defineModel()

            console.log(User)
            console.log(model)

            await model.create({ ...userData });

            this.connection.Disconnect();
            return true;
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            this.connection.Disconnect();
            return false;
        }
    }

    async get(userData: IUser['userData']): Promise<any> {

        try {
            console.log(this.connection)

            this.connection.Connect();
            console.log('Conexão com o banco de dados estabelecida');
            const User = new UserModelDB(this.connection)
            const model = User.defineModel()

            console.log(User)
            console.log(model)

            const resultUsers = await model.findAll({
                where: {
                    ...userData
                }
            });

            const jsonResults = resultUsers.map((result: any) => result.toJSON());
            this.connection.Disconnect();

            return jsonResults;
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            this.connection.Disconnect();
            return false;
        }
    }

    async update(userData: IUser['userData'], param: any): Promise<any> {

        try {

            this.connection.Connect();
            console.log('Conexão com o banco de dados estabelecida');
            const User = new UserModelDB(this.connection)
            const model = User.defineModel()

            const resultUsers = await model.update({ ...userData }, {
                where: {
                    ...param
                }
            });

            if (resultUsers[0] > 0) {
                return resultUsers[0]
            } else {
                return false
            }
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            this.connection.Disconnect();
            return false;
        }
    }

    async login(userData: IUser['userData']): Promise<any> {

        try {
            console.log(this.connection)

            this.connection.Connect();
            console.log('Conexão com o banco de dados estabelecida');
            const User = new UserModelDB(this.connection)
            const model = User.defineModel()

            console.log(User)
            console.log(model)

            const resultUsers = await model.findAll({
                where: {
                    user_CPF: userData?.user_CPF
                }
            });

            this.connection.Disconnect();
            console.log('RESULT DB: ',resultUsers)

            const jsonResults = resultUsers.map((result: any) => result.toJSON());
            console.log('RESULT JSON: ', jsonResults)


            return jsonResults
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            this.connection.Disconnect();
            return false;
        }
    }
}
