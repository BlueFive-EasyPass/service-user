import { IUser } from "./userinterface";

export interface IUserRepository {
    save(userData: IUser['userData']): Promise<boolean>;
    get(userData: IUser['userData']): Promise<any>;
    update(userData: IUser['userData'], arg1: any): Promise<any>
    login(userData: IUser['userData']): Promise<any>;
}