import { IUser } from "./userinterface";

export interface IMidUser {
    validateCompleteUser(): boolean;
    validateLoginCredentials(): boolean
    createHash(): Promise<any>
    compareHash(hash: string): Promise<boolean>
}