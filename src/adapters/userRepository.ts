import { IModelDB } from "../interfaces/interfaceModel";
import { IUserRepository } from "../interfaces/interfaceRepository";
import { IUser } from "../interfaces/userInterface";
import axios from 'axios';
import AWS from 'aws-sdk';
import { IAWSConfig } from "../interfaces/interfaceAWS";

export class UserRepository implements IUserRepository {
    private modelDB: IModelDB
    private AWS: AWS.S3
    private AWSSendParams: IAWSConfig['sendParams']
    private AWSGetParams: IAWSConfig['getParams']

    constructor(modelDB: IModelDB, AWS: IAWSConfig) {
        this.modelDB = modelDB
        this.AWS = AWS.getS3Instance()
        this.AWSSendParams = AWS.sendParams
        this.AWSGetParams = AWS.getParams
    }


    async image(image: IUser['imagem']): Promise<boolean> {
        try {

            console.log('CHEGAMO', image);
            const params = await this.AWSSendParams(image)
            console.log(params);
            const result = await this.AWS.upload(params).promise();
            console.log(result);

            if (result) {
                return true
            } else {
                return false
            }

        } catch (error) {
            console.error('Erro ao salvar imagem:', error);
            return false;
        }
    }

    async getimage(image: IUser['imagem']): Promise<any> {
        try {

            console.log('CHEGAMO', image);
            const params = await this.AWSGetParams(image)
            const response = await axios.get(params, { responseType: 'arraybuffer' });

            if (response && response.data) {
                return Buffer.from(response.data, 'binary');
            } else {
                return false
            }

        } catch (error) {
            console.error('Erro ao salvar imagem:', error);
            return false;
        }
    }


    async save(userData: IUser['userData']): Promise<boolean> {
        try {
            console.log(this.modelDB)

            const model = await this.modelDB.syncModel()
            console.log('Conexão com o banco de dados estabelecida');

            console.log(model)

            await model.create({ ...userData });

            return true;
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async get(userData: IUser['userData']): Promise<any> {

        try {
            console.log(this.modelDB)

            const model = await this.modelDB.syncModel()
            console.log('Conexão com o banco de dados estabelecida');

            console.log(model)

            const resultUsers = await model.findAll({
                where: {
                    ...userData
                }
            });

            const jsonResults = resultUsers.map((result: any) => result.toJSON());

            return jsonResults;
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async update(userData: IUser['userData'], param: any): Promise<any> {

        try {

            console.log(this.modelDB)

            const model = await this.modelDB.syncModel()
            console.log('Conexão com o banco de dados estabelecida');

            console.log(model)

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
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async login(userData: IUser['userData']): Promise<any> {

        try {
            console.log(this.modelDB)

            const model = await this.modelDB.syncModel()
            console.log('Conexão com o banco de dados estabelecida');

            console.log(model)

            console.log(userData)


            const resultUsers = await model.findAll({
                where: {
                    user_CPF: userData?.user_CPF
                }
            });

            console.log('RESULT DB: ', resultUsers)

            const jsonResults = resultUsers.map((result: any) => result.toJSON());
            console.log('RESULT JSON: ', jsonResults)


            return jsonResults
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async cancel(userData: IUser['userData']): Promise<any> {
        try {
            console.log(this.modelDB)

            const model = await this.modelDB.syncModel()
            console.log('Conexão com o banco de dados estabelecida');

            console.log(model)

            console.log(userData)

            const resultCancel = await model.update({ user_status: 'cancelado' }, {
                where: {
                    ...userData
                }
            });

            console.log(resultCancel);

            if (resultCancel[0] === 1) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.error('Erro durante a atualização:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async activate(userData: IUser['userData']): Promise<any> {
        try {
            console.log(this.modelDB)

            const model = await this.modelDB.syncModel()
            console.log('Conexão com o banco de dados estabelecida');

            console.log(model)

            console.log(userData)

            const resultCancel = await model.update({ user_status: 'ativo' }, {
                where: {
                    ...userData
                }
            });

            console.log(resultCancel);

            if (resultCancel[0] === 1) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.error('Erro durante a atualização:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }
}
