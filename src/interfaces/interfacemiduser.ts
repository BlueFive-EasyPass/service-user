import { IUser } from "./userinterface";

export interface IMidUser {
    validateCompleteUser(): boolean;
    validateLoginCredentials(): boolean
    createHash(): Promise<any>
    compareHash(hash: any): Promise<boolean>
    createToken(): Promise<string>;
}