export interface IDatabaseConnection {
   Connect: () => void
   Disconnect: () => void
   getInstance: any
}

export interface IInstanceDB {
   createConnection(): IDatabaseConnection 
}