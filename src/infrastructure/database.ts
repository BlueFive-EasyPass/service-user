import { Sequelize } from 'sequelize';
import { IDatabaseConnection } from '../adapters/databaseinterface';
import dotenv from 'dotenv'

dotenv.config()

export class SequelizeConnection implements IDatabaseConnection {
  private sequelize: Sequelize;
  Sequelize: any;

  constructor() {
    const database = process.env.database
    const username = process.env.admin
    const password = process.env.password
    const host = process.env.host

    this.sequelize = new Sequelize({
      database: database,
      username: username,
      password: password,
      host: host,
      port: 3306,
      dialect: 'mysql',
    });
  }

  getSequelizeInstance() {
    return this.sequelize;
  }

  async Connect(): Promise<void> {
    await this.sequelize.authenticate()
      .then(() => {
        console.log('Conexão Sequelize estabelecida com sucesso');
      })
      .catch((error: Error) => {
        console.error('Erro ao conectar via Sequelize:', error);
      });
  }

  async Disconnect(): Promise<void> {
    await this.sequelize.close()
      .then(() => {
        console.log('Conexão Sequelize encerrada');
      })
      .catch((error: Error) => {
        console.error('Erro ao desconectar via Sequelize:', error);
      });
  }
}