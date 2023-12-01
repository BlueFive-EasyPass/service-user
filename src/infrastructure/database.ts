import { Sequelize } from 'sequelize';
import { IDatabaseConnection } from '../interfaces/databaseinterface';
import dotenv from 'dotenv'

dotenv.config()

export class SequelizeConnection implements IDatabaseConnection {
  private sequelize: Sequelize;

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

  getInstance() {
    return this.sequelize;
  }

  async Connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Conexão Sequelize estabelecida com sucesso');
    } catch (error) {
      console.error('Erro ao conectar via Sequelize:', error);
      throw error;
    }
  }

  async Disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log('Conexão Sequelize encerrada');
    } catch (error) {
      console.error('Erro ao desconectar via Sequelize:', error);
      throw error;
    }
  }
}
