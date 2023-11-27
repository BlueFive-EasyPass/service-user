import { IDatabaseConnection } from "../adapters/databaseinterface";
import { UserModelDB } from "../infrastructure/modeldb";

export class GetUser {
    static async searchUserExecute(query: any, databaseConnection: IDatabaseConnection): Promise<any> {

        try {
            databaseConnection.Connect();
            const User = UserModelDB.defineModel();

            const resultUsers = await User.findAll({
                where: {
                    ...query
                }
            });

            const jsonResults = resultUsers.map((result: any) => result.toJSON());
            
            return jsonResults;
        } catch (error) {
            return false
        }

    }
}