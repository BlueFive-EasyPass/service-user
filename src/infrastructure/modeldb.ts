import { DataTypes } from 'sequelize';
import { InstanceDB } from '../adapters/conectioninstance';

const connection = InstanceDB.ControllerDB();

export class UserModelDB {
    static defineModel() {
        return connection.Sequelize.define('user', {
            user_CPF: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            user_RG: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            user_senha: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_nascimento: {
                type: DataTypes.DATEONLY
            },
            user_FotoPerfil: {
                type: DataTypes.STRING
            },
            user_RGFrente: {
                type: DataTypes.STRING
            },
            user_RGTras: {
                type: DataTypes.STRING
            },
            user_endCEP: {
                type: DataTypes.STRING
            },
            user_endUF: {
                type: DataTypes.STRING
            },
            user_endbairro: {
                type: DataTypes.STRING
            },
            user_endrua: {
                type: DataTypes.STRING
            },
            user_endnum: {
                type: DataTypes.STRING
            },
            user_endcomplemento: {
                type: DataTypes.STRING
            },
            user_endcidade: {
                type: DataTypes.STRING
            },
            user_tipo: {
                type: DataTypes.STRING
            },
            list_CPF_list_id: {
                type: DataTypes.STRING
            },
            user_credit: {
                type: DataTypes.STRING
            },
            user_Background: {
                type: DataTypes.STRING
            },
            user_FotoRec: {
                type: DataTypes.STRING
            },
            user_status: {
                type: DataTypes.STRING
            },
            user_cel: {
                type: DataTypes.STRING
            },
            user_idcli: {
                type: DataTypes.STRING
            },
            user_verifyemail: {
                type: DataTypes.STRING
            },
            user_verifycel: {
                type: DataTypes.STRING
            }
        }, {
            tableName: 'user',
            timestamps: false
        });
    }

    static async syncModel() {
        try {
            const User = this.defineModel();
            await connection.Sequelize.sync();
            console.log('Modelo sincronizado com o banco de dados');
            return User;
        } catch (err) {
            console.error('Erro ao sincronizar o modelo:', err);
            throw err;
        }
    }
}
