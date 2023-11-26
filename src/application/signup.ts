import { IDatabaseConnection } from '../adapters/databaseinterface';

export class SignUp {

    static async signUp(userData: any, databaseConnection: IDatabaseConnection) {

        try {
            databaseConnection.Connect();
            console.log('Conexão com o banco de dados estabelecida');
            await databaseConnection.Sequelize.query('INSERT INTO user (user_CPF, user_RG, user_nome, user_email, user_senha, user_nascimento, user_endCEP, user_endUF, user_endbairro, user_endrua, user_endnum, user_endcomplemento, user_endcidade, user_tipo, list_CPF_list_id, user_cel, user_idcli) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', {
                replacements: [
                    userData.user_CPF,
                    userData.user_RG,
                    userData.user_nome,
                    userData.user_email,
                    userData.user_senha,
                    userData.user_nascimento,
                    userData.user_endCEP,
                    userData.user_endUF,
                    userData.user_endbairro,
                    userData.user_endrua,
                    userData.user_endnum,
                    userData.user_endcomplemento,
                    userData.user_endcidade,
                    userData.user_tipo,
                    userData.list_CPF_list_id,
                    userData.user_cel,
                    userData.user_idcli,
                ],
            });

        } catch (error) {
            console.error('Erro ao salvar no banco de dados:', error);
            throw new Error('Erro ao salvar no banco de dados');
        }
    }
}
