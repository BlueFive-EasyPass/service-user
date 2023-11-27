import { IUser } from "../adapters/userinterface";
import bcrypt from 'bcrypt'

export class MidUser {
    static validateCompleteUser(userData: IUser | any): boolean {
        const excludedFields: string[] = [
            'user_CPFR',
            'user_Background',
            'user_credit',
            'user_FotoRec',
            'user_RGTras',
            'user_RGFrente',
            'user_status',
            'user_verifycel',
            'user_verifyemail'
        ];

        const allFieldsExceptExcluded = Object.keys(userData).filter(
            field => !excludedFields.includes(field)
        );

        const allFieldsPresentString = allFieldsExceptExcluded.every(field => {
            return userData[field] !== undefined && typeof userData[field] === 'string';
        });

        const allRequiredFieldsPresent = Object.keys(userData)
            .filter(field => !excludedFields.includes(field))
            .every(field => userData[field] !== undefined);

        return allFieldsPresentString && allRequiredFieldsPresent;
    }

    static validateLoginCredentials(userData: Partial<IUser>): boolean {
        return (
            'user_CPF' in userData &&
            'user_senha' in userData &&
            typeof userData.user_CPF === 'string' &&
            typeof userData.user_senha === 'string'
        );
    }

    static async createHash(password: any) {
        const hash = await bcrypt.hash(password, 10);

        return hash
    }

    static async compareHash(hash: string, password: string): Promise<boolean> {

        const match = await bcrypt.compare(password, hash)
        
        if (match) {
            return true
        } else {
            return false
        }
    }

}