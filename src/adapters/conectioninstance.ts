import { SequelizeConnection } from '../infrastructure/database';
import { IDatabaseConnection } from './databaseinterface';


export class InstanceDB {
    static ControllerDB() {
        const sequelizeConnection = new SequelizeConnection();

        const databaseConnection: IDatabaseConnection = {
            Connect: () => sequelizeConnection.Connect(),
            Disconnect: () => sequelizeConnection.Disconnect(),
            Sequelize: sequelizeConnection.getSequelizeInstance(),
        };

        return databaseConnection
    }
}