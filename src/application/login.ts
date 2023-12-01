import { IDatabaseConnection } from '../interfaces/databaseinterface';
import { IUser } from '../interfaces/userinterface';
import { UserModelDB } from '../infrastructure/modeldb';

export class Login {
    static async loginExecute(user_CPF: IUser, databaseConnection: IDatabaseConnection): Promise<any> {
        try {
            databaseConnection.Connect();
            
            const User = UserModelDB.defineModel();

            const user = await User.findOne({
                where: {
                    user_CPF: user_CPF
                }
            });

            if (user) {
                console.debug(user.toJSON()); 
                databaseConnection.Disconnect();
                return user.toJSON();
            } else {
                databaseConnection.Disconnect();
                return false;
            }

        } catch (error) {
            databaseConnection.Disconnect();
            return false;
        }
    }
}
