import { SequelizeConnection } from '../infrastructure/database';
import { IDatabaseConnection } from '../interfaces/databaseinterface';


export class InstanceDB {
    createConnection(): IDatabaseConnection {
        const sequelizeConnection = new SequelizeConnection();

        const databaseConnection: IDatabaseConnection = {
            Connect: () => sequelizeConnection.Connect(),
            Disconnect: () => sequelizeConnection.Disconnect(),
            getInstance: () => sequelizeConnection.getInstance(),
        };

        return databaseConnection;
    }
}