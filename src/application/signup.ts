import { IDatabaseConnection } from '../adapters/databaseinterface';
import { IUser } from '../adapters/userinterface';
import { UserModelDB } from '../infrastructure/modeldb';

export class SignUp {
    static async signUpExecute(userData: IUser, databaseConnection: IDatabaseConnection): Promise<boolean> {
        try {
            databaseConnection.Connect();
            console.log('Conexão com o banco de dados estabelecida');

            const User = UserModelDB.defineModel(); // Obtenha o modelo User

            await User.create({
                user_CPF: userData.user_CPF,
                user_RG: userData.user_RG,
                user_nome: userData.user_nome,
                user_email: userData.user_email,
                user_senha: userData.user_senha,
                user_nascimento: userData.user_nascimento,
                user_endCEP: userData.user_endCEP,
                user_endUF: userData.user_endUF,
                user_endbairro: userData.user_endbairro,
                user_endrua: userData.user_endrua,
                user_endnum: userData.user_endnum,
                user_endcomplemento: userData.user_endcomplemento,
                user_endcidade: userData.user_endcidade,
                user_tipo: userData.user_tipo,
                list_CPF_list_id: userData.list_CPF_list_id,
                user_cel: userData.user_cel,
                user_idcli: userData.user_idcli,
            });

            databaseConnection.Disconnect();
            return true;

        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            databaseConnection.Disconnect();
            return false;
        }
    }
}
