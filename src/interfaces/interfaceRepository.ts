import { IUser } from "./userInterface";

export interface IUserRepository {
    save(userData: IUser['userData']): Promise<boolean>;
    get(userData: IUser['userData']): Promise<any>;
    update(userData: IUser['userData'], arg1: any): Promise<any>
    login(userData: IUser['userData']): Promise<any>;
    cancel(userData: IUser['userData']): Promise<boolean>
    activate(userData: IUser['userData']): Promise<boolean>
    image(image: IUser['imagem']): Promise<boolean>
    getimage(image: IUser['imagem']): Promise<any>
}