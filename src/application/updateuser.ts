import { IDatabaseConnection } from "../adapters/databaseinterface";
import { UserModelDB } from "../infrastructure/modeldb";
export class UpdateUser {
    static async updateUserExecute(update: any, query: any, databaseConnection: IDatabaseConnection): Promise<any> {

        try {
            const User = UserModelDB.defineModel();
            console.log(update, query);

            const resultUsers = await User.update({ ...update }, {
                where: {
                    ...query
                }
            });

            console.log('RESULTADO: ', resultUsers);

            const jsonResults = resultUsers.map((result: any) => result.toJSON());

            console.log('RESULTADO JSON: ', jsonResults);

            // Fechando a conexão após a operação
            await databaseConnection.Disconnect();

            return jsonResults;
        } catch (error) {
            return false;
        }

    }
}
