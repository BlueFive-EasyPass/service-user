import { IUser } from "./userinterface";

export interface IUserService {
    signUp(userData: IUser['userData']): Promise<boolean>;
    searchUser(userData: IUser['userData']): Promise<any>;
    updateUser(userData: IUser['userData'], arg1: any): Promise<any>;
    loginSystem(userData: IUser['userData']): Promise<any>;
  }
  