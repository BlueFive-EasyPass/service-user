import { IUser } from "./userInterface";

export interface IUserService {
    signUp(userData: IUser['userData']): Promise<boolean>;
    searchUser(userData: IUser['userData']): Promise<any>;
    updateUser(userData: IUser['userData'], arg1: any): Promise<any>;
    loginSystem(userData: IUser['userData']): Promise<any>;
    cancelUser(userData: IUser['userData']): Promise<boolean>
    activateUser(userData: IUser['userData']): Promise<boolean>
    sendImage(image: IUser['imagem']): Promise<boolean>
    getImage(image: IUser['imagem']): Promise<any>
    updateCustomer(data: any): Promise<boolean>;
  }
  