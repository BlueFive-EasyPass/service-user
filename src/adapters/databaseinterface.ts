export interface IDatabaseConnection {
   Connect: () => void
   Disconnect: () => void
   Sequelize: any,
}