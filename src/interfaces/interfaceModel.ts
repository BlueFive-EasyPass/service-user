export interface IModelDB {
    syncModel(): Promise<any>
    desconnectModel(): any
}