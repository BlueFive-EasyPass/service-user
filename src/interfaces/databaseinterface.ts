export interface IDatabaseConnection {
   Connect: () => void
   Disconnect: () => void
   getInstance: any
}
